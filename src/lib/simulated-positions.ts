import type { PortfolioPosition } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getServerSupabaseClient, getUserFromAccessToken } from "@/lib/supabase-server";

type PositionRow = {
  id: string;
  venue: PortfolioPosition["venue"];
  ticker: string;
  title: string;
  side: PortfolioPosition["side"];
  contracts: number;
  average_price: number;
  mark_probability: number;
  unrealized_pnl_usd: number;
  created_at: string;
};

function normalizePosition(row: PositionRow): PortfolioPosition {
  return {
    id: row.id,
    venue: row.venue,
    ticker: row.ticker,
    title: row.title,
    side: row.side,
    contracts: row.contracts,
    averagePrice: row.average_price,
    markProbability: row.mark_probability,
    unrealizedPnlUsd: row.unrealized_pnl_usd,
    status: "simulated",
  };
}

export async function getSimulatedPositions(accessToken?: string | null) {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    return {
      status: "auth_unavailable" as const,
      accountLabel: "Auth unavailable",
      positions: [] as PortfolioPosition[],
      note: "Supabase auth is not configured, so simulated positions cannot be persisted.",
    };
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      status: "auth_required" as const,
      accountLabel: "Sign in required",
      positions: [] as PortfolioPosition[],
      note: "Authenticate to load persisted simulated positions.",
    };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return {
      status: "connected_unconfigured" as const,
      accountLabel: user.email ?? "Authenticated user",
      positions: [] as PortfolioPosition[],
      note: "Supabase server client could not be initialized.",
    };
  }

  const { data, error } = await client
    .from("simulated_positions")
    .select("id, venue, ticker, title, side, contracts, average_price, mark_probability, unrealized_pnl_usd, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      status: "connected_unconfigured" as const,
      accountLabel: user.email ?? "Authenticated user",
      positions: [] as PortfolioPosition[],
      note: `Simulated positions table not ready yet: ${error.message}`,
    };
  }

  return {
    status: "connected" as const,
    accountLabel: user.email ?? "Authenticated user",
    positions: (data as PositionRow[]).map(normalizePosition),
    note: "Simulated positions loaded from Supabase.",
  };
}

export async function addSimulatedPosition(
  accessToken: string | null | undefined,
  payload: {
    venue: PortfolioPosition["venue"];
    ticker: string;
    title: string;
    side: PortfolioPosition["side"];
    contracts: number;
    averagePrice: number;
    markProbability: number;
    unrealizedPnlUsd: number;
  },
) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return { ok: false, status: 401, message: "Sign in is required before recording simulated positions." };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return { ok: false, status: 503, message: "Supabase is not configured on the server." };
  }

  const { error } = await client.from("simulated_positions").insert({
    user_id: user.id,
    venue: payload.venue,
    ticker: payload.ticker,
    title: payload.title,
    side: payload.side,
    contracts: payload.contracts,
    average_price: payload.averagePrice,
    mark_probability: payload.markProbability,
    unrealized_pnl_usd: payload.unrealizedPnlUsd,
  });

  if (error) {
    return { ok: false, status: 500, message: error.message };
  }

  return { ok: true, status: 200, message: "Simulated position recorded." };
}

export async function removeSimulatedPosition(accessToken: string | null | undefined, positionId: string) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return { ok: false, status: 401, message: "Sign in is required before deleting positions." };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return { ok: false, status: 503, message: "Supabase is not configured on the server." };
  }

  const { error } = await client.from("simulated_positions").delete().eq("id", positionId);

  if (error) {
    return { ok: false, status: 500, message: error.message };
  }

  return { ok: true, status: 200, message: "Simulated position removed." };
}
