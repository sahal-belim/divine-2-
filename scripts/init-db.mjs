import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

console.log('Initializing database...');

try {
  // Generate Prisma client
  console.log('Step 1: Generating Prisma client...');
  execSync('npx prisma generate', {
    cwd: projectRoot,
    stdio: 'inherit',
  });

  // Push schema to database
  console.log('Step 2: Creating database and tables...');
  execSync('npx prisma db push --skip-generate', {
    cwd: projectRoot,
    stdio: 'inherit',
    env: { ...process.env },
  });

  console.log('Database initialization complete!');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
