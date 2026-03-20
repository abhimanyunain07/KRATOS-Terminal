'use client';
import { useState } from 'react';
import InteractiveGlobe from '@/components/InteractiveGlobe';
import useAppStore from '@/store/useAppStore';

export default function GodsEyePage() {
  const [bqlInput, setBqlInput] = useState('');
  const activeLayer = useAppStore(state => state.activeLayer);
  const setActiveLayer = useAppStore(state => state.setActiveLayer);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleBqlCmd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const lower = bqlInput.toLowerCase();
      if (lower.includes('pmap<go>')) {
        setActiveLayer('all');
      }
      setBqlInput('');
      setPanelOpen(true);
    }
  };

  return (
    <div className="h-full w-full flex flex-row overflow-hidden relative">
      <div className="flex-1 relative">
        <header className="absolute top-4 left-4 z-10 glassmorphism p-3 rounded border border-cyan-800 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          <h1 className="text-xl font-bold uppercase tracking-widest text-amber-500 text-shadow-amber">Gods Eye</h1>
          <div className="flex gap-2 mt-2 w-full">
            <span className="text-cyan-500 pt-1 font-bold">BQL&gt;</span>
            <input 
              type="text" 
              placeholder="get(ODDS) filter(universe='Elections')..." 
              value={bqlInput}
              onChange={e => setBqlInput(e.target.value)}
              onKeyDown={handleBqlCmd}
              className="bg-black/50 border border-[#444] text-cyan-300 p-1 font-mono text-sm w-96 outline-none focus:border-cyan-500 transition-colors" 
            />
          </div>
          <div className="flex gap-2 mt-3 text-xs">
            <button onClick={() => setActiveLayer('events')} className={`px-2 py-1 border ${activeLayer === 'events' ? 'bg-cyan-900 border-cyan-500' : 'border-[#444] hover:border-cyan-500'}`}>EVENTS (POINTS)</button>
            <button onClick={() => setActiveLayer('arcs')} className={`px-2 py-1 border ${activeLayer === 'arcs' ? 'bg-cyan-900 border-cyan-500' : 'border-[#444] hover:border-cyan-500'}`}>SPLC (ARCS)</button>
            <button onClick={() => setActiveLayer('all')} className={`px-2 py-1 border ${activeLayer === 'all' ? 'bg-amber-900 border-amber-500 text-amber-500' : 'border-[#444] hover:border-amber-500'}`}>OVERLAY ALL</button>
          </div>
        </header>

        <InteractiveGlobe />
      </div>

      {panelOpen && (
         <div className="w-80 h-full glassmorphism border-l border-cyan-900 p-4 shrink-0 flex flex-col z-20">
            <div className="flex justify-between items-start border-b border-[#333] pb-2 mb-4">
              <h2 className="text-lg text-cyan-500 font-bold uppercase text-shadow-cyan">BQL Drill-Down</h2>
              <button onClick={() => setPanelOpen(false)} className="text-gray-500 hover:text-white text-xl">&times;</button>
            </div>
            
            <div className="flex-1 flex flex-col gap-4 text-sm font-mono text-gray-300">
               <div><span className="text-gray-500">Event ID:</span> 0x82e1A...</div>
               <div><span className="text-gray-500">Live Odds:</span> <span className="text-amber-500 font-bold">52.1%</span></div>
               <div><span className="text-gray-500">Volume at Risk:</span> $154.2M</div>
               
               <div className="mt-4 pt-4 border-t border-[#333]">
                 <h3 className="text-amber-500 mb-2 font-bold uppercase">Arbitrage Scanner</h3>
                 <div className="flex justify-between"><span>Polymarket</span> <span className="text-green-400">52%</span></div>
                 <div className="flex justify-between"><span>Kalshi</span> <span className="text-red-400">48%</span></div>
                 <div className="text-xs text-amber-500 mt-2">Alert: μs diff &gt; 3%. Executable Arb EV &gt; 0.02.</div>
               </div>

               <div className="mt-4 pt-4 border-t border-[#333]">
                 <h3 className="text-cyan-500 mb-2 font-bold uppercase">Linked Dependencies</h3>
                 <div className="text-xs text-gray-400">35% volume correlation with "Taiwan Strait Crisis" resolution risk.</div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
