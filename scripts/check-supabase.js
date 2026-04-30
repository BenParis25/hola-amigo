import fs from 'fs';

function loadEnv(file) {
  try {
    const txt = fs.readFileSync(file, 'utf8');
    txt.split(/\r?\n/).forEach((line) => {
      const m = line.match(/^([^#=\s]+)=(.*)$/);
      if (!m) return;
      const k = m[1];
      let v = m[2];
      if (v.startsWith('"') && v.endsWith('"')) v = v.slice(1, -1);
      process.env[k] = v;
    });
  } catch (e) {
    // ignore
  }
}

loadEnv('.env.local');

(async () => {
  try {
    const mod = await import('@supabase/supabase-js');
    const createClient = mod.createClient;
    const url = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!url || !key) {
      console.error('Missing Supabase env vars.');
      process.exit(2);
    }

    const supabase = createClient(url, key);

    const { data, error } = await supabase.from('questions').select('id').limit(1);
    if (error) {
      console.error('Query error (id):', error.message || error);
      process.exit(3);
    }
    console.log('Connected — sample rows returned:', Array.isArray(data) ? data.length : 0);

    const res2 = await supabase.from('questions').select('spanish_word, english_word, category').limit(1);
    if (res2.error) {
      console.error('Query error (category):', res2.error.message || res2.error);
    } else {
      console.log('Category select OK — row present:', Array.isArray(res2.data) ? res2.data.length : 0);
    }
    process.exit(0);
  } catch (err) {
    console.error('Runtime error:', err && err.message ? err.message : err);
    process.exit(4);
  }
})();
