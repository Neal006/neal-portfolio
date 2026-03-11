"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  type?: "words" | "chars";
  delay?: number;
  stagger?: number;
  variant?: "fade-up" | "mask-reveal";
  triggerOnScroll?: boolean;
}

export default function SplitText({
  text,
  as: Tag = "p",
  className = "",
  style,
  type = "words",
  delay = 0,
  stagger = 0.06,
  variant = "mask-reveal",
  triggerOnScroll = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const units = type === "chars" ? text.split("") : text.split(" ");
    el.innerHTML = units
      .map(
        (unit) => {
          const isSpace = unit === " ";
          const displayUnit = isSpace ? "&nbsp;" : (type === "words" ? unit : unit);
          const spaceAfter = type === "words" ? "&nbsp;" : "";
          const widthStyle = isSpace ? "width:0.3em;" : "";
          return `<span class="split-unit" style="display:inline-block; overflow:hidden; vertical-align:bottom; ${widthStyle}">` +
            `<span class="split-inner" style="display:inline-block;">${displayUnit}${spaceAfter}</span></span>`;
        }
      )
      .join("");

    const inners = el.querySelectorAll<HTMLElement>(".split-inner");

    if (variant === "mask-reveal") {
      gsap.set(inners, { y: "110%", opacity: 0 });
    } else {
      gsap.set(inners, { y: 40, opacity: 0 });
    }

    const anim = gsap.to(inners, {
      y: 0,
      opacity: 1,
      duration: 0.75,
      delay,
      stagger,
      ease: "power3.out",
      paused: triggerOnScroll,
    });

    if (triggerOnScroll) {
      ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
        once: true,
        onEnter: () => anim.play(),
      });
    } else {
      anim.play();
    }

    return () => {
      anim.kill();
    };
  }, [text, type, variant, delay, stagger, triggerOnScroll]);

  const Component = Tag as React.ElementType;
  return <Component ref={containerRef} className={className} style={style}>{text}</Component>;
}
