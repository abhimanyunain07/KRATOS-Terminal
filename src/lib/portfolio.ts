import type { PortfolioSnapshot } from "@/types/kratos";
import { getRuntimeStatus } from "@/lib/runtime-status";

export function getPortfolioSnapshot(): PortfolioSnapshot {
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

  return {
    status: "connected_unconfigured",
    accountLabel: "Auth ready, portfolio persistence pending",
    netPnlUsd: 0,
    riskBudgetPct: 0,
    openPositions: 0,
    grossExposureUsd: 0,
    positions: [],
    note: "Authentication can be enabled from the environment, but no portfolio persistence tables or venue balance sync are configured in this workspace yet.",
  };
}

