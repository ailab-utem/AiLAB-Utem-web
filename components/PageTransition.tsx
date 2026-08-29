import { ViewTransition } from "react";
import type { ReactNode } from "react";

const transitionMap = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={transitionMap} exit={transitionMap} default="none">
      {children}
    </ViewTransition>
  );
}