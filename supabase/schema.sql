-- AuraFit Database Schema
-- Run this in your Supabase SQL editor

-- profiles
create table profiles (
  id uuid primary key references auth.users(id),
  display_name text,
  streak int default 0,
  longest_streak int default 0,
  created_at timestamptz default now()
);

-- workouts
create table workouts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  date date default current_date,
  exercises jsonb not null,      -- [{name, sets, reps, weight, completed}]
  is_mvd boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- readiness_logs
create table readiness_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  date date default current_date,
  sleep_hours numeric,
  hrv numeric,
  resting_hr numeric,
  soreness int check (soreness between 1 and 5),
  score int generated always as (
    least(100, greatest(0,
      (sleep_hours / 9.0 * 30)::int +
      (least(hrv, 100) / 100.0 * 40)::int +
      ((100 - least(resting_hr, 100)) / 100.0 * 15)::int +
      ((5 - soreness) / 4.0 * 15)::int
    ))
  ) stored,
  created_at timestamptz default now()
);

-- Enable RLS
alter table profiles enable row level security;
alter table workouts enable row level security;
alter table readiness_logs enable row level security;

-- RLS policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can view own workouts"
  on workouts for select using (auth.uid() = user_id);
create policy "Users can insert own workouts"
  on workouts for insert with check (auth.uid() = user_id);
create policy "Users can update own workouts"
  on workouts for update using (auth.uid() = user_id);

create policy "Users can view own readiness logs"
  on readiness_logs for select using (auth.uid() = user_id);
create policy "Users can insert own readiness logs"
  on readiness_logs for insert with check (auth.uid() = user_id);
