import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";

function hasServerSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export function getServerSupabaseClient(accessToken?: string): SupabaseClient | null {
  if (!hasServerSupabaseEnv()) {
    return null;
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    accessToken
      ? {
          global: {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        }
      : undefined,
  );
}

export async function getUserFromAccessToken(accessToken?: string | null): Promise<User | null> {
  if (!accessToken) {
    return null;
  }

  const client = getServerSupabaseClient();

  if (!client) {
    return null;
  }

  try {
    const { data, error } = await client.auth.getUser(accessToken);

    if (error) {
      return null;
    }

    return data.user ?? null;
  } catch {
    return null;
  }
}

