import type { RuntimeStatus, ServiceHealth } from "@/types/kratos";

function hasEnv(key: string) {
  const value = process.env[key];
  return typeof value === "string" && value.trim().length > 0;
}

function buildServiceStatus(): ServiceHealth[] {
  return [
    {
      key: "polymarket",
      label: "Polymarket Gamma",
      status: "live",
      detail: "Public endpoint adapter is active for market normalization.",
    },
    {
      key: "kalshi",
      label: "Kalshi",
      status: hasEnv("KALSHI_API_KEY") && hasEnv("KALSHI_API_SECRET") ? "configured" : "degraded",
      detail:
        hasEnv("KALSHI_API_KEY") && hasEnv("KALSHI_API_SECRET")
          ? "Credentials detected. Trade routing can be promoted from simulation."
          : "Market adapter path exists, but authenticated order routing is still gated by credentials.",
    },
    {
      key: "supabase",
      label: "Supabase Auth",
      status: hasEnv("NEXT_PUBLIC_SUPABASE_URL") && hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ? "configured" : "offline",
      detail:
        hasEnv("NEXT_PUBLIC_SUPABASE_URL") && hasEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
          ? "Client auth configuration detected."
          : "No Supabase environment keys found yet.",
    },
    {
      key: "redis",
      label: "Redis / PubSub",
      status: hasEnv("REDIS_URL") ? "configured" : "offline",
      detail: hasEnv("REDIS_URL") ? "Redis URL is present for real-time fanout." : "Realtime pub/sub remains unconfigured.",
    },
    {
      key: "postgis",
      label: "Postgres / PostGIS",
      status: hasEnv("DATABASE_URL") ? "configured" : "offline",
      detail: hasEnv("DATABASE_URL") ? "Database URL detected for geospatial persistence." : "No database URL present yet.",
    },
    {
      key: "news",
      label: "News Ingest",
      status: hasEnv("NEWS_API_KEY") ? "configured" : "degraded",
      detail: hasEnv("NEWS_API_KEY") ? "External news key detected." : "Fallback internal signal cards are active until a news key is supplied.",
    },
  ];
}

export function getRuntimeStatus(): RuntimeStatus {
  const services = buildServiceStatus();

  return {
    commandMnemonics: [
      "PMAP<GO>",
      "POSH",
      "PSPLC",
      "PBQL",
      "NEWS",
      "ARB",
      "MARKETS",
      "TRADING",
      "PORTFOLIO",
    ],
    services,
    tradeRoutingEnabled: services.some((service) => service.key === "kalshi" && service.status === "configured"),
    authEnabled: services.some((service) => service.key === "supabase" && service.status === "configured"),
    pbqlEnabled: true,
  };
}

