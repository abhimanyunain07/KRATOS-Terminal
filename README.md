# KRATOS Terminal

KRATOS Terminal is a Bloomberg-inspired PMAP stack for prediction markets, rebuilt as a fresh Next.js 15 application. The current codebase delivers a dense terminal shell, a fully interactive `react-globe.gl` Gods Eye page, a PBQL-style query API, cross-page market normalization, and venue-aware analytics panels for prediction-market workflows.

## What is included

- A Next.js 15 App Router foundation with strict TypeScript and Tailwind-driven custom terminal styling
- A multi-page Bloomberg-style shell covering dashboard, Gods Eye, markets, arbitrage, news impact, macro, sports, trading, PBQL, POSH, PSPLC, MiroFish, and portfolio
- A real Polymarket Gamma fetch path with resilient normalization plus a Kalshi adapter path and safe fallback aggregators for unsupported feeds
- A PBQL-like server route at `/api/pbql` for server-side aggregation against the normalized universe
- Terminal command execution for mnemonics like `PMAP<GO>`, `POSH`, `PSPLC`, `PBQL`, `NEWS`, and `ARB`
- Runtime health and trade simulation routes at `/api/health` and `/api/trade/simulate`
- Supabase-ready auth panel plus honest portfolio status routes at `/api/portfolio`
- Authenticated watchlist persistence route at `/api/watchlist` plus SQL schema in `supabase/schema.sql`
- Authenticated saved PBQL queries at `/api/pbql/saved`, simulated position persistence at `/api/positions`, and session verification at `/api/session`
- Authenticated terminal command history at `/api/commands`, plus aggregated portfolio metrics sourced from persisted simulated positions
- Deployment diagnostics at `/deploy` and `/api/deploy/readiness`, plus GitHub Actions CI and `npm run check:env`
- An interactive 3D globe with clickable market points, dependency arcs, hover tooltips, label drill-downs, and POSH-inspired vessel pulse rings
- A 390-plus layer catalog and Zustand-based cross-panel interaction state

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

4. Optional deployment readiness check:

```bash
npm run check:env
```

5. Optional deployed smoke test:

```bash
npm run smoke:test -- https://your-deployment-url.vercel.app
```

6. Optional local production-style smoke test:

```bash
npm run smoke:test:local
```

## Environment variables

These are optional for the current build, but the app is structured to consume them. You can start from `.env.example`:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
KALSHI_BASE_URL=
KALSHI_API_KEY=
KALSHI_API_SECRET=
POLYMARKET_API_KEY=
NEWS_API_KEY=
```

## Notes

- Polymarket data is fetched live when the endpoint is reachable.
- Kalshi, Supabase auth, and wallet execution are environment-gated rather than faked.
- The UI intentionally exposes production-ready slots for authenticated execution without pretending that unavailable credentials or proprietary feeds are live.
- Deployment handoff details live in `docs/DEPLOYMENT.md`.
- Supabase provisioning details live in `docs/SUPABASE_SETUP.md`.
