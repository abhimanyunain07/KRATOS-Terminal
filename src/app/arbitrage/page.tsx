'use client';
import { useState, useEffect } from 'react';

export default function ArbitragePage() {
  const [arbs, setArbs] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setArbs([
        { id: Date.now(), title: 'US Shutdown by October', poly: 0.45, kalshi: 0.48, vol: 24500, ev: 0.03 },
        { id: Date.now()+1, title: 'Fed Cuts 50bps', poly: 0.82, kalshi: 0.79, vol: 150000, ev: 0.025 },
        { id: Date.now()+2, title: 'TSMC Q3 Revenue Beat', poly: 0.61, kalshi: 0.65, vol: 89000, ev: 0.038 }
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full p-4 flex flex-col gap-4 overflow-hidden">
      <header className="flex justify-between items-center pb-2 border-b border-[#333] shrink-0">
        <div>
           <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">Arbitrage Scanner</h1>
           <div className="text-xs text-gray-500 mt-1">HFT SCAN: Polymarket vs Kalshi</div>
        </div>
        <div className="text-green-500 text-sm font-mono animate-pulse">● LIVE SCANNING μs DIFFS</div>
      </header>
      
      <div className="flex-1 overflow-auto glassmorphism p-4 rounded">
        <table className="w-full text-left font-mono text-sm">
          <thead>
            <tr className="border-b border-[#333] text-amber-500">
              <th className="pb-2">MARKET</th>
              <th className="pb-2">POLYMARKET</th>
              <th className="pb-2">KALSHI</th>
              <th className="pb-2">SPREAD</th>
              <th className="pb-2">AVAILABLE VOL</th>
              <th className="pb-2">EST. EV</th>
              <th className="pb-2">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {arbs.map(arb => {
              const spread = Math.abs(arb.poly - arb.kalshi);
              return (
                <tr key={arb.id} className="border-b border-[#222] hover:bg-[#111] transition-colors">
                  <td className="py-3 text-gray-300">{arb.title}</td>
                  <td className="py-3 text-cyan-400">{(arb.poly * 100).toFixed(1)}%</td>
                  <td className="py-3 text-cyan-400">{(arb.kalshi * 100).toFixed(1)}%</td>
                  <td className="py-3 text-amber-500 font-bold">{(spread * 100).toFixed(1)}%</td>
                  <td className="py-3 text-gray-400">${arb.vol.toLocaleString()}</td>
                  <td className="py-3 text-green-500">+{arb.ev.toFixed(3)}</td>
                  <td className="py-3">
                    <button className="bg-cyan-900 border border-cyan-500 text-cyan-400 px-3 py-1 hover:bg-cyan-500 hover:text-black hover:cursor-crosshair">EXECUTE</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
