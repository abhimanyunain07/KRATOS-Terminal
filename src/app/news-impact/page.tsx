import { PageHeader } from "@/components/layout/page-header";
import { NewsGrid } from "@/components/panels/news-grid";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function NewsImpactPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="News Impact"
        title="Headline-to-market repricing engine"
        description="Impact scoring fuses sentiment, volatility spikes, geography, and resolution time into a market action surface built for event traders."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.34fr]">
        <NewsGrid items={[...universe.news, ...universe.news, ...universe.news].slice(0, 9)} />
        <TerminalPanel title="Correlations" subtitle="Top linked narratives">
          <div className="space-y-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white">
              Ukraine strike {"->"} energy vol +15%
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white">
              Taiwan shipping stress {"->"} semi markets +11%
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-white">
              Polling shock {"->"} swing-state arb window +6c
            </div>
          </div>
        </TerminalPanel>
      </div>
    </div>
  );
}
