/* Shape of the GitHub data the portfolio renders.
   Produced by both the live fetcher (lib/github/fetch.ts) and the
   committed snapshot (data/github-snapshot.json). */

export type PrState = "MERGED" | "OPEN" | "CLOSED";

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
}

export interface ContributionYear {
  year: number;
  total: number;
  commits: number;
  pullRequests: number;
  issues: number;
  reviews: number;
  reposCreated: number;
  privateContributions: number;
  days: ContributionDay[];
}

export interface PullRequest {
  repo: string; // owner/name
  owner: string;
  ownerAvatar: string;
  repoStars: number;
  number: number;
  title: string;
  url: string;
  state: PrState;
  createdAt: string; // ISO
  mergedAt: string | null;
}

export interface LanguageBytes {
  name: string;
  color: string;
  bytes: number;
}

export interface GithubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  createdAt: string;
  followers: number;
  following: number;
  publicRepos: number;
  ownedRepos: number;
  forkedRepos: number;
  starsEarned: number;
}

export interface GithubData {
  generatedAt: string;
  source: "live" | "snapshot";
  profile: GithubProfile;
  years: ContributionYear[];
  pullRequests: PullRequest[];
  languages: LanguageBytes[];
}
