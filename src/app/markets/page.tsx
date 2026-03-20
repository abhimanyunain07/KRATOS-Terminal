export default function MarketsPage() {
  return (
    <div className="h-full p-4 flex flex-col gap-4">
      <header className="flex justify-between items-center pb-2 border-b border-[#333] relative z-10">
        <h1 className="text-xl font-bold uppercase tracking-widest text-cyan-500 text-shadow-cyan">Markets Filter</h1>
      </header>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        POLITICS | CRYPTO | MACRO
      </div>
    </div>
  );
}
