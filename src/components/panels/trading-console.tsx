"use client";

import { useState } from "react";
import { ShieldCheck, Wallet2 } from "lucide-react";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import type { RuntimeStatus, TradeSimulationResponse } from "@/types/kratos";
import { authorizedFetch } from "@/lib/supabase";

export function TradingConsole({ runtime }: { runtime: RuntimeStatus }) {
  const [venue, setVenue] = useState<"Kalshi" | "Polymarket">("Kalshi");
  const [ticker, setTicker] = useState("PRES24-WIN");
  const [side, setSide] = useState<"Yes" | "No">("Yes");
  const [stakeUsd, setStakeUsd] = useState("2500");
  const [price, setPrice] = useState("0.63");
  const [probability, setProbability] = useState("0.68");
  const [result, setResult] = useState<TradeSimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function simulateTrade() {
    setLoading(true);
    setResult(null);
    setMessage(null);

    try {
      const response = await fetch("/api/trade/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          venue,
          ticker,
          side,
          stakeUsd: Number(stakeUsd),
          price: Number(price),
          probability: Number(probability),
        }),
      });

      const payload = (await response.json()) as TradeSimulationResponse;
      setResult(payload);
    } finally {
      setLoading(false);
    }
  }

  async function recordPosition() {
    if (!result) {
      return;
    }

    const response = await authorizedFetch("/api/positions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        venue: result.venue,
        ticker: result.ticker,
        title: result.ticker,
        side: result.side,
        contracts: result.contracts,
        averagePrice: Number(price),
        markProbability: Number(probability),
        unrealizedPnlUsd: result.estimatedEdgeUsd,
      }),
    });

    const payload = (await response.json()) as { message?: string };
    setMessage(payload.message ?? (response.ok ? "Simulated position recorded." : "Unable to record position."));
  }

  return (
    <TerminalPanel title="Execution Console" subtitle="Kalshi and Polymarket adapters are structured for real credentials">
      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Venue</span>
              <select
                value={venue}
                onChange={(event) => setVenue(event.target.value as "Kalshi" | "Polymarket")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Kalshi">Kalshi</option>
                <option value="Polymarket">Polymarket</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Ticker</span>
              <input
                value={ticker}
                onChange={(event) => setTicker(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
                placeholder="PRES24-WIN"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Side</span>
              <select
                value={side}
                onChange={(event) => setSide(event.target.value as "Yes" | "No")}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Size</span>
              <input
                value={stakeUsd}
                onChange={(event) => setStakeUsd(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
                placeholder="$2,500"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Entry Price</span>
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
                placeholder="0.63"
              />
            </label>
            <label className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Model Probability</span>
              <input
                value={probability}
                onChange={(event) => setProbability(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none"
                placeholder="0.68"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => void simulateTrade()}
              className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200"
            >
              {loading ? "Simulating..." : "Simulate Trade"}
            </button>
            <button
              type="button"
              disabled={!runtime.tradeRoutingEnabled}
              className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {runtime.tradeRoutingEnabled ? "Route to Venue" : "Credentials Required"}
            </button>
            <button
              type="button"
              onClick={() => void recordPosition()}
              disabled={!result}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Record Sim Position
            </button>
          </div>
          {message ? <p className="text-xs text-amber-200">{message}</p> : null}
          {result ? (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Simulation Output</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-400">Contracts</p>
                  <p className="mt-1 text-xl text-white">{result.contracts.toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Edge</p>
                  <p className="mt-1 text-xl text-white">${result.estimatedEdgeUsd.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Max payout</p>
                  <p className="mt-1 text-xl text-white">${result.maxPayoutUsd.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Kelly</p>
                  <p className="mt-1 text-xl text-white">{(result.kellyFraction * 100).toFixed(1)}%</p>
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-300">{result.note}</p>
            </div>
          ) : null}
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-4">
            <div className="flex items-center gap-3 text-lime-200">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm">{runtime.authEnabled ? "Supabase auth configured" : "Supabase Auth / WebAuthn slots prepared"}</span>
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
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Route status</p>
            <p className="mt-2 text-sm text-white">
              {runtime.tradeRoutingEnabled
                ? "Authenticated trade routing may be enabled from the environment."
                : "Only simulation is active right now. No fake live trading is being shown."}
            </p>
          </div>
        </div>
      </div>
    </TerminalPanel>
  );
}
