import { describe, expect, test } from "vitest";
import {
  activeDayCount,
  busiestDay,
  computeStreaks,
  flattenDays,
  languageShare,
  summarizeOpenSource,
  toWeekGrid,
} from "./stats";
import type { ContributionDay, ContributionYear, PullRequest } from "./types";

const day = (date: string, count: number): ContributionDay => ({ date, count });

const year = (y: number, days: ContributionDay[]): ContributionYear => ({
  year: y,
  total: days.reduce((s, d) => s + d.count, 0),
  commits: 0,
  pullRequests: 0,
  issues: 0,
  reviews: 0,
  reposCreated: 0,
  privateContributions: 0,
  days,
});

const pr = (over: Partial<PullRequest>): PullRequest => ({
  repo: "acme/widget",
  owner: "acme",
  ownerAvatar: "https://example.com/a.png",
  repoStars: 10,
  number: 1,
  title: "fix",
  url: "https://github.com/acme/widget/pull/1",
  state: "MERGED",
  createdAt: "2026-07-01T00:00:00Z",
  mergedAt: "2026-07-02T00:00:00Z",
  ...over,
});

describe("flattenDays", () => {
  test("merges years into one ascending list and drops duplicate dates", () => {
    const days = flattenDays([
      year(2026, [day("2026-01-01", 2)]),
      year(2025, [day("2025-12-31", 1), day("2026-01-01", 2)]),
    ]);
    expect(days.map((d) => d.date)).toEqual(["2025-12-31", "2026-01-01"]);
  });

  test("returns empty list for no years", () => {
    expect(flattenDays([])).toEqual([]);
  });
});

describe("computeStreaks", () => {
  const days = [
    day("2026-03-01", 1),
    day("2026-03-02", 3),
    day("2026-03-03", 0),
    day("2026-03-04", 2),
    day("2026-03-05", 2),
    day("2026-03-06", 5),
    day("2026-03-07", 0),
    day("2026-03-08", 0),
  ];

  test("finds the longest run of non-zero days", () => {
    const { longest } = computeStreaks(days, "2026-03-08");
    expect(longest).toEqual({ length: 3, start: "2026-03-04", end: "2026-03-06" });
  });

  test("current streak is zero when yesterday and today are empty", () => {
    expect(computeStreaks(days, "2026-03-08").current.length).toBe(0);
  });

  test("an empty today does not break a streak that ran through yesterday", () => {
    const { current } = computeStreaks(days, "2026-03-07");
    expect(current).toEqual({ length: 3, start: "2026-03-04", end: "2026-03-06" });
  });

  test("future-dated zero days are ignored", () => {
    const { current } = computeStreaks(
      [day("2026-03-01", 1), day("2026-03-02", 1), day("2026-03-03", 0)],
      "2026-03-02",
    );
    expect(current.length).toBe(2);
  });

  test("handles empty input", () => {
    const s = computeStreaks([], "2026-03-01");
    expect(s.longest.length).toBe(0);
    expect(s.current.length).toBe(0);
  });
});

describe("busiestDay / activeDayCount", () => {
  test("returns the max-count day and counts non-zero days", () => {
    const days = [day("2026-01-01", 0), day("2026-01-02", 9), day("2026-01-03", 4)];
    expect(busiestDay(days)).toEqual(day("2026-01-02", 9));
    expect(activeDayCount(days)).toBe(2);
  });

  test("busiestDay is null for an empty list", () => {
    expect(busiestDay([])).toBeNull();
  });
});

describe("toWeekGrid", () => {
  test("pads the first week so columns start on Sunday", () => {
    // 2026-01-01 is a Thursday → 4 leading blanks (Sun–Wed)
    const grid = toWeekGrid([day("2026-01-01", 1), day("2026-01-02", 2), day("2026-01-03", 3)]);
    expect(grid).toHaveLength(1);
    expect(grid[0].slice(0, 4)).toEqual([null, null, null, null]);
    expect(grid[0][4]).toEqual(day("2026-01-01", 1));
    expect(grid[0][6]).toEqual(day("2026-01-03", 3));
  });

  test("starts a new column every Sunday", () => {
    const grid = toWeekGrid([day("2026-01-03", 1), day("2026-01-04", 1)]);
    expect(grid).toHaveLength(2);
    expect(grid[1][0]).toEqual(day("2026-01-04", 1));
  });
});

describe("summarizeOpenSource", () => {
  const prs = [
    pr({ repo: "deepmind/jax", owner: "deepmind", repoStars: 500, number: 1 }),
    pr({ repo: "deepmind/jax", owner: "deepmind", repoStars: 500, number: 2, state: "OPEN", mergedAt: null }),
    pr({ repo: "deepmind/torax", owner: "deepmind", repoStars: 900, number: 3 }),
    pr({ repo: "opencv/opencv", owner: "opencv", repoStars: 80000, number: 4 }),
    pr({ repo: "me/own", owner: "me", number: 5 }),
  ];

  test("excludes the user's own repos and counts states", () => {
    const s = summarizeOpenSource(prs, ["me"]);
    expect(s.total).toBe(4);
    expect(s.merged).toBe(3);
    expect(s.open).toBe(1);
  });

  test("groups by org, ordered by merged count then stars", () => {
    const s = summarizeOpenSource(prs, ["me"]);
    expect(s.orgs.map((o) => o.owner)).toEqual(["deepmind", "opencv"]);
    expect(s.orgs[0].merged).toBe(2);
    expect(s.orgs[0].repos.map((r) => r.repo)).toEqual(["deepmind/torax", "deepmind/jax"]);
  });

  test("owner exclusion is case-insensitive", () => {
    expect(summarizeOpenSource(prs, ["ME"]).total).toBe(4);
  });

  test("sums distinct upstream stars of repos with a merged PR", () => {
    expect(summarizeOpenSource(prs, ["me"]).mergedRepoStars).toBe(500 + 900 + 80000);
  });
});

describe("languageShare", () => {
  test("returns percentages for the top N and folds the rest into Other", () => {
    const share = languageShare(
      [
        { name: "Python", color: "#3572A5", bytes: 60 },
        { name: "TypeScript", color: "#3178c6", bytes: 30 },
        { name: "Rust", color: "#dea584", bytes: 6 },
        { name: "Go", color: "#00ADD8", bytes: 4 },
      ],
      2,
    );
    expect(share.map((l) => l.name)).toEqual(["Python", "TypeScript", "Other"]);
    expect(share[0].pct).toBeCloseTo(60);
    expect(share[2].pct).toBeCloseTo(10);
  });

  test("returns empty array when there are no bytes", () => {
    expect(languageShare([], 5)).toEqual([]);
  });
});
