-- Add policy to allow anon users to read questions
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'questions'
      and policyname = 'anon users can read questions'
  ) then
    create policy "anon users can read questions"
    on public.questions
    for select
    to anon
    using (true);
  end if;
end
$$;

-- Add policy to allow anon users to insert questions (for seeding)
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'questions'
      and policyname = 'anon users can insert questions'
  ) then
    create policy "anon users can insert questions"
    on public.questions
    for insert
    to anon
    with check (true);
  end if;
end
$$;
