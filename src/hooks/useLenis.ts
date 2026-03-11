"use client";
import { useEffect } from "react";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      import("gsap").then(({ default: gsap }) => {
        gsap.registerPlugin(ScrollTrigger);
        lenisInstance?.on("scroll", ScrollTrigger.update);
      });
    });

    return () => {
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
}
