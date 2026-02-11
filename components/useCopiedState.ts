"use client";

import { useEffect, useState } from "react";

export type CopiedState = "idle" | "copied" | "error";

export function useCopiedState(timeoutMs: number = 1600) {
  const [state, setState] = useState<CopiedState>("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), timeoutMs);
    return () => window.clearTimeout(t);
  }, [state, timeoutMs]);

  return {
    state,
    set: (next: CopiedState) => setState(next),
  };
}
