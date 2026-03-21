# Deployment Guide

## Target

Deploy KRATOS Terminal to Vercel with Supabase-backed persistence.

## Pre-deploy

1. Install dependencies:

```bash
npm install
```

2. Validate the codebase:

```bash
npm run ci
```

3. Check required environment variables locally:

```bash
npm run check:env
```

## Supabase setup

1. Create a Supabase project.
2. Apply the schema in `supabase/schema.sql`.
3. Copy the project URL and anon key.

## Required Vercel environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DATABASE_URL=
```

## Optional but recommended environment variables

```bash
REDIS_URL=
KALSHI_API_KEY=
KALSHI_API_SECRET=
NEWS_API_KEY=
POLYMARKET_API_KEY=
```

## Deploy

1. Import the GitHub repo into Vercel.
2. Add the environment variables from `.env.production.example`.
3. Trigger a preview deployment.
4. Verify the `/deploy` page and `/api/deploy/readiness`.
5. Promote to production after preview checks pass.

## Post-deploy smoke test

Run the smoke test against the deployed URL:

```bash
npm run smoke:test -- https://your-deployment-url.vercel.app
```

Or:

```bash
KRATOS_BASE_URL=https://your-deployment-url.vercel.app npm run smoke:test
```

## Production verification checklist

1. Open `/deploy` and confirm readiness output.
2. Check `/api/health` and `/api/health/deep`.
3. Sign in through the trading page auth panel.
4. Save a watchlist item.
5. Save a PBQL query.
6. Record a simulated position.
7. Confirm portfolio metrics update from persisted positions.

