-- Remove strict foreign key constraint to allow progress saves without pre-existing auth.users entry
-- RLS policies still enforce that auth.uid() = user_id, so security is maintained

alter table public.user_progress 
drop constraint if exists user_progress_user_id_fkey;
