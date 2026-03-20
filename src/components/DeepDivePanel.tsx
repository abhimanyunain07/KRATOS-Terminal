import { Eye, ShieldAlert, TrendingUp, Users, Radio, Globe2, FileText } from "lucide-react";
import type { PolymarketEvent } from "../api/polymarket";
import { GlobeView } from "./GlobeView";

export function DeepDivePanel({ event }: { event: PolymarketEvent | null }) {
  if (!event) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-amber-700/50 p-4 text-center text-xs">
        <Eye size={32} className="mb-2 opacity-50" />
        <p>AWAITING TARGET</p>
        <p className="mt-1 text-[10px]">GOD'S EYE VIEW OFFLINE</p>
      </div>
    );
  }

  // Detect if it might be sports related (naive check for demonstration)
  const isSports = event.title.toLowerCase().match(/win|nba|nfl|mlb|champions league|match|game|vs/);

  return (
    <div className="flex flex-col h-full p-2 text-xs overflow-hidden">
      <div className="text-amber-500 font-bold border-b border-amber-900/30 pb-2 mb-2 flex items-center gap-2">
        <Eye size={16} className="text-amber-400" /> 
        <span className="uppercase tracking-widest text-[10px]">GOD'S EYE VIEW: ACTIVE DEEP SCAN</span>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* God's Eye Globe Container */}
        <div className="h-32 flex-none border-b border-amber-900/20 mb-2 relative overflow-hidden bg-black flex items-center justify-center">
           <div className="absolute top-1 left-1 text-[8px] text-amber-600 z-20 animate-pulse flex items-center gap-1">
             <Radio size={10} /> SATELLITE COM: ACTIVE
           </div>
           <div className="absolute top-1 right-1 text-[8px] text-green-500 z-20 font-mono">
             GLOBAL SCAN: OK
           </div>
           <GlobeView />
        </div>

        <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-transparent pr-2 pb-2">
        {isSports ? (
          <div className="flex flex-col gap-4">
            {/* Mock Sports Data */}
            <div className="border border-amber-900/40 bg-black/40 p-2 rounded relative overflow-hidden mt-1">
               <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 blur-xl rounded-full" />
               <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2 border-b border-amber-900/30 pb-1">
                 <Users size={12} /> TEAM HISTORICALS
               </h3>
               <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                 <div><span className="text-amber-700">Win Rate (L10):</span> <span className="text-green-500">70%</span></div>
                 <div><span className="text-amber-700">Home Adv:</span> <span className="text-amber-500">+1.5</span></div>
                 <div><span className="text-amber-700">Avg Pts/Game:</span> <span className="text-amber-500">112.4</span></div>
                 <div><span className="text-amber-700">Def Rating:</span> <span className="text-red-500">108.9</span></div>
               </div>
            </div>

            <div className="border border-red-900/40 bg-red-950/20 p-2 rounded">
               <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2 border-b border-red-900/30 pb-1">
                 <ShieldAlert size={12} /> INJURY REPORT / STATUS
               </h3>
               <ul className="list-disc list-inside text-[10px] text-red-500/80 font-mono space-y-1">
                 <li>Key Player 1 (Ankle) - QUESTIONABLE</li>
                 <li>Starting Defender (Knee) - OUT</li>
                 <li>Coach Illness - RESOLVED</li>
               </ul>
            </div>

            <div className="border border-green-900/40 bg-green-950/20 p-2 rounded">
               <h3 className="text-green-400 font-bold mb-2 flex items-center gap-2 border-b border-green-900/30 pb-1">
                 <TrendingUp size={12} /> FORM & MOMENTUM
               </h3>
               <div className="text-[10px] text-green-500/80 font-mono">
                 <p className="mb-1">Last 5: W W L W W</p>
                 <p>Offensive efficiency peaking at +15% above season average over last 3 matchups.</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Aggregated OSINT Data */}
            <div className="border border-amber-900/40 bg-black/40 p-2 rounded mt-1">
               <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2 border-b border-amber-900/30 pb-1">
                 <Globe2 size={12} /> GLOBAL OSINT AGGREGATION
               </h3>
               <div className="space-y-2 font-mono text-[10px]">
                 <div className="flex justify-between items-center bg-amber-900/20 px-1 py-0.5">
                   <span className="text-amber-600">News Outlets (Tier 1):</span>
                   <span className="text-green-400">Positive Coverage detected in 14 sources</span>
                 </div>
                 <div className="flex justify-between items-center bg-amber-900/20 px-1 py-0.5">
                   <span className="text-amber-600">Social Volume (X/Reddit):</span>
                   <span className="text-red-400">High Variance - Sentiment Mixed (42% POS / 58% NEG)</span>
                 </div>
                 <div className="flex justify-between items-center bg-amber-900/20 px-1 py-0.5">
                   <span className="text-amber-600">Dark Web/Alternative:</span>
                   <span className="text-amber-500">No significant chatter</span>
                 </div>
               </div>
            </div>

            <div className="border border-blue-900/40 bg-blue-950/20 p-2 rounded">
               <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2 border-b border-blue-900/30 pb-1">
                 <FileText size={12} /> REGULATORY & LEGAL DOCKETS
               </h3>
               <p className="text-[10px] text-blue-400/80 font-mono leading-relaxed mb-1">
                 &gt; Cross-referencing SEC, CFTC, and Congressional schedules...
               </p>
               <p className="text-[10px] text-blue-300 font-mono leading-relaxed">
                 No immediate regulatory blockers identified. However, historical precedent (ref: SEC v. Event Contracts, 2021) suggests a 15% probability of delayed settlement if market volatility exceeds 30-day moving average.
               </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
