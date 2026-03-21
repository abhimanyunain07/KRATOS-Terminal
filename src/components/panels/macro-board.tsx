import type { MacroInstrument } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export function MacroBoard({ instruments }: { instruments: MacroInstrument[] }) {
  return (
    <TerminalPanel title="Macro Context" subtitle="Cross-asset context feeding probability repricing">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {instruments.map((instrument) => (
          <article key={instrument.symbol} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">{instrument.symbol}</p>
            <h3 className="mt-2 text-lg text-white">{instrument.name}</h3>
            <p className="mt-2 text-2xl font-semibold text-white">{instrument.price.toFixed(2)}</p>
            <p className={`mt-2 text-sm ${instrument.changePct >= 0 ? "text-lime-300" : "text-red-300"}`}>
              {instrument.changePct >= 0 ? "+" : ""}
              {instrument.changePct.toFixed(2)}%
            </p>
            <p className="mt-3 text-xs leading-5 text-slate-400">{instrument.thesis}</p>
          </article>
        ))}
      </div>
    </TerminalPanel>
  );
}

