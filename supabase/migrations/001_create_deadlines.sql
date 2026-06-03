-- Create the deadlines table
create table if not exists public.deadlines (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  course_title text not null,
  due_date    text not null,          -- human-readable string e.g. "Tomorrow", "In 3 days"
  xp_reward   integer not null default 100,
  status      text not null default 'normal'
                check (status in ('urgent', 'normal', 'completed')),
  created_at  timestamptz not null default now()
);

-- Seed with sample rows so the tile is populated immediately
insert into public.deadlines (title, course_title, due_date, xp_reward, status) values
  ('Next.js Advanced Dynamic Routing Practice', 'Next.js Core Architecture',         'Tomorrow',   200, 'urgent'),
  ('Write Spring Micro-Interactions Showcase',  'Framer Motion Masterclass',          'In 3 days',  350, 'normal'),
  ('TypeScript Deep Copy Utility Quiz',         'TypeScript Design Patterns',         'In 5 days',  150, 'normal'),
  ('Responsive Bento Layout Design Review',     'Tailwind Premium Layout Strategies', 'Completed',  100, 'completed');

-- Enable Row Level Security (allow public reads for the anon key)
alter table public.deadlines enable row level security;

create policy "Allow anon reads on deadlines"
  on public.deadlines
  for select
  using (true);
