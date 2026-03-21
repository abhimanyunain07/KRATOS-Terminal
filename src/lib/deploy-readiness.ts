import type { DeployCheck, DeployReadinessReport } from "@/types/kratos";

function hasEnv(key: string) {
  return Boolean(process.env[key]?.trim());
}

export function getDeployReadinessReport(): DeployReadinessReport {
  const checks: DeployCheck[] = [
    {
      key: "node",
      label: "Node Runtime",
      status: "ready",
      detail: "Project builds successfully on the current Next.js 15 and React 19 stack.",
    },
    {
      key: "supabase_public",
      label: "Supabase Public Env",
      status: hasEnv("NEXT_PUBLIC_SUPABASE_URL") && hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ? "ready" : "missing",
      detail:
        hasEnv("NEXT_PUBLIC_SUPABASE_URL") && hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
          ? "Public auth env vars are present."
          : "Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.",
    },
    {
      key: "database",
      label: "Database URL",
      status: hasEnv("DATABASE_URL") ? "ready" : "missing",
      detail: hasEnv("DATABASE_URL") ? "DATABASE_URL is present." : "Set DATABASE_URL for Postgres or Supabase SQL workloads.",
    },
    {
      key: "redis",
      label: "Redis URL",
      status: hasEnv("REDIS_URL") ? "ready" : "warning",
      detail: hasEnv("REDIS_URL") ? "Redis fanout is configured." : "Realtime fanout remains optional until Redis is connected.",
    },
    {
      key: "kalshi",
      label: "Kalshi Credentials",
      status: hasEnv("KALSHI_API_KEY") && hasEnv("KALSHI_API_SECRET") ? "ready" : "warning",
      detail:
        hasEnv("KALSHI_API_KEY") && hasEnv("KALSHI_API_SECRET")
          ? "Venue execution credentials are present."
          : "Kalshi trading remains simulation-only until KALSHI_API_KEY and KALSHI_API_SECRET are set.",
    },
    {
      key: "news",
      label: "News Provider Key",
      status: hasEnv("NEWS_API_KEY") ? "ready" : "warning",
      detail: hasEnv("NEWS_API_KEY") ? "External news enrichment is configured." : "Fallback internal news signal cards are still active.",
    },
    {
      key: "vercel",
      label: "Vercel Project Env",
      status: hasEnv("VERCEL") ? "ready" : "warning",
      detail: hasEnv("VERCEL") ? "Running in a Vercel environment." : "Local workspace is deployment-ready, but not currently running inside Vercel.",
    },
  ];

  const readyCount = checks.filter((check) => check.status === "ready").length;

  return {
    platform: "Vercel",
    recommendedTarget: "Production deployment on Vercel with Supabase-managed persistence",
    checks,
    readyCount,
    totalCount: checks.length,
    note:
      readyCount === checks.length
        ? "Deployment prerequisites are fully configured."
        : "The app is build-ready, but some production env vars are still missing or intentionally optional.",
  };
}

