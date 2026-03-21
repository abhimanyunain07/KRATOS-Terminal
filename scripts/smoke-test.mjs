const baseUrl = process.env.KRATOS_BASE_URL || process.argv[2];

if (!baseUrl) {
  console.error("Provide KRATOS_BASE_URL or pass the deployment URL as the first argument.");
  process.exit(1);
}

const targets = [
  { path: "/", label: "Home page" },
  { path: "/deploy", label: "Deploy page" },
  { path: "/api/health", label: "Runtime health" },
  { path: "/api/health/deep", label: "Deep health" },
  { path: "/api/deploy/readiness", label: "Deploy readiness" },
  { path: "/api/markets", label: "Markets feed" },
];

let failed = false;

console.log(`KRATOS smoke test for ${baseUrl}\n`);

for (const target of targets) {
  const url = new URL(target.path, baseUrl).toString();

  try {
    const response = await fetch(url, {
      headers: {
        Accept: target.path.startsWith("/api/") ? "application/json" : "text/html",
      },
    });

    const ok = response.ok;
    console.log(`${ok ? "OK  " : "FAIL"} ${target.label} ${response.status} ${url}`);

    if (!ok) {
      failed = true;
    }
  } catch (error) {
    failed = true;
    console.log(`FAIL ${target.label} ERR ${url}`);
    console.log(String(error));
  }
}

if (failed) {
  console.error("\nSmoke test failed.");
  process.exit(1);
}

console.log("\nSmoke test passed.");

