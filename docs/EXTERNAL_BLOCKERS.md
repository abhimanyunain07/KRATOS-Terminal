# External Integrations

The required deployment blockers have been cleared.

Current live deployment:

- [kratos-terminal.vercel.app](https://kratos-terminal.vercel.app)

Current configured production env:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`

## Remaining optional integrations

These are still unset, but the app is live without them:

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
- `npm run smoke:test -- https://kratos-terminal.vercel.app`
- local screenshots in `artifacts/screenshots`

## Remaining caveats

- Redis-backed realtime fanout is still optional until `REDIS_URL` is added.
- Kalshi trading remains simulation-only until venue credentials are supplied.
- External news enrichment remains on fallback cards until `NEWS_API_KEY` is supplied.
- Git-triggered Vercel auto-deploy is not connected because the Vercel account still needs a GitHub Login Connection.
