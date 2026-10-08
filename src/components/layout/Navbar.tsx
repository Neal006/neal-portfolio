"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { personal } from "@/data/profile";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#upstream", label: "Open Source" },
  { href: "#activity", label: "Activity" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];
const EASE = [0.76, 0, 0.24, 1] as const;
const HIDE_AFTER_PX = 160;

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > HIDE_AFTER_PX && y > prev);
  });

  useEffect(() => {
    if (!open) return;
    const main = document.querySelector("main");
    document.body.style.overflow = "hidden";
    main?.setAttribute("inert", "");
    document.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.nav
        aria-label="Primary"
        onFocusCapture={() => setHidden(false)}
        className="fixed inset-x-0 top-0 z-[60] mix-blend-difference"
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="wrap flex items-center justify-between py-5 text-[#eeece7]">
          <a href="#top" className="display -my-3 py-3 text-xl tracking-tight" aria-label="Back to top">
            N<span className="serif">D</span>
            <sup className="ml-0.5 text-[0.55em] font-mono">©26</sup>
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} className="eyebrow link-u !text-[#eeece7]" data-cursor="hover">
                  <span className="opacity-50">0{i + 1}</span> {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-5">
            <a href={personal.resume} target="_blank" rel="noopener" className="eyebrow link-u hidden !text-[#eeece7] sm:inline" data-cursor="hover">
              Résumé ↗
            </a>
            <button
              type="button"
              className="eyebrow -m-3 p-3 !text-[#eeece7] md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[55] flex flex-col justify-end bg-[var(--bg)] p-[var(--gutter)] pb-12"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <ul className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 text-[13vw]"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.06 }}
                  >
                    <span className="eyebrow">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-6 eyebrow">
              <a href={personal.githubUrl} target="_blank" rel="noopener">GitHub</a>
              <a href={personal.linkedinUrl} target="_blank" rel="noopener">LinkedIn</a>
              <a href={personal.resume} target="_blank" rel="noopener">Résumé</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
