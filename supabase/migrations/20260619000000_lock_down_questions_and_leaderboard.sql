-- Lock down public.questions: the app never reads or writes this table as anon,
-- and never inserts into it as authenticated. Anyone holding the public anon key
-- (always extractable from the client bundle) could otherwise read or vandalize
-- the vocabulary bank without logging in.
drop policy if exists "anon users can read questions" on public.questions;
drop policy if exists "anon users can insert questions" on public.questions;
drop policy if exists "authenticated users can insert questions" on public.questions;

-- Rebuild the leaderboard view without exposing auth.users.email. Signup is open,
-- so any visitor could previously create an account and read every other user's
-- email address through this view. Replace the email with a non-PII label derived
-- from the user_id instead.
drop view if exists public.leaderboard;

create view public.leaderboard as
select
  ur.user_id,
  'Player ' || substr(ur.user_id::text, 1, 6) as player_label,
  round(avg((ur.correct::float / nullif(ur.total,0)) * 100))::int as pct_correct,
  (array_agg(ur.current_level order by ur.created_at desc))[1] as current_level,
  count(*) as rounds_played,
  max(ur.created_at) as last_played
from public.user_rounds ur
group by ur.user_id
order by pct_correct desc;

grant select on public.leaderboard to authenticated;
