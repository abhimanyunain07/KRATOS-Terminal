import { PageHeader } from "@/components/layout/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export default function PortfolioPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Portfolio"
        title="Positions and exposure"
        description="Portfolio shell for balance tracking, risk overlays, venue allocations, and future authenticated sync."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Net P&L" value="$42.8K" detail="Demo shell until auth keys are configured" />
        <MetricCard label="Risk Budget" value="14.2%" detail="Kelly-capped exposure" tone="amber" />
        <MetricCard label="Open Positions" value="18" detail="Venue-split across live adapters" tone="lime" />
      </div>
      <TerminalPanel title="Exposure Notes" subtitle="What is live versus env-gated">
        <p className="text-sm leading-7 text-slate-300">
          The portfolio surface is production-shaped but intentionally does not invent balances or positions from unsupported venues. Once auth secrets are configured, this page is where Supabase-backed user state and venue balances should land.
        </p>
      </TerminalPanel>
    </div>
  );
}

