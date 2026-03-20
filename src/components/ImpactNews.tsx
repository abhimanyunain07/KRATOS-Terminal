import { AlertTriangle, Newspaper, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export function ImpactNews() {
  const initialNews = [
    { id: 1, time: "14:32:01", source: "REUTERS", headline: "FEDERAL RESERVE SIGNALS POTENTIAL 50BPS EMERGENCY RATE CUT", impact: "CRITICAL", market: "US Interest Rates EOY", dir: "UP", prob: "+22.4%" },
    { id: 2, time: "14:31:45", source: "BLOOMBERG", headline: "SEC CHAIR TO HOLD UNEXPECTED PRESS CONFERENCE AT 16:00 EST", impact: "HIGH", market: "Crypto ETFs Approved", dir: "DOWN", prob: "-14.1%" },
    { id: 3, time: "14:30:12", source: "WSJ", headline: "OPEC+ REACHES SURPRISE AGREEMENT ON PRODUCTION QUOTAS", impact: "HIGH", market: "Crude Oil Futures", dir: "UP", prob: "+18.9%" },
    { id: 4, time: "14:28:55", source: "AP", headline: "MAJOR SWING STATE POLLING DATA REVISION RELEASED", impact: "CRITICAL", market: "2024 Presidential Election", dir: "SHIFT", prob: "VOLATILE" },
    { id: 5, time: "14:25:30", source: "FINANCIAL TIMES", headline: "EUROPEAN CENTRAL BANK MAINTAINS CURRENT RATES", impact: "MEDIUM", market: "EUR/USD Parity", dir: "FLAT", prob: "+1.2%" },
  ];

  const [news, setNews] = useState(initialNews);

  useEffect(() => {
    // Simulate incoming high-impact news
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newNews = {
          id: Date.now(),
          time: new Date().toISOString().split('T')[1].slice(0, 8),
          source: ["CNBC", "BLOOMBERG", "REUTERS", "WSJ", "POLITICO"][Math.floor(Math.random() * 5)],
          headline: "AUTOMATED SYSTEM DETECTED ABNORMAL MARKET BUYING PRESSURE",
          impact: "HIGH",
          market: "Tech Antitrust Rulings",
          dir: "UP",
          prob: `+${(Math.random() * 10 + 5).toFixed(1)}%`
        };
        setNews(prev => [newNews, ...prev].slice(0, 15));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden text-[9px] font-mono">
      <div className="flex-none grid grid-cols-12 gap-1 pb-1 mb-1 font-bold text-amber-500 border-b border-amber-900/50 sticky top-0 bg-black/90 z-10 px-1 uppercase tracking-widest text-[8px]">
        <div className="col-span-2">TIME / SRC</div>
        <div className="col-span-5">HEADLINE (GLOBAL IMPACT)</div>
        <div className="col-span-2 text-center">IMPACT LVL</div>
        <div className="col-span-3 text-right">PROJECTED MKT SHIFT</div>
      </div>
      
      <div className="flex-1 overflow-auto scrollbar-custom pr-1">
        {news.map((item) => (
          <div key={item.id} className="grid grid-cols-12 gap-1 py-1 border-b border-amber-900/20 hover:bg-amber-900/30 transition-colors px-1 group cursor-crosshair">
            <div className="col-span-2 flex flex-col justify-center">
              <span className="text-amber-600">{item.time}</span>
              <span className="text-amber-700/80 text-[7px]">{item.source}</span>
            </div>
            
            <div className="col-span-5 flex items-center pr-2">
              <span className={`line-clamp-2 leading-tight ${item.impact === 'CRITICAL' ? 'text-red-400 font-bold' : 'text-amber-400'}`}>
                {item.headline}
              </span>
            </div>
            
            <div className="col-span-2 flex items-center justify-center">
              <span className={`px-1 py-[1px] rounded flex items-center gap-1 ${
                item.impact === 'CRITICAL' ? 'bg-red-900/40 text-red-500 border border-red-500/50 animate-pulse' : 
                item.impact === 'HIGH' ? 'bg-orange-900/40 text-orange-500 border border-orange-500/50' : 
                'bg-amber-900/20 text-amber-500 border border-amber-900/50'
              }`}>
                {item.impact === 'CRITICAL' ? <AlertTriangle size={8} /> : item.impact === 'HIGH' ? <Zap size={8} /> : <Newspaper size={8} />}
                {item.impact}
              </span>
            </div>
            
            <div className="col-span-3 flex flex-col items-end justify-center">
              <span className="text-amber-500/80 text-[8px] truncate max-w-[100%]">{item.market}</span>
              <div className="flex items-center gap-1 font-bold text-[10px]">
                <span className={item.dir === 'UP' ? 'text-green-500' : item.dir === 'DOWN' ? 'text-red-500' : 'text-amber-500'}>
                  {item.dir === 'SHIFT' ? 'VOLATILITY' : item.prob}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
