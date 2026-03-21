"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ArrowRightLeft, BrainCircuit, ChartColumn, Compass, Newspaper, Radar, Ship, Trophy, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useKratosStore } from "@/store/kratos-store";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", short: "DB", icon: Activity },
  { href: "/gods-eye", label: "Gods Eye", short: "PMAP", icon: Compass },
  { href: "/markets", label: "Markets", short: "MKT", icon: ChartColumn },
  { href: "/arbitrage", label: "Arbitrage", short: "ARB", icon: ArrowRightLeft },
  { href: "/news-impact", label: "News", short: "NEWS", icon: Newspaper },
  { href: "/stocks", label: "Stocks", short: "MACRO", icon: Radar },
  { href: "/sports", label: "Sports", short: "SPORT", icon: Trophy },
  { href: "/trading", label: "Trading", short: "EXEC", icon: Wallet },
  { href: "/mirofish", label: "MiroFish", short: "SWARM", icon: BrainCircuit },
  { href: "/psplc", label: "PSPLC", short: "SPLC", icon: ArrowRightLeft },
  { href: "/posh", label: "POSH", short: "POSH", icon: Ship },
  { href: "/pbql", label: "PBQL", short: "BQL", icon: Radar },
  { href: "/portfolio", label: "Portfolio", short: "P&L", icon: Wallet },
];

function StatusClock() {
  const date = new Date();
  const utcTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
    hour12: false,
  }).format(date);

  return <span className="text-xs text-slate-400">UTC {utcTime}</span>;
}

export function TerminalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { command, setCommand } = useKratosStore();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02060d] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.12),transparent_28%)]" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-35" />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1800px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[268px_minmax(0,1fr)]">
        <aside className="terminal-panel flex flex-col rounded-3xl border border-cyan-400/15 bg-black/50 p-4 backdrop-blur-xl">
          <div className="mb-6 border-b border-white/10 pb-4">
            <p className="text-[11px] uppercase tracking-[0.6em] text-cyan-300">KRATOS v4.0</p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-shadow-cyan">Prediction MAP</h1>
            <p className="mt-2 text-sm text-slate-400">Bloomberg-style geospatial analytics rebuilt for prediction markets.</p>
          </div>
          <nav className="grid gap-2">
            {NAV_ITEMS.map(({ href, label, short, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl border px-3 py-3 transition",
                    active
                      ? "border-cyan-300/50 bg-cyan-400/10 text-white shadow-[0_0_24px_rgba(6,182,212,0.16)]"
                      : "border-white/5 bg-white/[0.02] text-slate-300 hover:border-cyan-300/20 hover:bg-cyan-400/5",
                  )}
                >
                  <span className="flex items-center gap-3 text-sm">
                    <Icon className="h-4 w-4 text-cyan-300" />
                    {label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-300">{short}</span>
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Mode</p>
            <p className="mt-2 text-sm text-white">Live adapters enabled for Polymarket. Kalshi and auth-ready flows activate when environment keys are present.</p>
          </div>
        </aside>

        <main className="flex min-w-0 flex-col gap-4">
          <header className="terminal-panel rounded-3xl border border-white/10 bg-black/55 p-4">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-slate-400">Terminal Navigation</p>
                <h2 className="mt-2 text-xl font-semibold text-white">MAP / BMAP / SPLC / POSH architecture for prediction markets</h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex min-w-[320px] items-center rounded-2xl border border-cyan-400/20 bg-slate-950/80 px-3 py-2 shadow-[inset_0_0_0_1px_rgba(6,182,212,0.08)]">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">Command</span>
                  <input
                    value={command}
                    onChange={(event) => setCommand(event.target.value)}
                    className="ml-3 w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                    placeholder="PMAP<GO>"
                  />
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-2">
                  <span className="text-xs text-lime-300">SYS OK</span>
                  <StatusClock />
                </div>
              </div>
            </div>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}

