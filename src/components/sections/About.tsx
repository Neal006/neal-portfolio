"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { personal } from "@/data/profile";

const EASE = [0.16, 1, 0.3, 1] as const;

const NERD_OUT = ["computer vision", "how LLMs remember", "open source", "Rust", "MLOps", "dev tools", "tiny CLIs"];

/* Each entry is one line of the fake source file; `t` = token kind for colouring. */
type Tok = { t: "k" | "p" | "s" | "c" | "x"; v: string };
const CODE: Tok[][] = [
  [{ t: "c", v: "// about.ts: the honest version" }],
  [{ t: "k", v: "const " }, { t: "x", v: "neal" }, { t: "p", v: " = {" }],
  [{ t: "x", v: "  home: " }, { t: "s", v: '"Ahmedabad, IN"' }, { t: "p", v: "," }],
  [{ t: "x", v: "  studying: " }, { t: "s", v: '"CSE (AI & ML) @ Nirma"' }, { t: "p", v: "," }],
  [{ t: "x", v: "  dayJob: " }, { t: "s", v: '"SWE intern @ Curriculo"' }, { t: "p", v: "," }],
  [{ t: "x", v: "  learning: " }, { t: "p", v: "[" }, { t: "s", v: '"Rust"' }, { t: "p", v: ", " }, { t: "s", v: '"JAX"' }, { t: "p", v: "]," }],
  [{ t: "x", v: "  githubBio: " }, { t: "s", v: '"Fixing bugs!!!"' }, { t: "p", v: "," }],
  [{ t: "x", v: "  openTo: " }, { t: "p", v: "[" }, { t: "s", v: '"side quests"' }, { t: "p", v: ", " }, { t: "s", v: '"nerdy chats"' }, { t: "p", v: "]," }],
  [{ t: "p", v: "};" }],
];
const TOK_COLOR: Record<Tok["t"], string> = {
  k: "text-[var(--ember)]",
  p: "text-[var(--text-faint)]",
  s: "text-[#9ed69a]",
  c: "text-[var(--text-faint)] italic",
  x: "text-[var(--text)]",
};

function CodeCard() {
  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-card)]">
      <div className="flex items-center gap-2 border-b border-[var(--border)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="eyebrow ml-3 !normal-case !tracking-normal">~/neal/about.ts</span>
      </div>
      <motion.pre
        className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-7 sm:text-sm"
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: "-15%" }}
        transition={{ staggerChildren: 0.09 }}
      >
        {CODE.map((line, i) => (
          <motion.div
            key={i}
            className="flex"
            variants={{ hidden: { opacity: 0, x: -8 }, shown: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="mr-4 w-4 select-none text-right text-[var(--text-faint)]">{i + 1}</span>
            <code className="whitespace-pre">
              {line.map((tok, j) => (
                <span key={j} className={TOK_COLOR[tok.t]}>{tok.v}</span>
              ))}
              {i === CODE.length - 1 && <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-[var(--ember)]" />}
            </code>
          </motion.div>
        ))}
      </motion.pre>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-x-clip py-24 md:py-36">
      <div className="wrap">
        <Reveal className="mb-12 flex items-center gap-4 md:mb-16">
          <span className="eyebrow" style={{ color: "var(--ember)" }}>(00)</span>
          <span className="eyebrow">About</span>
          <span className="hairline flex-1" />
        </Reveal>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-20">
          {/* Avatar, a little sticker you can poke */}
          <Reveal className="mx-auto w-full max-w-[22rem] lg:sticky lg:top-28 lg:max-w-none">
            <motion.figure
              className="relative"
              initial={{ rotate: -3 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <div className="aspect-square overflow-hidden rounded-[28px] border-[6px] border-[var(--text)] bg-[#141416] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
                <Image
                  src={personal.photo}
                  alt="A nerdy octopus in glasses typing code on a laptop at a late-night desk"
                  width={460}
                  height={460}
                  sizes="(min-width: 1024px) 34vw, 22rem"
                  className="h-full w-full object-cover"
                />
              </div>
              <motion.span
                aria-hidden
                className="absolute -top-4 right-0 rotate-[10deg] rounded-full bg-[var(--ember)] px-4 py-2 font-mono text-xs font-medium uppercase tracking-wider text-black shadow-lg sm:-right-5"
                animate={{ rotate: [10, 4, 10] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                hi, that&apos;s me!
              </motion.span>
              <figcaption className="eyebrow mt-5 text-center !normal-case !tracking-normal">
                fig. 1: neal (artist&apos;s impression), probably fixing a bug
              </figcaption>
            </motion.figure>
          </Reveal>

          <div className="flex min-w-0 flex-col gap-10">
            <Reveal>
              <h2 id="about-title" className="text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                Hey, I&apos;m <span className="serif text-[var(--ember)]">Neal</span>
                <motion.span
                  aria-hidden
                  className="ml-3 inline-block origin-[70%_80%]"
                  animate={{ rotate: [0, 16, -8, 16, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
                >
                  👋
                </motion.span>
              </h2>
            </Reveal>

            <Reveal delay={0.05} className="max-w-2xl space-y-5 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-[var(--text-muted)]">
              <p>
                I&apos;m a third-year computer science (AI &amp; ML) student in Ahmedabad. Most of my evenings disappear into
                side projects, half-finished experiments, and reading other people&apos;s code just to see how it{" "}
                <span className="serif text-[var(--text)]">actually</span> works.
              </p>
              <p>
                I love the small, satisfying moments in software: a red test turning green, a weird bug finally making sense, a
                model leaving the notebook and quietly helping someone. When a tool I use breaks, sending a tiny fix back to it
                is my favourite kind of thank-you.
              </p>
              <p>
                Right now I&apos;m learning Rust and thinking way too much about how LLMs remember things. I also just wrapped
                up a year as chair of the ACM student chapter at my university, which was a lot of fun.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <CodeCard />
            </Reveal>

            <Reveal delay={0.15}>
              <p className="eyebrow mb-4">Things I nerd out about</p>
              <ul className="flex flex-wrap gap-2">
                {NERD_OUT.map((t, i) => (
                  <motion.li
                    key={t}
                    className="rounded-full border border-[var(--border-strong)] px-4 py-2 text-sm text-[var(--text)]"
                    whileHover={{ y: -3, rotate: i % 2 ? 2 : -2, borderColor: "var(--ember)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
