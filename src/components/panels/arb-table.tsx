import type { ArbitrageOpportunity } from "@/types/kratos";
import { formatCompactNumber, formatPercent } from "@/lib/utils";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export function ArbitrageTable({ items }: { items: ArbitrageOpportunity[] }) {
  return (
    <TerminalPanel title="Arbitrage Scanner" subtitle="Cross-venue divergence ranked by expected value">
      <div className="grid grid-cols-[1.8fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-2 border-b border-white/8 px-1 pb-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">
        <span>Market</span>
        <span>Poly</span>
        <span>Kalshi</span>
        <span>Delta</span>
        <span>EV</span>
        <span>Latency</span>
      </div>
      <div className="max-h-[420px] overflow-auto">
        {items.map((item) => (
          <div key={item.id} className="grid grid-cols-[1.8fr_0.7fr_0.7fr_0.7fr_0.7fr_0.7fr] gap-2 border-b border-white/6 px-1 py-3 text-xs text-slate-200">
            <span className="truncate">{item.title}</span>
            <span>{formatPercent(item.polyYes)}</span>
            <span>{formatPercent(item.kalshiYes)}</span>
            <span className="text-amber-200">{formatPercent(item.delta)}</span>
            <span className="text-lime-300">${formatCompactNumber(item.ev)}</span>
            <span>{item.latencyMs}ms</span>
          </div>
        ))}
      </div>
    </TerminalPanel>
  );
}

