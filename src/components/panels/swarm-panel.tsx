import { TerminalPanel } from "@/components/ui/terminal-panel";

const SWARM_AGENTS = [
  { name: "Macro Pulse", weight: 0.24, thesis: "Rates and liquidity conditions bias political event drift upward." },
  { name: "Conflict Watch", weight: 0.21, thesis: "Shipping and conflict anomalies increase tail-risk pricing in energy markets." },
  { name: "Polling Drift", weight: 0.27, thesis: "State-level survey momentum favors selective venue dislocations." },
  { name: "Flow Miner", weight: 0.18, thesis: "Order flow clustering implies short-term mean reversion after impact spikes." },
  { name: "Narrative Lens", weight: 0.1, thesis: "Headline saturation is reaching diminishing-return territory." },
];

export function SwarmPanel() {
  return (
    <TerminalPanel title="MiroFish Swarm" subtitle="Agent consensus surface for ensemble event pricing">
      <div className="grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[320px] rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.22),transparent_35%),rgba(2,6,23,0.85)]">
          <div className="absolute inset-0 grid grid-cols-6 gap-1 p-4">
            {Array.from({ length: 72 }).map((_, index) => (
              <span
                key={index}
                className="rounded-full"
                style={{
                  width: 6 + (index % 4),
                  height: 6 + (index % 4),
                  background: index % 3 === 0 ? "#06b6d4" : index % 4 === 0 ? "#f59e0b" : "#84cc16",
                  opacity: 0.35 + ((index * 17) % 50) / 100,
                  transform: `translate(${(index % 6) * 12}px, ${(index % 9) * 6}px)`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {SWARM_AGENTS.map((agent) => (
            <article key={agent.name} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm text-white">{agent.name}</h3>
                <span className="text-xs text-cyan-300">{(agent.weight * 100).toFixed(0)}%</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">{agent.thesis}</p>
            </article>
          ))}
        </div>
      </div>
    </TerminalPanel>
  );
}

