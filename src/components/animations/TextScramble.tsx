"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

interface Props {
  text: string;
  trigger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function TextScramble({ text, trigger = true, className, style, speed = 3 }: Props) {
  const [display, setDisplay] = useState(text);
  const raf = useRef<number | undefined>(undefined);
  const iteration = useRef(0);

  useEffect(() => {
    if (!trigger) return;
    iteration.current = 0;
    if (raf.current !== undefined) cancelAnimationFrame(raf.current);

    const animate = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration.current) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      if (iteration.current < text.length) {
        iteration.current += speed / 10;
        raf.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current!);
  }, [trigger, text, speed]);

  return (
    <span className={className} style={{ fontFamily: "inherit", ...style }}>
      {display}
    </span>
  );
}
