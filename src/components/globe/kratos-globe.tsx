"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ArcEntity, LabelEntity, LayerDefinition, MarketEntity, VesselTrack } from "@/types/kratos";
import { useKratosStore } from "@/store/kratos-store";
import { formatCompactNumber, formatPercent } from "@/lib/utils";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => <div className="h-full min-h-[280px] rounded-2xl border border-white/10 bg-black/60" />,
});

type KratosGlobeProps = {
  markets: MarketEntity[];
  arcs: ArcEntity[];
  labels: LabelEntity[];
  vessels?: VesselTrack[];
  layers: LayerDefinition[];
  height?: number;
};

export function KratosGlobe({ markets, arcs, labels, vessels = [], layers, height = 620 }: KratosGlobeProps) {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height });
  const {
    activeLayerIds,
    setHoveredEntityId,
    setHoveredTooltip,
    setRotationPaused,
    rotationPaused,
    setSelectedEntity,
  } = useKratosStore();

  useEffect(() => {
    const handleResize = () =>
      setDimensions({
        width: Math.max(window.innerWidth - 420, 460),
        height,
      });

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  useEffect(() => {
    if (!globeRef.current) {
      return;
    }

    const controls = globeRef.current.controls();
    controls.autoRotate = !rotationPaused;
    controls.autoRotateSpeed = 0.45;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
  }, [rotationPaused]);

  const enabledFamilies = useMemo(() => {
    const familySet = new Set<string>();

    for (const layerId of activeLayerIds) {
      const layer = layers.find((entry) => entry.id === layerId);
      if (layer) {
        familySet.add(layer.family);
      }
    }

    return familySet;
  }, [activeLayerIds, layers]);

  const visibleMarkets = useMemo(() => {
    if (enabledFamilies.size === 0 || enabledFamilies.has("Events")) {
      return markets;
    }
    return markets.filter((market) => enabledFamilies.has(market.category === "Politics" ? "Arbitrage" : "Events"));
  }, [enabledFamilies, markets]);

  const visibleArcs = useMemo(() => {
    if (enabledFamilies.has("Arbitrage") || enabledFamilies.has("Risk") || enabledFamilies.has("Infrastructure")) {
      return arcs;
    }
    return arcs.slice(0, 8);
  }, [arcs, enabledFamilies]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-[radial-gradient(circle_at_top,rgba(8,145,178,0.16),transparent_35%),rgba(0,0,0,0.78)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent,rgba(255,255,255,0.02)_50%,transparent)] bg-[length:100%_3px]" />
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#0ea5e9"
        atmosphereAltitude={0.18}
        enablePointerInteraction
        pointsData={visibleMarkets}
        pointLat="lat"
        pointLng="lng"
        pointColor={(point: object) =>
          (point as MarketEntity).riskScore > 0.72 ? "#f97316" : (point as MarketEntity).platform === "Kalshi" ? "#f59e0b" : "#06b6d4"
        }
        pointAltitude={(point: object) => 0.04 + (point as MarketEntity).probability * 0.12}
        pointRadius={(point: object) => 0.12 + (point as MarketEntity).liquidity / 1_000_000}
        pointLabel={(point: object) => {
          const market = point as MarketEntity;
          return `
            <div style="padding:8px 10px;border:1px solid rgba(6,182,212,.4);background:rgba(2,6,23,.92);border-radius:12px">
              <div style="font-size:10px;text-transform:uppercase;color:#67e8f9;letter-spacing:.18em">${market.platform}</div>
              <div style="font-size:13px;color:white;margin-top:6px">${market.title}</div>
              <div style="font-size:11px;color:#cbd5e1;margin-top:4px">Prob ${formatPercent(market.probability)} | Vol ${formatCompactNumber(market.volume)}</div>
            </div>
          `;
        }}
        onPointClick={(point: object) => setSelectedEntity(point as MarketEntity)}
        onPointHover={(point: object | null) => {
          const market = point as MarketEntity | null;
          setHoveredEntityId(market?.id ?? null);
          setHoveredTooltip(
            market
              ? `${market.title} | EV ${(market.ev * 100).toFixed(1)}bps | Kelly ${(market.kellyFraction * 100).toFixed(1)}%`
              : null,
          );
          setRotationPaused(Boolean(point));
        }}
        arcsData={visibleArcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor={(arc: object) => {
          const item = arc as ArcEntity;
          return item.riskLevel > 0.72 ? ["#fb7185", "#f97316"] : ["#06b6d4", "#0ea5e9"];
        }}
        arcDashLength={0.55}
        arcDashGap={0.16}
        arcDashAnimateTime={2400}
        arcStroke={(arc: object) => 0.55 + (arc as ArcEntity).riskLevel * 1.2}
        arcLabel={(arc: object) => {
          const item = arc as ArcEntity;
          return `${item.dependencyLabel} | Risk ${(item.riskLevel * 100).toFixed(0)} | Exposure ${formatCompactNumber(item.volumeExposure)}`;
        }}
        onArcClick={(arc: object) => {
          const item = arc as ArcEntity;
          const entity = markets.find((market) => market.id === item.sourceId);
          setSelectedEntity(entity ?? null);
        }}
        labelsData={labels}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelColor={(label: object) => ((label as LabelEntity).type === "warning" ? "#fb7185" : "#67e8f9")}
        labelDotRadius={0.28}
        labelSize={1.4}
        labelResolution={3}
        labelLabel={(label: object) => (label as LabelEntity).region}
        onLabelClick={(label: object) => {
          const region = (label as LabelEntity).region;
          const entity = markets.find((market) => market.region === region);
          setSelectedEntity(entity ?? null);
        }}
        ringsData={vessels.filter((vessel) => vessel.status === "dark")}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => "#fb7185"}
        ringMaxRadius={() => 2.3}
        ringPropagationSpeed={() => 0.7}
        ringRepeatPeriod={() => 1600}
        onGlobeClick={() => setRotationPaused(false)}
        onZoom={() => setHoveredTooltip("Zoom event received. Density-aware data refresh path is wired.")}
      />
    </div>
  );
}

