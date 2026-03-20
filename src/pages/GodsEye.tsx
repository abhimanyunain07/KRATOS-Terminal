import { useState } from 'react';
import { Panel } from '../components/ui/Panel';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { ShieldAlert, Crosshair, Radar, Activity, Anchor, GitMerge } from 'lucide-react';

export default function GodsEye() {
  const [activeLayer, setActiveLayer] = useState<'MAP' | 'SPLC' | 'POSH'>('MAP');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Helper for rendering BQL Terminal output
  const renderBQLOutput = () => {
    if (!selectedNode) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-cyan-600/50 font-mono text-[10px]">
          <Radar className="mb-2 animate-pulse" size={24} />
          <div>AWAITING GEOSPATIAL SELECTION</div>
          <div className="mt-2 text-cyan-800">EXECUTE: BQL TARGET</div>
        </div>
      );
    }

    const { layer, data } = selectedNode;

    return (
      <div className="flex flex-col h-full font-mono text-[10px] gap-2 overflow-y-auto pr-1 custom-scrollbar">
        <div className="border-b border-cyan-800/50 pb-2 mb-2">
           <div className="text-cyan-300 font-bold mb-1 tracking-widest uppercase">
             {layer === 'MAP' && `[BQL] ASSET: ${data.name}`}
             {layer === 'POSH' && `[POSH] VESSEL: ${data.name}`}
             {layer === 'SPLC' && `[SPLC] RELATION: ${data.sourceName}`}
           </div>
           <div className="text-cyan-600">ID: {data.id || data.mmsi || 'LNK-992'} | LAT: {data.lat?.toFixed(4) || data.startLat?.toFixed(4)} | LNG: {data.lng?.toFixed(4) || data.startLng?.toFixed(4)}</div>
        </div>

        {layer === 'MAP' && (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-cyan-500">
               <div>TYPE:</div><div className="text-right text-cyan-300">{data.type}</div>
               <div>CAPACITY:</div><div className="text-right text-cyan-300">{data.capacity}</div>
               <div>RISK LEVEL:</div>
               <div className={`text-right font-bold ${data.riskLevel === 'CRITICAL' ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                 {data.riskLevel}
               </div>
               <div>REV AT RISK:</div><div className="text-right text-amber-500">{data.revenueAtRisk}</div>
            </div>
            {data.riskLevel === 'CRITICAL' && (
              <div className="mt-4 p-2 bg-red-950/30 border border-red-500/30 rounded text-red-400">
                <span className="font-bold block mb-1">!! ALER T !!</span>
                Asset located in proximity to designated danger zone. Supply chain ripple effect estimated at 14% of global volume.
              </div>
            )}
          </>
        )}

        {layer === 'POSH' && (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-cyan-500">
               <div>MMSI:</div><div className="text-right text-cyan-300">{data.mmsi}</div>
               <div>DRAFT:</div><div className="text-right text-cyan-300">{data.draft}</div>
               <div>SPEED:</div><div className="text-right text-cyan-300">{data.speed}</div>
               <div>STATUS:</div>
               <div className={`text-right font-bold ${data.isAnomaly ? 'text-red-500' : 'text-green-500'}`}>
                 {data.status}
               </div>
            </div>
            {data.isAnomaly && (
              <div className="mt-4 p-2 bg-red-950/30 border border-red-500/30 rounded text-red-400">
                <span className="font-bold block mb-1">DARK FLEET SUSPICION</span>
                {data.status === 'STS Transfer Detected' ? 
                  'Sudden draft change detected outside recognized port limits. High probability of illegal ship-to-ship crude transfer.' : 
                  'AIS signal mismatch with secondary satellite SAR data. Potential spoofing operation.'}
              </div>
            )}
          </>
        )}

        {layer === 'SPLC' && (
          <>
            <div className="text-cyan-400 mb-2 font-bold">REVENUE DEPENDENCY LINK</div>
            <div className="flex items-center justify-between bg-cyan-950/30 p-2 rounded border border-cyan-800/30 mb-2">
               <div className="text-cyan-300 max-w-[40%] truncate">{data.sourceName}</div>
               <div className="text-cyan-600">→</div>
               <div className="text-cyan-300 max-w-[40%] truncate">{data.targetName}</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-cyan-500 mt-2">
               <div>DEPENDENCY:</div>
               <div className="text-right text-amber-500 font-bold">{data.dependency}</div>
               <div>VALUE (USD):</div>
               <div className="text-right text-green-400">{data.valueStr}</div>
            </div>
             <div className="mt-4 p-2 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400">
                <span className="font-bold block mb-1">TIER 1 ANALYSIS</span>
                Disruption at source node would impact target node revenue by approximately {data.dependency} over a 30-day window.
              </div>
          </>
        )}

        <div className="mt-auto pt-4 flex gap-2">
           <button className="flex-1 bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700/50 py-1 text-cyan-300 transition-colors">
              EXECUTE BQL
           </button>
           <button className="flex-1 bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-700/50 py-1 text-cyan-300 transition-colors">
              ADD WATCHLIST
           </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full gap-2 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex-none h-8 bg-black/80 border border-cyan-800/40 rounded flex items-center justify-between px-4 z-10 backdrop-blur">
        <div className="flex items-center gap-2">
          <Radar size={14} className="text-cyan-500 animate-spin-slow" />
          <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest text-shadow-cyan">
             GEOSPATIAL INTELLIGENCE NEXUS
          </span>
        </div>
        
        {/* Layer Controls */}
        <div className="flex gap-2">
          <button 
            onClick={() => setActiveLayer('MAP')}
            className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border transition-colors ${activeLayer === 'MAP' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)_inset]' : 'bg-black/40 border-cyan-800/50 text-cyan-600 hover:text-cyan-400'}`}
          >
            <Activity size={10} /> [MAP] PHYSICAL RISK
          </button>
          <button 
             onClick={() => setActiveLayer('POSH')}
            className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border transition-colors ${activeLayer === 'POSH' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)_inset]' : 'bg-black/40 border-cyan-800/50 text-cyan-600 hover:text-cyan-400'}`}
          >
            <Anchor size={10} /> [POSH] MARITIME
          </button>
          <button 
             onClick={() => setActiveLayer('SPLC')}
            className={`flex items-center gap-1 text-[9px] px-2 py-0.5 rounded border transition-colors ${activeLayer === 'SPLC' ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.5)_inset]' : 'bg-black/40 border-cyan-800/50 text-cyan-600 hover:text-cyan-400'}`}
          >
            <GitMerge size={10} /> [SPLC] SUPPLY CHAIN
          </button>
        </div>

        <div className="flex gap-4">
          <span className="flex items-center gap-1 text-[10px] text-green-500 font-mono">
             <Crosshair size={12}/> DATA SYNCED
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 grid-rows-12 gap-2 min-h-0">
        
        {/* Center Column (9 Spans) - The Globe */}
        <div className="col-span-9 row-span-12 flex flex-col gap-2 min-h-0 relative group">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none rounded-lg" />
          <div className="flex-1 relative border border-cyan-800/40 rounded shadow-[0_0_50px_rgba(6,182,212,0.15)_inset] bg-black/80 overflow-hidden">
             
             {/* Reticle Overlay */}
             <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center opacity-20">
                <div className="w-[80%] h-[80%] rounded-full border border-cyan-500/20" />
                <div className="absolute w-[60%] h-[60%] rounded-full border border-cyan-500/40 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[2px] h-[2px] bg-red-500" />
             </div>

             <InteractiveGlobe activeLayer={activeLayer} onNodeClick={setSelectedNode} />
             
             {/* Live Data HUD */}
             <div className="absolute bottom-4 left-4 bg-black/80 border border-cyan-800 p-2 rounded backdrop-blur text-[9px] font-mono text-cyan-500 w-64 shadow-[0_0_15px_rgba(6,182,212,0.1)_inset] pointer-events-none z-20">
                <div className="uppercase tracking-widest text-cyan-300 border-b border-cyan-800/50 pb-1 mb-1">
                   {activeLayer === 'MAP' && 'MAP: PHYSICAL ASSET TRACKING'}
                   {activeLayer === 'POSH' && 'POSH: GLOBAL MARITIME SURVEILLANCE'}
                   {activeLayer === 'SPLC' && 'SPLC: TIER-N SUPPLY CHAIN NETWORK'}
                </div>
                {activeLayer === 'MAP' && (
                  <>
                    <div className="flex justify-between"><span>Assets Tracked:</span><span className="text-cyan-300">300</span></div>
                    <div className="flex justify-between"><span>Critical Alerts:</span><span className="text-red-500 animate-pulse">24</span></div>
                    <div className="flex justify-between mt-1 text-cyan-600"><span>(Click any node for BQL Analysis)</span></div>
                  </>
                )}
                {activeLayer === 'POSH' && (
                  <>
                    <div className="flex justify-between"><span>Vessels Monitored:</span><span className="text-cyan-300">120</span></div>
                    <div className="flex justify-between"><span>Dark Fleet Flags:</span><span className="text-amber-500">18</span></div>
                    <div className="flex justify-between"><span>STS Anomalies:</span><span className="text-red-500 animate-pulse">6</span></div>
                  </>
                )}
                {activeLayer === 'SPLC' && (
                  <>
                    <div className="flex justify-between"><span>Revenue Links:</span><span className="text-cyan-300">80 active</span></div>
                    <div className="flex justify-between"><span>High-Risk Dependencies:</span><span className="text-amber-500">34%</span></div>
                  </>
                )}
             </div>
          </div>
        </div>

        {/* Right Column (3 Spans) - Intense Analytics */}
        <div className="col-span-3 row-span-12 flex flex-col gap-2 min-h-0">
          <Panel title="TARGET ANALYSIS (BQL)" className="flex-[1.5] border-cyan-900/50 shadow-[0_0_15px_rgba(6,182,212,0.05)_inset]">
             {renderBQLOutput()}
          </Panel>
          <Panel title="MACRO RISK METRICS" className="flex-[1]">
             <div className="h-full flex flex-col text-[9px] font-mono text-cyan-500 gap-3 pt-1">
                <div>
                   <div className="flex justify-between mb-1">
                     <span className="text-cyan-300">GLOBAL SUPPLY SHOCK RISK</span>
                     <span className="text-amber-500">64%</span>
                   </div>
                   <div className="w-full h-1 bg-cyan-950 rounded overflow-hidden">
                      <div className="h-full bg-amber-500 w-[64%] shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between mb-1">
                     <span className="text-cyan-300">MARITIME CHOKEPOINT CONGESTION</span>
                     <span className="text-red-500">88%</span>
                   </div>
                   <div className="w-full h-1 bg-cyan-950 rounded overflow-hidden">
                      <div className="h-full bg-red-500 w-[88%] shadow-[0_0_5px_rgba(239,68,68,0.5)] animate-pulse" />
                   </div>
                </div>
                <div>
                   <div className="flex justify-between mb-1">
                     <span className="text-cyan-300">ENERGY HUB STABILITY</span>
                     <span className="text-green-500">92%</span>
                   </div>
                   <div className="w-full h-1 bg-cyan-950 rounded overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%] shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
                   </div>
                </div>
                
                <div className="mt-auto border border-red-900/50 bg-red-950/20 p-2 rounded">
                  <div className="flex items-center gap-1 text-red-500 font-bold mb-1">
                     <ShieldAlert size={10} /> PRIORITY ALERT
                  </div>
                  <div className="text-red-400">Multiple STS transfers detected in South China Sea. Expect volatility in Asian energy prediction markets within 48h.</div>
                </div>
             </div>
          </Panel>
        </div>

      </div>
    </div>
  );
}