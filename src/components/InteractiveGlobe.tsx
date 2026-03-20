import { useState, useEffect, useRef, useMemo } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

// Simulated BQL/SPLC/POSH data generators
const N_ASSETS = 300;
const N_SHIPS = 120;
const N_LINKS = 80;

// Geopolitical Danger Zones
const DANGER_ZONES = [
  { lat: 23.5, lng: 121, name: "Taiwan Strait", risk: "CRITICAL" },
  { lat: 25.0, lng: 55.0, name: "Strait of Hormuz", risk: "SEVERE" },
  { lat: 48.0, lng: 37.0, name: "Black Sea Corridor", risk: "CRITICAL" },
  { lat: 10.0, lng: 114.0, name: "South China Sea", risk: "HIGH" }
];

export function InteractiveGlobe({
  activeLayer = 'MAP', // MAP, SPLC, POSH
  onNodeClick,
}: {
  activeLayer?: 'MAP' | 'SPLC' | 'POSH';
  onNodeClick?: (nodeData: any) => void;
}) {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // 1. MAP Layer Data: Global Physical Assets (Refineries, Factories, Hubs)
  const mapAssets = useMemo(() => {
    return Array.from({ length: N_ASSETS }).map((_, i) => {
      const isRefinery = Math.random() > 0.6;
      const lat = (Math.random() - 0.5) * 160;
      const lng = (Math.random() - 0.5) * 360;
      // Check if near danger zone
      const nearDanger = DANGER_ZONES.some(z => Math.abs(z.lat - lat) < 15 && Math.abs(z.lng - lng) < 15);
      
      return {
        id: `ast-${i}`,
        type: isRefinery ? 'Refinery' : 'Semiconductor Fab',
        lat,
        lng,
        size: Math.random() * 0.8 + 0.2,
        color: nearDanger ? '#ef4444' : isRefinery ? '#eab308' : '#3b82f6',
        name: `${isRefinery ? 'Energy Hub' : 'Tech Mfg'} ${Math.floor(Math.random() * 999)}`,
        riskLevel: nearDanger ? 'CRITICAL' : 'NOMINAL',
        capacity: Math.floor(Math.random() * 10000) + ' MT',
        revenueAtRisk: nearDanger ? `$${(Math.random() * 5 + 1).toFixed(1)}B` : '$0',
      };
    });
  }, []);

  // 2. POSH Layer Data: Maritime Tracking & Dark Fleet
  const poshShips = useMemo(() => {
    return Array.from({ length: N_SHIPS }).map((_, i) => {
      const isDarkFleet = Math.random() > 0.8;
      const lat = (Math.random() - 0.5) * 140; // Avoid poles
      const lng = (Math.random() - 0.5) * 360;
      const draftChange = Math.random();
      const anomaly = isDarkFleet || draftChange > 0.8;

      return {
        id: `shp-${i}`,
        mmsi: Math.floor(100000000 + Math.random() * 900000000),
        lat,
        lng,
        size: anomaly ? 0.6 : 0.3,
        color: anomaly ? '#ef4444' : '#22c55e',
        name: `Tanker IMO-${Math.floor(Math.random() * 9999)}`,
        status: anomaly ? (draftChange > 0.8 ? 'STS Transfer Detected' : 'AIS Spoofing') : 'Underway',
        draft: (Math.random() * 10 + 5).toFixed(1) + 'm',
        speed: (Math.random() * 20).toFixed(1) + ' kts',
        isAnomaly: anomaly
      };
    });
  }, []);

  // 3. SPLC Layer Data: Supply Chain Relationships
  const splcLinks = useMemo(() => {
    return Array.from({ length: N_LINKS }).map(() => {
      const source = mapAssets[Math.floor(Math.random() * mapAssets.length)];
      let target = mapAssets[Math.floor(Math.random() * mapAssets.length)];
      while (source.id === target.id) target = mapAssets[Math.floor(Math.random() * mapAssets.length)];

      const isHighRisk = source.riskLevel === 'CRITICAL' || target.riskLevel === 'CRITICAL';

      return {
        startLat: source.lat,
        startLng: source.lng,
        endLat: target.lat,
        endLng: target.lng,
        sourceName: source.name,
        targetName: target.name,
        color: isHighRisk ? ['#ef4444', '#f97316'] : ['#0ea5e9', '#3b82f6'],
        dependency: (Math.random() * 40 + 10).toFixed(1) + '%',
        valueStr: `$${(Math.random() * 900 + 100).toFixed(0)}M`
      };
    });
  }, [mapAssets]);


  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial Globe config
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.3;
      globeEl.current.controls().enableZoom = true;
      
      // Point to a high-density area
      globeEl.current.pointOfView({ lat: 25, lng: 55, altitude: 1.5 }, 2000);
    }
  }, []);

  // Handle interaction pause on hover
  const onHover = (obj: any) => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = !obj;
    }
  };

  if (dimensions.width === 0) {
     return <div ref={containerRef} className="w-full h-full" />;
  }

  // Determine what data to show based on layer
  const showAssets = activeLayer === 'MAP' || activeLayer === 'SPLC';
  const showShips = activeLayer === 'POSH';
  const showLinks = activeLayer === 'SPLC';

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black cursor-crosshair">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // --- MAP Layer (Assets) ---
        pointsData={showAssets ? mapAssets : []}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={d => (d as any).riskLevel === 'CRITICAL' ? 0.05 : 0.01}
        pointRadius="size"
        pointResolution={32}
        pointLabel="name"
        onPointHover={onHover}
        onPointClick={(d) => {
          onNodeClick && onNodeClick({ layer: 'MAP', data: d });
        }}
        
        // --- POSH Layer (Ships) ---
        customLayerData={showShips ? poshShips : []}
        customLayerLabel="name"
        customThreeObject={(d: any) => {
          // Render a small glowing sphere or cone for ships
          const geom = new THREE.CylinderGeometry(0, d.size, d.size * 2, 8);
          geom.rotateX(Math.PI / 2);
          const mat = new THREE.MeshLambertMaterial({ 
            color: d.color, 
            emissive: d.color, 
            emissiveIntensity: d.isAnomaly ? 0.8 : 0.2 
          });
          return new THREE.Mesh(geom, mat);
        }}
        customThreeObjectUpdate={(obj: any, d: any) => {
          Object.assign(obj.position, globeEl.current.getCoords(d.lat, d.lng, 0.01));
          // make ship point outward
          obj.lookAt(globeEl.current.getCoords(d.lat, d.lng, 2));
        }}
        onCustomLayerHover={onHover}
        onCustomLayerClick={(d) => {
          onNodeClick && onNodeClick({ layer: 'POSH', data: d });
        }}

        // --- SPLC Layer (Supply Chain Links) ---
        arcsData={showLinks ? splcLinks : []}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={(d: any) => d.color[0] === '#ef4444' ? 1000 : 3000} // Fast animation for risk links
        arcStroke={(d: any) => d.color[0] === '#ef4444' ? 0.8 : 0.3}
        arcAltitudeAutoScale={0.2}
        arcLabel={(d: any) => `${d.sourceName} ➔ ${d.targetName}`}
        onArcHover={onHover}
        onArcClick={(d) => {
          onNodeClick && onNodeClick({ layer: 'SPLC', data: d });
        }}

        // Atmosphere styling (Intense Bloomberg/Terminal style)
        atmosphereColor="#0ea5e9"
        atmosphereAltitude={0.15}
        
        // Hex Polygons for styling landmasses
        hexPolygonResolution={3}
        hexPolygonMargin={0.7}
        hexPolygonColor={() => '#111827'}

        // Interaction configuration
        enablePointerInteraction={true}
      />
    </div>
  );
}
