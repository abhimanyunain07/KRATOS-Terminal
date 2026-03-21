import { PageHeader } from "@/components/layout/page-header";
import { DeployReadinessPanel } from "@/components/panels/deploy-readiness-panel";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export default function DeployPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Deploy"
        title="Deployment and release readiness"
        description="Production-focused diagnostics for Vercel, environment variables, and CI so KRATOS can move from local build success to hosted operation cleanly."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_0.42fr]">
        <DeployReadinessPanel />
        <TerminalPanel title="Release Flow" subtitle="Recommended order of operations">
          <ol className="space-y-3 text-sm text-slate-300">
            <li>1. Create the Supabase project and apply `supabase/schema.sql`.</li>
            <li>2. Add public and server env vars in Vercel.</li>
            <li>3. Connect the GitHub repo and verify preview builds.</li>
            <li>4. Promote Kalshi and news credentials only after preview validation.</li>
            <li>5. Verify `/api/health`, `/api/deploy/readiness`, and authenticated persistence in production.</li>
          </ol>
        </TerminalPanel>
      </div>
    </div>
  );
}
