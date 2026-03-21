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

create table if not exists public.saved_pbql_queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  query text not null,
  created_at timestamptz not null default now()
);

alter table public.saved_pbql_queries enable row level security;

create policy "saved_pbql_select_own"
on public.saved_pbql_queries
for select
to authenticated
using (auth.uid() = user_id);

create policy "saved_pbql_insert_own"
on public.saved_pbql_queries
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "saved_pbql_delete_own"
on public.saved_pbql_queries
for delete
to authenticated
using (auth.uid() = user_id);

create table if not exists public.simulated_positions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  venue text not null,
  ticker text not null,
  title text not null,
  side text not null,
  contracts double precision not null default 0,
  average_price double precision not null default 0,
  mark_probability double precision not null default 0,
  unrealized_pnl_usd double precision not null default 0,
  created_at timestamptz not null default now()
);

alter table public.simulated_positions enable row level security;

create policy "sim_positions_select_own"
on public.simulated_positions
for select
to authenticated
using (auth.uid() = user_id);

create policy "sim_positions_insert_own"
on public.simulated_positions
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "sim_positions_delete_own"
on public.simulated_positions
for delete
to authenticated
using (auth.uid() = user_id);
