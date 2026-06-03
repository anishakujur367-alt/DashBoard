-- Create the users table
create table if not exists public.users (
  id                  uuid primary key default gen_random_uuid(),
  name                text not null,
  avatar              text,
  level               integer not null default 1,
  current_xp          integer not null default 0,
  next_level_xp       integer not null default 100,
  streak_days         integer not null default 0,
  streak_active       boolean not null default false,
  total_study_hours   numeric not null default 0,
  completed_courses   integer not null default 0,
  created_at          timestamptz not null default now()
);

-- Seed with a sample user corresponding to mockUser
insert into public.users (name, avatar, level, current_xp, next_level_xp, streak_days, streak_active, total_study_hours, completed_courses) values
  ('Sarah Jenkins', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 5, 3120, 4500, 24, true, 84.5, 3);

-- Enable Row Level Security (allow public reads for the anon key)
alter table public.users enable row level security;

create policy "Allow anon reads on users"
  on public.users
  for select
  using (true);
