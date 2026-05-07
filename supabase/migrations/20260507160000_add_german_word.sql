-- Add german_word column to questions table for bonus feature
alter table public.questions
  add column german_word text;

-- Add constraint to ensure german_word is not blank when present
alter table public.questions
  add constraint questions_german_word_not_blank check (german_word is null or btrim(german_word) <> '');
