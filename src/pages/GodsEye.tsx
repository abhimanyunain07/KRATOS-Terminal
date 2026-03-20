import { Panel } from '../components/ui/Panel';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { AlphaTradeAnalyzer } from '../components/AlphaTradeAnalyzer';
import { DeepDivePanel } from '../components/DeepDivePanel';
import { GlobalMacroPanel } from '../components/GlobalMacroPanel';
import { ShieldAlert, Crosshair, Radar } from 'lucide-react';

export default function GodsEye() {
  const dummyEvent = {
    id: "gods-eye-master",
    title: "Global Omega Protocol",
    description: "Omniscient tracking of planetary state, predictive markets, and swarm intelligence.",
    volume: 120500000,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    active: true,
    closed: false,
    markets: []
  };

  return (
    <div className="flex flex-col h-full gap-2 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex-none h-8 bg-black/60 border border-cyan-800/40 rounded flex items-center justify-between px-4 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <Radar size={14} className="text-cyan-500 animate-spin-slow" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest text-shadow-cyan">
             GOD'S EYE: GLOBAL INTELLIGENCE NEXUS
          </span>
        </div>
        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[10px] text-red-500 font-mono animate-pulse">
             <ShieldAlert size={12}/> DEFCON 3
          </span>
          <span className="flex items-center gap-1 text-[10px] text-green-500 font-mono">
             <Crosshair size={12}/> OMEGA SYNC ACTIVE
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 grid-rows-12 gap-2 min-h-0">
        
        {/* Left Column (3 Spans) */}
        <div className="col-span-3 row-span-12 flex flex-col gap-2 min-h-0">
          <Panel title="OSINT Data Stream" className="flex-[1.5]">
            <DeepDivePanel event={dummyEvent as any} />
          </Panel>
          <Panel title="Global Macro Context" className="flex-[1]">
            <GlobalMacroPanel />
          </Panel>
        </div>

        {/* Center Column (6 Spans) - The Globe */}
        <div className="col-span-6 row-span-12 flex flex-col gap-2 min-h-0 relative group">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none rounded-lg" />
          <div className="flex-1 relative border border-cyan-800/40 rounded shadow-[0_0_50px_rgba(6,182,212,0.15)_inset] bg-black/80 overflow-hidden">
             
             {/* Reticle Overlay */}
             <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-[80%] h-[80%] rounded-full border border-cyan-500/20" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-cyan-500/40 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-full h-[1px] bg-cyan-500/20" />
                <div className="absolute h-full w-[1px] bg-cyan-500/20" />
             </div>

             <InteractiveGlobe />
             
             {/* Live Data HUD */}
             <div className="absolute bottom-4 right-4 bg-black/60 border border-cyan-800 p-2 rounded backdrop-blur text-[9px] font-mono text-cyan-500 w-48 shadow-[0_0_15px_rgba(6,182,212,0.1)_inset]">
                <div className="uppercase tracking-widest text-cyan-300 border-b border-cyan-800/50 pb-1 mb-1">Planetary Vitals</div>
                <div className="flex justify-between"><span>Global Vol:</span><span className="text-amber-500">HI</span></div>
                <div className="flex justify-between"><span>Active Markets:</span><span className="text-green-500">1,204</span></div>
                <div className="flex justify-between"><span>Data Latency:</span><span className="text-cyan-400">12ms</span></div>
             </div>
          </div>
        </div>

        {/* Right Column (3 Spans) */}
        <div className="col-span-3 row-span-12 flex flex-col gap-2 min-h-0">
          <Panel title="Predictive Alpha Engine" className="flex-[1.5] border-green-900/50 shadow-[0_0_15px_rgba(34,197,94,0.05)_inset]">
            <AlphaTradeAnalyzer />
          </Panel>
          <Panel title="Swarm Analysis" className="flex-[1]">
             <div className="h-full flex flex-col items-center justify-center text-[10px] text-cyan-600 font-mono gap-2 bg-black/40 border border-cyan-900/30 rounded p-2 text-center">
                <Radar size={32} className="text-cyan-500/50 animate-pulse" />
                <p>Swarm intelligence is currently aggregating prediction market data across 5.4M nodes.</p>
                <div className="w-full h-1 bg-cyan-950 rounded mt-2 overflow-hidden">
                   <div className="h-full bg-cyan-500 w-[78%] animate-pulse shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                </div>
                <span className="text-[8px] uppercase text-cyan-700">Consensus Building...</span>
             </div>
          </Panel>
        </div>

      </div>
    </div>
  );
}
