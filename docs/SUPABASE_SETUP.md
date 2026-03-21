# Supabase Setup

## Goal

Provision the KRATOS persistence layer for:

- watchlists
- saved PBQL queries
- simulated positions
- terminal command history

## Steps

1. Create a Supabase project.
2. Open the SQL editor.
3. Run the SQL in `supabase/schema.sql`.
4. Copy:
   - project URL
   - anon public key
   - database URL
5. Add them to local `.env.local` and Vercel project env vars.

## Required environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

## Verification

1. Open `/deploy`.
2. Confirm `/api/deploy/readiness` shows the Supabase public env and database URL as ready.
3. Sign in on `/trading`.
4. Save a watchlist item from `/markets`.
5. Save a PBQL query from `/pbql`.
6. Record a simulated position from `/trading`.
7. Confirm `/portfolio` shows persisted state.

