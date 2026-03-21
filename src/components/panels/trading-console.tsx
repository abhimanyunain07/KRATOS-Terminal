import { ShieldCheck, Wallet2 } from "lucide-react";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export function TradingConsole() {
  return (
    <TerminalPanel title="Execution Console" subtitle="Kalshi and Polymarket adapters are structured for real credentials">
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Venue</span>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none">
                <option>Kalshi</option>
                <option>Polymarket</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Ticker</span>
              <input className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none" placeholder="PRES24-WIN" />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Side</span>
              <select className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none">
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Size</span>
              <input className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none" placeholder="$2,500" />
            </label>
          </div>
          <div className="flex gap-3">
            <button type="button" className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">
              Simulate Trade
            </button>
            <button type="button" className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Route to Venue
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
            <div className="flex items-center gap-3 text-lime-200">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm">Supabase Auth / WebAuthn slots prepared</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-300">
              Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Kalshi keys, and wallet settings to promote this console from simulated routing to live execution.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
            <div className="flex items-center gap-3 text-cyan-200">
              <Wallet2 className="h-4 w-4" />
              <span className="text-sm">Portfolio sync</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-slate-300">
              The UI is wired for positions, balances, and order staging. Authenticated API secrets remain environment-gated for safety.
            </p>
          </div>
        </div>
      </div>
    </TerminalPanel>
  );
}

