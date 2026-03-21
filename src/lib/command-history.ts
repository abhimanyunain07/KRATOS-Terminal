import type { CommandHistoryItem, CommandHistorySnapshot } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getServerSupabaseClient, getUserFromAccessToken } from "@/lib/supabase-server";

type CommandHistoryRow = {
  id: string;
  command: string;
  kind: CommandHistoryItem["kind"];
  resolved_path: string | null;
  created_at: string;
};

function normalizeRow(row: CommandHistoryRow): CommandHistoryItem {
  return {
    id: row.id,
    command: row.command,
    kind: row.kind,
    resolvedPath: row.resolved_path,
    createdAt: row.created_at,
  };
}

export async function getCommandHistorySnapshot(accessToken?: string | null): Promise<CommandHistorySnapshot> {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    return {
      status: "auth_unavailable",
      accountLabel: "Auth unavailable",
      items: [],
      note: "Supabase auth is not configured, so terminal history cannot be persisted yet.",
    };
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      status: "auth_required",
      accountLabel: "Sign in required",
      items: [],
      note: "Authenticate to persist command history.",
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
    .from("terminal_command_history")
    .select("id, command, kind, resolved_path, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) {
    return {
      status: "connected_unconfigured",
      accountLabel: user.email ?? "Authenticated user",
      items: [],
      note: `Command history table not ready yet: ${error.message}`,
    };
  }

  return {
    status: "connected",
    accountLabel: user.email ?? "Authenticated user",
    items: (data as CommandHistoryRow[]).map(normalizeRow),
    note: "Recent terminal commands loaded from Supabase.",
  };
}

export async function addCommandHistoryItem(
  accessToken: string | null | undefined,
  payload: {
    command: string;
    kind: CommandHistoryItem["kind"];
    resolvedPath: string | null;
  },
) {
  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return { ok: false, status: 401, message: "Sign in is required before persisting command history." };
  }

  const client = getServerSupabaseClient(accessToken);

  if (!client) {
    return { ok: false, status: 503, message: "Supabase is not configured on the server." };
  }

  const { error } = await client.from("terminal_command_history").insert({
    user_id: user.id,
    command: payload.command,
    kind: payload.kind,
    resolved_path: payload.resolvedPath,
  });

  if (error) {
    return { ok: false, status: 500, message: error.message };
  }

  return { ok: true, status: 200, message: "Command saved." };
}
