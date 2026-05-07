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

const rows = [
['A1.1', 'Hola', 'Hello'],
['A1.1', 'Adiós', 'Goodbye'],
['A1.1', 'Gracias', 'Thank you'],
['A1.1', 'Sí', 'Yes'],
['A1.1', 'No', 'No'],
['A1.1', 'Por favor', 'Please'],
['A1.1', 'Buenos días', 'Good morning'],
['A1.1', 'Agua', 'Water'],
['A1.1', 'Uno', 'One'],
['A1.1', 'Amigo', 'Friend (male)'],
['A1.1', 'Gato', 'Cat'],
['A1.1', 'Perro', 'Dog'],
].map(([level, spanish, english]) => ({
  difficulty_level: level,
  spanish_word: spanish,
  english_word: english
}));

console.log(`Inserting ${rows.length} rows...`);

const { error } = await supabase
  .from('questions')
  .insert(rows);

if (error) {
  console.log('❌ Insert error:', error.message, error.code);
  process.exit(1);
}

const { count } = await supabase
  .from('questions')
  .select('*', { count: 'exact', head: true });

console.log(`✅ Successfully populated questions table with ${count} rows`);
