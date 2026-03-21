import { PageHeader } from "@/components/layout/page-header";
import { TradingConsole } from "@/components/panels/trading-console";

export default function TradingPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Trading Auth"
        title="Execution and account access"
        description="Auth-ready trade staging console for venue routing, wallet connections, and future live order sync."
      />
      <TradingConsole />
    </div>
  );
}

