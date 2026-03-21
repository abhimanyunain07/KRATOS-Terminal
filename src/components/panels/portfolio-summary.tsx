"use client";

import { useEffect, useState } from "react";
import type { PortfolioSnapshot } from "@/types/kratos";
import { MetricCard } from "@/components/ui/metric-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { PositionsPanel } from "@/components/panels/positions-panel";

export function PortfolioSummary() {
  const [snapshot, setSnapshot] = useState<PortfolioSnapshot | null>(null);

  useEffect(() => {
    let active = true;

    void fetch("/api/portfolio")
      .then((response) => response.json())
      .then((payload: PortfolioSnapshot) => {
        if (active) {
          setSnapshot(payload);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Net P&L"
          value={snapshot ? `$${snapshot.netPnlUsd.toFixed(0)}` : "--"}
          detail={snapshot?.status === "auth_unavailable" ? "Auth unavailable" : "Awaiting live portfolio sync"}
        />
        <MetricCard
          label="Risk Budget"
          value={snapshot ? `${snapshot.riskBudgetPct.toFixed(1)}%` : "--"}
          detail="Kelly-capped live budget"
          tone="amber"
        />
        <MetricCard
          label="Open Positions"
          value={snapshot ? String(snapshot.openPositions) : "--"}
          detail="No fabricated position count"
          tone="lime"
        />
        <MetricCard
          label="Gross Exposure"
          value={snapshot ? `$${snapshot.grossExposureUsd.toFixed(0)}` : "--"}
          detail={snapshot?.accountLabel ?? "Loading account state"}
          tone="cyan"
        />
      </div>

      <TerminalPanel title="Portfolio Sync" subtitle="Account and persistence state">
        <div className="space-y-3">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Status</p>
            <p className="mt-2 text-sm text-white">{snapshot?.accountLabel ?? "Loading..."}</p>
            <p className="mt-2 text-xs leading-5 text-slate-400">{snapshot?.note ?? "Fetching portfolio state."}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Positions</p>
            {snapshot && snapshot.positions.length > 0 ? (
              <div className="mt-3 space-y-2">
                {snapshot.positions.map((position) => (
                  <div key={position.id} className="rounded-xl border border-white/8 bg-black/30 p-3 text-sm text-white">
                    {position.title}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No positions are shown until authenticated portfolio persistence is actually configured.</p>
            )}
          </div>
        </div>
      </TerminalPanel>
      <PositionsPanel />
    </div>
  );
}
