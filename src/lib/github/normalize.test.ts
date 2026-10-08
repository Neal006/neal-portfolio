import { describe, expect, test } from "vitest";
import { mapContributionYear, mapLanguages, mapPullRequests } from "./normalize";

const prNode = (over: Record<string, unknown> = {}) => ({
  number: 7,
  title: "fix: thing",
  url: "https://github.com/acme/widget/pull/7",
  state: "MERGED",
  createdAt: "2026-08-08T10:00:00Z",
  mergedAt: "2026-08-09T10:00:00Z",
  repository: {
    nameWithOwner: "acme/widget",
    isPrivate: false,
    stargazerCount: 1234,
    owner: { login: "acme", avatarUrl: "https://avatars.example/acme" },
  },
  ...over,
});

describe("mapPullRequests", () => {
  test("maps a public PR node", () => {
    expect(mapPullRequests([prNode()])).toEqual([
      {
        repo: "acme/widget",
        owner: "acme",
        ownerAvatar: "https://avatars.example/acme",
        repoStars: 1234,
        number: 7,
        title: "fix: thing",
        url: "https://github.com/acme/widget/pull/7",
        state: "MERGED",
        createdAt: "2026-08-08T10:00:00Z",
        mergedAt: "2026-08-09T10:00:00Z",
      },
    ]);
  });

  test("drops PRs from private repositories so private work never leaks", () => {
    const priv = prNode({ repository: { ...prNode().repository, isPrivate: true } });
    expect(mapPullRequests([priv])).toEqual([]);
  });

  test("drops malformed nodes instead of throwing", () => {
    expect(mapPullRequests([null, {}, { number: "x" }, prNode({ state: "WEIRD" })])).toEqual([]);
  });
});

describe("mapContributionYear", () => {
  test("flattens calendar weeks into days and copies totals", () => {
    const y = mapContributionYear(2026, {
      totalCommitContributions: 5,
      totalPullRequestContributions: 2,
      totalIssueContributions: 1,
      totalPullRequestReviewContributions: 0,
      totalRepositoryContributions: 3,
      restrictedContributionsCount: 4,
      contributionCalendar: {
        totalContributions: 15,
        weeks: [
          { contributionDays: [{ date: "2026-01-01", contributionCount: 2 }] },
          { contributionDays: [{ date: "2026-01-04", contributionCount: 0 }] },
        ],
      },
    });
    expect(y.total).toBe(15);
    expect(y.commits).toBe(5);
    expect(y.privateContributions).toBe(4);
    expect(y.days).toEqual([
      { date: "2026-01-01", count: 2 },
      { date: "2026-01-04", count: 0 },
    ]);
  });

  test("throws on a payload without a calendar", () => {
    expect(() => mapContributionYear(2026, {})).toThrow(/calendar/i);
  });
});

describe("mapLanguages", () => {
  test("sums bytes per language across repos", () => {
    const langs = mapLanguages([
      { languages: { edges: [{ size: 10, node: { name: "Python", color: "#3572A5" } }] } },
      {
        languages: {
          edges: [
            { size: 5, node: { name: "Python", color: "#3572A5" } },
            { size: 7, node: { name: "Rust", color: null } },
          ],
        },
      },
    ]);
    expect(langs).toEqual([
      { name: "Python", color: "#3572A5", bytes: 15 },
      { name: "Rust", color: "#8b8b96", bytes: 7 },
    ]);
  });
});
