import express from 'express';
import {
  createHash,
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';
import { createProfileStore } from './profile-store.js';

const scrypt = promisify(scryptCallback);
const SESSION_COOKIE = 'kimhyemi_admin_session';
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_ATTEMPTS = 5;
const MAX_RATE_LIMIT_KEYS = 1_000;
const CATEGORIES = new Set(['ai-education', 'partnership', 'it-project']);

const dummySalt = Buffer.from('leanit-profile-dummy-salt', 'utf8').toString('base64url');
const DUMMY_PASSWORD_HASH = `scrypt$16384$8$1$${dummySalt}$${Buffer.alloc(64).toString('base64url')}`;

function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}

function safeEqual(left, right) {
  const leftDigest = createHash('sha256').update(String(left)).digest();
  const rightDigest = createHash('sha256').update(String(right)).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function parsePasswordHash(encodedHash) {
  if (typeof encodedHash !== 'string') return null;
  const [algorithm, nText, rText, pText, saltText, hashText, extra] = encodedHash.split('$');
  const N = Number(nText);
  const r = Number(rText);
  const p = Number(pText);

  if (
    algorithm !== 'scrypt' || extra !== undefined ||
    !Number.isInteger(N) || N < 16_384 || N > 262_144 || (N & (N - 1)) !== 0 ||
    !Number.isInteger(r) || r < 1 || r > 32 ||
    !Number.isInteger(p) || p < 1 || p > 16
  ) {
    return null;
  }

  try {
    const salt = Buffer.from(saltText, 'base64url');
    const hash = Buffer.from(hashText, 'base64url');
    if (salt.length < 16 || hash.length < 32 || hash.length > 128) return null;
    return { N, r, p, salt, hash };
  } catch {
    return null;
  }
}

export async function hashPassword(password, {
  N = 16_384,
  r = 8,
  p = 1,
  salt = randomBytes(16),
  keyLength = 64,
} = {}) {
  if (typeof password !== 'string' || password.length < 1 || password.length > 256) {
    throw new TypeError('Password must contain between 1 and 256 characters.');
  }
  const maxmem = Math.max(32 * 1024 * 1024, 256 * N * r);
  const derived = await scrypt(password, salt, keyLength, { N, r, p, maxmem });
  return `scrypt$${N}$${r}$${p}$${salt.toString('base64url')}$${derived.toString('base64url')}`;
}

export async function verifyPassword(password, encodedHash) {
  const parsed = parsePasswordHash(encodedHash) || parsePasswordHash(DUMMY_PASSWORD_HASH);
  const maxmem = Math.max(32 * 1024 * 1024, 256 * parsed.N * parsed.r);
  const derived = await scrypt(password, parsed.salt, parsed.hash.length, {
    N: parsed.N,
    r: parsed.r,
    p: parsed.p,
    maxmem,
  });
  return Boolean(parsePasswordHash(encodedHash)) && timingSafeEqual(derived, parsed.hash);
}

function readCookie(request, name) {
  const header = request.headers.cookie;
  if (!header) return null;

  for (const part of header.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

function normalizeOrigin(origin) {
  try {
    return new URL(origin).origin;
  } catch {
    throw new TypeError('APP_ORIGIN must be an absolute URL.');
  }
}

function validateEntry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;

  const stringField = (name, min, max) => {
    const value = input[name];
    return typeof value === 'string' && value.length >= min && value.length <= max
      ? value
      : null;
  };

  const category = stringField('category', 1, 40);
  const year = stringField('year', 1, 40);
  const titleKo = stringField('titleKo', 1, 300);
  const titleEn = stringField('titleEn', 0, 300);
  const descriptionKo = stringField('descriptionKo', 0, 2_000);
  const descriptionEn = stringField('descriptionEn', 0, 2_000);

  if (
    !category || !CATEGORIES.has(category) || year === null || titleKo === null ||
    titleEn === null || descriptionKo === null || descriptionEn === null ||
    !Array.isArray(input.tags) || input.tags.length > 20 ||
    input.tags.some((tag) => typeof tag !== 'string' || tag.length < 1 || tag.length > 50) ||
    !Number.isInteger(input.sortOrder) || input.sortOrder < -1_000_000 || input.sortOrder > 1_000_000 ||
    typeof input.published !== 'boolean'
  ) {
    return null;
  }

  return {
    category,
    year,
    titleKo,
    titleEn,
    descriptionKo,
    descriptionEn,
    tags: [...input.tags],
    sortOrder: input.sortOrder,
    published: input.published,
  };
}

function parseId(value) {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const id = Number(value);
  return Number.isSafeInteger(id) ? id : null;
}

function createLoginLimiter(now) {
  const attempts = new Map();

  function prune(currentTime) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= currentTime) attempts.delete(key);
    }
    while (attempts.size > MAX_RATE_LIMIT_KEYS) {
      attempts.delete(attempts.keys().next().value);
    }
  }

  return {
    take(key) {
      const currentTime = now();
      prune(currentTime);
      const value = attempts.get(key);
      if (value && value.count >= LOGIN_ATTEMPTS && value.resetAt > currentTime) return false;
      attempts.delete(key);
      attempts.set(key, value && value.resetAt > currentTime
        ? { count: value.count + 1, resetAt: value.resetAt }
        : { count: 1, resetAt: currentTime + LOGIN_WINDOW_MS });
      prune(currentTime);
      return true;
    },
    clear(key) {
      attempts.delete(key);
    },
  };
}

