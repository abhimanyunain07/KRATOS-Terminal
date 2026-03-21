export type TerminalCommandResolution = {
  normalized: string;
  href: string | null;
  message: string;
  kind: "navigation" | "pbql" | "unknown";
  query?: string;
};

const ROUTE_MAP: Array<{ match: RegExp; href: string; message: string }> = [
  { match: /^(PMAP<GO>|GODSEYE|GODS ?EYE|MAP)$/i, href: "/gods-eye", message: "Launching PMAP geospatial view." },
  { match: /^(POSH)$/i, href: "/posh", message: "Opening POSH liquidity tracking." },
  { match: /^(PSPLC|SPLC)$/i, href: "/psplc", message: "Opening PSPLC dependency graph." },
  { match: /^(PBQL|BQL)$/i, href: "/pbql", message: "Opening PBQL workbench." },
  { match: /^(NEWS|NEWS IMPACT)$/i, href: "/news-impact", message: "Opening news impact monitor." },
  { match: /^(ARB|ARBITRAGE)$/i, href: "/arbitrage", message: "Opening arbitrage scanner." },
  { match: /^(MARKETS|MKT)$/i, href: "/markets", message: "Opening venue market browser." },
  { match: /^(STOCKS|MACRO)$/i, href: "/stocks", message: "Opening macro context board." },
  { match: /^(SPORTS)$/i, href: "/sports", message: "Opening sports analytics." },
  { match: /^(TRADING|EXEC|AUTH)$/i, href: "/trading", message: "Opening execution console." },
  { match: /^(PORTFOLIO|P&L|PORT)$/i, href: "/portfolio", message: "Opening portfolio dashboard." },
  { match: /^(MIROFISH|SWARM)$/i, href: "/mirofish", message: "Opening swarm consensus panel." },
  { match: /^(HOME|DASHBOARD|DB)$/i, href: "/", message: "Returning to dashboard." },
];

export function resolveTerminalCommand(input: string): TerminalCommandResolution {
  const normalized = input.trim();

  if (!normalized) {
    return {
      normalized,
      href: null,
      message: "Enter a terminal mnemonic like PMAP<GO> or POSH.",
      kind: "unknown",
    };
  }

  if (/^get\(/i.test(normalized)) {
    return {
      normalized,
      href: `/pbql?query=${encodeURIComponent(normalized)}`,
      message: "Routing query to PBQL workbench.",
      kind: "pbql",
      query: normalized,
    };
  }

  const route = ROUTE_MAP.find((entry) => entry.match.test(normalized));

  if (route) {
    return {
      normalized,
      href: route.href,
      message: route.message,
      kind: "navigation",
    };
  }

  return {
    normalized,
    href: null,
    message: "Unknown command. Try PMAP<GO>, PBQL, POSH, PSPLC, NEWS, or ARB.",
    kind: "unknown",
  };
}

