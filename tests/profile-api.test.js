import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import test from 'node:test';
import express from 'express';
import {
  createProfileRouter,
  hashPassword,
} from '../server/profile-router.js';
import { createProfileStore } from '../server/profile-store.js';

const APP_ORIGIN = 'http://localhost:8080';
const ADMIN_USERNAME = 'profile-admin';
const ADMIN_PASSWORD = 'a strong test password';
const ADMIN_PASSWORD_HASH = await hashPassword(ADMIN_PASSWORD);

async function startApi(dbPath, options = {}) {
  const app = express();
  const router = createProfileRouter({
    dbPath,
    adminUsername: ADMIN_USERNAME,
    adminPasswordHash: ADMIN_PASSWORD_HASH,
    appOrigin: APP_ORIGIN,
    secureCookies: false,
    ...options,
  });
  app.use('/api/kimhyemi', router);
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();

  return {
    baseUrl: `http://127.0.0.1:${address.port}/api/kimhyemi`,
    async close() {
      await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
      router.close();
    },
  };
}

async function request(api, path, options = {}) {
  return fetch(`${api.baseUrl}${path}`, options);
}

async function login(api, overrides = {}) {
  const response = await request(api, '/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: APP_ORIGIN },
    body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD, ...overrides }),
  });
  const body = await response.json();
  const setCookie = response.headers.get('set-cookie');
  return {
    response,
    body,
    cookie: setCookie?.split(';', 1)[0],
    setCookie,
  };
}

function mutationHeaders(auth, additions = {}) {
  return {
    'content-type': 'application/json',
    origin: APP_ORIGIN,
    cookie: auth.cookie,
    'x-csrf-token': auth.body.csrfToken,
    ...additions,
  };
}

const newEntry = {
  category: 'partnership',
  year: '2026.09',
  titleKo: '비공개 테스트 활동',
  titleEn: 'Private test activity',
  descriptionKo: '관리 API 통합 테스트',
  descriptionEn: 'Admin API integration test',
  tags: ['Test', 'Admin'],
  sortOrder: -1,
  published: false,
};

test('public entries are seeded, ordered, no-store, and unknown API paths return JSON', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  const api = await startApi(join(directory, 'profile.sqlite'));
  t.after(() => api.close());
  t.after(() => rm(directory, { recursive: true, force: true }));

  const response = await request(api, '/entries');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('cache-control'), /no-store/);
  const entries = await response.json();
  assert.equal(entries.length, 21);
  assert.equal(entries[0].category, 'ai-education');
  assert.equal(entries[0].sortOrder, 0);
  assert.equal(entries[11].category, 'partnership');
  assert.equal(entries[16].category, 'it-project');

  const missing = await request(api, '/does-not-exist');
  assert.equal(missing.status, 404);
  assert.match(missing.headers.get('content-type'), /application\/json/);
});

