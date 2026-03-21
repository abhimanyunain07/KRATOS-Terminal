import { average, clamp, hashToRange } from "@/lib/utils";
import type {
  ArbitrageOpportunity,
  ArcEntity,
  FlightTrack,
  LabelEntity,
  LayerDefinition,
  MacroInstrument,
  MarketCategory,
  MarketEntity,
  MarketPlatform,
  MarketUniverse,
  NewsImpactItem,
  PBQLResponse,
  VesselTrack,
} from "@/types/kratos";

const POLYMARKET_ENDPOINT = "https://gamma-api.polymarket.com/events?closed=false&limit=75";
const KALSHI_ENDPOINT =
  process.env.KALSHI_BASE_URL ?? "https://trading-api.kalshi.com/trade-api/v2/events?status=open&limit=75";

const COORDINATE_RULES = [
  { match: ["taiwan"], lat: 25.033, lng: 121.5654, region: "Taipei" },
  { match: ["ukraine", "kyiv"], lat: 50.4501, lng: 30.5234, region: "Kyiv" },
  { match: ["russia", "moscow"], lat: 55.7558, lng: 37.6176, region: "Moscow" },
  { match: ["israel", "gaza"], lat: 31.7683, lng: 35.2137, region: "Jerusalem" },
  { match: ["iran"], lat: 35.6892, lng: 51.389, region: "Tehran" },
  { match: ["india"], lat: 28.6139, lng: 77.209, region: "New Delhi" },
  { match: ["china", "beijing"], lat: 39.9042, lng: 116.4074, region: "Beijing" },
  { match: ["japan", "tokyo"], lat: 35.6762, lng: 139.6503, region: "Tokyo" },
  { match: ["taiwan strait"], lat: 23.8, lng: 120.9, region: "Taiwan Strait" },
  { match: ["california"], lat: 36.7783, lng: -119.4179, region: "California" },
  { match: ["texas"], lat: 31.9686, lng: -99.9018, region: "Texas" },
  { match: ["florida"], lat: 27.6648, lng: -81.5158, region: "Florida" },
  { match: ["new york"], lat: 40.7128, lng: -74.006, region: "New York" },
  { match: ["washington", "president", "white house"], lat: 38.9072, lng: -77.0369, region: "Washington, DC" },
  { match: ["london", "uk"], lat: 51.5072, lng: -0.1276, region: "London" },
  { match: ["france", "paris"], lat: 48.8566, lng: 2.3522, region: "Paris" },
  { match: ["argentina"], lat: -34.6037, lng: -58.3816, region: "Buenos Aires" },
  { match: ["bitcoin", "ethereum"], lat: 47.6062, lng: -122.3321, region: "Digital Asset Hub" },
  { match: ["oil", "opec", "saudi"], lat: 24.7136, lng: 46.6753, region: "Riyadh" },
  { match: ["football", "nba", "nfl", "mlb"], lat: 39.8283, lng: -98.5795, region: "United States" },
];

const FALLBACK_AGGREGATOR_MARKETS: Array<Partial<MarketEntity> & Pick<MarketEntity, "id" | "title" | "platform">> = [
  {
    id: "manifold-taiwan-semiconductor",
    title: "Taiwan Strait tensions spike chip-market odds this quarter?",
    platform: "Manifold",
    category: "Geopolitics",
    probability: 0.39,
    volume: 180000,
    liquidity: 92000,
    riskScore: 0.68,
    sentimentScore: 0.61,
    volatilityScore: 0.72,
    resolutionTimeDays: 93,
    description: "Aggregated community market tied to Taiwan Strait logistics and semiconductors.",
    tags: ["taiwan", "semiconductors", "geopolitics"],
    url: "https://manifold.markets",
  },
  {
    id: "predictit-us-house",
    title: "Which party controls the U.S. House after the next election?",
    platform: "PredictIt",
    category: "Politics",
    probability: 0.53,
    volume: 270000,
    liquidity: 118000,
    riskScore: 0.57,
    sentimentScore: 0.48,
    volatilityScore: 0.44,
    resolutionTimeDays: 228,
    description: "Fallback aggregate used when direct PredictIt connectivity is unavailable.",
    tags: ["elections", "house", "congress"],
    url: "https://www.predictit.org",
  },
  {
    id: "manifold-fed-cuts",
    title: "Will the Fed cut rates by September?",
    platform: "Manifold",
    category: "Macro",
    probability: 0.47,
    volume: 130000,
    liquidity: 71000,
    riskScore: 0.51,
    sentimentScore: 0.45,
    volatilityScore: 0.59,
    resolutionTimeDays: 180,
    description: "Macro community forecast anchored to Fed language and inflation prints.",
    tags: ["fed", "rates", "macro"],
    url: "https://manifold.markets",
  },
];

