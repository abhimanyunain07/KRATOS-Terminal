import { NextResponse } from "next/server";
import { getDeepHealthReport } from "@/lib/deep-health";

export async function GET() {
  return NextResponse.json(getDeepHealthReport());
}

