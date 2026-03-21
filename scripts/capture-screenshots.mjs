import { mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const port = process.env.PORT || "3000";
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = "artifacts/screenshots";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, attempts = 30) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch {}

    await sleep(1000);
  }

  throw new Error(`Server at ${url} did not become ready in time.`);
}

const pages = [
  { path: "/", file: "dashboard.png", width: 1600, height: 1200 },
  { path: "/gods-eye", file: "gods-eye.png", width: 1600, height: 1200 },
  { path: "/trading", file: "trading.png", width: 1600, height: 1200 },
  { path: "/deploy", file: "deploy.png", width: 1600, height: 1200 },
];

await mkdir(outputDir, { recursive: true });

const child = spawn(
  process.platform === "win32" ? "npm.cmd" : "npm",
  ["run", "start", "--", "--hostname", "127.0.0.1", "--port", port],
  {
    stdio: "inherit",
    env: process.env,
  },
);

let exitCode = 0;

try {
  await waitForServer(baseUrl);

  const browser = await chromium.launch();

  for (const pageConfig of pages) {
    const page = await browser.newPage({
      viewport: {
        width: pageConfig.width,
        height: pageConfig.height,
      },
      colorScheme: "dark",
    });

    await page.goto(new URL(pageConfig.path, baseUrl).toString(), {
      waitUntil: "networkidle",
    });
    await page.screenshot({
      path: `${outputDir}/${pageConfig.file}`,
      fullPage: true,
    });
    await page.close();
  }

  await browser.close();
} catch (error) {
  console.error(String(error));
  exitCode = 1;
} finally {
  child.kill("SIGTERM");
}

process.exit(exitCode);

