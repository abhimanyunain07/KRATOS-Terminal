import { NextResponse } from "next/server";
import { getMarketUniverse } from "@/lib/kratos-data";

export async function GET() {
  const universe = await getMarketUniverse();
  return NextResponse.json(universe);
}

