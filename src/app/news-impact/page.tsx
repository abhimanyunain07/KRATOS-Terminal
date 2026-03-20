'use client';

export default function NewsImpactPage() {
  const news = [
    { title: "Escalation in Taiwan Strait", impact: 85, markets: ["Semi", "Defense"] },
    { title: "Unexpected Job Growth Report", impact: 60, markets: ["Fed Rates", "SPX"] },
    { title: "Major Crypto Exchange Hack", impact: 95, markets: ["BTC", "ETH"] },
    { title: "OPEC Cuts Production by 2M", impact: 75, markets: ["Oil", "Energy"] },
    { title: "New AI Regulation Passed in EU", impact: 50, markets: ["Tech", "Europe"] },
    { title: "SpaceX Successful Mars Landing", impact: 40, markets: ["Space", "Tech"] },
    { title: "Global Pandemic Declared Over", impact: 20, markets: ["Travel", "Health"] },
    { title: "Major Earthquake in California", impact: 90, markets: ["Insurance", "Construction"] },
    { title: "Breakthrough in Fusion Energy", impact: 80, markets: ["Energy", "Tech"] }
  ];

  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <header className="flex justify-between items-center pb-2 border-b border-[#333] shrink-0">
        <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">News Impact NLP matrix</h1>
      </header>
      
      <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-4 overflow-y-auto pb-8">
        {news.map((n, i) => (
          <div key={i} className="glassmorphism p-4 border border-[#333] hover:border-cyan-500 transition-colors flex flex-col">
             <div className="text-xs text-gray-500 mb-2">REUTERS / AP FEED</div>
             <h3 className="font-bold text-gray-200 flex-1">{n.title}</h3>
             <div className="mt-4 pt-4 border-t border-[#333] flex justify-between items-center">
               <div>
                 <div className="text-[10px] text-gray-500 uppercase">AI Impact Score</div>
                 <div className={`text-lg font-black ${n.impact > 80 ? 'text-red-500' : 'text-amber-500'}`}>{n.impact}/100</div>
               </div>
               <div className="text-right">
                 <div className="text-[10px] text-gray-500 uppercase">Correlated Mkts</div>
                 <div className="text-cyan-500 text-sm font-mono">{n.markets.join(', ')}</div>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
