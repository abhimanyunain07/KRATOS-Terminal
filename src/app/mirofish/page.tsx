import { PageHeader } from "@/components/layout/page-header";
import { SwarmPanel } from "@/components/panels/swarm-panel";

export default function MiroFishPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="MiroFish"
        title="Swarm consensus simulator"
        description="A terminal-native ensemble view for narrative agents, flow agents, and macro agents contributing to a shared consensus surface."
      />
      <SwarmPanel />
    </div>
  );
}

