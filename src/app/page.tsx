import MiniGlobe from '@/components/MiniGlobe';

export default function DashboardPage() {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <header className="flex justify-between items-center pb-2 border-b border-[#333] relative z-10">
        <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">Macro Dashboard</h1>
        <div className="text-xs text-gray-400">SYS_TIME: {new Date().toISOString()}</div>
      </header>

      {/* 6-panel grid */}
      <div className="grid grid-cols-3 grid-rows-2 gap-4 flex-1 relative z-10">
        <div className="glassmorphism p-4 rounded flex flex-col">
          <h2 className="text-xs uppercase text-amber-500 mb-2 font-bold">Markets Overview</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500">LOADING DATA...</div>
        </div>
        
        <div className="glassmorphism p-4 rounded flex flex-col">
          <h2 className="text-xs uppercase text-amber-500 mb-2 font-bold">Arbitrage Alerts</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500">SCANNING...</div>
        </div>
        
        <div className="glassmorphism p-4 rounded flex flex-col border border-cyan-500/50">
          <h2 className="text-xs uppercase text-cyan-500 mb-2 font-bold">Impact News Ticker</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500">CONNECTING...</div>
        </div>

        <div className="glassmorphism p-4 rounded flex flex-col">
          <h2 className="text-xs uppercase text-amber-500 mb-2 font-bold">Macro (Stocks/Crypto)</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500">AWAITING FEED...</div>
        </div>

        <div className="glassmorphism p-4 rounded flex flex-col">
          <h2 className="text-xs uppercase text-amber-500 mb-2 font-bold">Alpha Trades</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500">COMPUTING EV...</div>
        </div>

        <div className="glassmorphism p-4 rounded flex flex-col relative overflow-hidden">
          <h2 className="text-xs uppercase text-amber-500 mb-2 font-bold absolute z-10">Quick Globe</h2>
          <div className="flex-1 flex items-center justify-center text-gray-500 mt-6 relative z-10 opacity-0 pointer-events-none">MINI GLOBE RENDERER</div>
          <MiniGlobe />
        </div>
      </div>
    </div>
  );
}
