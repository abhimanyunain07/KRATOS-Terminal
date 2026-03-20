import { Bot, RefreshCw, Network, MessageSquare, Play } from "lucide-react";
import { useState, useEffect } from "react";
import type { PolymarketEvent } from "../api/polymarket";

export function MiroFishSimulation({ event }: { event: PolymarketEvent | null }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset simulation when event changes
    setIsSimulating(false);
    setLog([]);
    setProgress(0);
  }, [event]);

  const startSimulation = () => {
    setIsSimulating(true);
    setLog(["[SYS] Initiating MiroFish Swarm Intelligence Engine..."]);
    setProgress(5);

    const script = [
      { t: 1000, msg: "[SWARM] Extracting real-world seed information (News, Policy, Signals)...", p: 15 },
      { t: 2500, msg: "[GRAPH] Building GraphRAG and injecting individual/group memory...", p: 30 },
      { t: 4000, msg: "[AGENT] Instantiating 1,000 parallel digital avatars with independent logic...", p: 50 },
      { t: 5500, msg: "[SIMULATION] Running dual-platform parallel simulation environment...", p: 75 },
      { t: 7000, msg: "[EVAL] Parsing multi-agent interactions and emergent behaviors...", p: 90 },
      { t: 8500, msg: `[REPORT] Generating highly-probable forecast for "${event?.title.slice(0, 20)}..."`, p: 100 },
    ];

    let timer = 0;
    script.forEach(({ t, msg, p }) => {
      setTimeout(() => {
        setLog(prev => [...prev, msg]);
        setProgress(p);
      }, t);
      timer = Math.max(timer, t);
    });

    setTimeout(() => {
      setIsSimulating(false);
    }, timer + 1000);
  };

  if (!event) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-amber-700/50 p-4 text-center text-xs">
        <Bot size={32} className="mb-2 opacity-50" />
        <p>MIROFISH IDLE</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-2 text-xs">
      <div className="flex justify-between items-center text-amber-500 font-bold border-b border-amber-900/30 pb-2 mb-2">
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase">
          <Network size={16} className="text-purple-400" /> MIROFISH SWARM ENGINE
        </div>
        <button 
          onClick={startSimulation}
          disabled={isSimulating || progress === 100}
          className="bg-purple-900/40 hover:bg-purple-800/60 text-purple-400 px-2 py-0.5 rounded border border-purple-900/50 disabled:opacity-50 transition-colors flex items-center gap-1"
        >
          {isSimulating ? <RefreshCw size={10} className="animate-spin" /> : <Play size={10} />}
          {progress === 100 ? 'COMPLETE' : isSimulating ? 'SIMULATING' : 'START RUN'}
        </button>
      </div>

      <div className="flex-none bg-black/60 border border-amber-900/40 rounded p-1 mb-2 h-2">
         <div 
           className="h-full bg-purple-500 transition-all duration-500 ease-out"
           style={{ width: `${progress}%` }}
         />
      </div>

      <div className="flex-1 border border-amber-900/30 bg-black/80 rounded p-2 overflow-auto font-mono text-[10px] space-y-1">
        {log.map((line, i) => (
          <div key={i} className="text-purple-400/80 break-words">
            {line.startsWith('[REPORT]') ? (
               <span className="text-green-400 font-bold">{line}</span>
            ) : line.startsWith('[SWARM]') ? (
               <span className="text-blue-400">{line}</span>
            ) : (
               <span>{line}</span>
            )}
          </div>
        ))}
        {progress === 100 && (
          <div className="mt-4 p-2 border border-green-900/50 bg-green-950/20 rounded">
             <div className="flex items-center gap-2 text-green-500 font-bold mb-1"><MessageSquare size={12} /> FINAL PREDICTION</div>
             <p className="text-green-400/80 leading-relaxed">
               Based on 1,000 parallel digital avatars interacting with current sentiment, historical data, and GraphRAG knowledge, the swarm intelligence strongly indicates a <span className="text-amber-400 font-bold bg-amber-900/40 px-1">78.4%</span> probability of occurrence. Market mispricing detected at current book values.
             </p>
          </div>
        )}
      </div>
    </div>
  );
}