export function createProfileRouter({
  dbPath = process.env.DB_PATH || 'data/profile.sqlite',
  adminUsername = process.env.ADMIN_USERNAME,
  adminPasswordHash = process.env.ADMIN_PASSWORD_HASH,
  appOrigin = process.env.APP_ORIGIN || 'http://localhost:8080',
  secureCookies = process.env.NODE_ENV === 'production',
  now = () => Date.now(),
  store = createProfileStore({ dbPath }),
} = {}) {
  const router = express.Router();
  const allowedOrigin = normalizeOrigin(appOrigin);
  const limiter = createLoginLimiter(now);
  const credentialsConfigured = (
    typeof adminUsername === 'string' && adminUsername.length > 0 &&
    Boolean(parsePasswordHash(adminPasswordHash))
  );
  const credentialFingerprint = digest(`${adminUsername || ''}\0${adminPasswordHash || ''}`);
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: secureCookies,
    path: '/api/kimhyemi',
  };

  router.use((request, response, next) => {
    response.set('Cache-Control', 'no-store');
    next();
  });
  router.use(express.json({ limit: '32kb' }));

  function requireOrigin(request, response, next) {
    if (request.get('origin') !== allowedOrigin) {
      return response.status(403).json({ error: 'Request origin is not allowed.' });
    }
    next();
  }

  function authenticate(request, response, next) {
    const token = readCookie(request, SESSION_COOKIE);
    const session = token ? store.findSession(digest(token), now()) : null;
    if (
      !session || !credentialsConfigured ||
      !safeEqual(session.credentialFingerprint, credentialFingerprint)
    ) {
      if (token) store.deleteSession(digest(token));
      return response.status(401).json({ error: '로그인이 필요합니다.' });
    }
    request.profileSession = session;
    request.profileSessionTokenHash = digest(token);
    next();
  }

  function requireCsrf(request, response, next) {
    const submitted = request.get('x-csrf-token');
    if (!submitted || !safeEqual(submitted, request.profileSession.csrfToken)) {
      return response.status(403).json({ error: '요청을 확인할 수 없습니다. 다시 로그인해 주세요.' });
    }
    next();
  }

  router.get('/entries', (_request, response) => {
    response.json(store.listEntries());
  });

  router.get('/admin/session', authenticate, (request, response) => {
    response.json({
      username: request.profileSession.username,
      csrfToken: request.profileSession.csrfToken,
    });
  });

  router.post('/admin/login', requireOrigin, async (request, response) => {
    const username = typeof request.body?.username === 'string' ? request.body.username : '';
    const password = typeof request.body?.password === 'string' && request.body.password.length <= 256
      ? request.body.password
      : '';
    const rateKey = digest(request.ip || request.socket.remoteAddress || 'unknown');

    // Reserve the attempt before the expensive password check so parallel requests
    // cannot all pass the limit while scrypt is running.
    if (!limiter.take(rateKey)) {
      return response.status(429).json({ error: '로그인할 수 없습니다.' });
    }

    const passwordMatches = await verifyPassword(password, adminPasswordHash);
    const usernameMatches = credentialsConfigured && safeEqual(username, adminUsername);
    if (!passwordMatches || !usernameMatches || !username || !password) {
      return response.status(401).json({ error: '로그인할 수 없습니다.' });
    }

    limiter.clear(rateKey);
    const token = randomBytes(32).toString('base64url');
    const csrfToken = randomBytes(32).toString('base64url');
    const createdAt = now();
    store.pruneSessions(createdAt);
    store.createSession({
      tokenHash: digest(token),
      username: adminUsername,
      csrfToken,
      credentialFingerprint,
      expiresAt: createdAt + SESSION_DURATION_MS,
      createdAt,
    });
    store.pruneSessions(createdAt);
    response.cookie(SESSION_COOKIE, token, {
      ...cookieOptions,
      maxAge: SESSION_DURATION_MS,
    });
    return response.json({ username: adminUsername, csrfToken });
  });

  router.post('/admin/logout', requireOrigin, authenticate, requireCsrf, (request, response) => {
    store.deleteSession(request.profileSessionTokenHash);
    response.clearCookie(SESSION_COOKIE, cookieOptions);
    response.status(204).end();
  });

  router.get('/admin/entries', authenticate, (_request, response) => {
    response.json(store.listEntries({ includeHidden: true }));
  });

  router.post('/admin/entries', requireOrigin, authenticate, requireCsrf, (request, response) => {
    const entry = validateEntry(request.body);
    if (!entry) return response.status(400).json({ error: '입력 내용을 확인해 주세요.' });
    return response.status(201).json(store.createEntry(entry, now()));
  });

  router.put('/admin/entries/:id', requireOrigin, authenticate, requireCsrf, (request, response) => {
    const id = parseId(request.params.id);
    const entry = validateEntry(request.body);
    if (!id || !entry) return response.status(400).json({ error: '입력 내용을 확인해 주세요.' });
    const updated = store.updateEntry(id, entry, now());
    return updated
      ? response.json(updated)
      : response.status(404).json({ error: '항목을 찾을 수 없습니다.' });
  });

  router.delete('/admin/entries/:id', requireOrigin, authenticate, requireCsrf, (request, response) => {
    const id = parseId(request.params.id);
    if (!id) return response.status(400).json({ error: '항목 번호가 올바르지 않습니다.' });
    return store.deleteEntry(id)
      ? response.status(204).end()
      : response.status(404).json({ error: '항목을 찾을 수 없습니다.' });
  });

  router.use((_request, response) => {
    response.status(404).json({ error: 'API를 찾을 수 없습니다.' });
  });

  router.use((error, _request, response, _next) => {
    if (error?.type === 'entity.too.large') {
      return response.status(413).json({ error: 'Request body is too large.' });
    }
    if (error instanceof SyntaxError && 'body' in error) {
      return response.status(400).json({ error: 'Invalid JSON.' });
    }
    console.error('Profile API error:', error);
    return response.status(500).json({ error: 'Internal server error.' });
  });

  router.close = () => store.close();
  return router;
}

export { SESSION_COOKIE };