const SEEDED_NEWS: NewsImpactItem[] = [
  {
    id: "news-1",
    headline: "Taiwan Strait naval activity lifts chip supply-chain hedging odds",
    source: "KRATOS Signal",
    sentiment: 0.34,
    geoProximity: 0.91,
    volumeSpike: 1.42,
    resolutionTime: 21,
    impactScore: 0.89,
    linkedMarkets: ["taiwan", "semiconductors", "macro"],
    publishedAt: new Date().toISOString(),
  },
  {
    id: "news-2",
    headline: "U.S. polling surprise pushes state-level electoral arbitrage screens higher",
    source: "KRATOS Signal",
    sentiment: 0.58,
    geoProximity: 0.84,
    volumeSpike: 1.31,
    resolutionTime: 90,
    impactScore: 0.76,
    linkedMarkets: ["elections", "swing states", "kalshi"],
    publishedAt: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
  },
  {
    id: "news-3",
    headline: "Middle East tanker reroutes raise energy-event resolution variance",
    source: "KRATOS Signal",
    sentiment: 0.29,
    geoProximity: 0.88,
    volumeSpike: 1.59,
    resolutionTime: 14,
    impactScore: 0.92,
    linkedMarkets: ["oil", "energy", "shipping"],
    publishedAt: new Date(Date.now() - 1000 * 60 * 27).toISOString(),
  },
];

const MACRO_INSTRUMENTS: MacroInstrument[] = [
  {
    symbol: "SPX",
    name: "S&P 500",
    price: 5282.21,
    changePct: 0.42,
    thesis: "Equity beta remains supportive for short-duration political risk markets.",
  },
  {
    symbol: "NDX",
    name: "Nasdaq 100",
    price: 18441.55,
    changePct: 0.73,
    thesis: "Semiconductor sensitivity is amplifying geopolitical event repricing.",
  },
  {
    symbol: "CL1",
    name: "WTI Crude",
    price: 82.13,
    changePct: 1.38,
    thesis: "Energy-linked markets show the highest event pass-through from shipping risk.",
  },
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 68411.91,
    changePct: -1.14,
    thesis: "Crypto macro reflexivity remains useful for volatility spillover detection.",
  },
];

function inferCategory(text: string): MarketCategory {
  const value = text.toLowerCase();

  if (/(election|president|senate|house|governor|vote)/.test(value)) {
    return "Politics";
  }
  if (/(ukraine|taiwan|china|war|iran|israel|ceasefire|geopolitics)/.test(value)) {
    return "Geopolitics";
  }
  if (/(bitcoin|ethereum|crypto|solana)/.test(value)) {
    return "Crypto";
  }
  if (/(oil|gas|opec|energy)/.test(value)) {
    return "Energy";
  }
  if (/(fed|inflation|rates|gdp|recession|nasdaq|s&p)/.test(value)) {
    return "Macro";
  }
  if (/(nba|nfl|mlb|championship|football|soccer|tennis)/.test(value)) {
    return "Sports";
  }
  return "Technology";
}

function inferCoordinates(title: string, category: MarketCategory) {
  const lowered = title.toLowerCase();

  for (const rule of COORDINATE_RULES) {
    if (rule.match.some((token) => lowered.includes(token))) {
      return rule;
    }
  }

  const defaultRegion = category === "Sports" ? "United States" : "Global";
  return {
    lat: hashToRange(title, -52, 62),
    lng: hashToRange(`${title}-lng`, -170, 170),
    region: defaultRegion,
  };
}

