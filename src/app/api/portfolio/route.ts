import { NextResponse } from "next/server";
import { getPortfolioSnapshot } from "@/lib/portfolio";

export async function GET() {
  return NextResponse.json(getPortfolioSnapshot());
}

