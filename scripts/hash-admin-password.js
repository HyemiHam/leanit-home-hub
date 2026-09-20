import { hashPassword } from '../server/profile-router.js';

async function readPassword() {
  if (!process.stdin.isTTY) {
    let value = '';
    process.stdin.setEncoding('utf8');
    for await (const chunk of process.stdin) {
      value += chunk;
      if (value.length > 258) throw new Error('Password is too long.');
    }
    return value.replace(/\r?\n$/, '');
  }

  process.stderr.write('Admin password: ');
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  return new Promise((resolve, reject) => {
    let value = '';
    const finish = (error) => {
      process.stdin.setRawMode(false);
      process.stdin.pause();
      process.stderr.write('\n');
      if (error) reject(error);
      else resolve(value);
    };

    process.stdin.on('data', (key) => {
      if (key === '\u0003') return finish(new Error('Cancelled.'));
      if (key === '\r' || key === '\n') return finish();
      if (key === '\u007f' || key === '\b') {
        value = value.slice(0, -1);
        return;
      }
      value += key;
      if (value.length > 256) finish(new Error('Password is too long.'));
    });
  });
}

if (process.argv.length > 2) {
  console.error('Do not pass the password as a command-line argument; provide it on stdin.');
  process.exitCode = 1;
} else {
  try {
    const password = await readPassword();
    if (!password) throw new Error('Password cannot be empty.');
    process.stdout.write(`${await hashPassword(password)}\n`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
