"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { markIntroDone } from "@/hooks/useIntro";

const SEEN_KEY = "nd-intro-seen";
const COUNT_MS = 1500;
const EASE = [0.76, 0, 0.24, 1] as const;

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function rememberIntro(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode — the intro will simply replay */
  }
}

const noopSubscribe = () => () => {};
const shouldSkip = () => hasSeenIntro() || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Preloader() {
  const skip = useSyncExternalStore(noopSubscribe, shouldSkip, () => false);
  const [finished, setFinished] = useState(false);
  const [count, setCount] = useState(0);
  const visible = !skip && !finished;

  useEffect(() => {
    if (skip) {
      markIntroDone();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        rememberIntro();
        setFinished(true);
        markIntroDone();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [skip]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          aria-hidden
          className="preloader fixed inset-0 z-[9995] flex flex-col justify-between bg-[var(--bg)] p-[var(--gutter)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: EASE }}
        >
          <div className="flex justify-between eyebrow">
            <span>Neal Daftary</span>
            <span>Portfolio — v2</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="serif text-[clamp(1.5rem,3vw,2.5rem)] text-[var(--text-muted)] max-w-md leading-tight">
              Loading the work, the commits, and the merged PRs.
            </p>
            <span className="display text-[clamp(5rem,18vw,16rem)] tabular-nums text-[var(--text)]">
              {count}
              <span className="text-[var(--ember)]">%</span>
            </span>
          </div>
          <div className="absolute left-0 bottom-0 h-[2px] bg-[var(--ember)]" style={{ width: `${count}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
