Helper scripts

- `verify-auth-db.js` — run an authenticated smoke test against your Supabase project. Requires env vars:
  - `VITE_SUPABASE_URL` or `SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY` or `SUPABASE_ANON_KEY`
  - `TEST_EMAIL` and `TEST_PASSWORD` for a test user

  Example:

  ```bash
  TEST_EMAIL=test@example.com TEST_PASSWORD=secret VITE_SUPABASE_URL=https://xyz.supabase.co VITE_SUPABASE_PUBLISHABLE_KEY=anonkey npm run verify-db-auth
  ```

- `generate-sql-bundle.js` — concatenates `supabase/migrations/*.sql` into `supabase/combined_migrations.sql` for easy paste into Supabase SQL editor.

  ```bash
  npm run bundle-migrations
  ```
