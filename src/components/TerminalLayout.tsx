import React from 'react';
import { Activity, Clock, Globe, Settings, Terminal, TrendingUp, Cpu } from 'lucide-react';

interface TerminalLayoutProps {
  children: React.ReactNode;
}

export function TerminalLayout({ children }: TerminalLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-amber-500 font-mono text-sm antialiased overflow-hidden flex flex-col selection:bg-amber-500 selection:text-black scanlines relative">
      {/* Top Header Bar */}
      <header className="flex-none h-8 border-b border-amber-500/30 flex items-center justify-between px-2 bg-gradient-to-b from-amber-900/20 to-black shrink-0 z-10 box-shadow-amber relative shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-shadow-amber tracking-widest">
            <Terminal size={14} className="animate-pulse" />
            <span>POLY-TERM v2.0.0-PRO</span>
          </div>
          <div className="h-4 w-[1px] bg-amber-900/50" />
          <nav className="flex gap-4 text-amber-600">
            <button className="hover:text-amber-400 transition-colors uppercase text-xs tracking-wider flex items-center gap-1">
              <TrendingUp size={12} /> Markets
            </button>
            <button className="hover:text-amber-400 transition-colors uppercase text-xs tracking-wider flex items-center gap-1">
              <Activity size={12} /> Feed
            </button>
            <button className="hover:text-amber-400 transition-colors uppercase text-xs tracking-wider flex items-center gap-1">
              <Globe size={12} /> Global
            </button>
          </nav>
        </div>
        
        <div className="flex items-center gap-4 text-amber-600 text-xs">
          <div className="flex items-center gap-2 border border-amber-900/50 bg-black/50 px-2 py-0.5 rounded">
            <input 
               type="text" 
               id="global-search"
               placeholder="> SEARCH MARKETS..." 
               className="bg-transparent border-none outline-none text-amber-500 placeholder-amber-900/80 w-48 font-mono text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <Cpu size={12} />
            <span>SYS: OK</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={12} />
            <span>{new Date().toISOString().split('T')[1].split('.')[0]} UTC</span>
          </div>
          <button className="hover:text-amber-400 transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 overflow-hidden p-1.5 z-10 relative">
        {children}
      </main>

      {/* Status Bar */}
      <footer className="flex-none h-6 border-t border-amber-500/30 flex items-center justify-between px-2 text-xs text-amber-600 bg-gradient-to-t from-amber-900/20 to-black shrink-0 z-10 box-shadow-amber font-semibold relative">
        <div className="flex gap-4">
          <span>CONNECTION: SECURE</span>
          <span>LATENCY: 42ms</span>
        </div>
        <div className="flex gap-4">
          <span className="uppercase">Polymarket Gamma API Connected</span>
        </div>
      </footer>
    </div>
  );
}

export function Panel({ 
  title, 
  children, 
  className = "" 
}: { 
  title: string; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col border border-amber-600/30 bg-black/80 shadow-[0_0_15px_rgba(245,158,11,0.05)_inset] rounded-sm backdrop-blur-sm ${className}`}>
      <div className="h-7 flex-none bg-gradient-to-r from-amber-900/40 to-transparent border-b border-amber-600/30 px-2 flex items-center text-[10px] font-bold text-amber-400 uppercase tracking-widest text-shadow-amber">
        {title}
      </div>
      <div className="flex-1 overflow-hidden p-1.5 relative">
        {children}
      </div>
    </div>
  );
}
