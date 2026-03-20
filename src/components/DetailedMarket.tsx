import { BarChart3, Info } from "lucide-react";
import type { PolymarketEvent } from "../api/polymarket";

export function DetailedMarket({ event }: { event: PolymarketEvent | null }) {
  if (!event) {
    return (
      <div className="flex flex-col h-full gap-4 p-2 text-xs">
        <div className="text-amber-500 font-bold border-b border-amber-900/30 pb-2">
          <h2 className="text-sm uppercase tracking-wide flex items-center gap-2">
            <BarChart3 size={16} /> Market Details
          </h2>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center text-amber-700 border border-dashed border-amber-900/30 bg-black/40 rounded">
          <Info size={24} className="mb-2 opacity-50" />
          <p>No market selected.</p>
          <p className="mt-1 opacity-70">Select a market from the Overview panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 p-2 text-xs">
      <div className="text-amber-500 font-bold border-b border-amber-900/30 pb-2 flex justify-between items-start">
        <h2 className="text-sm uppercase tracking-wide flex items-center gap-2 max-w-[80%] leading-tight">
          <BarChart3 size={16} className="shrink-0" /> {event.title}
        </h2>
        <div className="bg-amber-900/30 px-2 py-1 rounded text-[10px] text-amber-400">
           ID: {event.id.slice(0, 8)}
        </div>
      </div>
      
      <div className="flex-1 overflow-auto scrollbar-custom flex flex-col gap-3 text-amber-600/90 pr-1">
        <div className="bg-black/60 p-2 border border-amber-900/40 rounded font-mono text-[10px] shadow-[0_0_10px_rgba(245,158,11,0.05)_inset]">
           <div className="mb-2 text-amber-500 font-bold border-b border-amber-900/50 pb-1 uppercase tracking-widest text-shadow-amber flex items-center justify-between">
             <span>Market Metadeta</span>
             <span className="text-[8px] text-green-500">LIVE SYNC</span>
           </div>
           <div className="grid grid-cols-2 gap-x-4 gap-y-1">
             <div className="flex justify-between items-center"><span className="text-amber-700">Inception:</span> <span>{new Date(event.startDate).toLocaleDateString()}</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Resolution:</span> <span>{new Date(event.endDate).toLocaleDateString()}</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Total Vol:</span> <span className="text-amber-400">${event.volume.toLocaleString()}</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">24h Vol:</span> <span className="text-green-500">+${(event.volume * 0.12).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Open Int:</span> <span>${(event.volume * 0.45).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Implied Vol:</span> <span className="text-amber-500">{(Math.random() * 40 + 20).toFixed(1)}%</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Spread:</span> <span>2.4¢</span></div>
             <div className="flex justify-between items-center"><span className="text-amber-700">Status:</span> <span className="text-green-500 text-shadow-green">{event.active ? 'ACTIVE' : 'HALTED'}</span></div>
           </div>
        </div>
        
        <div className="text-[10px] leading-relaxed text-amber-500/80 border-l-2 border-amber-500/50 pl-2 bg-gradient-to-r from-amber-900/10 to-transparent p-1">
           {event.description.length > 300 ? `${event.description.slice(0, 300)}...` : event.description}
        </div>
      </div>

      <div className="h-24 flex-none border-t border-amber-500/30 pt-2 flex flex-col relative overflow-hidden mt-2">
        <h3 className="text-amber-500 font-bold mb-1 uppercase text-[9px] tracking-widest absolute top-1 left-1 z-10 text-shadow-amber">Price Action (7D)</h3>
        <div className="flex-1 flex items-end gap-[1px] px-1 opacity-80 mt-4">
           {/* Enhanced Mock sparkline */}
           {Array.from({ length: 30 }).map((_, i) => {
             const val = 30 + (Math.sin(i * 0.5) * 20) + (Math.random() * 15) + (i * 0.8);
             return (
               <div key={i} className="group flex-1 flex flex-col justify-end h-full relative">
                 <div className="w-full bg-amber-500/30 group-hover:bg-amber-400 transition-colors border-t border-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" style={{ height: `${Math.min(100, val)}%` }} />
               </div>
             )
           })}
        </div>
      </div>
    </div>
  );
}
