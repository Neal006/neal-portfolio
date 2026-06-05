"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface Props {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
}

export default function CountUp({ value, className, style, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    // Extract numeric part and suffix
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) { setDisplay(value); return; }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    const decimals = isFloat ? (match[1].split(".")[1]?.length ?? 0) : 0;

    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;
      setDisplay((isFloat ? current.toFixed(decimals) : Math.floor(current).toString()) + suffix);
      if (progress < 1) requestAnimationFrame(step);
      else setDisplay(value);
    };

    requestAnimationFrame(step);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
