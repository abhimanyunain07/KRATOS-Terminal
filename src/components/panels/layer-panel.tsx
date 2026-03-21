"use client";

import { useMemo, useState } from "react";
import type { LayerDefinition } from "@/types/kratos";
import { useKratosStore } from "@/store/kratos-store";
import { TerminalPanel } from "@/components/ui/terminal-panel";
import { cn } from "@/lib/utils";

export function LayerPanel({ layers }: { layers: LayerDefinition[] }) {
  const { activeLayerIds, toggleLayer } = useKratosStore();
  const [search, setSearch] = useState("");

  const filteredLayers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return layers;
    }
    return layers.filter((layer) => `${layer.name} ${layer.family} ${layer.description}`.toLowerCase().includes(query));
  }, [layers, search]);

  return (
    <TerminalPanel
      title="Layer Matrix"
      subtitle={`${layers.length} datasets mapped into the PMAP control plane`}
      action={<span className="text-xs text-cyan-300">{activeLayerIds.length} live</span>}
      className="h-full"
    >
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Filter 390+ layers"
        className="mb-3 w-full rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600"
      />
      <div className="max-h-[480px] space-y-2 overflow-auto pr-1">
        {filteredLayers.map((layer) => {
          const active = activeLayerIds.includes(layer.id);
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => toggleLayer(layer.id)}
              className={cn(
                "w-full rounded-xl border px-3 py-3 text-left transition",
                active
                  ? "border-cyan-400/40 bg-cyan-400/10"
                  : "border-white/8 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-cyan-400/5",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-white">{layer.name}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-slate-500">{layer.family}</p>
                </div>
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: layer.color,
                    boxShadow: `0 0 16px ${layer.color}`,
                  }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">{layer.description}</p>
            </button>
          );
        })}
      </div>
    </TerminalPanel>
  );
}

