"use client";

import { useCallback, useEffect, useState } from "react";
import type { WatchlistSnapshot } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { formatCompactNumber, formatPercent } from "@/lib/utils";
import { authorizedFetch, getBrowserSupabaseClient } from "@/lib/supabase";

export function WatchlistPanel() {
  const [snapshot, setSnapshot] = useState<WatchlistSnapshot | null>(null);

  const loadWatchlist = useCallback(async () => {
    const response = await authorizedFetch("/api/watchlist");
    const payload = (await response.json()) as WatchlistSnapshot;
    setSnapshot(payload);
  }, []);

  useEffect(() => {
    void loadWatchlist();

    const client = getBrowserSupabaseClient();

    if (!client) {
      return;
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadWatchlist();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [loadWatchlist]);

  async function removeItem(marketId: string) {
    await authorizedFetch("/api/watchlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ marketId }),
    });

    await loadWatchlist();
  }

  return (
    <TerminalPanel title="Watchlist" subtitle="Authenticated user market saves">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Account</p>
          <p className="mt-2 text-sm text-white">{snapshot?.accountLabel ?? "Loading..."}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{snapshot?.note ?? "Loading watchlist."}</p>
        </div>
        <div className="space-y-2">
          {snapshot && snapshot.items.length > 0 ? (
            snapshot.items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm text-white">{item.title}</h3>
                    <p className="mt-2 text-xs text-slate-400">
                      {item.platform} | {item.region} | {formatPercent(item.probability)} | Vol {formatCompactNumber(item.volume)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void removeItem(item.marketId)}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-slate-300"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">
              No saved watchlist items yet.
            </p>
          )}
        </div>
      </div>
    </TerminalPanel>
  );
}
