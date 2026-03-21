import { NextRequest, NextResponse } from "next/server";
import type { SessionSnapshot } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getUserFromAccessToken } from "@/lib/supabase-server";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    const snapshot: SessionSnapshot = {
      status: "auth_unavailable",
      email: null,
      note: "Supabase environment keys are missing.",
    };
    return NextResponse.json(snapshot);
  }

  const accessToken = getAccessTokenFromRequest(request);
  const user = await getUserFromAccessToken(accessToken);

  if (!user) {
    const snapshot: SessionSnapshot = {
      status: "auth_required",
      email: null,
      note: "No authenticated session was provided.",
    };
    return NextResponse.json(snapshot);
  }

  const snapshot: SessionSnapshot = {
    status: "authenticated",
    email: user.email ?? null,
    note: "Authenticated session verified.",
  };

  return NextResponse.json(snapshot);
}

