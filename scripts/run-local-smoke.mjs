import { spawn } from "node:child_process";

const port = process.env.PORT || "3000";
const baseUrl = `http://127.0.0.1:${port}`;

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

  const smoke = spawn(
    process.platform === "win32" ? "npm.cmd" : "npm",
    ["run", "smoke:test", "--", baseUrl],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  exitCode = await new Promise((resolve) => {
    smoke.on("exit", (code) => resolve(code ?? 1));
  });
} catch (error) {
  console.error(String(error));
  exitCode = 1;
} finally {
  child.kill("SIGTERM");
}

process.exit(exitCode);

