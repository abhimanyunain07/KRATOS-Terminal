'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import useAppStore from '@/store/useAppStore';

const Globe = dynamic(() => import('react-globe.gl').then(mod => mod.default), { ssr: false });

export default function InteractiveGlobe() {
  const globeEl = useRef<any>(null);
  const [mounted, setMounted] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 800, height: 600 });
  const activeLayer = useAppStore(state => state.activeLayer);

  // Normalizing mock Polymarket/Kalshi data
  const mockEvents = useMemo(() => [
    { id: 'ev1', title: 'US General Election', platform: 'Polymarket', odds: 0.52, lat: 38.89, lng: -77.03, vol: 154000000, color: '#00ff00' },
    { id: 'ev2', title: 'Taiwan Strait Crisis', platform: 'Kalshi', odds: 0.18, lat: 23.69, lng: 120.96, vol: 45000000, color: '#ff3333' },
    { id: 'ev3', title: 'BTC hits $200k', platform: 'Manifold', odds: 0.35, lat: 1.35, lng: 103.81, vol: 92000000, color: '#00aaff' },
  ], []);

  const mockArcs = useMemo(() => [
    { startLat: 23.69, startLng: 120.96, endLat: 38.89, endLng: -77.03, color: ['#ff3333', '#f59e0b'] }
  ], []);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const handleResize = () => setWindowDimensions({ width: window.innerWidth, height: window.innerHeight - 80 });
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.pointOfView({ altitude: 2.2 });
    }
  }, []);

  const pointsData = activeLayer === 'events' || activeLayer === 'all' ? mockEvents : [];
  const arcsData = activeLayer === 'arcs' || activeLayer === 'all' ? mockArcs : [];

  return (
    <div className="flex-1 w-full h-full relative cursor-crosshair">
      {mounted && <Globe
        ref={globeEl}
        width={windowDimensions.width}
        height={windowDimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Point layer
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={d => Math.max(0.05, (d as any).vol / 1000000000)}
        pointRadius={d => Math.max(0.1, (d as any).vol / 500000000)}
        pointLabel={d => `
          <div style="background: rgba(0,0,0,0.85); border: 1px solid #06b6d4; padding: 6px; font-family: monospace;">
            <b>${(d as any).title}</b><br/>
            Odds: ${((d as any).odds * 100).toFixed(1)}%<br/>
            Vol: $${((d as any).vol / 1000000).toFixed(1)}M
          </div>
        `}
        onPointClick={(d) => console.log('BQL Drilling:', d)}

        // Arc layer
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        
        // Settings
        enablePointerInteraction={true}
      />}
    </div>
  );
}
