import { Panel } from '../components/ui/Panel';
import { ActivitySquare, TrendingUp, TrendingDown, RefreshCw, BarChart } from 'lucide-react';

export default function StocksCommodities() {
  const assets = [
    { ticker: "SPY", name: "S&P 500 ETF", price: "512.45", change: "+1.2%", sentiment: 82, signal: "BUY" },
    { ticker: "QQQ", name: "Nasdaq 100", price: "445.10", change: "+1.8%", sentiment: 88, signal: "STRONG BUY" },
    { ticker: "GC=F", name: "Gold Futures", price: "2,340.50", change: "+0.4%", sentiment: 65, signal: "HOLD" },
    { ticker: "CL=F", name: "Crude Oil WTI", price: "85.60", change: "+2.1%", sentiment: 75, signal: "BUY" },
    { ticker: "TLT", name: "20+ Yr Treasury", price: "92.30", change: "-0.8%", sentiment: 35, signal: "SELL" },
    { ticker: "NVDA", name: "Nvidia Corp", price: "880.20", change: "+3.5%", sentiment: 95, signal: "STRONG BUY" },
    { ticker: "BTC-USD", name: "Bitcoin", price: "68,420", change: "+4.2%", sentiment: 85, signal: "BUY" }
  ];

  return (
    <div className="flex h-full gap-4 relative">
      <div className="flex-[2] flex flex-col h-full gap-4 min-w-0 min-h-0">
        <Panel 
           title="Global Equities & Commodities Tracker" 
           className="flex-1"
           headerAddon={
             <span className="flex items-center gap-1 text-cyan-500 animate-pulse">
                <RefreshCw size={12}/> TICKER SYNC
             </span>
           }
        >
          <div className="grid grid-cols-12 gap-2 pb-1 mb-2 font-bold text-[10px] text-cyan-700 uppercase tracking-widest sticky top-0 bg-black/80 z-10 border-b border-cyan-900/40">
            <div className="col-span-3">Asset</div>
            <div className="col-span-2 text-right">Price</div>
            <div className="col-span-2 text-right">24h Chg</div>
            <div className="col-span-3 text-center">AI Sentiment</div>
            <div className="col-span-2 text-center">Algo Signal</div>
          </div>
          
          <div className="h-full overflow-y-auto scrollbar-custom pr-2 flex flex-col gap-1">
             {assets.map((asset, i) => {
                const isPos = asset.change.startsWith('+');
                return (
                   <div key={i} className="grid grid-cols-12 gap-2 py-2 border-b border-cyan-900/20 hover:bg-cyan-900/20 items-center text-[11px] font-mono group cursor-pointer transition-colors">
                      <div className="col-span-3 flex flex-col gap-0.5">
                         <span className="font-bold text-cyan-300">{asset.ticker}</span>
                         <span className="text-[9px] text-cyan-700 truncate">{asset.name}</span>
                      </div>
                      <div className="col-span-2 text-right text-cyan-500">{asset.price}</div>
                      <div className={`col-span-2 text-right flex justify-end items-center gap-1 ${isPos ? 'text-green-500' : 'text-red-500'}`}>
                         {isPos ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {asset.change}
                      </div>
                      
                      {/* Sentiment Bar */}
                      <div className="col-span-3 flex items-center gap-2 px-2">
                         <span className="text-[9px] text-cyan-600 w-6 text-right">{asset.sentiment}</span>
                         <div className="flex-1 h-1.5 bg-cyan-950/50 rounded overflow-hidden">
                            <div 
                              className={`h-full ${asset.sentiment > 70 ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]' : asset.sentiment > 40 ? 'bg-amber-500' : 'bg-red-500'}`} 
                              style={{ width: `${asset.sentiment}%` }} 
                            />
                         </div>
                      </div>
                      
                      <div className="col-span-2 text-center">
                         <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                            asset.signal.includes('BUY') ? 'bg-green-950/40 border-green-800 text-green-400' : 
                            asset.signal.includes('SELL') ? 'bg-red-950/40 border-red-800 text-red-400' : 
                            'bg-amber-950/40 border-amber-800 text-amber-400'
                         }`}>
                           {asset.signal}
                         </span>
                      </div>
                   </div>
                );
             })}
          </div>
        </Panel>
      </div>

      <div className="flex-[1] flex flex-col h-full gap-4 min-w-0 min-h-0">
        <Panel 
           title="Machine Learning Alpha Generator" 
           className="flex-1 shadow-[0_0_20px_rgba(6,182,212,0.05)_inset]"
           headerAddon={<ActivitySquare size={12} className="text-purple-500" />}
        >
          <div className="flex flex-col gap-4 h-full">
            <div className="bg-cyan-950/20 p-3 rounded border border-cyan-800/40 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BarChart size={64} className="text-cyan-500" />
               </div>
               <h3 className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-1 flex items-center gap-1">
                 Highest Return Vector (Safe Bet)
               </h3>
               
               <div className="mt-3 flex flex-col gap-2 relative z-10 text-[10px] font-mono">
                  <div className="flex justify-between border-b border-cyan-900/50 pb-1">
                     <span className="text-cyan-600">Target Asset:</span>
                     <span className="text-green-400 font-bold">QQQ Call Option Spread</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-1">
                     <span className="text-cyan-600">Horizon:</span>
                     <span className="text-cyan-300">45 Days</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-1">
                     <span className="text-cyan-600">Expected ROI:</span>
                     <span className="text-green-500 font-bold">+85% to +120%</span>
                  </div>
                  <div className="flex justify-between border-b border-cyan-900/50 pb-1">
                     <span className="text-cyan-600">Win Probability:</span>
                     <span className="text-amber-400">82.4%</span>
                  </div>
               </div>
               
               <p className="mt-3 text-[9px] text-cyan-600/80 leading-relaxed border-l-2 border-cyan-700 pl-2">
                 <span className="font-bold text-cyan-500">ML LOGIC: </span>
                 Historical correlation matrix suggests strong upside resistance breaking in tech sector following weak inflation data. AI sentiment confirms institutional accumulation.
               </p>
            </div>
            
            <div className="flex-1 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Line_graph_of_price.svg/1200px-Line_graph_of_price.svg.png')] bg-contain bg-center bg-no-repeat opacity-20 filter invert sepia saturate-[5] hue-rotate-[180deg]" />

          </div>
        </Panel>
      </div>
    </div>
  );
}
