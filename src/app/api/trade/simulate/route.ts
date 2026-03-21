import { NextRequest, NextResponse } from "next/server";
import { clamp } from "@/lib/utils";
import { getRuntimeStatus } from "@/lib/runtime-status";
import type { TradeSimulationRequest, TradeSimulationResponse } from "@/types/kratos";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<TradeSimulationRequest>;
  const runtime = getRuntimeStatus();

  const venue = body.venue === "Polymarket" ? "Polymarket" : "Kalshi";
  const side = body.side === "No" ? "No" : "Yes";
  const ticker = typeof body.ticker === "string" && body.ticker.trim() ? body.ticker.trim() : "UNTITLED";
  const price = clamp(Number(body.price) || 0.5, 0.01, 0.99);
  const probability = clamp(Number(body.probability) || 0.5, 0.01, 0.99);
  const stakeUsd = Math.max(Number(body.stakeUsd) || 0, 1);
  const contracts = stakeUsd / price;
  const maxPayoutUsd = contracts;
  const worstCaseLossUsd = stakeUsd;
  const edgePerContract = probability - price;
  const estimatedEdgeUsd = Number((contracts * edgePerContract).toFixed(2));
  const oddsEdge = Math.max((1 - price) / price, 0.05);
  const kellyFraction = clamp((probability * (1 + oddsEdge) - (1 - probability)) / (oddsEdge || 0.25), 0, 0.35);

  const response: TradeSimulationResponse = {
    venue,
    ticker,
    side,
    stakeUsd: Number(stakeUsd.toFixed(2)),
    contracts: Number(contracts.toFixed(2)),
    maxPayoutUsd: Number(maxPayoutUsd.toFixed(2)),
    worstCaseLossUsd: Number(worstCaseLossUsd.toFixed(2)),
    estimatedEdgeUsd,
    kellyFraction: Number(kellyFraction.toFixed(4)),
    routeStatus: runtime.tradeRoutingEnabled ? "simulated" : "credential_required",
    note: runtime.tradeRoutingEnabled
      ? "Simulation succeeded. Environment keys are present, so this ticket can be promoted into a live router in the next phase."
      : "Simulation only. Live routing remains disabled until venue credentials are supplied.",
  };

  return NextResponse.json(response);
}
