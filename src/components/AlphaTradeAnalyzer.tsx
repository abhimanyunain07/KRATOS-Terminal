import { Crosshair, ShieldCheck, Target, TrendingUp } from "lucide-react";

export function AlphaTradeAnalyzer() {
  const signal = {
    market: "Federal Funds Target Rate (Dec 2024)",
    strategy: "Mean Reversion / OSINT Divergence",
    action: "BUY NO",
    price: 0.32,
    fairValue: 0.18,
    ev: "+43.7%",
    kelly: "4.2%",
    maxDrawdown: "-12.5%",
    sharpe: 2.1,
    confidence: "HIGH",
    reasoning: [
      "Swarm simulation models 18% true probability vs market 32%.",
      "Recent CPI data indicates slower disinflation, blocking aggressive cuts.",
      "Arbitrage window widening on KSHI (Ask: 0.38)."
    ]
  };

  return (
    <div className="flex flex-col h-full overflow-hidden text-[9px] font-mono">
      <div className="flex-none flex items-center gap-2 text-green-500 font-bold uppercase tracking-wider mb-2 border-b border-green-900/40 pb-1 bg-green-900/10 px-2 py-1">
        <Target size={12} className="animate-pulse text-shadow-green" /> ALPHA-TRADE ALGORITHMIC SUGGESTION
      </div>

      <div className="flex-1 overflow-auto scrollbar-custom flex flex-col gap-2 px-1">
        <div className="bg-black/60 border border-green-900/40 rounded p-1.5 shadow-[0_0_15px_rgba(34,197,94,0.05)_inset]">
           <div className="text-[11px] font-bold text-green-400 mb-1 leading-tight flex justify-between items-start">
             <span className="max-w-[80%]">{signal.market}</span>
             <span className="bg-green-900/40 text-green-300 px-1 py-0.5 rounded text-[8px] animate-pulse">AUTO-SIGNAL</span>
           </div>
           
           <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[9px]">
             <div className="flex justify-between border-b border-green-900/30 py-0.5"><span className="text-amber-700">Strategy:</span> <span className="text-amber-400 truncate ml-2 text-right">{signal.strategy}</span></div>
             <div className="flex justify-between border-b border-green-900/30 py-0.5"><span className="text-amber-700">Action:</span> <span className="text-green-500 font-bold">{signal.action} @ {signal.price}</span></div>
             <div className="flex justify-between border-b border-green-900/30 py-0.5"><span className="text-amber-700">Fair Value:</span> <span className="text-blue-400 font-bold">{signal.fairValue}</span></div>
             <div className="flex justify-between border-b border-green-900/30 py-0.5"><span className="text-amber-700">Expected Val:</span> <span className="text-green-500 text-shadow-green">{signal.ev}</span></div>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-1">
           <div className="bg-black/40 border border-amber-900/30 rounded p-1 flex flex-col items-center justify-center text-center">
              <span className="text-amber-700 uppercase text-[7px] mb-0.5 font-bold flex items-center gap-0.5"><Crosshair size={8}/> Kelly Size</span>
              <span className="text-amber-400 font-bold text-[10px]">{signal.kelly}</span>
           </div>
           <div className="bg-black/40 border border-amber-900/30 rounded p-1 flex flex-col items-center justify-center text-center">
              <span className="text-amber-700 uppercase text-[7px] mb-0.5 font-bold flex items-center gap-0.5"><ShieldCheck size={8}/> Max Draw</span>
              <span className="text-red-400 font-bold text-[10px]">{signal.maxDrawdown}</span>
           </div>
           <div className="bg-black/40 border border-amber-900/30 rounded p-1 flex flex-col items-center justify-center text-center">
              <span className="text-amber-700 uppercase text-[7px] mb-0.5 font-bold flex items-center gap-0.5"><TrendingUp size={8}/> Sharpe</span>
              <span className="text-blue-400 font-bold text-[10px]">{signal.sharpe}</span>
           </div>
        </div>

        <div className="flex-1 bg-black/40 border border-amber-900/30 rounded p-1 mt-1 flex flex-col">
           <span className="text-amber-600 font-bold text-[8px] uppercase tracking-widest border-b border-amber-900/40 pb-0.5 mb-1">Deep Analysis Reasoning</span>
           <ul className="list-disc list-inside text-[8px] text-amber-500/80 leading-relaxed space-y-0.5 pr-1">
             {signal.reasoning.map((r, i) => (
               <li key={i}>{r}</li>
             ))}
           </ul>
        </div>
      </div>
    </div>
  );
}
