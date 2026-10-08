"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/* Dot + lagging ring. The ring swells over links/buttons and shows a label
   for elements with data-cursor-label="View". Fine pointers only. */

const RING_EASE = 0.16;
const INTERACTIVE = "a, button, [data-cursor], [data-cursor-label]";

const noopSubscribe = () => () => {};
const canUseCursor = () =>
  window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const enabled = useSyncExternalStore(noopSubscribe, canUseCursor, () => false);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const lag = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const el = (e.target as Element | null)?.closest?.(INTERACTIVE) ?? null;
      setActive(el !== null);
      setLabel(el?.getAttribute("data-cursor-label") ?? null);
    };
    const loop = () => {
      lag.x += (pos.x - lag.x) * RING_EASE;
      lag.y += (pos.y - lag.y) * RING_EASE;
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;
  const size = label ? 88 : active ? 52 : 30;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] mix-blend-difference"
      >
        <div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-[width,height,background-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{
            width: size,
            height: size,
            borderColor: "#eeece7",
            background: label ? "#eeece7" : "transparent",
          }}
        >
          {label && <span className="font-mono text-[10px] uppercase tracking-widest text-black">{label}</span>}
        </div>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[9999]">
        <div className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ember)]" />
      </div>
    </>
  );
}
