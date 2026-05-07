import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const envPath = path.resolve('.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && !key.startsWith('#')) {
    envVars[key.trim()] = rest.join('=').trim();
  }
});

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_PUBLISHABLE_KEY);

// Read and parse seed data
const seedPath = path.resolve('supabase/migrations/20260423130100_seed_questions.sql');
const seedContent = fs.readFileSync(seedPath, 'utf-8');

// Extract values from insert statement
const valuesMatch = seedContent.match(/values\s*([\s\S]+?)on conflict/i);
if (!valuesMatch) {
  console.log('❌ Could not parse seed file');
  process.exit(1);
}

const rows = [];
const valueLines = valuesMatch[1].trim().split('),(');
valueLines.forEach((line, idx) => {
  let cleanLine = line.replace(/^\(/, '').replace(/\)$/, '').trim();
  const parts = cleanLine.split(',').map(p => {
    p = p.trim();
    if (p.startsWith("'") && p.endsWith("'")) return p.slice(1, -1).replace(/''/g, "'");
    return p;
  });
  if (parts.length === 3) {
    rows.push({ difficulty_level: parts[0], spanish_word: parts[1], english_word: parts[2] });
  }
});

if (rows.length === 0) {
  console.log('❌ No rows parsed from seed file');
  process.exit(1);
}

console.log(`Inserting ${rows.length} rows...`);

const { error } = await supabase
  .from('questions')
  .insert(rows)
  .select();

if (error) {
  console.log('❌ Insert error:', error.message);
  process.exit(1);
}

console.log('✅ Seed data inserted successfully');

// Verify
const { count } = await supabase
  .from('questions')
  .select('*', { count: 'exact', head: true });

console.log(`✅ questions table now has ${count} rows`);
