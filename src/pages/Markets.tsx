import { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { MarketOverview } from '../components/MarketOverview';
import { DetailedMarket } from '../components/DetailedMarket';
import type { PolymarketEvent } from '../api/polymarket';
import { Filter, Search, TrendingUp, Cpu } from 'lucide-react';

export default function Markets() {
  const [selectedEvent, setSelectedEvent] = useState<PolymarketEvent | null>(null);
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = ["ALL", "POLITICS", "ECONOMY", "CRYPTO", "SCIENCE", "CULTURE"];

  return (
    <div className="flex flex-col h-full gap-4 relative">
      {/* Top Filter Bar */}
      <div className="flex-none h-12 bg-black/60 border border-cyan-800/40 rounded flex items-center justify-between px-4 z-10 backdrop-blur">
        <div className="flex items-center gap-3">
          <Filter size={14} className="text-cyan-600" />
          <div className="flex gap-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold font-mono px-3 py-1 rounded transition-all ${
                  activeCategory === cat 
                    ? 'bg-cyan-900/50 text-cyan-300 border border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.3)_inset]' 
                    : 'text-cyan-700 border border-transparent hover:border-cyan-800/50 hover:text-cyan-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border border-cyan-900/50 bg-black/80 px-3 py-1.5 rounded w-64 shadow-[0_0_10px_rgba(6,182,212,0.05)_inset]">
            <Search size={12} className="text-cyan-600" />
            <input 
               type="text" 
               placeholder="SEARCH PREDICTION MARKETS..." 
               className="bg-transparent border-none outline-none text-cyan-400 placeholder-cyan-900 w-full font-mono text-[10px] tracking-widest uppercase"
            />
          </div>
        </div>
      </div>

      <div className="flex h-full gap-4 min-h-0">
        {/* Market List */}
        <Panel 
           title={`Active Markets: ${activeCategory}`} 
           className="flex-[2] h-full"
           headerAddon={
             <span className="flex items-center gap-1 text-cyan-500">
                <Cpu size={12}/> DATA SYNC ACTIVE
             </span>
           }
        >
          <div className="h-full overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
             <MarketOverview onSelect={setSelectedEvent} />
          </div>
        </Panel>

        {/* Selected Market Detail */}
        <Panel 
           title="Deep Analysis / Execution" 
           className="flex-[1] h-full"
           headerAddon={
             <span className="flex items-center gap-1 text-amber-500">
                <TrendingUp size={12}/> TRADE READY
             </span>
           }
        >
          <div className="h-full overflow-hidden relative bg-black/40 rounded p-1">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.02)_0%,transparent_100%)] pointer-events-none" />
             <DetailedMarket event={selectedEvent} />
             
             {/* Simulated Execute Button appended below details */}
             {selectedEvent && (
                <div className="mt-4 border-t border-cyan-900/50 pt-4 flex flex-col gap-2 relative z-10">
                   <div className="text-[9px] font-mono text-cyan-600 uppercase tracking-widest text-center">
                     Algorithm suggests maximum allocation of $2,500
                   </div>
                   <button className="w-full bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-500/50 text-cyan-300 py-2 rounded font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)_inset] flex items-center justify-center gap-2 group">
                     INITIATE ALGO-TRADE <TrendingUp size={14} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
             )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
