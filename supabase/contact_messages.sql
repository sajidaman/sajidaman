-- Run in Supabase Dashboard → SQL Editor.
-- Public visitors can submit messages; the anon role cannot read, update, or delete them.

create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  subject text not null check (char_length(subject) between 3 and 160),
  message text not null check (char_length(message) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
revoke all on table public.contact_messages from anon, authenticated;
grant insert on table public.contact_messages to anon, authenticated;

drop policy if exists "Allow public contact submissions" on public.contact_messages;
create policy "Allow public contact submissions"
  on public.contact_messages for insert to anon, authenticated
  with check (
    char_length(trim(name)) between 2 and 100
    and char_length(trim(email)) between 3 and 254
    and char_length(trim(subject)) between 3 and 160
    and char_length(trim(message)) between 10 and 5000
  );

-- No public SELECT policy: read messages in the Supabase dashboard or trusted server only.
