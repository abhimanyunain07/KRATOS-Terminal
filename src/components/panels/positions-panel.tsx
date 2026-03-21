"use client";

import { useCallback, useEffect, useState } from "react";
import type { PortfolioPosition } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { authorizedFetch, getBrowserSupabaseClient } from "@/lib/supabase";

type PositionsSnapshot = {
  status: "auth_unavailable" | "auth_required" | "connected" | "connected_unconfigured";
  accountLabel: string;
  positions: PortfolioPosition[];
  note: string;
};

export function PositionsPanel() {
  const [snapshot, setSnapshot] = useState<PositionsSnapshot | null>(null);

  const loadPositions = useCallback(async () => {
    const response = await authorizedFetch("/api/positions");
    const payload = (await response.json()) as PositionsSnapshot;
    setSnapshot(payload);
  }, []);

  useEffect(() => {
    void loadPositions();
    const client = getBrowserSupabaseClient();
    if (!client) {
      return;
    }
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadPositions();
    });
    return () => subscription.unsubscribe();
  }, [loadPositions]);

  async function removePosition(positionId: string) {
    await authorizedFetch("/api/positions", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ positionId }),
    });
    await loadPositions();
  }

  return (
    <TerminalPanel title="Simulated Positions" subtitle="Authenticated persistence for staged trades">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Account</p>
          <p className="mt-2 text-sm text-white">{snapshot?.accountLabel ?? "Loading..."}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{snapshot?.note ?? "Loading simulated positions."}</p>
        </div>
        <div className="space-y-2">
          {snapshot && snapshot.positions.length > 0 ? (
            snapshot.positions.map((position) => (
              <article key={position.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm text-white">{position.title}</h3>
                    <p className="mt-2 text-xs text-slate-400">
                      {position.venue} | {position.side} | {position.contracts.toFixed(0)} contracts | Mark {(position.markProbability * 100).toFixed(1)}%
                    </p>
                    <p className="mt-2 text-xs text-slate-400">Unrealized P&L ${position.unrealizedPnlUsd.toFixed(2)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void removePosition(position.id)}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-slate-300"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">
              No persisted simulated positions yet.
            </p>
          )}
        </div>
      </div>
    </TerminalPanel>
  );
}

