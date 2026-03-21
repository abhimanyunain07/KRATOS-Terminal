create table if not exists public.watchlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  market_id text not null,
  title text not null,
  platform text not null,
  category text not null,
  probability double precision not null default 0,
  volume double precision not null default 0,
  region text not null,
  created_at timestamptz not null default now(),
  unique (user_id, market_id)
);

alter table public.watchlist_items enable row level security;

create policy "watchlist_select_own"
on public.watchlist_items
for select
to authenticated
using (auth.uid() = user_id);

create policy "watchlist_insert_own"
on public.watchlist_items
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "watchlist_delete_own"
on public.watchlist_items
for delete
to authenticated
using (auth.uid() = user_id);