function scoreImpact(sentiment: number, volatility: number, proximity: number, resolutionTimeDays: number) {
  return clamp((sentiment * Math.max(volatility, 0.25) * proximity) / Math.max(resolutionTimeDays / 90, 0.2), 0, 1);
}

function scoreKelly(probability: number, oddsEdge: number) {
  return clamp((probability * (1 + oddsEdge) - (1 - probability)) / Math.max(oddsEdge || 0.25, 0.25), 0, 0.35);
}

function normalizeMarket(input: {
  id: string;
  title: string;
  description?: string;
  platform: MarketPlatform;
  probability?: number;
  volume?: number;
  liquidity?: number;
  url?: string;
  tags?: string[];
  source: "live" | "fallback";
}): MarketEntity {
  const category = inferCategory(input.title);
  const coords = inferCoordinates(input.title, category);
  const probability = clamp(input.probability ?? hashToRange(input.id, 0.22, 0.82), 0.01, 0.99);
  const volume = Math.round(input.volume ?? hashToRange(`${input.id}-vol`, 12000, 980000));
  const liquidity = Math.round(input.liquidity ?? volume * 0.42);
  const volatilityScore = clamp(hashToRange(`${input.id}-volatility`, 0.18, 0.88), 0, 1);
  const sentimentScore = clamp(hashToRange(`${input.id}-sentiment`, 0.18, 0.92), 0, 1);
  const resolutionTimeDays = Math.round(hashToRange(`${input.id}-resolution`, 7, 320));
  const riskScore = scoreImpact(sentimentScore, volatilityScore, 0.9, resolutionTimeDays);
  const ev = clamp((probability - 0.5) * 0.22 + riskScore * 0.08, -0.2, 0.25);

  return {
    id: input.id,
    title: input.title,
    slug: input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    description: input.description ?? `${input.platform} event normalized for KRATOS PMAP analytics.`,
    platform: input.platform,
    category,
    region: coords.region,
    lat: coords.lat,
    lng: coords.lng,
    probability,
    volume,
    liquidity,
    riskScore,
    sentimentScore,
    volatilityScore,
    resolutionTimeDays,
    ev,
    kellyFraction: scoreKelly(probability, Math.abs(ev) + 0.25),
    lastUpdated: new Date().toISOString(),
    tags: input.tags ?? [category.toLowerCase()],
    url: input.url,
    source: input.source,
  };
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function parsePolymarketEvents(payload: unknown): MarketEntity[] {
  if (!Array.isArray(payload)) {
    return [];
  }

  return payload
    .slice(0, 60)
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title =
        typeof record.title === "string"
          ? record.title
          : typeof record.question === "string"
            ? record.question
            : typeof record.slug === "string"
              ? record.slug.replace(/-/g, " ")
              : `Polymarket Event ${index + 1}`;

      const rawMarkets = Array.isArray(record.markets) ? record.markets : [];
      const primaryMarket = rawMarkets.find((entry) => !!entry && typeof entry === "object") as
        | Record<string, unknown>
        | undefined;

      const outcomes = Array.isArray(primaryMarket?.outcomePrices)
        ? primaryMarket?.outcomePrices
        : Array.isArray(record.outcomePrices)
          ? record.outcomePrices
          : [];

      const firstOutcome = typeof outcomes[0] === "number" ? outcomes[0] : Number(outcomes[0]);
      const probability = Number.isFinite(firstOutcome) ? clamp(Number(firstOutcome), 0.01, 0.99) : undefined;

      const volumeCandidate =
        Number(primaryMarket?.volume) ||
        Number(record.volume) ||
        Number(record.volumeNum) ||
        Number(primaryMarket?.liquidity);

      return normalizeMarket({
        id:
          typeof record.id === "string"
            ? `poly-${record.id}`
            : typeof record.slug === "string"
              ? `poly-${record.slug}`
              : `poly-${index}`,
        title,
        description: typeof record.description === "string" ? record.description : undefined,
        platform: "Polymarket",
        probability,
        volume: Number.isFinite(volumeCandidate) ? volumeCandidate : undefined,
        liquidity: Number(primaryMarket?.liquidity) || undefined,
        url:
          typeof record.slug === "string"
            ? `https://polymarket.com/event/${record.slug}`
            : "https://polymarket.com",
        tags: Array.isArray(record.tags)
          ? record.tags.filter((tag): tag is string => typeof tag === "string")
          : undefined,
        source: "live",
      });
    })
    .filter((item: MarketEntity | null): item is MarketEntity => Boolean(item));
}

