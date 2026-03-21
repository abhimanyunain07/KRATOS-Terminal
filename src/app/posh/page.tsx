import { PageHeader } from "@/components/layout/page-header";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function PoshPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="POSH"
        title="Liquidity vessel tracking"
        description="POSH-style shipping overlay for energy-event logistics, dark-fleet alerts, and tanker-linked risk monitoring."
      />
      <TerminalPanel title="Vessel Feed" subtitle="Shipping analog for energy and geopolitical event stress">
        <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_1.2fr] gap-3 border-b border-white/8 px-1 pb-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">
          <span>Name</span>
          <span>Status</span>
          <span>Draft</span>
          <span>Risk</span>
          <span>Theme</span>
        </div>
        <div className="max-h-[520px] overflow-auto">
          {universe.vessels.map((vessel) => (
            <div key={vessel.id} className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_1.2fr] gap-3 border-b border-white/6 px-1 py-3 text-sm text-slate-200">
              <span>{vessel.name}</span>
              <span className={vessel.status === "dark" ? "text-red-300" : "text-cyan-300"}>{vessel.status}</span>
              <span>{vessel.draftChange.toFixed(2)}m</span>
              <span>{(vessel.riskSignal * 100).toFixed(0)}</span>
              <span className="truncate">{vessel.linkedTheme}</span>
            </div>
          ))}
        </div>
      </TerminalPanel>
    </div>
  );
}

