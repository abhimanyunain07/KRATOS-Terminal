export default function GodsEyePage() {
  return (
    <div className="h-full w-full flex flex-col pt-2 relative">
      <header className="absolute top-4 left-4 z-10 glassmorphism p-2 rounded">
        <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">GODS EYE</h1>
        <div className="flex gap-2 mt-2">
          <input type="text" placeholder="MAP<GO> / filter(Sports)..." className="bg-black/50 border border-[#444] text-cyan-300 p-1 font-mono text-sm w-64 outline-none focus:border-cyan-500 transition-colors" />
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center bg-[#050505]">
        <div className="text-gray-600 animate-pulse text-xl">LOADING REACT-GLOBE.GL WORKSPACE...</div>
      </div>
    </div>
  );
}
