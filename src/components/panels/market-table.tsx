"use client";

import type { MarketEntity } from "@/types/kratos";
import { formatCompactNumber, formatPercent } from "@/lib/utils";
import { useKratosStore } from "@/store/kratos-store";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export function MarketTable({ title, markets }: { title: string; markets: MarketEntity[] }) {
  const { setSelectedEntity } = useKratosStore();

  return (
    <TerminalPanel title={title} subtitle="Venue-normalized market universe">
      <div className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_0.7fr] gap-3 border-b border-white/8 px-1 pb-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">
        <span>Market</span>
        <span>Platform</span>
        <span>Odds</span>
        <span>Volume</span>
        <span>Action</span>
      </div>
      <div className="max-h-[460px] overflow-auto">
        {markets.map((market) => (
          <div
            key={market.id}
            className="grid grid-cols-[1.8fr_0.8fr_0.7fr_0.7fr_0.7fr] items-center gap-3 border-b border-white/6 px-1 py-3 text-sm"
          >
            <div>
              <p className="truncate text-white">{market.title}</p>
              <p className="mt-1 text-xs text-slate-400">{market.region}</p>
            </div>
            <span className="text-xs text-cyan-300">{market.platform}</span>
            <span className="text-xs text-white">{formatPercent(market.probability)}</span>
            <span className="text-xs text-slate-300">{formatCompactNumber(market.volume)}</span>
            <button
              type="button"
              onClick={() => setSelectedEntity(market)}
              className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-xs text-cyan-200"
            >
              Drill
            </button>
          </div>
        ))}
      </div>
    </TerminalPanel>
  );
}

