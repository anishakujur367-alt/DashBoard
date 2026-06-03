-- Create the students table
create table if not exists public.students (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  course      text not null,
  progress    integer not null check (progress >= 0 and progress <= 100),
  created_at  timestamptz not null default now()
);

-- Seed with sample students
insert into public.students (name, course, progress, created_at) values
  ('Alice Johnson',  'Next.js Core Architecture',             95, now() - interval '2 days'),
  ('Bob Smith',      'TypeScript Design Patterns',            75, now() - interval '5 days'),
  ('Charlie Brown',  'Framer Motion Interactive Masterclass', 42, now() - interval '10 days'),
  ('Diana Prince',    'Tailwind Premium Layout Strategies',    88, now() - interval '12 days');

-- Enable Row Level Security (allow public reads for the anon key)
alter table public.students enable row level security;

create policy "Allow anon reads on students"
  on public.students
  for select
  using (true);
