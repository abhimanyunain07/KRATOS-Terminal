const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
];

const optional = [
  "REDIS_URL",
  "KALSHI_API_KEY",
  "KALSHI_API_SECRET",
  "NEWS_API_KEY",
];

let failed = false;

console.log("KRATOS environment readiness\n");

for (const key of required) {
  const present = Boolean(process.env[key] && String(process.env[key]).trim());
  console.log(`${present ? "OK " : "MISS"} ${key}`);
  if (!present) {
    failed = true;
  }
}

console.log("");

for (const key of optional) {
  const present = Boolean(process.env[key] && String(process.env[key]).trim());
  console.log(`${present ? "OPT" : "SKIP"} ${key}`);
}

if (failed) {
  console.error("\nRequired environment variables are missing.");
  process.exit(1);
}

console.log("\nRequired environment variables are present.");

