import { NextRequest, NextResponse } from "next/server";
import { addSimulatedPosition, getSimulatedPositions, removeSimulatedPosition } from "@/lib/simulated-positions";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const snapshot = await getSimulatedPositions(accessToken);
  return NextResponse.json(snapshot);
}

export async function POST(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const body = (await request.json()) as {
    venue: "Kalshi" | "Polymarket";
    ticker: string;
    title: string;
    side: "Yes" | "No";
    contracts: number;
    averagePrice: number;
    markProbability: number;
    unrealizedPnlUsd: number;
  };
  const result = await addSimulatedPosition(accessToken, body);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

export async function DELETE(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  const body = (await request.json()) as { positionId?: string };
  if (!body.positionId) {
    return NextResponse.json({ message: "positionId is required." }, { status: 400 });
  }
  const result = await removeSimulatedPosition(accessToken, body.positionId);
  return NextResponse.json({ message: result.message }, { status: result.status });
}

