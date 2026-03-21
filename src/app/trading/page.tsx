import { PageHeader } from "@/components/layout/page-header";
import { AuthReadinessPanel } from "@/components/panels/auth-readiness-panel";
import { TradingConsole } from "@/components/panels/trading-console";
import { getRuntimeStatus } from "@/lib/runtime-status";

export default function TradingPage() {
  const runtime = getRuntimeStatus();

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Trading Auth"
        title="Execution and account access"
        description="Auth-ready trade staging console for venue routing, wallet connections, and future live order sync."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.38fr]">
        <TradingConsole runtime={runtime} />
        <AuthReadinessPanel runtime={runtime} />
      </div>
    </div>
  );
}

