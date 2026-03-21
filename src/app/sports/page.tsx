import { PageHeader } from "@/components/layout/page-header";
import { MarketTable } from "@/components/panels/market-table";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function SportsPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Sports"
        title="Sports event analytics"
        description="Odds, form, injuries, and venue-context panels adapted to the same terminal shell, ready for ESPN or sportsbook feed expansion."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.36fr]">
        <MarketTable title="Sports Universe" markets={universe.markets.filter((market) => market.category === "Sports").slice(0, 16)} />
        <TerminalPanel title="Bet Engine" subtitle="Poisson and form factors">
          <div className="space-y-3 text-sm text-slate-300">
            <p>Form gradient, injury delta, rest-day penalty, and public-bias flags are modeled as feature slots in the execution layer.</p>
            <p>Live score integrations and sportsbook connectors should be mounted as authenticated adapters rather than hardcoded feeds.</p>
          </div>
        </TerminalPanel>
      </div>
    </div>
  );
}

