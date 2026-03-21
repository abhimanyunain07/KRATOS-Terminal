import { NextRequest, NextResponse } from "next/server";
import { addCommandHistoryItem, getCommandHistorySnapshot } from "@/lib/command-history";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const snapshot = await getCommandHistorySnapshot(accessToken);
  return NextResponse.json(snapshot);
}

export async function POST(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const body = (await request.json()) as {
    command?: string;
    kind?: "navigation" | "pbql" | "unknown";
    resolvedPath?: string | null;
  };

  const result = await addCommandHistoryItem(accessToken, {
    command: body.command?.trim() || "",
    kind: body.kind ?? "unknown",
    resolvedPath: body.resolvedPath ?? null,
  });

  return NextResponse.json({ message: result.message }, { status: result.status });
}
