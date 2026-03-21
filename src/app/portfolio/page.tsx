import { PageHeader } from "@/components/layout/page-header";
import { PortfolioSummary } from "@/components/panels/portfolio-summary";

export default function PortfolioPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Portfolio"
        title="Positions and exposure"
        description="Portfolio shell for balance tracking, risk overlays, venue allocations, and future authenticated sync."
      />
      <PortfolioSummary />
    </div>
  );
}
