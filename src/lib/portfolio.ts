import type { PortfolioSnapshot } from "@/types/kratos";
import { clamp } from "@/lib/utils";
import { getRuntimeStatus } from "@/lib/runtime-status";
import { getUserFromAccessToken } from "@/lib/supabase-server";
import { getSimulatedPositions } from "@/lib/simulated-positions";

export async function getPortfolioSnapshot(accessToken?: string | null): Promise<PortfolioSnapshot> {
  const runtime = getRuntimeStatus();

  if (!runtime.authEnabled) {
    return {
      status: "auth_unavailable",
      accountLabel: "No authenticated account",
      netPnlUsd: 0,
      riskBudgetPct: 0,
      openPositions: 0,
      grossExposureUsd: 0,
      positions: [],
      note: "Supabase auth is not configured yet, so KRATOS is intentionally not inventing balances or positions.",
    };
  }

  const user = await getUserFromAccessToken(accessToken);

  if (!user || !accessToken) {
    return {
      status: "auth_required",
      accountLabel: "Sign in required",
      netPnlUsd: 0,
      riskBudgetPct: 0,
      openPositions: 0,
      grossExposureUsd: 0,
      positions: [],
      note: "Authenticate to load persisted portfolio state.",
    };
  }

  const positionsSnapshot = await getSimulatedPositions(accessToken);

  if (positionsSnapshot.status !== "connected") {
    return {
      status: "connected_unconfigured",
      accountLabel: positionsSnapshot.accountLabel,
      netPnlUsd: 0,
      riskBudgetPct: 0,
      openPositions: 0,
      grossExposureUsd: 0,
      positions: [],
      note: positionsSnapshot.note,
    };
  }

  const grossExposureUsd = positionsSnapshot.positions.reduce(
    (sum, position) => sum + position.contracts * position.averagePrice,
    0,
  );
  const netPnlUsd = positionsSnapshot.positions.reduce(
    (sum, position) => sum + position.unrealizedPnlUsd,
    0,
  );
  const riskBudgetPct = clamp((grossExposureUsd / 25000) * 100, 0, 35);

  return {
    status: "connected_unconfigured",
    accountLabel: positionsSnapshot.accountLabel,
    netPnlUsd: Number(netPnlUsd.toFixed(2)),
    riskBudgetPct: Number(riskBudgetPct.toFixed(2)),
    openPositions: positionsSnapshot.positions.length,
    grossExposureUsd: Number(grossExposureUsd.toFixed(2)),
    positions: positionsSnapshot.positions,
    note:
      positionsSnapshot.positions.length > 0
        ? "Portfolio metrics are now aggregated from persisted simulated positions."
        : "No persisted simulated positions found for this account yet.",
  };
}
