"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
}

export function Typewriter({
  text,
  className,
  speed = 26,
  startDelay = 500,
}: TypewriterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof matchMedia !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      queueMicrotask(() => setCount(text.length));
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const type = (i: number) => {
      timer = setTimeout(
        () => {
          if (cancelled) return;
          if (i >= text.length) return;
          setCount(i + 1);
          type(i + 1);
        },
        i === 0 ? startDelay : speed
      );
    };

    type(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return (
    <span aria-label={text} className={className}>
      {text.slice(0, count)}
      <span
        aria-hidden="true"
        className="ail-type-cursor ml-[2px] inline-block animate-[ail-blink_0.9s_steps(1)_1.5s_infinite] text-content"
      >
        ▊
      </span>
    </span>
  );
}