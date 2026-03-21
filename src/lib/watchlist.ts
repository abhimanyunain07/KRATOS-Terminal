import type { MarketEntity, WatchlistItem, WatchlistSnapshot } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getServerSupabaseClient, getUserFromAccessToken } from "@/lib/supabase-server";

type WatchlistRow = {
  id: string;
  market_id: string;
  title: string;
  platform: WatchlistItem["platform"];
  category: WatchlistItem["category"];
  probability: number;
  volume: number;
  region: string;
  created_at: string;
};

function normalizeWatchlistRow(row: WatchlistRow): WatchlistItem {
  return {
    id: row.id,
    marketId: row.market_id,
    title: row.title,
    platform: row.platform,
    category: row.category,
    probability: row.probability,
    volume: row.volume,
    region: row.region,
    createdAt: row.created_at,
  };
}

export async function getWatchlistSnapshot(accessToken?: string | null): Promise<WatchlistSnapshot> {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    return {
      status: "auth_unavailable",
      accountLabel: "Auth unavailable",
      items: [],
      note: "Supabase auth is not configured, so watchlists cannot be persisted yet.",
    };
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      status: "auth_required",
      accountLabel: "Sign in required",
      items: [],
      note: "Authenticate with Supabase to load and persist a personal watchlist.",
    };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return {
      status: "connected_unconfigured",
      accountLabel: user.email ?? "Authenticated user",
      items: [],
      note: "Supabase client could not be initialized on the server.",
    };
  }

  const { data, error } = await client
    .from("watchlist_items")
    .select("id, market_id, title, platform, category, probability, volume, region, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      status: "connected_unconfigured",
      accountLabel: user.email ?? "Authenticated user",
      items: [],
      note: `Watchlist table not ready yet: ${error.message}`,
    };
  }

  return {
    status: "connected",
    accountLabel: user.email ?? "Authenticated user",
    items: (data as WatchlistRow[]).map(normalizeWatchlistRow),
    note: "Watchlist is loaded from Supabase.",
  };
}

export async function addWatchlistItem(accessToken: string | null | undefined, market: MarketEntity) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      ok: false,
      status: 401,
      message: "Sign in is required before saving markets to your watchlist.",
    };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return {
      ok: false,
      status: 503,
      message: "Supabase is not configured on the server.",
    };
  }

  const { error } = await client.from("watchlist_items").upsert(
    {
      market_id: market.id,
      title: market.title,
      platform: market.platform,
      category: market.category,
      probability: market.probability,
      volume: market.volume,
      region: market.region,
    },
    { onConflict: "user_id,market_id" },
  );

  if (error) {
    return {
      ok: false,
      status: 500,
      message: error.message,
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Market saved to watchlist.",
  };
}

export async function removeWatchlistItem(accessToken: string | null | undefined, marketId: string) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      ok: false,
      status: 401,
      message: "Sign in is required before removing watchlist items.",
    };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return {
      ok: false,
      status: 503,
      message: "Supabase is not configured on the server.",
    };
  }

  const { error } = await client.from("watchlist_items").delete().eq("market_id", marketId);

  if (error) {
    return {
      ok: false,
      status: 500,
      message: error.message,
    };
  }

  return {
    ok: true,
    status: 200,
    message: "Market removed from watchlist.",
  };
}

