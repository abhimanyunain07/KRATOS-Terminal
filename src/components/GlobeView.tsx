import createGlobe from "cobe";
import { useEffect, useRef } from "react";

export function GlobeView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    
    if (!canvasRef.current) return;
    
    // Amber wireframe/dark theme for terminal aesthetic
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 300,
      height: 300,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.05, 0.05, 0.05], // Very dark grey/black
      markerColor: [1, 0.4, 0], // Amber
      glowColor: [0.2, 0.1, 0], // Amber glow
      markers: [
        // Dummy active regions
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.0060], size: 0.05 },
        { location: [51.5072, -0.1276], size: 0.04 },
        { location: [35.6895, 139.6917], size: 0.06 },
        { location: [22.3193, 114.1694], size: 0.03 },
      ],
      onRender: (state: Record<string, any>) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.003;
      },
    } as any); // Cast to any to bypass strict type check for onRender

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none opacity-60 mix-blend-screen relative overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/10 to-transparent blur-3xl z-0" />
      <canvas
        ref={canvasRef}
        style={{ width: 150, height: 150, zIndex: 10 }}
      />
    </div>
  );
}
