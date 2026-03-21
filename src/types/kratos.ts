export type MarketPlatform = "Polymarket" | "Kalshi" | "Manifold" | "PredictIt";

export type MarketCategory =
  | "Politics"
  | "Geopolitics"
  | "Crypto"
  | "Macro"
  | "Sports"
  | "Energy"
  | "Technology";

export type MarketEntity = {
  id: string;
  parentId?: string;
  title: string;
  slug: string;
  description: string;
  platform: MarketPlatform;
  category: MarketCategory;
  region: string;
  lat: number;
  lng: number;
  probability: number;
  volume: number;
  liquidity: number;
  riskScore: number;
  sentimentScore: number;
  volatilityScore: number;
  resolutionTimeDays: number;
  ev: number;
  kellyFraction: number;
  lastUpdated: string;
  tags: string[];
  url?: string;
  source: "live" | "fallback";
};

export type ArcEntity = {
  id: string;
  sourceId: string;
  targetId: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  riskLevel: number;
  volumeExposure: number;
  dependencyLabel: string;
  tier1: number;
  tier2: number;
  tier3: number;
};

export type LabelEntity = {
  id: string;
  text: string;
  lat: number;
  lng: number;
  region: string;
  type: "cluster" | "warning" | "macro";
};

export type LayerFamily =
  | "Events"
  | "Arbitrage"
  | "News"
  | "Risk"
  | "Weather"
  | "Flights"
  | "Shipping"
  | "Social"
  | "Macro"
  | "Sports"
  | "Infrastructure"
  | "Custom";

export type LayerDefinition = {
  id: string;
  name: string;
  family: LayerFamily;
  color: string;
  enabledByDefault: boolean;
  density: "low" | "medium" | "high";
  description: string;
};

export type ArbitrageOpportunity = {
  id: string;
  title: string;
  polyYes: number;
  kalshiYes: number;
  delta: number;
  minVolume: number;
  ev: number;
  kellyFraction: number;
  latencyMs: number;
  region: string;
};

export type NewsImpactItem = {
  id: string;
  headline: string;
  source: string;
  sentiment: number;
  geoProximity: number;
  volumeSpike: number;
  resolutionTime: number;
  impactScore: number;
  linkedMarkets: string[];
  publishedAt: string;
};

export type MacroInstrument = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  thesis: string;
};

export type VesselTrack = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  draftChange: number;
  riskSignal: number;
  status: "visible" | "dark";
  linkedTheme: string;
};

export type FlightTrack = {
  id: string;
  callsign: string;
  lat: number;
  lng: number;
  heading: number;
  linkedTheme: string;
};

export type PBQLRow = Record<string, string | number>;

export type PBQLResponse = {
  query: string;
  fields: string[];
  universe: string;
  rows: PBQLRow[];
  summary: {
    resultCount: number;
    avgRisk: number;
    totalVolume: number;
    avgProbability: number;
  };
};

export type ServiceHealth = {
  key: string;
  label: string;
  status: "live" | "configured" | "degraded" | "offline";
  detail: string;
};

export type RuntimeStatus = {
  commandMnemonics: string[];
  services: ServiceHealth[];
  tradeRoutingEnabled: boolean;
  authEnabled: boolean;
  pbqlEnabled: boolean;
};

export type PortfolioPosition = {
  id: string;
  venue: "Kalshi" | "Polymarket";
  ticker: string;
  title: string;
  side: "Yes" | "No";
  contracts: number;
  averagePrice: number;
  markProbability: number;
  unrealizedPnlUsd: number;
  status: "simulated" | "live" | "unavailable";
};

export type PortfolioSnapshot = {
  status: "auth_unavailable" | "auth_required" | "connected_unconfigured";
  accountLabel: string;
  netPnlUsd: number;
  riskBudgetPct: number;
  openPositions: number;
  grossExposureUsd: number;
  positions: PortfolioPosition[];
  note: string;
};

export type WatchlistItem = {
  id: string;
  marketId: string;
  title: string;
  platform: "Polymarket" | "Kalshi" | "Manifold" | "PredictIt";
  category: MarketCategory;
  probability: number;
  volume: number;
  region: string;
  createdAt: string;
};

export type WatchlistSnapshot = {
  status: "auth_unavailable" | "auth_required" | "connected" | "connected_unconfigured";
  accountLabel: string;
  items: WatchlistItem[];
  note: string;
};

export type SavedQueryItem = {
  id: string;
  name: string;
  query: string;
  createdAt: string;
};

export type SavedQuerySnapshot = {
  status: "auth_unavailable" | "auth_required" | "connected" | "connected_unconfigured";
  accountLabel: string;
  items: SavedQueryItem[];
  note: string;
};

export type SessionSnapshot = {
  status: "auth_unavailable" | "auth_required" | "authenticated";
  email: string | null;
  note: string;
};

export type CommandHistoryItem = {
  id: string;
  command: string;
  kind: "navigation" | "pbql" | "unknown";
  resolvedPath: string | null;
  createdAt: string;
};

export type CommandHistorySnapshot = {
  status: "auth_unavailable" | "auth_required" | "connected" | "connected_unconfigured";
  accountLabel: string;
  items: CommandHistoryItem[];
  note: string;
};

export type DeployCheck = {
  key: string;
  label: string;
  status: "ready" | "missing" | "warning";
  detail: string;
};

export type DeployReadinessReport = {
  platform: string;
  recommendedTarget: string;
  checks: DeployCheck[];
  readyCount: number;
  totalCount: number;
  note: string;
};

export type TradeSimulationRequest = {
  venue: "Kalshi" | "Polymarket";
  ticker: string;
  side: "Yes" | "No";
  stakeUsd: number;
  price: number;
  probability: number;
};

export type TradeSimulationResponse = {
  venue: "Kalshi" | "Polymarket";
  ticker: string;
  side: "Yes" | "No";
  stakeUsd: number;
  contracts: number;
  maxPayoutUsd: number;
  worstCaseLossUsd: number;
  estimatedEdgeUsd: number;
  kellyFraction: number;
  routeStatus: "simulated" | "credential_required";
  note: string;
};

export type MarketUniverse = {
  markets: MarketEntity[];
  arcs: ArcEntity[];
  labels: LabelEntity[];
  layers: LayerDefinition[];
  arbitrage: ArbitrageOpportunity[];
  news: NewsImpactItem[];
  macro: MacroInstrument[];
  vessels: VesselTrack[];
  flights: FlightTrack[];
  generatedAt: string;
};
