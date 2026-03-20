const GAMMA_API_URL = 'https://gamma-api.polymarket.com/events';

export interface PolymarketEvent {
  id: string;
  title: string;
  description: string;
  active: boolean;
  closed: boolean;
  markets: PolymarketMarket[];
  createdAt: string;
  startDate: string;
  endDate: string;
  volume: number;
  platform?: 'POLYMARKET' | 'KALSHI'; // Added platform indicator
}

export interface PolymarketMarket {
  id: string;
  question: string;
  conditionId: string;
  slug: string;
  active: boolean;
  closed: boolean;
  outcomes: string[];
  outcomePrices: string[];
  volume: number;
}

// Mock Kalshi Data Generator
function generateMockKalshiEvents(count: number): PolymarketEvent[] {
  return Array.from({ length: count }).map((_, i) => ({
    id: `kalshi-mock-${i}-${Date.now()}`,
    title: `[KALSHI] Will ${['Federal Reserve', 'Congress', 'Supreme Court', 'ECB'][i % 4]} take action on ${['Interest Rates', 'Crypto Regulation', 'Tech Antitrust', 'Taxes'][i % 4]} by end of month?`,
    description: "Mock data representing active markets on Kalshi. Kalshi specializes in CFTC-regulated event contracts.",
    active: true,
    closed: false,
    platform: 'KALSHI',
    createdAt: new Date().toISOString(),
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 30).toISOString(),
    volume: Math.floor(Math.random() * 500000) + 10000,
    markets: [
      {
        id: `k-market-${i}`,
        question: "Yes or No",
        conditionId: "mock",
        slug: "kalshi-mock-event",
        active: true,
        closed: false,
        outcomes: ["Yes", "No"],
        outcomePrices: [(Math.random() * 0.9 + 0.05).toString(), (Math.random() * 0.9 + 0.05).toString()],
        volume: Math.floor(Math.random() * 50000)
      }
    ]
  }));
}

export async function fetchTopEvents(limit: number = 20): Promise<PolymarketEvent[]> {
  try {
    const response = await fetch(`${GAMMA_API_URL}?limit=${limit}&active=true&closed=false&order=volume&ascending=false`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Attach platform indicator to Poly events
    const polyEvents = data.map((d: any) => ({ ...d, platform: 'POLYMARKET' }));
    
    // Inject mock Kalshi events
    const kalshiEvents = generateMockKalshiEvents(5);
    
    // Mix and sort by volume
    const mixed = [...polyEvents, ...kalshiEvents].sort((a, b) => (b.volume || 0) - (a.volume || 0));
    
    return mixed;
  } catch (error) {
    console.error("Failed to fetch from Polymarket Gamma API:", error);
    // If Poly fails, at least return Kalshi mocks
    return generateMockKalshiEvents(8);
  }
}
