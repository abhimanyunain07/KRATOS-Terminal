import { ArrowRight, Activity } from "lucide-react";

export function ArbitrageScanner() {
  const opps = [
    { id: 1, market: "US Fed Rate Cut (Sep)", pB: 0.52, kB: 0.49, pA: 0.55, kA: 0.51, spread: "3.2%", vol: "$4,500", dir: "P -> K" },
    { id: 2, market: "Biden Dropping Out", pB: 0.88, kB: 0.82, pA: 0.90, kA: 0.85, spread: "5.8%", vol: "$12,200", dir: "K -> P" },
    { id: 3, market: "BTC > $100k EOY", pB: 0.45, kB: 0.47, pA: 0.47, kA: 0.49, spread: "1.1%", vol: "$1,800", dir: "K -> P" },
    { id: 4, market: "Supreme Court Rulings", pB: 0.22, kB: 0.18, pA: 0.25, kA: 0.21, spread: "4.0%", vol: "$8,900", dir: "P -> K" },
    { id: 5, market: "SpaceX Starship Launch", pB: 0.76, kB: 0.74, pA: 0.78, kA: 0.77, spread: "1.5%", vol: "$3,200", dir: "P -> K" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden text-[8px] font-mono">
      <div className="flex-none flex items-center justify-between mb-1 pb-1 border-b border-amber-900/40 px-1 bg-amber-900/10">
        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-wider">
          <Activity size={10} className="text-green-500 animate-pulse" /> HFT CROSS-EXCHANGE SCANNER
        </div>
        <div className="flex gap-2 font-mono">
          <span className="text-amber-700">LATENCY:</span>
          <span className="text-green-500">12ms</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto scrollbar-custom pr-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-amber-600 border-b border-amber-900/30 bg-black/80 sticky top-0 uppercase tracking-widest text-[7px]">
              <th className="py-1 px-1 font-normal w-1/3">Target Market</th>
              <th className="py-1 px-1 font-normal text-center">Poly (Bid/Ask)</th>
              <th className="py-1 px-1 font-normal text-center">Kshi (Bid/Ask)</th>
              <th className="py-1 px-1 font-normal text-right">Arbitrage Flow</th>
              <th className="py-1 px-1 font-normal text-right">Spread/Vol</th>
            </tr>
          </thead>
          <tbody>
            {opps.map(o => (
              <tr key={o.id} className="border-b border-amber-900/10 hover:bg-amber-900/20 cursor-pointer group">
                <td className="py-1.5 px-1 truncate max-w-[100px] text-amber-400 font-bold">{o.market}</td>
                <td className="py-1.5 px-1 text-center font-mono">
                  <span className="text-green-500">{o.pB}</span> <span className="text-amber-700">/</span> <span className="text-red-500">{o.pA}</span>
                </td>
                <td className="py-1.5 px-1 text-center font-mono">
                  <span className="text-green-500">{o.kB}</span> <span className="text-amber-700">/</span> <span className="text-red-500">{o.kA}</span>
                </td>
                <td className="py-1.5 px-1 text-right flex items-center justify-end gap-1 mt-0.5">
                  <span className={`px-1 rounded text-[7px] ${o.dir.startsWith('P') ? 'bg-purple-900/30 text-purple-400' : 'bg-blue-900/30 text-blue-400'}`}>
                    {o.dir.split(' ')[0]}
                  </span>
                  <ArrowRight size={8} className="text-amber-600" />
                  <span className={`px-1 rounded text-[7px] ${o.dir.endsWith('K') ? 'bg-blue-900/30 text-blue-400' : 'bg-purple-900/30 text-purple-400'}`}>
                    {o.dir.split(' ')[2]}
                  </span>
                </td>
                <td className="py-1.5 px-1 text-right">
                  <div className="flex flex-col items-end">
                    <span className="text-green-500 font-bold text-shadow-green text-[9px]">{o.spread}</span>
                    <span className="text-amber-600 text-[7px]">{o.vol}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
