export interface PredictionEvent {
  id: string;
  title: string;
  platform: 'Polymarket' | 'Kalshi' | 'Manifold' | 'PredictIt';
  odds: number; // 0 to 1
  lat: number;
  lng: number;
  vol: number; // USD
  category?: string;
  riskScore?: number;
}

export function normalizeKalshiData(raw: any[]): PredictionEvent[] {
  // Mock transform from Kalshi API shape to KRATOS shape
  return raw.map(item => ({
    id: `kalshi_${item.ticker}`,
    title: item.title,
    platform: 'Kalshi',
    odds: item.yes_bid / 100,
    lat: item.lat || 0,
    lng: item.lng || 0,
    vol: item.volume * 100,
    category: item.category,
    riskScore: Math.random() * 100
  }));
}

export function normalizePolymarketData(raw: any[]): PredictionEvent[] {
  return raw.map(item => ({
    id: `poly_${item.condition_id}`,
    title: item.question,
    platform: 'Polymarket',
    odds: parseFloat(item.tokens[0].price),
    lat: item.lat || 0,
    lng: item.lng || 0,
    vol: parseFloat(item.volume),
    category: item.category,
    riskScore: Math.random() * 100
  }));
}
