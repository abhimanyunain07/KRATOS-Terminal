import type { NewsImpactItem } from "@/types/kratos";
import { TerminalPanel } from "@/components/ui/terminal-panel";

export function NewsGrid({ items }: { items: NewsImpactItem[] }) {
  return (
    <TerminalPanel title="Impact News" subtitle="Minute-by-minute headline scoring for market repricing">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-cyan-300">{item.source}</span>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-1 text-[10px] text-amber-200">
                Impact {(item.impactScore * 100).toFixed(0)}
              </span>
            </div>
            <h3 className="mt-3 text-sm font-medium text-white">{item.headline}</h3>
            <p className="mt-3 text-xs leading-5 text-slate-400">
              Sentiment {item.sentiment.toFixed(2)} | Geo {item.geoProximity.toFixed(2)} | Vol spike {item.volumeSpike.toFixed(2)}x
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.linkedMarkets.map((tag) => (
                <span key={tag} className="rounded-full border border-white/8 bg-black/30 px-2 py-1 text-[10px] uppercase text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </TerminalPanel>
  );
}

