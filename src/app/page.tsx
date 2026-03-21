import { PageHeader } from "@/components/layout/page-header";
import { ArbitrageTable } from "@/components/panels/arb-table";
import { CommandHistoryPanel } from "@/components/panels/command-history-panel";
import { MacroBoard } from "@/components/panels/macro-board";
import { MiniGlobeCard } from "@/components/panels/mini-globe-card";
import { NewsGrid } from "@/components/panels/news-grid";
import { MetricCard } from "@/components/ui/metric-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const universe = await getMarketUniverse();
  const totalVolume = universe.markets.reduce((sum, market) => sum + market.volume, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Dashboard"
        title="Prediction markets command center"
        description="Dense Bloomberg-style overview across PMAP, arbitrage, impact news, macro context, and execution signals. Every panel is wired into the same live-normalized market universe."
        rightSlot={
          <div className="grid min-w-[260px] grid-cols-2 gap-3">
            <MetricCard label="Universe" value={String(universe.markets.length)} detail="Live-normalized events" />
            <MetricCard label="Volume" value={formatCurrency(totalVolume)} detail="Cross-platform mapped" tone="amber" />
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-3">
        <TerminalPanel title="Markets Overview" subtitle="Primary universe health">
          <div className="grid gap-3 md:grid-cols-3">
            <MetricCard label="Polymarket" value={String(universe.markets.filter((m) => m.platform === "Polymarket").length)} detail="Live Gamma feed" />
            <MetricCard label="Kalshi" value={String(universe.markets.filter((m) => m.platform === "Kalshi").length)} detail="Direct adapter" tone="amber" />
            <MetricCard label="Coverage" value={`${universe.layers.length}+`} detail="Layer definitions" tone="lime" />
          </div>
        </TerminalPanel>
        <ArbitrageTable items={universe.arbitrage} />
        <NewsGrid items={universe.news} />
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <MacroBoard instruments={universe.macro} />
        <TerminalPanel title="Alpha Trades" subtitle="Machine-ranked opportunity stack">
          <div className="space-y-3">
            {universe.markets.slice(0, 6).map((market, index) => (
              <div key={market.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">{market.title}</p>
                  <span className="text-xs text-cyan-300">#{index + 1}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  EV {(market.ev * 100).toFixed(1)}bps | Kelly {(market.kellyFraction * 100).toFixed(1)}% | Vol {formatCompactNumber(market.volume)}
                </p>
              </div>
            ))}
          </div>
        </TerminalPanel>
        <MiniGlobeCard universe={universe} />
      </div>
      <div className="grid gap-4 xl:grid-cols-[1fr_0.42fr]">
        <TerminalPanel title="Alpha Trades Extended" subtitle="Machine-ranked opportunity stack">
          <div className="space-y-3">
            {universe.markets.slice(6, 12).map((market, index) => (
              <div key={market.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white">{market.title}</p>
                  <span className="text-xs text-cyan-300">#{index + 7}</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  EV {(market.ev * 100).toFixed(1)}bps | Kelly {(market.kellyFraction * 100).toFixed(1)}% | Vol {formatCompactNumber(market.volume)}
                </p>
              </div>
            ))}
          </div>
        </TerminalPanel>
        <CommandHistoryPanel />
      </div>
    </div>
  );
}
