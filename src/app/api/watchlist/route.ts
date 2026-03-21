import { NextRequest, NextResponse } from "next/server";
import type { MarketEntity } from "@/types/kratos";
import { addWatchlistItem, getWatchlistSnapshot, removeWatchlistItem } from "@/lib/watchlist";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const snapshot = await getWatchlistSnapshot(accessToken);
  return NextResponse.json(snapshot);
}

export async function POST(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const market = (await request.json()) as MarketEntity;
  const result = await addWatchlistItem(accessToken, market);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

export async function DELETE(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const { marketId } = (await request.json()) as { marketId?: string };

  if (!marketId) {
    return NextResponse.json({ message: "marketId is required." }, { status: 400 });
  }

  const result = await removeWatchlistItem(accessToken, marketId);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

