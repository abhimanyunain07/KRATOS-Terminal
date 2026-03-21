import { PageHeader } from "@/components/layout/page-header";
import { MarketTable } from "@/components/panels/market-table";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function MarketsPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Markets"
        title="Venue-normalized event market browser"
        description="Politics, sports, macro, crypto, and geopolitical markets mapped into a single event schema with click-through drill, venue comparison, and trade staging."
      />
      <div className="grid gap-4 xl:grid-cols-2">
        <MarketTable title="Politics / Geopolitics" markets={universe.markets.filter((market) => ["Politics", "Geopolitics"].includes(market.category)).slice(0, 18)} />
        <MarketTable title="Macro / Crypto / Sports" markets={universe.markets.filter((market) => ["Macro", "Crypto", "Sports"].includes(market.category)).slice(0, 18)} />
      </div>
    </div>
  );
}

