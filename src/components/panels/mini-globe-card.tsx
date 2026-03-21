import type { MarketUniverse } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { KratosGlobe } from "@/components/globe/kratos-globe";

export function MiniGlobeCard({ universe, title = "Quick Globe" }: { universe: MarketUniverse; title?: string }) {
  return (
    <TerminalPanel title={title} subtitle="Drillable PMAP preview">
      <KratosGlobe
        markets={universe.markets.slice(0, 32)}
        arcs={universe.arcs.slice(0, 12)}
        labels={universe.labels.slice(0, 8)}
        vessels={universe.vessels.slice(0, 4)}
        layers={universe.layers}
        height={320}
      />
    </TerminalPanel>
  );
}

