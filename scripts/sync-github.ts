/* Refreshes src/data/github-snapshot.json — the fallback the site renders when
   GITHUB_TOKEN isn't set at runtime.  Usage: npm run sync:github */
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fetchGithubData } from "../src/lib/github/fetch";
import { GITHUB_LOGIN } from "../src/lib/github/config";

function resolveToken(): string {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  try {
    return execFileSync("gh", ["auth", "token"], { encoding: "utf8" }).trim();
  } catch {
    throw new Error("Set GITHUB_TOKEN or log in with `gh auth login` to sync GitHub data.");
  }
}

async function main(): Promise<void> {
  const data = await fetchGithubData(resolveToken(), GITHUB_LOGIN);
  const out = resolve(__dirname, "../src/data/github-snapshot.json");
  writeFileSync(out, JSON.stringify({ ...data, source: "snapshot" }) + "\n", "utf8");
  const totals = data.years.map((y) => `${y.year}:${y.total}`).join(" ");
  process.stdout.write(`github snapshot → ${out}\n  ${data.pullRequests.length} public PRs · ${totals}\n`);
}

main().catch((err: unknown) => {
  process.stderr.write(`sync-github failed: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
