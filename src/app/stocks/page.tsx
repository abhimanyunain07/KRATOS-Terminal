import { PageHeader } from "@/components/layout/page-header";
import { MacroBoard } from "@/components/panels/macro-board";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { getMarketUniverse } from "@/lib/kratos-data";

export const dynamic = "force-dynamic";

export default async function StocksPage() {
  const universe = await getMarketUniverse();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Stocks / Commodities"
        title="Macro cross-asset context"
        description="Equities, crypto, and commodities panels designed to contextualize event repricing, alpha drift, and medium-term scenario risk."
      />
      <MacroBoard instruments={universe.macro} />
      <TerminalPanel title="Model Notes" subtitle="Prediction-market framing">
        <p className="text-sm leading-7 text-slate-300">
          The current build includes the macro board and architecture slots for a future TensorFlow.js forecaster. News alpha, Sharpe ranking, and regime switches are exposed in the UI layer but intentionally not faked as live model output.
        </p>
      </TerminalPanel>
    </div>
  );
}

