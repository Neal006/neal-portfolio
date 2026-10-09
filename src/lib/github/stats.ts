import type { ContributionDay, ContributionYear, LanguageBytes, PrState, PullRequest } from "./types";

export interface Streak {
  length: number;
  start: string | null;
  end: string | null;
}

const EMPTY_STREAK: Streak = { length: 0, start: null, end: null };
const DAYS_PER_WEEK = 7;

/** All contribution days across years, ascending, one entry per date. */
export function flattenDays(years: readonly ContributionYear[]): ContributionDay[] {
  const byDate = new Map<string, ContributionDay>();
  for (const y of years) for (const d of y.days) byDate.set(d.date, d);
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

/** Longest and current runs of days with ≥1 contribution.
    An empty `today` is still in progress, so it doesn't end the current streak. */
export function computeStreaks(
  days: readonly ContributionDay[],
  today: string,
): { longest: Streak; current: Streak } {
  const past = days.filter((d) => d.date <= today);
  let longest = EMPTY_STREAK;
  let run = EMPTY_STREAK;

  for (const d of past) {
    run = d.count > 0
      ? { length: run.length + 1, start: run.start ?? d.date, end: d.date }
      : EMPTY_STREAK;
    if (run.length > longest.length) longest = run;
  }

  const last = past[past.length - 1];
  const lastIsEmptyToday = last?.date === today && last.count === 0;
  const tail = lastIsEmptyToday ? past.slice(0, -1) : past;
  let current = EMPTY_STREAK;
  for (let i = tail.length - 1; i >= 0 && tail[i].count > 0; i--) {
    current = { length: current.length + 1, start: tail[i].date, end: current.end ?? tail[i].date };
  }

  return { longest, current };
}

export function busiestDay(days: readonly ContributionDay[]): ContributionDay | null {
  return days.reduce<ContributionDay | null>((best, d) => (!best || d.count > best.count ? d : best), null);
}

export function activeDayCount(days: readonly ContributionDay[]): number {
  return days.filter((d) => d.count > 0).length;
}

/** Day-of-week (0 = Sunday) for a YYYY-MM-DD string, timezone-independent. */
function weekday(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/** Columns of 7 cells (Sun→Sat), padded with null, like GitHub's calendar. */
export function toWeekGrid(days: readonly ContributionDay[]): (ContributionDay | null)[][] {
  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = [];
  days.forEach((d, i) => {
    const dow = weekday(d.date);
    if (i === 0) week = Array.from({ length: dow }, () => null);
    else if (dow === 0) {
      weeks.push(week);
      week = [];
    }
    week = [...week, d];
  });
  if (week.length) weeks.push([...week, ...Array.from({ length: DAYS_PER_WEEK - week.length }, () => null)]);
  return weeks;
}

export interface RepoContribution {
  repo: string;
  stars: number;
  merged: number;
  prs: PullRequest[];
}

export interface OrgContribution {
  owner: string;
  avatar: string;
  merged: number;
  total: number;
  stars: number;
  repos: RepoContribution[];
}

export interface OpenSourceSummary {
  total: number;
  merged: number;
  open: number;
  closed: number;
  mergedRepoStars: number;
  orgs: OrgContribution[];
}

const countState = (prs: readonly PullRequest[], state: PrState) => prs.filter((p) => p.state === state).length;

/** Upstream (non-own) PRs grouped by org → repo, most-merged first. */
export function summarizeOpenSource(
  prs: readonly PullRequest[],
  excludeOwners: readonly string[],
): OpenSourceSummary {
  const excluded = new Set(excludeOwners.map((o) => o.toLowerCase()));
  const upstream = prs.filter((p) => !excluded.has(p.owner.toLowerCase()));

  const byRepo = new Map<string, PullRequest[]>();
  for (const p of upstream) byRepo.set(p.repo, [...(byRepo.get(p.repo) ?? []), p]);

  const repos: RepoContribution[] = [...byRepo.entries()].map(([repo, list]) => ({
    repo,
    stars: Math.max(...list.map((p) => p.repoStars)),
    merged: countState(list, "MERGED"),
    prs: [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  }));

  const byOwner = new Map<string, RepoContribution[]>();
  for (const r of repos) {
    const owner = r.prs[0].owner;
    byOwner.set(owner, [...(byOwner.get(owner) ?? []), r]);
  }

  const byImpact = <T extends { merged: number; stars: number }>(a: T, b: T) =>
    b.merged - a.merged || b.stars - a.stars;

  const orgs: OrgContribution[] = [...byOwner.entries()]
    .map(([owner, list]) => ({
      owner,
      avatar: list[0].prs[0].ownerAvatar,
      merged: list.reduce((s, r) => s + r.merged, 0),
      total: list.reduce((s, r) => s + r.prs.length, 0),
      stars: Math.max(...list.map((r) => r.stars)),
      repos: [...list].sort(byImpact),
    }))
    .sort(byImpact);

  return {
    total: upstream.length,
    merged: countState(upstream, "MERGED"),
    open: countState(upstream, "OPEN"),
    closed: countState(upstream, "CLOSED"),
    mergedRepoStars: repos.filter((r) => r.merged > 0).reduce((s, r) => s + r.stars, 0),
    orgs,
  };
}

export interface LanguageSlice {
  name: string;
  color: string;
  pct: number;
}

const OTHER_COLOR = "#5a5a66";

export function languageShare(langs: readonly LanguageBytes[], top: number): LanguageSlice[] {
  const total = langs.reduce((s, l) => s + l.bytes, 0);
  if (total === 0) return [];
  const sorted = [...langs].sort((a, b) => b.bytes - a.bytes);
  const head = sorted.slice(0, top).map((l) => ({ name: l.name, color: l.color, pct: (l.bytes / total) * 100 }));
  const restBytes = sorted.slice(top).reduce((s, l) => s + l.bytes, 0);
  return restBytes > 0 ? [...head, { name: "Other", color: OTHER_COLOR, pct: (restBytes / total) * 100 }] : head;
}
