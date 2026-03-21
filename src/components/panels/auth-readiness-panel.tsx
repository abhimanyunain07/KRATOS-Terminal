import type { RuntimeStatus } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";

const statusTone = {
  live: "border-lime-400/20 bg-lime-400/5 text-lime-200",
  configured: "border-cyan-400/20 bg-cyan-400/5 text-cyan-200",
  degraded: "border-amber-400/20 bg-amber-400/5 text-amber-200",
  offline: "border-white/10 bg-white/[0.03] text-slate-200",
};

export function AuthReadinessPanel({ runtime }: { runtime: RuntimeStatus }) {
  return (
    <TerminalPanel title="Runtime Health" subtitle="Infra and venue readiness">
      <div className="space-y-3">
        {runtime.services.map((service) => (
          <article key={service.key} className={`rounded-2xl border p-4 ${statusTone[service.status]}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm text-white">{service.label}</h3>
              <span className="text-[10px] uppercase tracking-[0.3em]">{service.status}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-300">{service.detail}</p>
          </article>
        ))}
      </div>
    </TerminalPanel>
  );
}

