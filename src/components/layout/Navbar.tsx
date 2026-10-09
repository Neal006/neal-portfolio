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
const SOLID_AFTER_PX = 24;
/* Height of the bar: the hero counts as "left" once its bottom edge slides under it. */
const NAV_OFFSET_PX = 64;

function Hamburger({ open }: { open: boolean }) {
  const line = "absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]";
  return (
    <span aria-hidden className="relative block h-3 w-7">
      <span className={`${line} top-0 ${open ? "translate-y-[5.25px] rotate-45" : ""}`} />
      <span className={`${line} bottom-0 ${open ? "-translate-y-[5.25px] -rotate-45" : ""}`} />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > SOLID_AFTER_PX));

  // Hamburger as soon as the hero leaves; normal links again the moment any of it is back on screen.
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
      rootMargin: `-${NAV_OFFSET_PX}px 0px 0px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

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

  const collapsed = pastHero || open;

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed inset-x-0 top-0 z-[60] border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled && !open
            ? "border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className={`wrap relative flex items-center justify-between text-[#eeece7] transition-[padding] duration-500 ${scrolled ? "py-3.5" : "py-5"}`}>
          <a href="#top" className="display -my-3 py-3 text-xl tracking-tight" aria-label="Back to top">
            N<span className="serif text-[var(--ember)]">D</span>
          </a>

          {/* Desktop (lg+) links live only inside the hero; afterwards, and on smaller screens, the hamburger takes over. */}
          <AnimatePresence>
            {!collapsed && (
              <motion.ul
                key="links"
                className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {LINKS.map((l, i) => (
                  <li key={l.href}>
                    <a href={l.href} className="eyebrow link-u !text-[#eeece7]" data-cursor="hover">
                      <span className="opacity-50">0{i + 1}</span> {l.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          {/* On lg+ Résumé and the hamburger share one grid cell and cross-fade in place. */}
          <div className="flex items-center gap-6 lg:grid lg:justify-items-end lg:gap-0 lg:[grid-template-areas:'slot']">
            <a
              href={personal.resume}
              target="_blank"
              rel="noopener"
              className={`eyebrow link-u hidden !text-[#eeece7] transition-[opacity,visibility] duration-300 sm:inline lg:[grid-area:slot] ${collapsed ? "lg:invisible lg:opacity-0" : ""}`}
              data-cursor="hover"
            >
              Résumé ↗
            </a>
            <button
              type="button"
              className={`-m-3 flex items-center gap-3 p-3 text-[#eeece7] transition-[opacity,visibility] duration-300 lg:[grid-area:slot] ${
                collapsed ? "" : "lg:invisible lg:opacity-0"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="hover"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="eyebrow hidden !text-[#eeece7] md:inline">{open ? "Close" : "Menu"}</span>
              <Hamburger open={open} />
            </button>
          </div>
        </div>
      </nav>

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
            <ul className="wrap flex w-full flex-col gap-2 !px-0">
              {LINKS.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="display flex items-baseline gap-4 text-[clamp(2.75rem,13vw,7.5rem)] transition-colors hover:text-[var(--ember)]"
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
            <div className="wrap mt-10 flex w-full gap-6 !px-0 eyebrow">
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
