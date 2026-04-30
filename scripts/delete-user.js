import fs from 'fs';

// Load .env.local if present
function loadDotEnvLocal() {
  const p = './.env.local';
  if (!fs.existsSync(p)) return;
  const content = fs.readFileSync(p, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadDotEnvLocal();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE;
const email = process.env.DELETE_EMAIL || process.argv[2];

if (!supabaseUrl || !serviceRole) {
  console.error('Missing Supabase URL or service role key. Provide VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY as env vars.');
  process.exit(2);
}

if (!email) {
  console.error('Missing DELETE_EMAIL (env) or email argument. Usage: DELETE_EMAIL=foo@example.com SUPABASE_SERVICE_ROLE_KEY=... node scripts/delete-user.js');
  process.exit(3);
}

async function findUserByEmail(email) {
  const url = `${supabaseUrl.replace(/\/$/, '')}/auth/v1/admin/users?email=${encodeURIComponent(email)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${serviceRole}` } });
  if (!res.ok) throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
  const data = await res.json();
  // Supabase may return an array or object; normalize
  if (Array.isArray(data)) return data[0] ?? null;
  if (data && data.id) return data;
  return null;
}

async function deleteUserById(id) {
  const url = `${supabaseUrl.replace(/\/$/, '')}/auth/v1/admin/users/${id}`;
  const res = await fetch(url, { method: 'DELETE', headers: { Authorization: `Bearer ${serviceRole}` } });
  if (!res.ok) throw new Error(`Failed to delete user: ${res.status} ${res.statusText}`);
  return true;
}

(async () => {
  try {
    console.log('Looking up user by email:', email);
    const user = await findUserByEmail(email);
    if (!user) {
      console.error('User not found for email:', email);
      process.exit(4);
    }
    console.log('Found user id:', user.id, 'email:', user.email);
    console.log('Deleting user...');
    await deleteUserById(user.id);
    console.log('User deleted. Any `user_progress` rows referencing this user will be cascade-deleted (if migration with ON DELETE CASCADE is applied).');
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
