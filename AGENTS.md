# AGENTS.md — Project Memory (auto-maintained)
Last updated: 2026-10-08 | Sessions logged: 3

## Identity
Neal Daftary's personal portfolio (neal-daftary.vercel.app) — recruiters/engineers read it; content comes from the resume PDF + live GitHub (Neal006).

## Stack & Commands
Next.js 16 (App Router, Turbopack, React Compiler) · React 19 · TS · Tailwind v4 · framer-motion · Lenis · vitest. npm.
- install: `npm install` · dev: `npm run dev` · build: `npm run build` · start: `npx next start`
- test: `npm test` (vitest, src/lib/**/*.test.ts) · lint: `npx eslint src scripts` · types: `npx tsc --noEmit`
- refresh GitHub snapshot: `npm run sync:github` (uses GITHUB_TOKEN or `gh auth token`)

## Current State & Focus
- v2 redesign shipped on branch `worktree-portfolio-v2` (Oct 2026): dark-only ember theme, WebGL hero, 6 numbered sections.
- Works: build, 28 unit tests, 0px overflow + nothing past viewport at 320/360/390/430/768/1440 (touch QA), no console errors. Live in prod at neal-daftary.vercel.app (deployed from this branch; PR #1 not merged).
- One pre-existing lint warning in src/app/api/chat/route.ts (unused errText). Blog pages still use old copy/styles via CSS vars.
- Preloader is hidden pre-paint via html[data-intro-seen] (inline script in layout.tsx); Navbar renders outside <main> so the mobile menu can inert it.

## Architecture
page.tsx (server, ISR 6h) → getGithubData() → [live GraphQL if GITHUB_TOKEN | src/data/github-snapshot.json] → stats.ts derives streaks/OSS summary/languages → props to client sections.
Static content: src/data/profile.ts (resume) + projects.ts (curated overrides over projects.generated.ts).
Intro choreography: Preloader → markIntroDone() (hooks/useIntro.ts) → Hero letters animate.
Section order: Hero → 00 About → 01 Work(bento) → 02 OpenSource(#upstream) → 03 GithubActivity(#activity) → 04 Experience → 05 Recognition → 06 Contact(+footer).
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
- src/components/sections/Hero.tsx (+HeroCanvas WebGL2 lit perspective terrain: cursor light/bloom, click ripples u_clicks[4], scroll tilt), About (avatar sticker + about.ts code card), Work (bento LAYOUT on lg 6-col grid, +ProjectIndex); hidden journey orgs = HIDDEN_ORGS in lib/github/config.ts, OpenSource, GithubActivity, Experience, Recognition, Contact
- src/components/layout/Navbar, Preloader, CustomCursor, Chatbot(+Loader), ScrollProgress, ClientShell
- src/components/ui/Reveal.tsx (Reveal, MaskText), SectionHeader.tsx; animations/CountUp, MagneticButton

## Conventions
- No em dashes in any copy, comments or prompts (user preference): use commas, colons, parentheses, ' | ' in titles, en dash only in date ranges.
- Colors only via CSS vars; ember (#ff5b23) is the single accent. Dark-only (no next-themes).
- New section = SectionHeader(index,label,title,accent) + `wrap` container + Reveal/MaskText.
- ACM chair role is PAST (Sep 2025 – Oct 2026): never phrase it as current.
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
2026-10-08 | ACM tenure ended (Sep 2025 – Oct 2026) + mobile fixes | profile.ts leadership, About.tsx, chatPrompt.ts, Work award chip wrap, Contact email button sizing, Navbar 44px tap areas | past tense everywhere; chat prompt states period + completed
2026-10-08 | Remove all em dashes; octopus avatar.jpg replaces avatar.png | 19 src files, About.tsx, profile.ts, public/images | avatar frame is aspect-square + object-cover
2026-10-08 | About section, bento Work, hidden orgs, reactive 3D hero shader | About, Work, Hero, HeroCanvas, page.tsx, lib/github/config.ts; -Manifesto, -ProjectArt | shader normals via dFdx/dFdy + cursor-following light; pointer listeners on window, disabled for reduced motion
2026-10-08 | Review fixes (a11y, hydration, ISR, chat input) | Navbar, Hero, HeroCanvas, Preloader, CountUp, lib/github/index.ts, lib/chatMessages.ts, api/chat | runtime GitHub failure rethrows to keep last good ISR page; chat roles whitelisted + capped
2026-10-08 | Portfolio v2 rebuild from new resume + GitHub | src/**, scripts/sync-github.ts, next.config.ts | data layer tested; design system replaced

## Archived Summary
