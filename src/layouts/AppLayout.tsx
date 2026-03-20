import React from 'react';
import { Sidebar } from './Sidebar';
import { Terminal } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black text-cyan-400 font-mono text-sm antialiased selection:bg-cyan-500 selection:text-black scanlines relative">
      {/* Dynamic Grid Background Effect */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black opacity-80" />
      <div className="absolute inset-0 z-0 border-[rgba(6,182,212,0.03)] border-[1px] grid bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[length:40px_40px]" />
      
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        {/* Top Header/Utility Bar */}
        <header className="h-12 border-b border-cyan-900/40 bg-black/80 backdrop-blur flex items-center justify-between px-6 shrink-0 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-4 text-cyan-600">
            <Terminal size={16} className="text-cyan-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest">Kratos Core Interface Active</span>
          </div>
          
          <div className="flex gap-6 items-center text-[10px] font-bold text-cyan-600 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
              Poly-API Sync
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              Kalshi-API Sync
            </div>
          </div>
        </header>

        {/* Page Content injected here */}
        <div className="flex-1 overflow-hidden p-3 md:p-4 bg-gradient-to-br from-black to-slate-950">
          {children}
        </div>
      </main>
    </div>
  );
}
