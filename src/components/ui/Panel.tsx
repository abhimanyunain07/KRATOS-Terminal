import React from 'react';

export function Panel({ 
  title, 
  children, 
  className = "",
  headerAddon
}: { 
  title: string; 
  children: React.ReactNode;
  className?: string;
  headerAddon?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col border border-cyan-800/40 bg-black/60 shadow-[0_0_20px_rgba(6,182,212,0.05)_inset] rounded backdrop-blur-md relative overflow-hidden group transition-all duration-300 hover:border-cyan-600/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)_inset] ${className}`}>
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div className="h-8 flex-none bg-gradient-to-r from-cyan-950/80 to-transparent border-b border-cyan-800/50 px-3 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
            <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-widest text-shadow-cyan">
              {title}
            </span>
        </div>
        {headerAddon && <div className="text-[10px] text-cyan-600 font-mono flex items-center">{headerAddon}</div>}
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-hidden p-2 md:p-3 relative z-10">
        {children}
      </div>
    </div>
  );
}
