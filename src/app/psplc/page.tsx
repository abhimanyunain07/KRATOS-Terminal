import { PageHeader } from "@/components/layout/page-header";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";
import { formatCompactNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PsplcPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="PSPLC"
        title="Event dependency graph"
        description="Bloomberg SPLC-inspired dependency mapping for event clusters, exposure tiers, and downstream volume-at-risk."
      />
      <TerminalPanel title="Dependency Arcs" subtitle="Tiered correlation graph">
        <div className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-white/8 px-1 pb-2 text-[10px] uppercase tracking-[0.35em] text-slate-500">
          <span>Path</span>
          <span>Exposure</span>
          <span>Tier 1</span>
          <span>Tier 2</span>
          <span>Tier 3</span>
        </div>
        <div className="max-h-[520px] overflow-auto">
          {universe.arcs.map((arc) => (
            <div key={arc.id} className="grid grid-cols-[1.4fr_1fr_0.8fr_0.8fr_0.8fr] gap-3 border-b border-white/6 px-1 py-3 text-sm text-slate-200">
              <span className="truncate">{arc.dependencyLabel}</span>
              <span>{formatCompactNumber(arc.volumeExposure)}</span>
              <span>{(arc.tier1 * 100).toFixed(0)}%</span>
              <span>{(arc.tier2 * 100).toFixed(0)}%</span>
              <span>{(arc.tier3 * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </TerminalPanel>
    </div>
  );
}

