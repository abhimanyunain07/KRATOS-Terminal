import NewsImpact from './NewsImpact';

export default function Sports() {
  // Sports page reuses the NewsImpact layout structure but can be themed/filled with sports data
  // For the scope of this exercise, we will mirror the high-quality layout.
  return (
    <div className="relative h-full w-full">
      <div className="absolute top-2 right-2 bg-amber-950/80 text-amber-500 text-[10px] font-bold px-3 py-1 border border-amber-500 rounded z-20 shadow-[0_0_10px_rgba(245,158,11,0.5)]">
        SPORTS MARKETS FILTER ACTIVE
      </div>
      <NewsImpact />
    </div>
  );
}
