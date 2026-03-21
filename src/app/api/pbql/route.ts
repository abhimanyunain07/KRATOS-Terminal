import { NextRequest, NextResponse } from "next/server";
import { executePBQL } from "@/lib/kratos-data";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { query?: string };
  const query =
    body.query ??
    "get(EVENT_ODDS,RISK_SCORE,EV,KELLY_SIZE,VOL_COMBINED) for(universe('GLOBAL'), values=[PROB_POLY,VOL_COMBINED,RISK])";

  const result = await executePBQL(query);
  return NextResponse.json(result);
}

