"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SavedQuerySnapshot } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { authorizedFetch, getBrowserSupabaseClient } from "@/lib/supabase";

export function SavedQueriesPanel() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<SavedQuerySnapshot | null>(null);

  const loadSavedQueries = useCallback(async () => {
    const response = await authorizedFetch("/api/pbql/saved");
    const payload = (await response.json()) as SavedQuerySnapshot;
    setSnapshot(payload);
  }, []);

  useEffect(() => {
    void loadSavedQueries();
    const client = getBrowserSupabaseClient();
    if (!client) {
      return;
    }
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadSavedQueries();
    });
    return () => subscription.unsubscribe();
  }, [loadSavedQueries]);

  async function removeQuery(queryId: string) {
    await authorizedFetch("/api/pbql/saved", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryId }),
    });
    await loadSavedQueries();
  }

  return (
    <TerminalPanel title="Saved PBQL" subtitle="Authenticated query persistence">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Account</p>
          <p className="mt-2 text-sm text-white">{snapshot?.accountLabel ?? "Loading..."}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{snapshot?.note ?? "Loading saved queries."}</p>
        </div>
        <div className="space-y-2">
          {snapshot && snapshot.items.length > 0 ? (
            snapshot.items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm text-white">{item.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-400">{item.query}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => router.push(`/pbql?query=${encodeURIComponent(item.query)}`)}
                      className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200"
                    >
                      Load
                    </button>
                    <button
                      type="button"
                      onClick={() => void removeQuery(item.id)}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1 text-xs text-slate-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">
              No saved queries yet.
            </p>
          )}
        </div>
      </div>
    </TerminalPanel>
  );
}