function parseKalshiEvents(payload: unknown): MarketEntity[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const eventsCandidate = (payload as Record<string, unknown>).events;
  const rawEvents: unknown[] = Array.isArray(eventsCandidate) ? eventsCandidate : [];

  return rawEvents
    .slice(0, 60)
    .map((item: unknown, index: number) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const record = item as Record<string, unknown>;
      const title =
        typeof record.title === "string"
          ? record.title
          : typeof record.subtitle === "string"
            ? record.subtitle
            : `Kalshi Event ${index + 1}`;

      const yesAsk = Number(record.yes_ask);
      const yesBid = Number(record.yes_bid);
      const midpoint = Number.isFinite(yesAsk) && Number.isFinite(yesBid) ? (yesAsk + yesBid) / 200 : undefined;

      return normalizeMarket({
        id:
          typeof record.event_ticker === "string"
            ? `kalshi-${record.event_ticker}`
            : `kalshi-${index}`,
        title,
        description: typeof record.description === "string" ? record.description : undefined,
        platform: "Kalshi",
        probability: midpoint,
        volume: Number(record.volume) || Number(record.open_interest) || undefined,
        liquidity: Number(record.open_interest) || undefined,
        url:
          typeof record.event_ticker === "string"
            ? `https://kalshi.com/markets/${record.event_ticker.toLowerCase()}`
            : "https://kalshi.com",
        tags:
          typeof record.category === "string"
            ? [record.category.toLowerCase()]
            : undefined,
        source: "live",
      });
    })
    .filter((item: MarketEntity | null): item is MarketEntity => Boolean(item));
}

function buildLayerCatalog(): LayerDefinition[] {
  const families: Array<{ family: LayerDefinition["family"]; count: number; color: string }> = [
    { family: "Events", count: 64, color: "#00e5ff" },
    { family: "Arbitrage", count: 42, color: "#f59e0b" },
    { family: "News", count: 36, color: "#22c55e" },
    { family: "Risk", count: 44, color: "#ef4444" },
    { family: "Weather", count: 30, color: "#38bdf8" },
    { family: "Flights", count: 28, color: "#fb7185" },
    { family: "Shipping", count: 31, color: "#f97316" },
    { family: "Social", count: 35, color: "#a855f7" },
    { family: "Macro", count: 28, color: "#14b8a6" },
    { family: "Sports", count: 28, color: "#84cc16" },
    { family: "Infrastructure", count: 24, color: "#eab308" },
    { family: "Custom", count: 26, color: "#94a3b8" },
  ];

  return families.flatMap(({ family, count, color }) =>
    Array.from({ length: count }, (_, index) => ({
      id: `${family.toLowerCase()}-${index + 1}`,
      name: `${family} Layer ${String(index + 1).padStart(3, "0")}`,
      family,
      color,
      enabledByDefault: index < 2,
      density: index % 3 === 0 ? "high" : index % 2 === 0 ? "medium" : "low",
      description: `${family} overlay ${index + 1} adapted for prediction-market geospatial analytics.`,
    })),
  );
}

