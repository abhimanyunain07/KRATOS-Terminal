"use client";

import { useCallback, useEffect, useState } from "react";
import type { CommandHistorySnapshot } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { authorizedFetch, getBrowserSupabaseClient } from "@/lib/supabase";

export function CommandHistoryPanel() {
  const [snapshot, setSnapshot] = useState<CommandHistorySnapshot | null>(null);

  const loadHistory = useCallback(async () => {
    const response = await authorizedFetch("/api/commands");
    const payload = (await response.json()) as CommandHistorySnapshot;
    setSnapshot(payload);
  }, []);

  useEffect(() => {
    void loadHistory();

    const client = getBrowserSupabaseClient();

    if (!client) {
      return;
    }

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(() => {
      void loadHistory();
    });

    return () => subscription.unsubscribe();
  }, [loadHistory]);

  return (
    <TerminalPanel title="Command History" subtitle="Authenticated terminal mnemonic history">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Account</p>
          <p className="mt-2 text-sm text-white">{snapshot?.accountLabel ?? "Loading..."}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{snapshot?.note ?? "Loading terminal history."}</p>
        </div>
        <div className="space-y-2">
          {snapshot && snapshot.items.length > 0 ? (
            snapshot.items.map((item) => (
              <article key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm text-white">{item.command}</h3>
                    <p className="mt-2 text-xs text-slate-400">
                      {item.kind} {item.resolvedPath ? `| ${item.resolvedPath}` : ""}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-300">
                    {new Date(item.createdAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-400">
              No persisted commands yet.
            </p>
          )}
        </div>
      </div>
    </TerminalPanel>
  );
}

