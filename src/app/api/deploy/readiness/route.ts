import { NextResponse } from "next/server";
import { getDeployReadinessReport } from "@/lib/deploy-readiness";

export async function GET() {
  return NextResponse.json(getDeployReadinessReport());
}

