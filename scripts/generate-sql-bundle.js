import fs from 'fs';
import path from 'path';

const migrationsDir = path.resolve(process.cwd(), 'supabase', 'migrations');
const outFile = path.resolve(process.cwd(), 'supabase', 'combined_migrations.sql');

function listSqlFiles(dir) {
  return fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
}

function buildBundle() {
  if (!fs.existsSync(migrationsDir)) {
    console.error('Migrations directory not found:', migrationsDir);
    process.exit(2);
  }

  const files = listSqlFiles(migrationsDir);
  if (files.length === 0) {
    console.error('No .sql files found in', migrationsDir);
    process.exit(3);
  }

  const parts = files.map((f) => {
    const p = path.join(migrationsDir, f);
    const content = fs.readFileSync(p, 'utf8');
    return `-- BEGIN ${f}\n${content}\n-- END ${f}\n\n`;
  });

  fs.writeFileSync(outFile, parts.join('\n'), 'utf8');
  console.log('Wrote combined migrations to', outFile);
}

buildBundle();
