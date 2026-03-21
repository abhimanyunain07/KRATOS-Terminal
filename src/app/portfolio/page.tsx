import { PageHeader } from "@/components/layout/page-header";
import { PortfolioSummary } from "@/components/panels/portfolio-summary";
import { WatchlistPanel } from "@/components/panels/watchlist-panel";

export default function PortfolioPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Portfolio"
        title="Positions and exposure"
        description="Portfolio shell for balance tracking, risk overlays, venue allocations, and future authenticated sync."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.42fr]">
        <PortfolioSummary />
        <WatchlistPanel />
      </div>
    </div>
  );
}
