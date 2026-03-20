import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

export function InteractiveGlobe() {
  const globeEl = useRef<any>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive resize
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

  // Initialize data
  useEffect(() => {
    // Generate simulated military/intel bases
    const N = 50;
    const intelPoints = Array.from({ length: N }).map(() => ({
      lat: (Math.random() - 0.5) * 160,
      lng: (Math.random() - 0.5) * 360,
      maxR: Math.random() * 8 + 2,
      propagationSpeed: (Math.random() - 0.5) * 2 + 1,
      repeatPeriod: Math.random() * 2000 + 400
    }));
    setPlaces(intelPoints);

    // Generate simulated flight/drone paths
    const F = 20;
    const arcData = Array.from({ length: F }).map(() => ({
      startLat: (Math.random() - 0.5) * 160,
      startLng: (Math.random() - 0.5) * 360,
      endLat: (Math.random() - 0.5) * 160,
      endLng: (Math.random() - 0.5) * 360,
      color: ['#0ea5e9', '#ef4444', '#eab308'][Math.floor(Math.random() * 3)]
    }));
    setFlights(arcData);

    // Initial spin configuration
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      globeEl.current.controls().enableZoom = true;
      globeEl.current.pointOfView({ lat: 20, lng: -40, altitude: 2 }, 2000);
    }
  }, []);

  // Fallback dimension so the globe doesn't crash on initial render
  if (dimensions.width === 0) {
     return <div ref={containerRef} className="w-full h-full" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-black/50 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.1)_inset]">
      <Globe
        ref={globeEl}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        
        // Ping data for bases
        ringsData={places}
        ringColor={() => '#0ea5e9'}
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"

        // Arcs for flights
        arcsData={flights}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}

        // Add an atmosphere glow
        atmosphereColor="#06b6d4"
        atmosphereAltitude={0.15}
      />
      
      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 pointer-events-none text-[10px] text-cyan-500 font-mono tracking-widest leading-relaxed">
         <div className="text-cyan-300 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">SYS_CORE // GOD'S EYE</div>
         <div>TRACKING: {places.length} BASES</div>
         <div>UAV LINK: {flights.length} ACTIVES</div>
         <div className="text-red-500 animate-pulse mt-2">[WARN] DEFCON STATUS 3</div>
      </div>
    </div>
  );
}
