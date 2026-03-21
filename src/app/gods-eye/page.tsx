import { PageHeader } from "@/components/layout/page-header";
import { BqlPanel } from "@/components/panels/bql-panel";
import { LayerPanel } from "@/components/panels/layer-panel";
import { KratosGlobe } from "@/components/globe/kratos-globe";
import { MetricCard } from "@/components/ui/metric-card";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function GodsEyePage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="PMAP<GO>"
        title="Gods Eye geospatial analytics"
        description="Rotatable 3D globe with click-through event pins, SPLC analog dependency arcs, POSH-style vessel alerts, hover-tooltips, and PBQL drill-down output."
        rightSlot={
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Layers" value={String(universe.layers.length)} detail="Toggleable datasets" />
            <MetricCard label="Arcs" value={String(universe.arcs.length)} detail="Dependency flows" tone="amber" />
            <MetricCard label="Vessels" value={String(universe.vessels.length)} detail="POSH tracks" tone="lime" />
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.42fr]">
        <KratosGlobe
          markets={universe.markets}
          arcs={universe.arcs}
          labels={universe.labels}
          vessels={universe.vessels}
          layers={universe.layers}
          height={760}
        />
        <div className="grid gap-4">
          <BqlPanel />
          <LayerPanel layers={universe.layers} />
        </div>
      </div>
    </div>
  );
}

