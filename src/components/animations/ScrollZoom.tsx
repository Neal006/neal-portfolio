"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  fromScale?: number;
  scrub?: boolean;
}

export default function ScrollZoom({
  children,
  className = "",
  style,
  fromScale = 0.72,
  scrub = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    const anim = gsap.fromTo(
      el,
      { scale: fromScale, opacity: 0.4 },
      {
        scale: 1,
        opacity: 1,
        ease: scrub ? "none" : "power2.out",
        duration: scrub ? undefined : 1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: scrub ? "top 30%" : undefined,
          scrub: scrub ? 1.5 : false,
          once: !scrub,
        },
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [fromScale, scrub]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
