"use client";

import { create } from "zustand";
import type { MarketEntity } from "@/types/kratos";

type KratosState = {
  activeLayerIds: string[];
  command: string;
  selectedEntity: MarketEntity | null;
  hoveredEntityId: string | null;
  hoveredTooltip: string | null;
  rotationPaused: boolean;
  toggleLayer: (layerId: string) => void;
  setCommand: (command: string) => void;
  setSelectedEntity: (entity: MarketEntity | null) => void;
  setHoveredEntityId: (entityId: string | null) => void;
  setHoveredTooltip: (tooltip: string | null) => void;
  setRotationPaused: (paused: boolean) => void;
};

export const useKratosStore = create<KratosState>((set) => ({
  activeLayerIds: [
    "events-1",
    "events-2",
    "arbitrage-1",
    "news-1",
    "risk-1",
    "shipping-1",
    "macro-1",
    "flights-1",
  ],
  command: "PMAP<GO>",
  selectedEntity: null,
  hoveredEntityId: null,
  hoveredTooltip: null,
  rotationPaused: false,
  toggleLayer: (layerId) =>
    set((state) => ({
      activeLayerIds: state.activeLayerIds.includes(layerId)
        ? state.activeLayerIds.filter((entry) => entry !== layerId)
        : [...state.activeLayerIds, layerId],
    })),
  setCommand: (command) => set({ command }),
  setSelectedEntity: (selectedEntity) => set({ selectedEntity }),
  setHoveredEntityId: (hoveredEntityId) => set({ hoveredEntityId }),
  setHoveredTooltip: (hoveredTooltip) => set({ hoveredTooltip }),
  setRotationPaused: (rotationPaused) => set({ rotationPaused }),
}));

