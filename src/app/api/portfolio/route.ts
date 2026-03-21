import { NextRequest, NextResponse } from "next/server";
import { getPortfolioSnapshot } from "@/lib/portfolio";

function getAccessTokenFromRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.slice("Bearer ".length);
}

export async function GET(request: NextRequest) {
  const accessToken = getAccessTokenFromRequest(request);
  return NextResponse.json(await getPortfolioSnapshot(accessToken));
}
