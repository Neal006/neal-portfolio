import snapshot from "@/data/github-snapshot.json";
import { GITHUB_LOGIN, GITHUB_REVALIDATE_SECONDS } from "./config";
import { fetchGithubData } from "./fetch";
import type { GithubData } from "./types";

const SNAPSHOT = { ...snapshot, source: "snapshot" } as unknown as GithubData;

/** Live data when GITHUB_TOKEN is configured (refreshed via ISR), otherwise
    the committed snapshot. A failed fetch at build degrades to the snapshot;
    at runtime it throws, so Next keeps serving the last good page and retries
    instead of caching the older snapshot for a whole revalidate window. */
export async function getGithubData(): Promise<GithubData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return SNAPSHOT;
  try {
    return await fetchGithubData(token, GITHUB_LOGIN, { revalidate: GITHUB_REVALIDATE_SECONDS });
  } catch (err: unknown) {
    console.error("[github] live fetch failed:", err instanceof Error ? err.message : err);
    if (process.env.NEXT_PHASE !== "phase-production-build") throw err;
    return SNAPSHOT;
  }
}

export type { GithubData } from "./types";
