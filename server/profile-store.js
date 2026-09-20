import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const CATEGORY_ORDER_SQL = `CASE category
  WHEN 'ai-education' THEN 0
  WHEN 'partnership' THEN 1
  WHEN 'it-project' THEN 2
  ELSE 3
END`;

const seedEntries = JSON.parse(
  readFileSync(new URL('./profile-seed.json', import.meta.url), 'utf8'),
);

function toEntry(row) {
  return {
    id: Number(row.id),
    category: row.category,
    year: row.year,
    titleKo: row.title_ko,
    titleEn: row.title_en,
    descriptionKo: row.description_ko,
    descriptionEn: row.description_en,
    tags: JSON.parse(row.tags_json),
    sortOrder: Number(row.sort_order),
    published: Boolean(row.published),
  };
}

function prepareDatabasePath(dbPath) {
  if (dbPath === ':memory:') return dbPath;

  const absolutePath = resolve(dbPath);
  mkdirSync(dirname(absolutePath), { recursive: true });
  return absolutePath;
}

export function createProfileStore({
  dbPath = process.env.DB_PATH || 'data/profile.sqlite',
  seed = seedEntries,
} = {}) {
  const database = new DatabaseSync(prepareDatabasePath(dbPath));
  database.exec('PRAGMA foreign_keys = ON');
  database.exec('PRAGMA busy_timeout = 5000');
  database.exec('PRAGMA journal_mode = WAL');

  database.exec(`
    CREATE TABLE IF NOT EXISTS profile_schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at INTEGER NOT NULL
    ) STRICT;

    CREATE TABLE IF NOT EXISTS profile_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL CHECK (category IN ('ai-education', 'partnership', 'it-project')),
      year TEXT NOT NULL,
      title_ko TEXT NOT NULL,
      title_en TEXT NOT NULL DEFAULT '',
      description_ko TEXT NOT NULL DEFAULT '',
      description_en TEXT NOT NULL DEFAULT '',
      tags_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(tags_json)),
      sort_order INTEGER NOT NULL DEFAULT 0,
      published INTEGER NOT NULL DEFAULT 1 CHECK (published IN (0, 1)),
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    ) STRICT;

    CREATE TABLE IF NOT EXISTS profile_sessions (
      token_hash TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      csrf_token TEXT NOT NULL,
      credential_fingerprint TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    ) STRICT;

    CREATE INDEX IF NOT EXISTS profile_sessions_expiry_idx
      ON profile_sessions(expires_at);

    CREATE TABLE IF NOT EXISTS profile_metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    ) STRICT;
  `);
  database.prepare(`
    INSERT OR IGNORE INTO profile_schema_migrations (version, applied_at)
    VALUES (1, ?)
  `).run(Date.now());

  const seedMarker = database
    .prepare("SELECT value FROM profile_metadata WHERE key = 'seed_version'")
    .get();

  if (!seedMarker) {
    database.exec('BEGIN IMMEDIATE');
    try {
      const rowCount = database
        .prepare('SELECT COUNT(*) AS count FROM profile_entries')
        .get();

      if (Number(rowCount.count) === 0) {
        const insertSeed = database.prepare(`
          INSERT INTO profile_entries (
            category, year, title_ko, title_en, description_ko, description_en,
            tags_json, sort_order, published, created_at, updated_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        const seededAt = Date.now();

        for (const entry of seed) {
          insertSeed.run(
            entry.category,
            entry.year,
            entry.titleKo,
            entry.titleEn,
            entry.descriptionKo,
            entry.descriptionEn,
            JSON.stringify(entry.tags),
            entry.sortOrder,
            entry.published ? 1 : 0,
            seededAt,
            seededAt,
          );
        }
      }

      database
        .prepare("INSERT INTO profile_metadata (key, value) VALUES ('seed_version', '1')")
        .run();
      database.exec('COMMIT');
    } catch (error) {
      database.exec('ROLLBACK');
      database.close();
      throw error;
    }
  }

  const selectEntries = database.prepare(`
    SELECT id, category, year, title_ko, title_en, description_ko,
           description_en, tags_json, sort_order, published
      FROM profile_entries
     WHERE (? = 1 OR published = 1)
     ORDER BY ${CATEGORY_ORDER_SQL}, sort_order, id
  `);
  const selectEntry = database.prepare(`
    SELECT id, category, year, title_ko, title_en, description_ko,
           description_en, tags_json, sort_order, published
      FROM profile_entries
     WHERE id = ?
  `);
  const insertEntry = database.prepare(`
    INSERT INTO profile_entries (
      category, year, title_ko, title_en, description_ko, description_en,
      tags_json, sort_order, published, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const updateEntry = database.prepare(`
    UPDATE profile_entries
       SET category = ?, year = ?, title_ko = ?, title_en = ?,
           description_ko = ?, description_en = ?, tags_json = ?,
           sort_order = ?, published = ?, updated_at = ?
     WHERE id = ?
  `);

  return {
    listEntries({ includeHidden = false } = {}) {
      return selectEntries.all(includeHidden ? 1 : 0).map(toEntry);
    },

    createEntry(entry, now = Date.now()) {
      const result = insertEntry.run(
        entry.category,
        entry.year,
        entry.titleKo,
        entry.titleEn,
        entry.descriptionKo,
        entry.descriptionEn,
        JSON.stringify(entry.tags),
        entry.sortOrder,
        entry.published ? 1 : 0,
        now,
        now,
      );
      return toEntry(selectEntry.get(Number(result.lastInsertRowid)));
    },

    updateEntry(id, entry, now = Date.now()) {
      const result = updateEntry.run(
        entry.category,
        entry.year,
        entry.titleKo,
        entry.titleEn,
        entry.descriptionKo,
        entry.descriptionEn,
        JSON.stringify(entry.tags),
        entry.sortOrder,
        entry.published ? 1 : 0,
        now,
        id,
      );
      if (Number(result.changes) === 0) return null;
      return toEntry(selectEntry.get(id));
    },

    deleteEntry(id) {
      return Number(
        database.prepare('DELETE FROM profile_entries WHERE id = ?').run(id).changes,
      ) > 0;
    },

    createSession({ tokenHash, username, csrfToken, credentialFingerprint, expiresAt, createdAt }) {
      database.prepare(`
        INSERT INTO profile_sessions (
          token_hash, username, csrf_token, credential_fingerprint, expires_at, created_at
        ) VALUES (?, ?, ?, ?, ?, ?)
      `).run(tokenHash, username, csrfToken, credentialFingerprint, expiresAt, createdAt);
    },

    findSession(tokenHash, now = Date.now()) {
      const row = database.prepare(`
        SELECT username, csrf_token, credential_fingerprint, expires_at
          FROM profile_sessions
         WHERE token_hash = ? AND expires_at > ?
      `).get(tokenHash, now);
      return row
        ? {
            username: row.username,
            csrfToken: row.csrf_token,
            credentialFingerprint: row.credential_fingerprint,
            expiresAt: row.expires_at,
          }
        : null;
    },

    deleteSession(tokenHash) {
      database.prepare('DELETE FROM profile_sessions WHERE token_hash = ?').run(tokenHash);
    },

    pruneSessions(now = Date.now(), maxSessions = 100) {
      database.prepare('DELETE FROM profile_sessions WHERE expires_at <= ?').run(now);
      database.prepare(`
        DELETE FROM profile_sessions
         WHERE token_hash IN (
           SELECT token_hash FROM profile_sessions
            ORDER BY created_at DESC
            LIMIT -1 OFFSET ?
         )
      `).run(maxSessions);
    },

    close() {
      database.close();
    },
  };
}

export { seedEntries };
