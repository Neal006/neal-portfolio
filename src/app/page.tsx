import Navbar from "@/components/layout/Navbar";
import Preloader from "@/components/layout/Preloader";
import ChatbotLoader from "@/components/layout/ChatbotLoader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Work from "@/components/sections/Work";
import OpenSource from "@/components/sections/OpenSource";
import GithubActivity from "@/components/sections/GithubActivity";
import Experience from "@/components/sections/Experience";
import Recognition from "@/components/sections/Recognition";
import Contact from "@/components/sections/Contact";
import { getGithubData } from "@/lib/github";
import { GITHUB_LOGIN } from "@/lib/github/config";
import {
  activeDayCount,
  busiestDay,
  computeStreaks,
  flattenDays,
  languageShare,
  summarizeOpenSource,
} from "@/lib/github/stats";

/** Re-render with fresh GitHub data at most every 6 hours. */
export const revalidate = 21600;

const TOP_LANGUAGES = 7;
const MARQUEE_MIN_STARS = 1000;
const EMPLOYER_ORG = "curriculo-tech";

export default async function Page() {
  const gh = await getGithubData();
  const days = flattenDays(gh.years);
  const today = new Date().toISOString().slice(0, 10);
  const { longest, current } = computeStreaks(days, today);
  const upstreamPrs = gh.pullRequests.filter((p) => p.owner.toLowerCase() !== GITHUB_LOGIN.toLowerCase());
  const oss = summarizeOpenSource(upstreamPrs, [GITHUB_LOGIN]);
  const lifetime = gh.years.reduce((s, y) => s + y.total, 0);

  const marqueeOrgs = oss.orgs
    .filter((o) => o.merged > 0 && (o.stars >= MARQUEE_MIN_STARS || o.owner === EMPLOYER_ORG))
    .map((o) => ({ owner: o.owner, avatar: o.avatar }));

  return (
    <>
      <Preloader />
      {/* Navbar sits outside <main> so the open mobile menu can mark <main> inert */}
      <Navbar />
      <main>
      <Hero
        stats={{
          contributions: lifetime,
          mergedPrs: oss.merged,
          orgs: oss.orgs.length,
          repos: gh.profile.publicRepos,
        }}
      />
      <Manifesto orgs={marqueeOrgs} />
      <Work />
      <OpenSource summary={oss} prs={upstreamPrs} />
      <GithubActivity
        years={gh.years}
        stats={{ lifetime, longest, current, busiest: busiestDay(days), activeDays: activeDayCount(days) }}
        languages={languageShare(gh.languages, TOP_LANGUAGES)}
        syncedAt={gh.generatedAt}
        live={gh.source === "live"}
      />
      <Experience />
      <Recognition />
      <Contact syncedAt={gh.generatedAt} />
      </main>
      <ChatbotLoader />
    </>
  );
}
