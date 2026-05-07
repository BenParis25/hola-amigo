-- Create table to store per-round results for leaderboard
create table if not exists public.user_rounds (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  played_level text not null,
  current_level text not null,
  correct integer not null,
  total integer not null,
  created_at timestamptz not null default now()
);

create index if not exists user_rounds_created_at_idx on public.user_rounds (created_at desc);

alter table public.user_rounds enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_rounds'
      and policyname = 'authenticated can insert their rounds'
  ) then
    create policy "authenticated can insert their rounds"
    on public.user_rounds
    for insert
    to authenticated
    with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_rounds'
      and policyname = 'authenticated can select rounds'
  ) then
    create policy "authenticated can select rounds"
    on public.user_rounds
    for select
    to authenticated
    using (true);
  end if;
end
$$;

grant select, insert on public.user_rounds to authenticated;

-- Create a view that aggregates per-user leaderboard stats (includes user email)
create or replace view public.leaderboard as
select
  ur.user_id,
  au.email as user_email,
  round(avg((ur.correct::float / nullif(ur.total,0)) * 100))::int as pct_correct,
  (array_agg(ur.current_level order by ur.created_at desc))[1] as current_level,
  count(*) as rounds_played,
  max(ur.created_at) as last_played
from public.user_rounds ur
join auth.users au on au.id = ur.user_id
group by ur.user_id, au.email
order by pct_correct desc;

grant select on public.leaderboard to authenticated;
