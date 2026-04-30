create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  character_id text not null,
  age_group text,
  unlocked text not null default 'A1',
  current text not null default 'A1',
  completed text[] not null default '{}',
  streak integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint user_progress_character_id_not_blank check (btrim(character_id) <> ''),
  constraint user_progress_unlocked_not_blank check (btrim(unlocked) <> ''),
  constraint user_progress_current_not_blank check (btrim(current) <> ''),
  constraint user_progress_age_group_not_blank check (age_group is null or btrim(age_group) <> '')
);

create index if not exists user_progress_updated_at_idx on public.user_progress (updated_at desc);

alter table public.user_progress enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_progress'
      and policyname = 'users can read their own progress'
  ) then
    create policy "users can read their own progress"
    on public.user_progress
    for select
    to authenticated
    using (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_progress'
      and policyname = 'users can insert their own progress'
  ) then
    create policy "users can insert their own progress"
    on public.user_progress
    for insert
    to authenticated
    with check (auth.uid() = user_id);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'user_progress'
      and policyname = 'users can update their own progress'
  ) then
    create policy "users can update their own progress"
    on public.user_progress
    for update
    to authenticated
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
  end if;
end
$$;

grant select, insert, update on public.user_progress to authenticated;

create or replace function public.set_user_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_progress_updated_at on public.user_progress;
create trigger set_user_progress_updated_at
before update on public.user_progress
for each row
execute function public.set_user_progress_updated_at();