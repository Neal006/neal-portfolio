# AGENTS.md — Project Memory (auto-maintained)
Last updated: 2026-10-08 | Sessions logged: 1

## Identity
Neal Daftary's personal portfolio (neal-daftary.vercel.app) — recruiters/engineers read it; content comes from the resume PDF + live GitHub (Neal006).

## Stack & Commands
Next.js 16 (App Router, Turbopack, React Compiler) · React 19 · TS · Tailwind v4 · framer-motion · Lenis · vitest. npm.
- install: `npm install` · dev: `npm run dev` · build: `npm run build` · start: `npx next start`
- test: `npm test` (vitest, src/lib/**/*.test.ts) · lint: `npx eslint src scripts` · types: `npx tsc --noEmit`
- refresh GitHub snapshot: `npm run sync:github` (uses GITHUB_TOKEN or `gh auth token`)

## Current State & Focus
- v2 redesign shipped on branch `worktree-portfolio-v2` (Oct 2026): dark-only ember theme, WebGL hero, 6 numbered sections.
- Works: build, 23 unit tests, 0px horizontal overflow at 390/1440, no console errors.
- Pre-existing lint warnings in src/app/api/chat/route.ts (unused vars). Blog pages still use old copy/styles via CSS vars.

## Architecture
page.tsx (server, ISR 6h) → getGithubData() → [live GraphQL if GITHUB_TOKEN | src/data/github-snapshot.json] → stats.ts derives streaks/OSS summary/languages → props to client sections.
Static content: src/data/profile.ts (resume) + projects.ts (curated overrides over projects.generated.ts).
Intro choreography: Preloader → markIntroDone() (hooks/useIntro.ts) → Hero letters animate.
Section order: Hero → Manifesto(marquee) → 01 Work → 02 OpenSource(#upstream) → 03 GithubActivity(#activity) → 04 Experience → 05 Recognition → 06 Contact(+footer).
Chatbot (/api/chat, edge, OpenRouter) prompt = src/lib/chatPrompt.ts built from the same data files.

## File Map
- src/app/page.tsx — homepage composition + server-side GitHub stat derivation
- src/app/layout.tsx — fonts (Inter Tight/Instrument Serif/JetBrains Mono → --font-*), metadata, JSON-LD
- src/app/globals.css — design tokens (--bg, --ember, --heat-0..4, legacy --accent-y), .eyebrow/.serif/.chip/.heat/.glow-card/.marquee
- src/lib/github/types.ts — GithubData, ContributionYear, PullRequest
- src/lib/github/fetch.ts — fetchGithubData(token, login, {revalidate}); profile, per-year calendars, paginated PR search (is:public)
- src/lib/github/normalize.ts — mapPullRequests (drops private repos), mapContributionYear, mapLanguages
- src/lib/github/stats.ts — flattenDays, computeStreaks, toWeekGrid, summarizeOpenSource, languageShare
- src/lib/github/index.ts — getGithubData(): live → snapshot fallback
- src/lib/github/config.ts — GITHUB_LOGIN, revalidate window, ORG_NAMES/orgName()
- scripts/sync-github.ts — regenerates src/data/github-snapshot.json
- src/data/profile.ts — personal, experience, ossHighlights, publication, achievements, leadership, skills, LOR_URL
- src/data/projects.generated.ts — 38 repo write-ups (from READMEs); projects.ts — OVERRIDES, FEATURED order, projectCategories
- src/components/sections/Hero.tsx (+HeroCanvas WebGL2 contour shader), Manifesto, Work (+ProjectArt seeded SVG, ProjectIndex), OpenSource, GithubActivity, Experience, Recognition, Contact
- src/components/layout/Navbar, Preloader, CustomCursor, Chatbot(+Loader), ScrollProgress, ClientShell
- src/components/ui/Reveal.tsx (Reveal, MaskText), SectionHeader.tsx; animations/CountUp, MagneticButton

## Conventions
- Colors only via CSS vars; ember (#ff5b23) is the single accent. Dark-only (no next-themes).
- New section = SectionHeader(index,label,title,accent) + `wrap` container + Reveal/MaskText.
- Responsive grids need explicit `grid-cols-1` base (implicit auto tracks overflowed on mobile).
- Never render private-repo PR titles; keep personal phone out of client data.
- No console.log; server logs only via console.error in lib/github/index.ts.

## Dependencies & Gotchas
- framer-motion whileInView on an element clipped by overflow:hidden never fires → observe the wrapper and propagate via variants (see MaskText).
- JSX inline lists need literal spaces between items or text won't wrap (Toolkit rows overflowed).
- eslint react-hooks/set-state-in-effect: read matchMedia/sessionStorage via useSyncExternalStore, not setState in effects.
- next/font fetches Google Fonts at build; transient "Error while requesting resource" → just rerun build.
- `gh` search for PRs with a personal token includes private org repos — normalize.ts filters isPrivate.
- Remote avatars need images.remotePatterns (avatars.githubusercontent.com) in next.config.ts.
- Set GITHUB_TOKEN (read-only, public scope) in Vercel for live heatmap; otherwise snapshot is served.

## Decisions Log
- 2026-10-08 — Live GitHub via ISR + committed snapshot — site never breaks without a token/rate limit.
- 2026-10-08 — Removed /works/[id] (301 → /#work) — all 38 projects live in the homepage index.
- 2026-10-08 — Followed new resume: email nealdaftary0405@gmail.com, ISRO research dropped.
- 2026-10-08 — Generated project art (seeded SVG) instead of screenshots — consistent, zero assets.

## Changelog
2026-10-08 | Portfolio v2 rebuild from new resume + GitHub | src/**, scripts/sync-github.ts, next.config.ts | data layer tested; design system replaced

## Archived Summary
