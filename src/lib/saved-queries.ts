import type { SavedQueryItem, SavedQuerySnapshot } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getServerSupabaseClient, getUserFromAccessToken } from "@/lib/supabase-server";

type SavedQueryRow = {
  id: string;
  name: string;
  query: string;
  created_at: string;
};

function normalizeRow(row: SavedQueryRow): SavedQueryItem {
  return {
    id: row.id,
    name: row.name,
    query: row.query,
    createdAt: row.created_at,
  };
}

export async function getSavedQuerySnapshot(accessToken?: string | null): Promise<SavedQuerySnapshot> {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    return {
      status: "auth_unavailable",
      accountLabel: "Auth unavailable",
      items: [],
      note: "Supabase auth is not configured, so saved PBQL queries are disabled.",
    };
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      status: "auth_required",
      accountLabel: "Sign in required",
      items: [],
      note: "Authenticate to persist saved PBQL queries.",
    };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return {
      status: "connected_unconfigured",
      accountLabel: user.email ?? "Authenticated user",
      items: [],
      note: "Supabase server client could not be initialized.",
    };
  }

  const { data, error } = await client
    .from("saved_pbql_queries")
    .select("id, name, query, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return {
      status: "connected_unconfigured",
      accountLabel: user.email ?? "Authenticated user",
      items: [],
      note: `Saved query table not ready yet: ${error.message}`,
    };
  }

  return {
    status: "connected",
    accountLabel: user.email ?? "Authenticated user",
    items: (data as SavedQueryRow[]).map(normalizeRow),
    note: "Saved PBQL queries loaded from Supabase.",
  };
}

export async function addSavedQuery(accessToken: string | null | undefined, name: string, query: string) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return { ok: false, status: 401, message: "Sign in is required before saving PBQL queries." };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return { ok: false, status: 503, message: "Supabase is not configured on the server." };
  }

  const { error } = await client.from("saved_pbql_queries").insert({
    user_id: user.id,
    name,
    query,
  });

  if (error) {
    return { ok: false, status: 500, message: error.message };
  }

  return { ok: true, status: 200, message: "PBQL query saved." };
}

export async function removeSavedQuery(accessToken: string | null | undefined, queryId: string) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return { ok: false, status: 401, message: "Sign in is required before deleting saved queries." };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return { ok: false, status: 503, message: "Supabase is not configured on the server." };
  }

  const { error } = await client.from("saved_pbql_queries").delete().eq("id", queryId);

  if (error) {
    return { ok: false, status: 500, message: error.message };
  }

  return { ok: true, status: 200, message: "Saved query removed." };
}
