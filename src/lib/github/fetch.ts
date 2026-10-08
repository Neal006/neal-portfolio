/* Live GitHub GraphQL client. Used at request time (ISR) and by scripts/sync-github.ts. */
import { mapContributionYear, mapLanguages, mapPullRequests } from "./normalize";
import type { GithubData, GithubProfile } from "./types";

const ENDPOINT = "https://api.github.com/graphql";
const MAX_PR_PAGES = 5;
const PAGE_SIZE = 100;

export interface FetchOptions {
  /** Next.js ISR window in seconds; ignored outside Next. */
  revalidate?: number;
}

type Rec = Record<string, unknown>;

async function gql(token: string, query: string, variables: Rec, opts: FetchOptions): Promise<Rec> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "Content-Type": "application/json", "User-Agent": "neal-portfolio" },
    body: JSON.stringify({ query, variables }),
    ...(opts.revalidate ? { next: { revalidate: opts.revalidate } } : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL HTTP ${res.status}`);
  const json = (await res.json()) as { data?: Rec; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`GitHub GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  if (!json.data) throw new Error("GitHub GraphQL returned no data");
  return json.data;
}

const PROFILE_QUERY = `query($login:String!){ user(login:$login){
  login name avatarUrl createdAt followers{totalCount} following{totalCount}
  owned: repositories(ownerAffiliations:OWNER, privacy:PUBLIC, isFork:false, first:100){
    totalCount nodes{ stargazerCount languages(first:10, orderBy:{field:SIZE, direction:DESC}){ edges{ size node{ name color } } } }
  }
  forks: repositories(ownerAffiliations:OWNER, privacy:PUBLIC, isFork:true){ totalCount }
}}`;

const PR_QUERY = `query($q:String!, $after:String){ search(query:$q, type:ISSUE, first:${PAGE_SIZE}, after:$after){
  pageInfo{ hasNextPage endCursor }
  nodes{ ... on PullRequest{ number title url state createdAt mergedAt
    repository{ nameWithOwner isPrivate stargazerCount owner{ login avatarUrl } } } }
}}`;

const CALENDAR_FIELDS = `totalCommitContributions totalPullRequestContributions totalIssueContributions
  totalPullRequestReviewContributions totalRepositoryContributions restrictedContributionsCount
  contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount } } }`;

function calendarQuery(years: readonly number[]): string {
  const blocks = years.map(
    (y) => `y${y}: contributionsCollection(from:"${y}-01-01T00:00:00Z", to:"${y}-12-31T23:59:59Z"){ ${CALENDAR_FIELDS} }`,
  );
  return `query($login:String!){ user(login:$login){ ${blocks.join("\n")} } }`;
}

const total = (v: unknown): number => {
  const n = (v as { totalCount?: unknown } | undefined)?.totalCount;
  return typeof n === "number" ? n : 0;
};

async function fetchPullRequestNodes(token: string, login: string, opts: FetchOptions): Promise<unknown[]> {
  const nodes: unknown[] = [];
  let after: string | null = null;
  for (let page = 0; page < MAX_PR_PAGES; page++) {
    const data = await gql(token, PR_QUERY, { q: `author:${login} is:pr is:public sort:created-desc`, after }, opts);
    const search = data.search as { nodes?: unknown[]; pageInfo?: { hasNextPage?: boolean; endCursor?: string } };
    nodes.push(...(search.nodes ?? []));
    if (!search.pageInfo?.hasNextPage || !search.pageInfo.endCursor) break;
    after = search.pageInfo.endCursor;
  }
  return nodes;
}

export async function fetchGithubData(token: string, login: string, opts: FetchOptions = {}): Promise<GithubData> {
  const profileData = await gql(token, PROFILE_QUERY, { login }, opts);
  const user = profileData.user as Rec | null;
  if (!user) throw new Error(`GitHub user ${login} not found`);

  const owned = user.owned as { nodes?: { stargazerCount?: number }[] };
  const ownedNodes = owned.nodes ?? [];
  const profile: GithubProfile = {
    login: String(user.login),
    name: String(user.name ?? user.login),
    avatarUrl: String(user.avatarUrl ?? ""),
    createdAt: String(user.createdAt),
    followers: total(user.followers),
    following: total(user.following),
    ownedRepos: total(user.owned),
    forkedRepos: total(user.forks),
    publicRepos: total(user.owned) + total(user.forks),
    starsEarned: ownedNodes.reduce((s, r) => s + (r.stargazerCount ?? 0), 0),
  };

  const firstYear = new Date(profile.createdAt).getUTCFullYear();
  const thisYear = new Date().getUTCFullYear();
  const years = Array.from({ length: thisYear - firstYear + 1 }, (_, i) => firstYear + i);

  const [calendarData, prNodes] = await Promise.all([
    gql(token, calendarQuery(years), { login }, opts),
    fetchPullRequestNodes(token, login, opts),
  ]);
  const calUser = calendarData.user as Rec;

  return {
    generatedAt: new Date().toISOString(),
    source: "live",
    profile,
    years: years.map((y) => mapContributionYear(y, calUser[`y${y}`])),
    pullRequests: mapPullRequests(prNodes),
    languages: mapLanguages(ownedNodes),
  };
}
