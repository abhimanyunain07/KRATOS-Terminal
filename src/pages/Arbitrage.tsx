import { Panel } from '../components/ui/Panel';
import { ArbitrageScanner } from '../components/ArbitrageScanner';
import { Activity, Zap } from 'lucide-react';

export default function Arbitrage() {
  return (
    <div className="flex flex-col h-full gap-4 relative">
      <div className="flex h-full gap-4 min-h-0">
        <Panel 
           title="HFT Cross-Exchange Scanner" 
           className="flex-[2] h-full shadow-[0_0_30px_rgba(245,158,11,0.05)_inset] border-amber-900/40"
           headerAddon={
             <span className="flex items-center gap-1 text-amber-500">
                <Zap size={12}/> SCANNING POLY/KALSHI
             </span>
           }
        >
          <div className="h-full bg-black/40 rounded p-1">
             <ArbitrageScanner />
          </div>
        </Panel>

        <div className="flex-[1] flex flex-col h-full gap-4 min-w-0 min-h-0">
          <Panel 
             title="Algorithm Configuration" 
             className="flex-none shadow-[0_0_20px_rgba(6,182,212,0.05)_inset]"
             headerAddon={<Activity size={12} className="text-cyan-500" />}
          >
            <div className="flex flex-col gap-3 text-[10px] font-mono text-cyan-600">
               <div className="bg-cyan-950/20 p-2 rounded border border-cyan-900/40">
                  <div className="flex justify-between items-center mb-1">
                     <span className="uppercase">Min Spread Threshold</span>
                     <span className="text-amber-500 font-bold">2.5%</span>
                  </div>
                  <input type="range" className="w-full accent-cyan-500" defaultValue="25" />
               </div>
               
               <div className="bg-cyan-950/20 p-2 rounded border border-cyan-900/40">
                  <div className="flex justify-between items-center mb-1">
                     <span className="uppercase">Max Execution Delay</span>
                     <span className="text-cyan-400 font-bold">45ms</span>
                  </div>
                  <input type="range" className="w-full accent-cyan-500" defaultValue="45" />
               </div>

               <div className="grid grid-cols-2 gap-2 mt-2">
                 <button className="bg-green-900/30 border border-green-700 text-green-400 py-1.5 rounded uppercase tracking-widest hover:bg-green-800/50 transition-colors">
                   Auto-Exec On
                 </button>
                 <button className="bg-cyan-900/30 border border-cyan-700 text-cyan-400 py-1.5 rounded uppercase tracking-widest hover:bg-cyan-800/50 transition-colors">
                   Dry Run
                 </button>
               </div>
            </div>
          </Panel>

          <Panel title="Execution Logs" className="flex-1">
             <div className="flex flex-col gap-1 h-full overflow-y-auto scrollbar-custom text-[9px] font-mono pr-1">
                {[
                  { time: "09:41:22.405", event: "DETECT", pair: "POLY/KS", spread: "2.8%", stat: "OK" },
                  { time: "09:41:22.412", event: "ROUTING", pair: "ETH/USDC", spread: "-", stat: "OK" },
                  { time: "09:41:22.445", event: "EXECUTE", pair: "KS_LONG", spread: "-", stat: "SUCCESS" },
                  { time: "09:41:22.450", event: "EXECUTE", pair: "POLY_SHORT", spread: "-", stat: "SUCCESS" },
                  { time: "09:30:05.112", event: "DETECT", pair: "KS/POLY", spread: "1.2%", stat: "SKIP_THRESH" },
                ].map((log, i) => (
                  <div key={i} className="flex gap-2 p-1 border-b border-cyan-900/30 hover:bg-cyan-950/30">
                     <span className="text-cyan-700">{log.time}</span>
                     <span className={`w-16 font-bold ${log.event === 'DETECT' ? 'text-amber-500' : log.event === 'EXECUTE' ? 'text-green-500' : 'text-cyan-500'}`}>{log.event}</span>
                     <span className="w-16 text-cyan-300">{log.pair}</span>
                     <span className="w-10 text-right text-amber-500">{log.spread}</span>
                     <span className={`ml-auto ${log.stat.includes('OK') || log.stat === 'SUCCESS' ? 'text-green-400' : 'text-red-400'}`}>{log.stat}</span>
                  </div>
                ))}
             </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
