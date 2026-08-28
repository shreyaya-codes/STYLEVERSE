create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade default auth.uid(),
  name text not null default 'Avery',
  level integer not null default 1 check (level >= 1),
  title text not null default 'Style Rookie',
  sp integer not null default 0 check (sp >= 0),
  streak_days integer not null default 0 check (streak_days >= 0),
  bestie_level integer not null default 1 check (bestie_level >= 1),
  bestie_xp integer not null default 0 check (bestie_xp >= 0),
  bestie_max_xp integer not null default 100 check (bestie_max_xp > 0),
  avatar_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clothing_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  category text not null,
  rarity text not null,
  vibe text not null,
  wear_count integer not null default 0 check (wear_count >= 0),
  condition integer not null default 100 check (condition >= 0 and condition <= 100),
  image_type text not null default 'oversized_tee',
  image_url text,
  color text not null default '#d3bcfc',
  tags jsonb not null default '[]'::jsonb,
  days_since_last_worn integer not null default 0 check (days_since_last_worn >= 0),
  is_favorite boolean not null default false,
  acquired_date date not null default current_date,
  resale_value numeric check (resale_value is null or resale_value >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.saved_outfits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  name text not null,
  occasion text not null,
  item_ids jsonb not null default '[]'::jsonb,
  score numeric not null default 0 check (score >= 0 and score <= 100),
  vibe text not null default 'Pastel Streetwear',
  created_at timestamptz not null default now(),
  worn_count integer not null default 0 check (worn_count >= 0)
);

create table if not exists public.ootd_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  outfit_id uuid references public.saved_outfits(id) on delete set null,
  date date not null default current_date,
  location text,
  occasion text,
  weather jsonb,
  rating numeric check (rating is null or (rating >= 0 and rating <= 100)),
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.quests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  quest_template_id text not null,
  title text not null,
  description text not null,
  reward_sp integer not null default 0 check (reward_sp >= 0),
  reward_bestie_xp integer not null default 0 check (reward_bestie_xp >= 0),
  progress integer not null default 0 check (progress >= 0),
  target integer not null default 1 check (target > 0),
  completed boolean not null default false,
  claimed boolean not null default false,
  type text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, quest_template_id)
);

create table if not exists public.purchase_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  item_name text not null,
  image_url text,
  compatibility_score numeric check (compatibility_score is null or (compatibility_score >= 0 and compatibility_score <= 100)),
  similar_items jsonb not null default '[]'::jsonb,
  new_outfit_count integer not null default 0 check (new_outfit_count >= 0),
  wardrobe_gap boolean not null default false,
  predicted_cost_per_wear numeric check (predicted_cost_per_wear is null or predicted_cost_per_wear >= 0),
  decision text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists clothing_items_set_updated_at on public.clothing_items;
create trigger clothing_items_set_updated_at
before update on public.clothing_items
for each row execute function public.set_updated_at();

drop trigger if exists quests_set_updated_at on public.quests;
create trigger quests_set_updated_at
before update on public.quests
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.clothing_items enable row level security;
alter table public.saved_outfits enable row level security;
alter table public.ootd_entries enable row level security;
alter table public.quests enable row level security;
alter table public.purchase_analyses enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = user_id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = user_id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "profiles_delete_own" on public.profiles for delete using (auth.uid() = user_id);

create policy "clothing_items_select_own" on public.clothing_items for select using (auth.uid() = user_id);
create policy "clothing_items_insert_own" on public.clothing_items for insert with check (auth.uid() = user_id);
create policy "clothing_items_update_own" on public.clothing_items for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "clothing_items_delete_own" on public.clothing_items for delete using (auth.uid() = user_id);

create policy "saved_outfits_select_own" on public.saved_outfits for select using (auth.uid() = user_id);
create policy "saved_outfits_insert_own" on public.saved_outfits for insert with check (auth.uid() = user_id);
create policy "saved_outfits_update_own" on public.saved_outfits for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "saved_outfits_delete_own" on public.saved_outfits for delete using (auth.uid() = user_id);

create policy "ootd_entries_select_own" on public.ootd_entries for select using (auth.uid() = user_id);
create policy "ootd_entries_insert_own" on public.ootd_entries for insert with check (auth.uid() = user_id);
create policy "ootd_entries_update_own" on public.ootd_entries for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "ootd_entries_delete_own" on public.ootd_entries for delete using (auth.uid() = user_id);

create policy "quests_select_own" on public.quests for select using (auth.uid() = user_id);
create policy "quests_insert_own" on public.quests for insert with check (auth.uid() = user_id);
create policy "quests_update_own" on public.quests for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "quests_delete_own" on public.quests for delete using (auth.uid() = user_id);

create policy "purchase_analyses_select_own" on public.purchase_analyses for select using (auth.uid() = user_id);
create policy "purchase_analyses_insert_own" on public.purchase_analyses for insert with check (auth.uid() = user_id);
create policy "purchase_analyses_update_own" on public.purchase_analyses for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "purchase_analyses_delete_own" on public.purchase_analyses for delete using (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('clothing-images', 'clothing-images', false, 10485760, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

create policy "clothing_images_select_own" on storage.objects
for select using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = 'clothing'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "clothing_images_insert_own" on storage.objects
for insert with check (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = 'clothing'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "clothing_images_update_own" on storage.objects
for update using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = 'clothing'
  and (storage.foldername(name))[2] = auth.uid()::text
) with check (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = 'clothing'
  and (storage.foldername(name))[2] = auth.uid()::text
);

create policy "clothing_images_delete_own" on storage.objects
for delete using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = 'clothing'
  and (storage.foldername(name))[2] = auth.uid()::text
);
