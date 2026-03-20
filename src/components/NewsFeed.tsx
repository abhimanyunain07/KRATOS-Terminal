import { useEffect, useState } from 'react';
import { fetchTopEvents } from '../api/polymarket';

export function NewsFeed() {
  const [news, setNews] = useState<{ time: string; msg: string; type: 'create' | 'resolve' | 'update' }[]>([]);

  useEffect(() => {
    async function poll() {
      try {
        const events = await fetchTopEvents(5);
        if (events.length > 0) {
          const newItems = events.map(e => ({
             time: new Date().toLocaleTimeString('en-US', { hour12: false }),
             msg: `Update on: ${e.title}`,
             type: 'update' as const
          }));
          setNews(prev => [...newItems, ...prev].slice(0, 30));
        }
      } catch (e) {
        // ignore
      }
    }
    
    // Seed with initial "news"
    setNews([
      { time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: "Terminal connected to Gamma API", type: 'create' }
    ]);

    const interval = setInterval(poll, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-1 text-xs">
      {news.map((item, idx) => (
        <div key={idx} className="flex hover:bg-amber-900/20 px-1 py-0.5 cursor-pointer">
          <span className="text-amber-600 shrink-0">[{item.time}]</span>
          <span className="truncate flex-1 ml-2 text-amber-500/80">{item.msg}</span>
          <span className={item.type === 'create' ? 'text-green-500' : item.type === 'resolve' ? 'text-red-500' : 'text-blue-500'}>
            {item.type === 'create' ? '+' : item.type === 'resolve' ? '-' : '~'}
          </span>
        </div>
      ))}
    </div>
  );
}
