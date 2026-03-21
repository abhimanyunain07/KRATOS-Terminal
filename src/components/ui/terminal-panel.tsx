import { cn } from "@/lib/utils";

type TerminalPanelProps = {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function TerminalPanel({ title, subtitle, action, children, className }: TerminalPanelProps) {
  return (
    <section
      className={cn(
        "terminal-panel relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-4 shadow-[0_0_40px_rgba(6,182,212,0.08)] backdrop-blur-xl",
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/8 pb-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.45em] text-cyan-300/80">{title}</p>
          {subtitle ? <p className="mt-1 text-xs text-slate-400">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

