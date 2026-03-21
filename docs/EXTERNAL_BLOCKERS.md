# External Blockers

These are the remaining non-code blockers for completing live deployment and production verification.

## Vercel

- Vercel CLI is installed locally.
- Deployment cannot proceed until a Vercel account login or token is provided.
- You can complete this by either:
  - running `./node_modules/.bin/vercel login`
  - setting a `VERCEL_TOKEN`

## Supabase

- Supabase CLI is installed locally.
- Backend provisioning cannot proceed until a Supabase access token is provided.
- You can complete this by either:
  - running `./node_modules/.bin/supabase login`
  - setting `SUPABASE_ACCESS_TOKEN`

## Required production environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

## Optional but recommended production environment variables

```bash
REDIS_URL=
KALSHI_API_KEY=
KALSHI_API_SECRET=
NEWS_API_KEY=
POLYMARKET_API_KEY=
```

## Already completed locally

- `npm run typecheck`
- `npm run build`
- `npm run smoke:test:local`
- local screenshots in `artifacts/screenshots`

