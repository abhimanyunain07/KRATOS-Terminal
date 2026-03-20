'use client';
import useAppStore from '@/store/useAppStore';

export default function PortfolioPage() {
  const user = useAppStore(state => state.user);

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <header className="flex justify-between items-center pb-2 border-b border-[#333] shrink-0">
        <div>
           <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">Live Portfolio & Balances</h1>
           <div className="text-xs text-gray-500 mt-1">KALSHI / POLYMARKET PROD APIs</div>
        </div>
      </header>
      
      <div className="flex-1 p-4 glassmorphism">
        {!user ? (
           <div className="text-amber-500 text-sm font-mono flex items-center justify-center h-full">
             AUTH_REQUIRED: PLEASE EXECUTE LOGIN TO VIEW PORTFOLIO POSITIONS
           </div>
        ) : (
           <div className="font-mono text-sm">
             <h2 className="text-cyan-500 font-bold mb-4">TOTAL WALLET BALANCE: $124,500.00</h2>
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-[#333] text-gray-500">
                   <th className="pb-2">ASSET</th>
                   <th className="pb-2">POSITIONS</th>
                   <th className="pb-2">AVG ENTRY</th>
                   <th className="pb-2">CURRENT PRICE</th>
                   <th className="pb-2">PNL</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-b border-[#222]">
                   <td className="py-2 text-gray-300">Kalshi - US Shutdown Yes</td>
                   <td className="py-2 text-cyan-400">1500</td>
                   <td className="py-2 text-gray-400">42¢</td>
                   <td className="py-2 text-gray-400">48¢</td>
                   <td className="py-2 text-green-500">+$90.00</td>
                 </tr>
                 <tr className="border-b border-[#222]">
                   <td className="py-2 text-gray-300">Poly - BTC &gt; 100k Yes</td>
                   <td className="py-2 text-cyan-400">5000</td>
                   <td className="py-2 text-gray-400">65¢</td>
                   <td className="py-2 text-gray-400">61¢</td>
                   <td className="py-2 text-red-500">-$200.00</td>
                 </tr>
               </tbody>
             </table>
           </div>
        )}
      </div>
    </div>
  );
}
