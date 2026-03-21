"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, Play } from "lucide-react";
import type { PBQLResponse } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { formatCompactNumber, formatPercent } from "@/lib/utils";
import { useKratosStore } from "@/store/kratos-store";

const DEFAULT_QUERY = "get(EVENT_ODDS,RISK_SCORE,EV,KELLY_SIZE,VOL_COMBINED) for(universe('GLOBAL'), values=[PROB_POLY,VOL_COMBINED,RISK])";

export function BqlPanel({ initialQuery }: { initialQuery?: string }) {
  const { selectedEntity, hoveredTooltip, command } = useKratosStore();
  const [query, setQuery] = useState(initialQuery ?? DEFAULT_QUERY);
  const [response, setResponse] = useState<PBQLResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const runQuery = useCallback(async (nextQuery = query) => {
    setLoading(true);

    try {
      const res = await fetch("/api/pbql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: nextQuery }),
      });

      const payload = (await res.json()) as PBQLResponse;
      setResponse(payload);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (!selectedEntity) {
      return;
    }

    setQuery(
      `get(EVENT_ODDS,RISK_SCORE,EV,KELLY_SIZE,VOL_COMBINED) for(universe('${selectedEntity.category.toUpperCase()}'), values=[PROB_POLY,VOL_COMBINED,RISK])`,
    );
  }, [selectedEntity]);

  useEffect(() => {
    void runQuery(initialQuery ?? DEFAULT_QUERY);
  }, [initialQuery, runQuery]);

  return (
    <TerminalPanel
      title="PBQL Inspector"
      subtitle="Server-side aggregation and drill-through output"
      action={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void runQuery()}
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-200"
          >
            <Play className="h-3 w-3" />
            Run
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300"
          >
            <Download className="h-3 w-3" />
            CSV
          </button>
        </div>
      }
      className="h-full"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/8 bg-slate-950/80 p-3">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Command Context</p>
          <p className="mt-2 text-sm text-cyan-200">{command}</p>
          {hoveredTooltip ? <p className="mt-2 text-xs text-slate-400">{hoveredTooltip}</p> : null}
        </div>
        {selectedEntity ? (
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Selection</p>
            <p className="mt-2 text-sm text-white">{selectedEntity.title}</p>
            <p className="mt-2 text-xs text-slate-300">
              {selectedEntity.platform} | {formatPercent(selectedEntity.probability)} | Vol {formatCompactNumber(selectedEntity.volume)}
            </p>
          </div>
        ) : null}
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-3 text-sm text-white outline-none"
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Rows</p>
            <p className="mt-2 text-2xl text-white">{response?.summary.resultCount ?? "--"}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Avg Risk</p>
            <p className="mt-2 text-2xl text-white">{response?.summary.avgRisk ?? "--"}</p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/30">
          <div className="grid grid-cols-3 border-b border-white/8 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">
            <span>Title</span>
            <span>Risk</span>
            <span>Volume</span>
          </div>
          <div className="max-h-[320px] overflow-auto">
            {loading ? (
              <p className="px-3 py-6 text-sm text-slate-400">Executing PBQL query...</p>
            ) : (
              response?.rows.map((row, index) => (
                <div key={`${row.TITLE}-${index}`} className="grid grid-cols-3 gap-2 border-b border-white/6 px-3 py-3 text-xs text-slate-200">
                  <span className="truncate">{String(row.TITLE)}</span>
                  <span>{String(row.RISK_SCORE ?? row.RISK ?? "--")}</span>
                  <span>{formatCompactNumber(Number(row.VOL_COMBINED ?? row.VOLUME ?? 0))}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </TerminalPanel>
  );
}