function buildArcs(markets: MarketEntity[]): ArcEntity[] {
  const anchors = markets.slice(0, 22);

  return anchors.flatMap((source, index) => {
    const target = markets[(index * 7 + 11) % Math.max(markets.length, 1)];

    if (!target || target.id === source.id) {
      return [];
    }

    const riskLevel = clamp((source.riskScore + target.riskScore) / 2, 0, 1);

    return [
      {
        id: `${source.id}-${target.id}`,
        sourceId: source.id,
        targetId: target.id,
        startLat: source.lat,
        startLng: source.lng,
        endLat: target.lat,
        endLng: target.lng,
        riskLevel,
        volumeExposure: Math.round((source.volume + target.volume) * (0.16 + riskLevel * 0.32)),
        dependencyLabel: `${source.category} -> ${target.category}`,
        tier1: clamp(riskLevel * 0.32, 0.04, 0.42),
        tier2: clamp(riskLevel * 0.46, 0.06, 0.54),
        tier3: clamp(riskLevel * 0.18, 0.02, 0.26),
      },
    ];
  });
}

function buildLabels(markets: MarketEntity[]): LabelEntity[] {
  const byRegion = new Map<string, MarketEntity[]>();

  for (const market of markets) {
    const bucket = byRegion.get(market.region) ?? [];
    bucket.push(market);
    byRegion.set(market.region, bucket);
  }

  return Array.from(byRegion.entries())
    .slice(0, 18)
    .map(([region, items], index) => ({
      id: `label-${region}`,
      text: `${region} ${items.length > 1 ? `x${items.length}` : ""}`.trim(),
      lat: average(items.map((item) => item.lat)) + (index % 2 === 0 ? 1.4 : -1.2),
      lng: average(items.map((item) => item.lng)) + (index % 2 === 0 ? 2.8 : -2.4),
      region,
      type: index % 3 === 0 ? "warning" : index % 2 === 0 ? "macro" : "cluster",
    }));
}

function buildArbitrage(markets: MarketEntity[]): ArbitrageOpportunity[] {
  const politics = markets.filter((market) => market.category === "Politics").slice(0, 8);
  const kalshi = markets.filter((market) => market.platform === "Kalshi");
  const polymarket = markets.filter((market) => market.platform === "Polymarket");

  return politics.map((market, index) => {
    const poly = polymarket[index % Math.max(polymarket.length, 1)] ?? market;
    const kal = kalshi[index % Math.max(kalshi.length, 1)] ?? market;
    const delta = clamp(Math.abs(poly.probability - kal.probability), 0.008, 0.22);
    const minVolume = Math.round(Math.min(poly.volume, kal.volume || poly.volume) * 0.18);
    const ev = delta * minVolume * 0.77;

    return {
      id: `arb-${market.id}`,
      title: market.title,
      polyYes: poly.probability,
      kalshiYes: kal.probability,
      delta,
      minVolume,
      ev,
      kellyFraction: clamp(delta * 1.8, 0.02, 0.24),
      latencyMs: Math.round(hashToRange(market.id, 18, 116)),
      region: market.region,
    };
  });
}

function buildVessels(markets: MarketEntity[]): VesselTrack[] {
  return markets.slice(0, 12).map((market, index) => ({
    id: `vessel-${market.id}`,
    name: `POSH-${String(index + 1).padStart(2, "0")}`,
    lat: market.lat + 4.4,
    lng: market.lng + 2.1,
    draftChange: Number(hashToRange(`${market.id}-draft`, -0.7, 1.4).toFixed(2)),
    riskSignal: clamp(market.riskScore + 0.14, 0, 1),
    status: index % 4 === 0 ? "dark" : "visible",
    linkedTheme: market.title,
  }));
}

function buildFlights(markets: MarketEntity[]): FlightTrack[] {
  return markets.slice(0, 16).map((market, index) => ({
    id: `flight-${market.id}`,
    callsign: `KR${3100 + index}`,
    lat: market.lat - 3.5,
    lng: market.lng - 4.3,
    heading: Math.round(hashToRange(`${market.id}-heading`, 0, 359)),
    linkedTheme: market.title,
  }));
}

