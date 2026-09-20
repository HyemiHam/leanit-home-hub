import 'dotenv/config';
import { existsSync, mkdirSync } from 'node:fs';
import { basename, dirname, extname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const sourcePath = resolve(process.env.DB_PATH || 'data/profile.sqlite');
const requestedDestination = process.argv[2] || process.env.BACKUP_PATH;
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const destinationPath = resolve(
  requestedDestination || `backups/profile-${timestamp}.sqlite`,
);

if (process.argv.length > 3) {
  console.error('Usage: node scripts/backup-profile.js [destination.sqlite]');
  process.exitCode = 1;
} else if (!existsSync(sourcePath)) {
  console.error(`Profile database does not exist: ${sourcePath}`);
  process.exitCode = 1;
} else if (sourcePath === destinationPath) {
  console.error('Backup destination must differ from the source database.');
  process.exitCode = 1;
} else if (existsSync(destinationPath)) {
  console.error(`Backup destination already exists: ${destinationPath}`);
  process.exitCode = 1;
} else if (extname(destinationPath) !== '.sqlite') {
  console.error(`Backup filename must end in .sqlite: ${basename(destinationPath)}`);
  process.exitCode = 1;
} else {
  mkdirSync(dirname(destinationPath), { recursive: true });
  const database = new DatabaseSync(sourcePath);
  try {
    database.exec('PRAGMA wal_checkpoint(PASSIVE)');
    database.prepare('VACUUM INTO ?').run(destinationPath);
    console.log(destinationPath);
  } finally {
    database.close();
  }
}
