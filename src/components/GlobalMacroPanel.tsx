import { ArrowDownRight, ArrowUpRight, TrendingUp } from "lucide-react";

export function GlobalMacroPanel() {
  const indices = [
    { name: "S&P 500", value: "5,104.22", change: "+0.8%", up: true },
    { name: "NASDAQ", value: "16,041.62", change: "+1.2%", up: true },
    { name: "DOW", value: "39,131.53", change: "-0.1%", up: false },
    { name: "VIX", value: "13.82", change: "-4.5%", up: false },
    { name: "US10Y", value: "4.25%", change: "+0.02", up: true },
  ];

  const crypto = [
    { name: "BTC/USD", value: "68,452.00", change: "+2.4%", up: true },
    { name: "ETH/USD", value: "3,890.50", change: "+1.8%", up: true },
    { name: "SOL/USD", value: "142.10", change: "-0.5%", up: false },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden text-[10px] font-mono select-none">
      <div className="flex-1 grid grid-cols-2 gap-2">
        <div className="border border-amber-900/30 rounded bg-black/40 p-1 flex flex-col">
          <div className="text-amber-600 font-bold mb-1 pb-1 border-b border-amber-900/40 flex items-center gap-1 uppercase tracking-wider">
            <TrendingUp size={10} /> Equity Indices
          </div>
          <div className="flex-1 overflow-auto scrollbar-custom pr-1">
             {indices.map(i => (
               <div key={i.name} className="flex justify-between items-center py-0.5 border-b border-amber-900/10 hover:bg-amber-900/20 px-1">
                 <span className="text-amber-500 font-bold">{i.name}</span>
                 <div className="flex items-center gap-2">
                   <span className="text-amber-400">{i.value}</span>
                   <span className={`flex items-center w-10 justify-end ${i.up ? 'text-green-500 text-shadow-green' : 'text-red-500 text-shadow-red'}`}>
                     {i.change} {i.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                   </span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="border border-amber-900/30 rounded bg-black/40 p-1 flex flex-col">
          <div className="text-amber-600 font-bold mb-1 pb-1 border-b border-amber-900/40 flex items-center gap-1 uppercase tracking-wider">
            <TrendingUp size={10} /> Crypto Majors
          </div>
          <div className="flex-1 overflow-auto scrollbar-custom pr-1">
             {crypto.map(i => (
               <div key={i.name} className="flex justify-between items-center py-0.5 border-b border-amber-900/10 hover:bg-amber-900/20 px-1">
                 <span className="text-amber-500 font-bold">{i.name}</span>
                 <div className="flex items-center gap-2">
                   <span className="text-amber-400">{i.value}</span>
                   <span className={`flex items-center w-10 justify-end ${i.up ? 'text-green-500 text-shadow-green' : 'text-red-500 text-shadow-red'}`}>
                     {i.change} {i.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                   </span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
