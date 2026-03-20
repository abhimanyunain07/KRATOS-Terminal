import { Panel } from '../components/ui/Panel';
import { Activity, ShieldCheck, Zap, Lock, Database } from 'lucide-react';
import { useState } from 'react';

export default function TradingAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
    }, 2000);
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col h-full gap-4 relative items-center justify-center text-center max-w-2xl mx-auto">
        <Panel title="System Access Granted" className="w-full h-96 flex flex-col items-center justify-center p-8 bg-cyan-950/20 shadow-[0_0_50px_rgba(34,211,238,0.1)_inset]">
           <div className="w-24 h-24 rounded-full border-4 border-cyan-500/50 flex items-center justify-center mb-6 relative animate-[pulse_4s_infinite]">
             <div className="absolute inset-0 border border-cyan-400 rounded-full animate-ping opacity-20" />
             <ShieldCheck size={48} className="text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
           </div>
           
           <h2 className="text-2xl font-bold text-cyan-300 font-mono uppercase tracking-widest text-shadow-cyan mb-2">
             TRADING DESK ONLINE
           </h2>
           <p className="text-xs text-cyan-600 font-mono max-w-md mx-auto leading-relaxed mb-6">
             Encrypted tunnel established to Polymarket & Kalshi APIs. Liquidity pools synchronized. Algorithmic trade execution protocols armed.
           </p>

           <div className="flex gap-4">
             <button className="bg-cyan-900/40 hover:bg-cyan-800/60 border border-cyan-500 text-cyan-300 py-2 px-6 rounded font-bold text-[10px] uppercase tracking-widest transition-all">
               View Open Positions
             </button>
             <button onClick={() => setIsAuthenticated(false)} className="bg-transparent hover:bg-red-900/20 border border-red-900/50 text-red-500 py-2 px-6 rounded font-bold text-[10px] uppercase tracking-widest transition-all">
               Terminate Session
             </button>
           </div>
        </Panel>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4 relative items-center justify-center">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-900/10 rounded-full flex items-center justify-center pointer-events-none opacity-50">
         <div className="w-[400px] h-[400px] border border-cyan-800/20 rounded-full animate-[spin_60s_linear_infinite]" />
         <div className="absolute w-[200px] h-[200px] border border-cyan-600/30 rounded-full animate-[spin_30s_reverse_linear_infinite]" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <Panel 
           title="Brokerage Authentication Protocol" 
           className="shadow-[0_0_40px_rgba(6,182,212,0.15)_inset] bg-black/80 backdrop-blur-xl border-cyan-500/40"
           headerAddon={<Lock size={12} className="text-red-500 animate-pulse" />}
        >
          <div className="p-4 flex flex-col gap-6">
             
             <div className="text-center">
               <div className="w-12 h-12 rounded bg-gradient-to-br from-cyan-950 to-black border border-cyan-800 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                 <Database size={24} className="text-cyan-400" />
               </div>
               <h3 className="text-cyan-300 font-bold font-mono tracking-widest uppercase">Secure API Gateway</h3>
               <p className="text-[9px] text-cyan-700 font-mono mt-1">Connect exchange keys to enable algorithmic execution</p>
             </div>

             <form onSubmit={handleAuth} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-[10px] font-mono">
                  <label className="text-cyan-500 uppercase tracking-widest flex justify-between">
                    <span>Polymarket API Key</span>
                    <span className="text-cyan-800">Polygon Network</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="pk_poly_************************" 
                    className="bg-black/60 border border-cyan-900/60 rounded p-2 text-cyan-300 outline-none focus:border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.05)_inset] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1 text-[10px] font-mono">
                  <label className="text-cyan-500 uppercase tracking-widest flex justify-between">
                    <span>Kalshi API Secret</span>
                    <span className="text-amber-800">CFTC Regulated</span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="ks_************************" 
                    className="bg-black/60 border border-cyan-900/60 rounded p-2 text-cyan-300 outline-none focus:border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.05)_inset] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1 text-[10px] font-mono">
                  <label className="text-cyan-500 uppercase tracking-widest flex justify-between">
                    <span>Master Encryption Passphrase</span>
                    <span className="text-red-500 flex items-center gap-1"><ShieldCheck size={10}/></span>
                  </label>
                  <input 
                    type="password" 
                    placeholder="****************" 
                    className="bg-black/60 border border-cyan-900/60 rounded p-2 text-cyan-300 outline-none focus:border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.05)_inset] transition-colors"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="mt-4 bg-gradient-to-r from-cyan-950 to-cyan-900 hover:from-cyan-900 hover:to-cyan-800 border border-cyan-500 text-cyan-300 py-3 rounded font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)_inset] group"
                >
                  {loading ? (
                    <><Activity size={14} className="animate-spin text-cyan-400" /> INITIALIZING HANDSHAKE...</>
                  ) : (
                    <><Zap size={14} className="text-cyan-400 group-hover:scale-110 transition-transform" /> AUTHENTICATE & CONNECT</>
                  )}
                </button>
             </form>
             
             <div className="text-[8px] text-cyan-800 font-mono text-center px-4 leading-relaxed">
               WARNING: Connecting API keys authorizes Kratos to execute trades autonomously based on predefined risk parameters. Keys are stored locally via AES-256 encryption.
             </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
