"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export default function MarqueeStrip({
  items,
  speed = 80,
  direction = "left",
  className = "",
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    const duration = totalWidth / speed;

    const anim = gsap.to(track, {
      x: direction === "left" ? -totalWidth : totalWidth,
      duration,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: string) =>
          direction === "left"
            ? parseFloat(x) % totalWidth
            : ((parseFloat(x) % totalWidth) + totalWidth) % totalWidth
        ),
      },
    });

    return () => {
      anim.kill();
    };
  }, [speed, direction, items]);

  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap gap-8 will-change-transform"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-5xl tracking-widest uppercase shrink-0"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item}
            <span className="mx-6" style={{ color: "var(--accent-y)" }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
