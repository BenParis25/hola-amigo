import 'dotenv/config';
import { createClient as createNodeClient } from '@supabase/supabase-js';

async function run() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  const email = process.env.TEST_EMAIL;
  const password = process.env.TEST_PASSWORD;

  if (!url || !key) {
    console.error('Missing Supabase URL or anon key in env (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY).');
    process.exit(2);
  }

  if (!email || !password) {
    console.error('Missing TEST_EMAIL or TEST_PASSWORD in env. Set credentials for an existing test user.');
    process.exit(2);
  }

  // Create a Node-friendly Supabase client using env vars
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or anon key in env (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY).');
    process.exit(2);
  }

  const supabase = createNodeClient({
    supabaseUrl,
    supabaseKey,
  });

  console.log('Signing in test user:', email);
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
  if (signInError) {
    console.error('Sign-in failed:', signInError.message || signInError);
    process.exit(3);
  }

  console.log('Signed in — fetching sample questions and user_progress');

  const { data: questions, error: qErr } = await supabase.from('questions').select('id, spanish_word, english_word, category').limit(5);
  if (qErr) console.error('Questions query error:', qErr.message || qErr);
  else console.log('Sample questions returned:', questions?.length ?? 0);

  const { data: progress, error: pErr } = await supabase.from('user_progress').select('*').limit(5);
  if (pErr) console.error('user_progress query error:', pErr.message || pErr);
  else console.log('Sample user_progress rows returned:', progress?.length ?? 0);

  console.log('Done. Sign out.');
  await supabase.auth.signOut();
}

run().catch((err) => { console.error('Unexpected error:', err); process.exit(1); });