test('login, CSRF protection, CRUD, and hidden filtering work over HTTP', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  const api = await startApi(join(directory, 'profile.sqlite'));
  t.after(() => api.close());
  t.after(() => rm(directory, { recursive: true, force: true }));

  const rejectedOrigin = await request(api, '/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD }),
  });
  assert.equal(rejectedOrigin.status, 403);

  const auth = await login(api);
  assert.equal(auth.response.status, 200);
  assert.equal(auth.body.username, ADMIN_USERNAME);
  assert.ok(auth.body.csrfToken);
  assert.match(auth.setCookie, /HttpOnly/i);
  assert.match(auth.setCookie, /SameSite=Strict/i);

  const sessionResponse = await request(api, '/admin/session', {
    headers: { cookie: auth.cookie },
  });
  assert.deepEqual(await sessionResponse.json(), auth.body);

  const noCsrf = await request(api, '/admin/entries', {
    method: 'POST',
    headers: mutationHeaders(auth, { 'x-csrf-token': '' }),
    body: JSON.stringify(newEntry),
  });
  assert.equal(noCsrf.status, 403);

  const createdResponse = await request(api, '/admin/entries', {
    method: 'POST',
    headers: mutationHeaders(auth),
    body: JSON.stringify(newEntry),
  });
  assert.equal(createdResponse.status, 201);
  const created = await createdResponse.json();
  assert.equal(created.published, false);

  let publicEntries = await (await request(api, '/entries')).json();
  assert.equal(publicEntries.some((entry) => entry.id === created.id), false);

  const adminEntries = await (await request(api, '/admin/entries', {
    headers: { cookie: auth.cookie },
  })).json();
  assert.equal(adminEntries.some((entry) => entry.id === created.id), true);

  const updateResponse = await request(api, `/admin/entries/${created.id}`, {
    method: 'PUT',
    headers: mutationHeaders(auth),
    body: JSON.stringify({ ...newEntry, published: true, titleKo: '공개 테스트 활동' }),
  });
  assert.equal(updateResponse.status, 200);
  assert.equal((await updateResponse.json()).titleKo, '공개 테스트 활동');
  publicEntries = await (await request(api, '/entries')).json();
  assert.equal(publicEntries.some((entry) => entry.id === created.id), true);

  const deleteResponse = await request(api, `/admin/entries/${created.id}`, {
    method: 'DELETE',
    headers: mutationHeaders(auth),
  });
  assert.equal(deleteResponse.status, 204);

  const logoutResponse = await request(api, '/admin/logout', {
    method: 'POST',
    headers: mutationHeaders(auth),
  });
  assert.equal(logoutResponse.status, 204);
  const expiredSession = await request(api, '/admin/session', {
    headers: { cookie: auth.cookie },
  });
  assert.equal(expiredSession.status, 401);
});

test('sessions persist across restarts and are invalidated by credential rotation', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  const dbPath = join(directory, 'profile.sqlite');
  let api = await startApi(dbPath);
  t.after(() => api.close());
  t.after(() => rm(directory, { recursive: true, force: true }));
  const auth = await login(api);
  assert.equal(auth.response.status, 200);
  await api.close();

  api = await startApi(dbPath);
  let session = await request(api, '/admin/session', { headers: { cookie: auth.cookie } });
  assert.equal(session.status, 200);
  await api.close();

  const rotatedHash = await hashPassword('a different password');
  api = await startApi(dbPath, { adminPasswordHash: rotatedHash });
  session = await request(api, '/admin/session', { headers: { cookie: auth.cookie } });
  assert.equal(session.status, 401);
});

test('seed marker prevents deleted entries from returning after restart', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const dbPath = join(directory, 'profile.sqlite');
  let store = createProfileStore({ dbPath });
  for (const entry of store.listEntries({ includeHidden: true })) store.deleteEntry(entry.id);
  store.close();

  store = createProfileStore({ dbPath });
  assert.equal(store.listEntries({ includeHidden: true }).length, 0);
  store.close();
});

test('login limiter bounds concurrent password checks by client IP', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  const api = await startApi(join(directory, 'profile.sqlite'));
  t.after(() => api.close());
  t.after(() => rm(directory, { recursive: true, force: true }));

  const responses = await Promise.all(Array.from({ length: 8 }, () => request(api, '/admin/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: APP_ORIGIN },
    body: JSON.stringify({ username: `attacker-${Math.random()}`, password: 'wrong' }),
  })));
  const statuses = responses.map((response) => response.status);
  assert.equal(statuses.filter((status) => status === 401).length, 5);
  assert.equal(statuses.filter((status) => status === 429).length, 3);
});

test('missing admin configuration disables login without affecting public reads', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'leanit-profile-'));
  const api = await startApi(join(directory, 'profile.sqlite'), {
    adminUsername: undefined,
    adminPasswordHash: undefined,
  });
  t.after(() => api.close());
  t.after(() => rm(directory, { recursive: true, force: true }));

  assert.equal((await request(api, '/entries')).status, 200);
  assert.equal((await login(api)).response.status, 401);
});