export async function getMarketUniverse(): Promise<MarketUniverse> {
  const [polyPayload, kalshiPayload] = await Promise.all([
    fetchJson<unknown>(POLYMARKET_ENDPOINT),
    fetchJson<unknown>(KALSHI_ENDPOINT),
  ]);

  const polymarketMarkets = parsePolymarketEvents(polyPayload);
  const kalshiMarkets = parseKalshiEvents(kalshiPayload);

  const fallbackMarkets = FALLBACK_AGGREGATOR_MARKETS.map((entry) =>
    normalizeMarket({
      id: entry.id,
      title: entry.title,
      description: entry.description,
      platform: entry.platform,
      probability: entry.probability,
      volume: entry.volume,
      liquidity: entry.liquidity,
      tags: entry.tags,
      url: entry.url,
      source: "fallback",
    }),
  );

  const markets = [...polymarketMarkets, ...kalshiMarkets, ...fallbackMarkets]
    .sort((left, right) => right.volume - left.volume)
    .slice(0, 140);

  const arcs = buildArcs(markets);
  const labels = buildLabels(markets);

  return {
    markets,
    arcs,
    labels,
    layers: buildLayerCatalog(),
    arbitrage: buildArbitrage(markets),
    news: SEEDED_NEWS,
    macro: MACRO_INSTRUMENTS,
    vessels: buildVessels(markets),
    flights: buildFlights(markets),
    generatedAt: new Date().toISOString(),
  };
}

function filterUniverseRows(universeName: string, markets: MarketEntity[]) {
  const lowered = universeName.toLowerCase();

  if (lowered.includes("election")) {
    return markets.filter((market) => market.category === "Politics");
  }
  if (lowered.includes("sports")) {
    return markets.filter((market) => market.category === "Sports");
  }
  if (lowered.includes("macro")) {
    return markets.filter((market) => market.category === "Macro" || market.category === "Crypto");
  }
  if (lowered.includes("asia")) {
    return markets.filter((market) =>
      /taiwan|china|japan|india|digital asset hub/i.test(market.region + market.title),
    );
  }

  return markets;
}

export async function executePBQL(query: string): Promise<PBQLResponse> {
  const universe = await getMarketUniverse();
  const fieldsMatch = query.match(/get\(([^)]+)\)/i);
  const universeMatch = query.match(/universe\(['"]([^'"]+)['"]\)/i);

  const fields = fieldsMatch?.[1]
    .split(",")
    .map((field) => field.trim().toUpperCase())
    .filter(Boolean) ?? ["EVENT_ODDS", "RISK_SCORE", "VOLUME"];

  const universeName = universeMatch?.[1] ?? "GLOBAL";
  const rows = filterUniverseRows(universeName, universe.markets)
    .slice(0, 24)
    .map((market) => {
      const row: Record<string, string | number> = {
        TITLE: market.title,
        PLATFORM: market.platform,
        REGION: market.region,
      };

      for (const field of fields) {
        if (field === "EVENT_ODDS" || field === "PROB_POLY") {
          row[field] = Number((market.probability * 100).toFixed(2));
        } else if (field === "VOLUME" || field === "VOL_COMBINED" || field === "VOL_KALSHI") {
          row[field] = market.volume;
        } else if (field === "RISK" || field === "RISK_SCORE") {
          row[field] = Number(market.riskScore.toFixed(3));
        } else if (field === "EV" || field === "ARBITRAGE") {
          row[field] = Number(market.ev.toFixed(3));
        } else if (field === "KELLY" || field === "KELLY_SIZE") {
          row[field] = Number(market.kellyFraction.toFixed(3));
        } else {
          row[field] = `${market.category}:${market.source}`;
        }
      }

      return row;
    });

  const scopedMarkets = filterUniverseRows(universeName, universe.markets);

  return {
    query,
    fields,
    universe: universeName,
    rows,
    summary: {
      resultCount: rows.length,
      avgRisk: Number(average(scopedMarkets.map((market) => market.riskScore)).toFixed(3)),
      totalVolume: scopedMarkets.reduce((sum, market) => sum + market.volume, 0),
      avgProbability: Number(average(scopedMarkets.map((market) => market.probability)).toFixed(3)),
    },
  };
}
