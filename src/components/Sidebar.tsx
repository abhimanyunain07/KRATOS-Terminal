'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Globe, TrendingUp, Newspaper, ArrowRightLeft, Activity, Target } from 'lucide-react';
import useAppStore from '@/store/useAppStore';

const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 border-l-4 transition-all ${isActive ? 'border-cyan-500 bg-cyan-900/20 text-cyan-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800'}`}>
      <Icon size={18} />
      <span className="text-sm tracking-wider uppercase font-bold">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const isSidebarOpen = useAppStore(state => state.isSidebarOpen);

  if (!isSidebarOpen) return null;

  return (
    <div className="w-64 z-20 h-full bg-[#0a0a0a] border-r border-[#333] flex flex-col pt-4 relative">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-black text-amber-500 tracking-tighter text-shadow-amber">
          KRATOS<span className="text-cyan-500 text-shadow-cyan">V2</span>
        </h1>
        <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Pred Mrkt Term</div>
      </div>

      <nav className="flex-1 flex flex-col gap-1">
        <NavItem href="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem href="/gods-eye" icon={Globe} label="Gods Eye" />
        <NavItem href="/markets" icon={TrendingUp} label="Markets" />
        <NavItem href="/news-impact" icon={Newspaper} label="News Impact" />
        <NavItem href="/arbitrage" icon={ArrowRightLeft} label="Arbitrage" />
        <NavItem href="/stocks" icon={Activity} label="Stocks/Macro" />
        <NavItem href="/sports" icon={Target} label="Sports Model" />
      </nav>
      
      <div className="p-4 border-t border-[#333]">
        <div className="text-xs text-gray-500 font-mono">STATUS: <span className="text-green-500">CONNECTED</span></div>
      </div>
    </div>
  );
}
