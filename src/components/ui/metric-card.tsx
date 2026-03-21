import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "amber" | "lime" | "red";
  className?: string;
};

const toneStyles = {
  cyan: "border-cyan-400/25 bg-cyan-400/5 text-cyan-200",
  amber: "border-amber-400/25 bg-amber-400/5 text-amber-200",
  lime: "border-lime-400/25 bg-lime-400/5 text-lime-200",
  red: "border-red-400/25 bg-red-400/5 text-red-200",
};

export function MetricCard({ label, value, detail, tone = "cyan", className }: MetricCardProps) {
  return (
    <div className={cn("rounded-xl border p-3", toneStyles[tone], className)}>
      <p className="text-[10px] uppercase tracking-[0.35em] text-white/55">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      <p className="mt-2 text-xs text-white/70">{detail}</p>
    </div>
  );
}

