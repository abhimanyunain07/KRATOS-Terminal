
import { Panel } from '../components/ui/Panel';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { MiroFishSimulation } from '../components/MiroFishSimulation';

export default function GlobeViewPage() {
  // Use a null or simulated selected event for the MiroFish simulation
  const dummyEvent = {
    id: "global-state",
    title: "Global Geopolitical Swarm Prediction",
    volume: 85400000,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    active: true,
    closed: false,
    description: "Predictive modeling of global geopolitical volatility.",
    markets: [
      {
        id: "m-1",
        question: "Volatility Index > 20?",
        conditionId: "x",
        slug: "vol",
        active: true,
        closed: false,
        outcomes: ["Yes", "No"],
        outcomePrices: ["0.65", "0.35"],
        volume: 85400000
      }
    ]
  };

  return (
    <div className="flex h-full gap-4">
      {/* 2/3 Width - High Fidelity Interactive Globe */}
      <div className="flex-[2] flex flex-col min-w-0 min-h-0">
        <Panel 
          title="God's Eye Global Tracker" 
          className="flex-1"
          headerAddon={<span className="text-cyan-500 font-bold animate-pulse">LIVE FEED // {new Date().toLocaleTimeString()}</span>}
        >
          <InteractiveGlobe />
        </Panel>
      </div>

      {/* 1/3 Width - MiroFish Swarm Engine */}
      <div className="flex-[1] flex flex-col min-w-0 min-h-0">
        <Panel 
          title="MiroFish Swarm Algorithm" 
          className="flex-1"
          headerAddon={<span className="text-amber-500 font-bold">NEURAL NET ACTIVE</span>}
        >
          <div className="h-full flex flex-col gap-4">
             {/* Info Box */}
             <div className="bg-cyan-950/30 border border-cyan-800/50 p-3 rounded backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.1)_inset]">
                <h3 className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-2 border-b border-cyan-800/50 pb-1">Swarm Parameters</h3>
                <div className="grid grid-cols-2 gap-2 text-[9px] text-cyan-600 font-mono">
                   <div>AGENTS: <span className="text-cyan-300">500</span></div>
                   <div>ITERATIONS: <span className="text-cyan-300">10k/sec</span></div>
                   <div>CONFIDENCE: <span className="text-green-400">92.4%</span></div>
                   <div>MODE: <span className="text-amber-400">PREDICTIVE</span></div>
                </div>
             </div>
             
             {/* Actual Simulation Component (Recycled/Updated for sci-fi theme) */}
             <div className="flex-1 border border-cyan-900/50 rounded overflow-hidden relative group">
                {/* Overlay vignette */}
                <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] mix-blend-multiply" />
                <MiroFishSimulation event={dummyEvent as any} />
             </div>
             
             {/* Results / Suggestion Box */}
             <div className="h-32 bg-gradient-to-t from-cyan-950/80 to-transparent border border-cyan-800/50 p-3 rounded backdrop-blur flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <h3 className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-1">Algorithmic Output</h3>
                <p className="text-[10px] text-cyan-600 font-mono leading-relaxed mb-auto">
                   Swarm consensus indicates high probability of geopolitical volatility spike within 72 hours. Recommended asset allocation adjustments required.
                </p>
                <div className="mt-2 pt-2 border-t border-cyan-800/50 flex justify-between items-center text-[10px] font-bold">
                   <span className="text-cyan-500">ACTION:</span>
                   <span className="text-green-400 shadow-[0_0_5px_rgba(34,197,94,0.5)] bg-green-950/50 px-2 py-0.5 rounded border border-green-800">EXECUTE HEDGE</span>
                </div>
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
