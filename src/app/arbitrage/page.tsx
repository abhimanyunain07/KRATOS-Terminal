import { PageHeader } from "@/components/layout/page-header";
import { ArbitrageTable } from "@/components/panels/arb-table";
import { MetricCard } from "@/components/ui/metric-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function ArbitragePage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Arbitrage"
        title="Cross-venue mispricing scanner"
        description="Poly versus Kalshi divergence monitor with EV ranking, Kelly sizing, execution latency estimate, and HFT simulation framing."
        rightSlot={
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Active Arbs" value={String(universe.arbitrage.length)} detail="Ranked by EV" />
            <MetricCard label="Trigger" value="2.0%" detail="Current alert threshold" tone="amber" />
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.42fr]">
        <ArbitrageTable items={universe.arbitrage} />
        <TerminalPanel title="HFT Sim" subtitle="Execution logic">
          <pre className="overflow-auto rounded-2xl border border-white/8 bg-slate-950/80 p-4 text-xs leading-6 text-slate-300">{`arb = (poly_yes - kalshi_yes) * vol_min
if (arb > threshold && EV > 0.02) {
  alert()
  stageTrade()
}

kelly = edge / odds
impact = sentiment * vol_spike * geo_prox / resolution_time`}</pre>
        </TerminalPanel>
      </div>
    </div>
  );
}

