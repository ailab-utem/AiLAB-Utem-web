"use client";

import { useEffect, useState } from "react";

export function SysClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[10px] font-medium leading-none tracking-[0.08em] text-white">
      {time}
    </span>
  );
}