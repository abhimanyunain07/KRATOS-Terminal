"use client";

import { useEffect, useState } from "react";
import type { DeployReadinessReport } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";

const toneStyles = {
  ready: "border-lime-400/20 bg-lime-400/5 text-lime-200",
  warning: "border-amber-400/20 bg-amber-400/5 text-amber-200",
  missing: "border-red-400/20 bg-red-400/5 text-red-200",
};

export function DeployReadinessPanel() {
  const [report, setReport] = useState<DeployReadinessReport | null>(null);

  useEffect(() => {
    let active = true;

    void fetch("/api/deploy/readiness")
      .then((response) => response.json())
      .then((payload: DeployReadinessReport) => {
        if (active) {
          setReport(payload);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <TerminalPanel title="Deploy Readiness" subtitle="Vercel and environment diagnostics">
      <div className="space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Target</p>
          <p className="mt-2 text-sm text-white">{report?.recommendedTarget ?? "Loading deployment report..."}</p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{report?.note ?? "Checking deployment prerequisites."}</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {report?.checks.map((check) => (
            <article key={check.key} className={`rounded-2xl border p-4 ${toneStyles[check.status]}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm text-white">{check.label}</h3>
                <span className="text-[10px] uppercase tracking-[0.3em]">{check.status}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-300">{check.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </TerminalPanel>
  );
}

