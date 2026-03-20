import { Panel } from '../components/ui/Panel';
import { Newspaper, AlertTriangle, TrendingUp, TrendingDown, Target } from 'lucide-react';

export default function NewsImpact() {
  const newsItems = [
    {
      id: 1,
      title: "OPEC+ Announces Unscheduled Production Cut of 2M bpd",
      source: "REUTERS_GLOBAL",
      time: "2 mins ago",
      impact: "CRITICAL",
      type: "ENERGY",
      desc: "Emergency meeting concludes with aggressive supply contraction. Market consensus broken.",
      coords: "[24.7136, 46.6753]",
      probShift: "+45% WTI > $90"
    },
    {
      id: 2,
      title: "Federal Reserve Emergency Rate Meeting Leaked",
      source: "BLOOMBERG_TERM",
      time: "14 mins ago",
      impact: "HIGH",
      type: "MACRO",
      desc: "Insider report suggests 50bps hike discussion off-cycle due to CPI shock.",
      coords: "[38.8951, -77.0364]",
      probShift: "-22% SPX > 5000"
    },
    {
      id: 3,
      title: "Taiwan Strait: Unidentified Naval Build-up Detected",
      source: "SAT_INTEL_ALPHA",
      time: "21 mins ago",
      impact: "CRITICAL",
      type: "GEOPOL",
      desc: "High-res satellite imagery confirms multi-vessel deployment outside median line.",
      coords: "[24.8, 120.3]",
      probShift: "+68% TSM volatility"
    },
    {
      id: 4,
      title: "SEC Approves Novel Crypto ETF Structure",
      source: "SEC_EDGAR_API",
      time: "42 mins ago",
      impact: "HIGH",
      type: "CRYPTO",
      desc: "Regulatory hurdle cleared for hybrid synthetic crypto assets.",
      coords: "[38.9072, -77.0369]",
      probShift: "+35% BTC > $80k"
    },
    {
      id: 5,
      title: "Major EU Tech Regulation Fails in Parliament",
      source: "EU_GOV_WIRE",
      time: "1 hr ago",
      impact: "MEDIUM",
      type: "TECH",
      desc: "AI strict liability act voted down unexpectedly, tech stocks rally pre-market.",
      coords: "[50.8503, 4.3517]",
      probShift: "+15% META/GOOGL"
    },
    {
      id: 6,
      title: "Panama Canal Drought: Transit Slots Halved",
      source: "MARITIME_DATA",
      time: "1.5 hrs ago",
      impact: "HIGH",
      type: "SUPPLY",
      desc: "Water levels reach historic lows, cascading supply chain delays expected.",
      coords: "[9.1448, -79.9234]",
      probShift: "+25% Shipping Rates"
    }
  ];

  const highestReturnTrade = {
    market: "WTI Crude Oil Call Options / Kalshi Event",
    prediction: "Oil touches $95 by end of month",
    confidence: "94.2%",
    expectedReturn: "+420%",
    rationale: "OPEC+ cut aligns with SPR depletion and upcoming winter demand models. Swarm prediction strongly correlates.",
    algoScore: 98.7
  };

  return (
    <div className="flex h-full gap-4 relative">
      {/* 2/3 Section: News Grid */}
      <div className="flex-[2] flex flex-col h-full min-w-0 min-h-0">
        <Panel 
           title="Global Impact News Feed" 
           className="flex-1"
           headerAddon={
             <div className="flex gap-4">
               <span className="flex items-center gap-1 text-cyan-500"><Newspaper size={12}/> LIVE FEED</span>
               <span className="flex items-center gap-1 text-red-500 animate-pulse"><AlertTriangle size={12}/> CRITICAL PRIORITY</span>
             </div>
           }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 h-full overflow-auto scrollbar-custom pr-2">
            {newsItems.map(item => (
              <div key={item.id} className="bg-black/80 border border-cyan-900/40 p-3 rounded group hover:border-cyan-500/50 transition-colors flex flex-col relative overflow-hidden">
                {/* Impact Glow */}
                <div className={`absolute top-0 left-0 w-full h-1 ${item.impact === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]' : item.impact === 'HIGH' ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]' : 'bg-cyan-500'}`} />
                
                <div className="flex justify-between items-start mb-2 mt-1">
                  <span className="text-[9px] font-mono text-cyan-600 bg-cyan-950/50 px-1 py-0.5 rounded border border-cyan-900">
                    {item.source}
                  </span>
                  <span className="text-[9px] font-mono text-cyan-700">{item.time}</span>
                </div>
                
                <h3 className="text-cyan-100 font-bold text-xs mb-1 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-[10px] text-cyan-600/80 mb-3 flex-1 line-clamp-3">
                  {item.desc}
                </p>

                <div className="mt-auto pt-2 border-t border-cyan-900/50 grid grid-cols-2 gap-2 text-[9px] font-mono">
                  <div className="text-cyan-700 flex flex-col gap-0.5">
                    <span className="uppercase opacity-50">Geo-Coord</span>
                    <span className="text-cyan-500">{item.coords}</span>
                  </div>
                  <div className="text-right flex flex-col gap-0.5">
                    <span className="uppercase opacity-50 text-cyan-700">Market Shift</span>
                    <span className={`${item.probShift.startsWith('+') ? 'text-green-500' : 'text-red-500'} font-bold`}>
                      {item.probShift}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* 1/3 Section: Algorithmic Market Impact & Trade Suggestions */}
      <div className="flex-[1] flex flex-col h-full min-w-0 min-h-0 gap-4">
        {/* Trade Suggestion */}
        <Panel 
           title="Algorithmic Alpha Trade" 
           className="flex-none shadow-[0_0_30px_rgba(34,197,94,0.05)_inset] border-green-900/30"
           headerAddon={<span className="text-green-500 flex items-center gap-1"><Target size={12}/> HIGH CONVICTION</span>}
        >
          <div className="flex flex-col gap-3">
             <div className="flex justify-between items-start border-b border-green-900/30 pb-2">
                <div>
                   <div className="text-[9px] text-green-700 font-mono uppercase tracking-widest mb-1">Target Market</div>
                   <div className="text-green-400 font-bold text-xs">{highestReturnTrade.market}</div>
                </div>
                <div className="text-right">
                   <div className="text-[9px] text-green-700 font-mono uppercase tracking-widest mb-1">Exp. Return</div>
                   <div className="text-green-500 font-bold text-sm text-shadow-green">{highestReturnTrade.expectedReturn}</div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-green-950/20 p-1.5 rounded border border-green-900/30">
                   <div className="text-green-700 uppercase mb-0.5">Prediction</div>
                   <div className="text-green-500">{highestReturnTrade.prediction}</div>
                </div>
                <div className="bg-green-950/20 p-1.5 rounded border border-green-900/30">
                   <div className="text-green-700 uppercase mb-0.5">Confidence / Score</div>
                   <div className="text-green-500 flex items-center justify-between">
                     <span>{highestReturnTrade.confidence}</span>
                     <span className="bg-green-600 text-black px-1 rounded font-bold">{highestReturnTrade.algoScore}</span>
                   </div>
                </div>
             </div>

             <div className="text-[10px] text-green-600/80 leading-relaxed border-l-2 border-green-700 pl-2">
                <span className="font-bold text-green-600">AI RATIONALE: </span>
                {highestReturnTrade.rationale}
             </div>

             <button className="w-full mt-2 bg-green-900/30 hover:bg-green-800/50 border border-green-700 text-green-400 py-1.5 rounded font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
               Execute Trade Protocol <TrendingUp size={12} />
             </button>
          </div>
        </Panel>

        {/* Global Market Correlation Tracker */}
        <Panel title="Live Market Correlations" className="flex-1">
          <div className="flex flex-col gap-2 h-full overflow-y-auto scrollbar-custom pr-1">
             {[
               { asset: "Crude Oil (WTI)", shift: "+4.2%", trend: 'up' },
               { asset: "S&P 500 VIX", shift: "+12.5%", trend: 'up' },
               { asset: "TSM (Taiwan Semi)", shift: "-3.1%", trend: 'down' },
               { asset: "Bitcoin (BTC)", shift: "+5.8%", trend: 'up' },
               { asset: "Euro (EUR/USD)", shift: "-0.4%", trend: 'down' },
             ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b border-cyan-900/30 hover:bg-cyan-900/20 transition-colors">
                  <span className="text-[10px] font-bold text-cyan-400">{item.asset}</span>
                  <div className={`flex items-center gap-1 text-[10px] font-mono ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {item.shift}
                    {item.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  </div>
                </div>
             ))}
             
             <div className="mt-auto pt-4 text-[9px] text-cyan-700 font-mono text-center uppercase tracking-widest opacity-50">
                Correlations derived from NLP analysis of real-time news streams vs active prediction markets.
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
