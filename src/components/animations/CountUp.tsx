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
  // Numeric part + suffix; non-numeric values render as-is without animating
  const isNumeric = /^\d+(?:\.\d+)?/.test(value);

  useEffect(() => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!inView || !match) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].split(".")[1]?.length ?? 0;
    const format = (n: number) =>
      n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;

    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(format(decimals ? eased * target : Math.floor(eased * target)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {isNumeric ? display : value}
    </span>
  );
}
