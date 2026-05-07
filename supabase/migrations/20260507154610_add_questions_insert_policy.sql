-- Add insert policy for questions table to allow authenticated users to insert
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'questions'
      and policyname = 'authenticated users can insert questions'
  ) then
    create policy "authenticated users can insert questions"
    on public.questions
    for insert
    to authenticated
    with check (true);
  end if;
end
$$;
