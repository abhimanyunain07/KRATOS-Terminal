import { useEffect, useState } from 'react';
import { fetchTopEvents, type PolymarketEvent } from '../api/polymarket';
import { ArrowUpRight, ArrowDownRight, Minus, Search } from 'lucide-react';

export function MarketOverview({ onSelect }: { onSelect: (event: PolymarketEvent) => void }) {
  const [events, setEvents] = useState<PolymarketEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTopEvents(30);
        setEvents(data);
        setError(null);
      } catch (err) {
        setError("Failed to connect to Gamma API");
      } finally {
        setLoading(false);
      }
    }
    loadData();
    const interval = setInterval(loadData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full gap-2 text-amber-500/80 p-2">
        <div className="animate-pulse">Loading market data...</div>
        <div className="border-t border-dashed border-amber-900/50 pt-2 mt-auto text-xs font-mono">
          &gt; STATUS: Connecting to Gamma API
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-red-500 font-bold p-2">
        <div>SYS_ERR: {error}</div>
        <div className="text-xs mt-2 text-amber-700 animate-pulse">Retrying connection...</div>
      </div>
    );
  }

  const filteredEvents = events.filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="flex flex-col h-full overflow-hidden text-xs">
      {/* Search Bar */}
      <div className="flex-none p-1 border-b border-amber-900/50 bg-black/80 z-10">
        <div className="flex items-center gap-2 px-2 py-1 bg-amber-900/10 border border-amber-900/30 rounded">
          <Search size={12} className="text-amber-600" />
          <input 
            type="text" 
            placeholder="FILTER MARKETS..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-amber-500 placeholder-amber-900/80 w-full font-mono uppercase"
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 pb-1 mb-1 font-bold text-amber-600 sticky top-0 bg-black/80 z-10 px-1 pt-1">
        <div className="col-span-6 uppercase">Market Event</div>
        <div className="col-span-2 text-right uppercase">Volume</div>
        <div className="col-span-4 text-right uppercase">Top Outcome Prob</div>
      </div>
      
      {/* Table Body */}
      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-amber-900 scrollbar-track-transparent pr-1">
        {filteredEvents.map((event) => {
          // Find the primary market
          const mainMarket = event.markets?.[0];
          let topProb = 0;
          let topOutcome = 'N/A';
          let probColor = 'text-amber-500';
          let TrendIcon = Minus;
          
          if (mainMarket && mainMarket.outcomePrices && mainMarket.outcomes) {
            try {
              const prices = mainMarket.outcomePrices.map(p => parseFloat(p));
              const maxIdx = prices.indexOf(Math.max(...prices));
              if (maxIdx >= 0) {
                 topProb = prices[maxIdx] * 100;
                 topOutcome = mainMarket.outcomes[maxIdx];
                 
                 // Simple pseudo-trend logic based on probability
                 if (topProb > 60) {
                   probColor = 'text-green-500';
                   TrendIcon = ArrowUpRight;
                 } else if (topProb < 40) {
                   probColor = 'text-red-500';
                   TrendIcon = ArrowDownRight;
                 }
              }
            } catch (e) {
              console.error("Error parsing prices", e);
            }
          }

          return (
            <div 
              key={event.id} 
              onClick={() => onSelect(event)}
              className="grid grid-cols-12 gap-2 py-1.5 border-b border-amber-900/20 hover:bg-amber-900/40 transition-colors px-1 cursor-pointer group"
            >
              <div className="col-span-6 flex items-center gap-1 group-hover:text-amber-300 transition-colors">
                <span className={`px-1 py-[1px] text-[8px] rounded border uppercase tracking-wider ${
                  event.platform === 'KALSHI' 
                    ? 'border-blue-900/50 bg-blue-900/20 text-blue-400' 
                    : 'border-purple-900/50 bg-purple-900/20 text-purple-400'
                }`}>
                  {event.platform === 'KALSHI' ? 'KSHI' : 'POLY'}
                </span>
                <span className="truncate flex-1" title={event.title}>{event.title}</span>
              </div>
              <div className="col-span-2 text-right font-mono text-amber-500/80">
                ${(event.volume || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <div className="col-span-4 flex items-center justify-end gap-2 font-mono">
                <span className="truncate max-w-[80px] text-amber-500/60 uppercase text-[10px]">
                  {topOutcome}
                </span>
                <span className={`w-12 text-right ${probColor}`}>
                  {topProb > 0 ? `${topProb.toFixed(1)}%` : '--'}
                </span>
                <TrendIcon size={12} className={probColor} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
