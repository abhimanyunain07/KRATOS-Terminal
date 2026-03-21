import { NextRequest, NextResponse } from "next/server";
import { addSavedQuery, getSavedQuerySnapshot, removeSavedQuery } from "@/lib/saved-queries";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const snapshot = await getSavedQuerySnapshot(accessToken);
  return NextResponse.json(snapshot);
}

export async function POST(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const body = (await request.json()) as { name?: string; query?: string };
  const result = await addSavedQuery(accessToken, body.name?.trim() || "Saved PBQL Query", body.query?.trim() || "");
  return NextResponse.json({ message: result.message }, { status: result.status });
}

export async function DELETE(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const body = (await request.json()) as { queryId?: string };
  if (!body.queryId) {
    return NextResponse.json({ message: "queryId is required." }, { status: 400 });
  }
  const result = await removeSavedQuery(accessToken, body.queryId);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

