/* Narrowing of untrusted GitHub GraphQL payloads into our own types. */
import type { ContributionYear, LanguageBytes, PrState, PullRequest } from "./types";

const FALLBACK_LANG_COLOR = "#8b8b96";
const PR_STATES: readonly PrState[] = ["MERGED", "OPEN", "CLOSED"];

type Rec = Record<string, unknown>;
const isRec = (v: unknown): v is Rec => typeof v === "object" && v !== null;
const str = (v: unknown): string | null => (typeof v === "string" ? v : null);
const num = (v: unknown): number => (typeof v === "number" && Number.isFinite(v) ? v : 0);

function mapPullRequest(node: unknown): PullRequest | null {
  if (!isRec(node) || !isRec(node.repository) || !isRec(node.repository.owner)) return null;
  const repo = node.repository;
  const owner = repo.owner as Rec;
  const state = str(node.state) as PrState | null;
  const fields = {
    repo: str(repo.nameWithOwner),
    owner: str(owner.login),
    title: str(node.title),
    url: str(node.url),
    createdAt: str(node.createdAt),
  };
  if (repo.isPrivate !== false) return null;
  if (typeof node.number !== "number" || !state || !PR_STATES.includes(state)) return null;
  if (Object.values(fields).some((v) => v === null)) return null;

  return {
    repo: fields.repo!,
    owner: fields.owner!,
    ownerAvatar: str(owner.avatarUrl) ?? "",
    repoStars: num(repo.stargazerCount),
    number: node.number,
    title: fields.title!,
    url: fields.url!,
    state,
    createdAt: fields.createdAt!,
    mergedAt: str(node.mergedAt),
  };
}

/** Public PRs only; malformed nodes are skipped. */
export function mapPullRequests(nodes: readonly unknown[]): PullRequest[] {
  return nodes.map(mapPullRequest).filter((p): p is PullRequest => p !== null);
}

export function mapContributionYear(year: number, raw: unknown): ContributionYear {
  if (!isRec(raw) || !isRec(raw.contributionCalendar) || !Array.isArray(raw.contributionCalendar.weeks)) {
    throw new Error(`GitHub payload for ${year} has no contribution calendar`);
  }
  const cal = raw.contributionCalendar;
  const weeks = cal.weeks as unknown[];
  const days = weeks
    .flatMap((w) => (isRec(w) && Array.isArray(w.contributionDays) ? w.contributionDays : []))
    .filter(isRec)
    .map((d) => ({ date: str(d.date) ?? "", count: num(d.contributionCount) }))
    .filter((d) => d.date !== "");

  return {
    year,
    total: num(cal.totalContributions),
    commits: num(raw.totalCommitContributions),
    pullRequests: num(raw.totalPullRequestContributions),
    issues: num(raw.totalIssueContributions),
    reviews: num(raw.totalPullRequestReviewContributions),
    reposCreated: num(raw.totalRepositoryContributions),
    privateContributions: num(raw.restrictedContributionsCount),
    days,
  };
}

/** Bytes per language summed across repositories, largest first. */
export function mapLanguages(repoNodes: readonly unknown[]): LanguageBytes[] {
  const totals = new Map<string, LanguageBytes>();
  for (const repo of repoNodes) {
    const edges = isRec(repo) && isRec(repo.languages) && Array.isArray(repo.languages.edges) ? repo.languages.edges : [];
    for (const e of edges) {
      if (!isRec(e) || !isRec(e.node)) continue;
      const name = str(e.node.name);
      if (!name) continue;
      const prev = totals.get(name);
      totals.set(name, {
        name,
        color: prev?.color ?? str(e.node.color) ?? FALLBACK_LANG_COLOR,
        bytes: (prev?.bytes ?? 0) + num(e.size),
      });
    }
  }
  return [...totals.values()].sort((a, b) => b.bytes - a.bytes);
}
