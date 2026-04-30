-- Add category column to questions table
alter table public.questions
  add column if not exists category text not null default 'general';

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'questions_category_not_blank'
      and conrelid = 'public.questions'::regclass
  ) then
    alter table public.questions
      add constraint questions_category_not_blank check (btrim(category) <> '');
  end if;
end$$;

create index if not exists questions_category_idx on public.questions (difficulty_level, category);
