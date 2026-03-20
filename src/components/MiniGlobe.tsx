'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues with window/document
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export default function MiniGlobe() {
  const globeEl = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1.0;
      globeEl.current.controls().enableZoom = false; // It's just a mini viewer
      globeEl.current.pointOfView({ altitude: 2 });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-70">
      {mounted && <Globe
        ref={globeEl}
        width={300} // Approximate width of a standard grid panel
        height={250}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="rgba(0,0,0,0)"
      />}
    </div>
  );
}
