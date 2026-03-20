
import { NavLink } from 'react-router-dom';
import { 
  Eye, 
  Globe, 
  BarChart3, 
  Newspaper, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Wallet,
  ActivitySquare
} from 'lucide-react';

export function Sidebar() {
  const navItems = [
    { icon: Eye, label: "GOD'S EYE", path: "/gods-eye" },
    { icon: ActivitySquare, label: "DASHBOARD", path: "/dashboard" },
    { icon: BarChart3, label: "MARKETS", path: "/markets" },
    { icon: Activity, label: "SPORTS", path: "/markets/sports" },
    { icon: Newspaper, label: "IMPACT NEWS", path: "/news" },
    { icon: Globe, label: "GLOBE & MIROFISH", path: "/globe" },
    { icon: ShieldAlert, label: "ARBITRAGE SCAN", path: "/arbitrage" },
    { icon: TrendingUp, label: "STOCKS & COMM", path: "/stocks" },
    { icon: Wallet, label: "TRADING DESK", path: "/trade" },
  ];

  return (
    <aside className="w-64 bg-black/90 border-r border-cyan-900/50 flex flex-col h-full z-20 backdrop-blur-md relative shadow-[0_0_20px_rgba(8,145,178,0.1)]">
      {/* Brand Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-cyan-900/30 shrink-0">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Eye size={18} className="text-black" />
        </div>
        <div>
          <h1 className="text-cyan-400 font-bold tracking-widest text-sm text-shadow-cyan uppercase">KRATOS</h1>
          <p className="text-[10px] text-cyan-600/70 uppercase tracking-widest">Global Intel OS</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-custom">
        <div className="text-[10px] font-bold text-cyan-800 uppercase tracking-widest mb-3 pl-3">Main Systems</div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-3 py-2.5 rounded text-xs font-mono tracking-wide transition-all group relative overflow-hidden ${
                isActive 
                  ? 'bg-cyan-900/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)_inset]' 
                  : 'text-cyan-700 hover:text-cyan-400 hover:bg-cyan-900/10'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
                )}
                <item.icon size={16} className={`shrink-0 ${isActive ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'group-hover:text-cyan-500'}`} />
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* System Status Footer */}
      <div className="p-4 border-t border-cyan-900/30 bg-black/50 text-[10px] font-mono text-cyan-700 space-y-2">
        <div className="flex justify-between items-center">
          <span>SYS_CORE</span>
          <span className="text-green-500 font-bold animate-pulse">ONLINE</span>
        </div>
        <div className="flex justify-between items-center">
          <span>SEC_LEVEL</span>
          <span className="text-amber-500">OMEGA</span>
        </div>
        <div className="w-full bg-cyan-900/20 h-1 rounded overflow-hidden mt-2">
           <div className="h-full bg-cyan-500 w-[94%] shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
        </div>
      </div>
    </aside>
  );
}
