"use client";
import { useSyncExternalStore } from "react";

/* One-shot signal: the preloader has lifted and the hero may animate in. */
let introDone = false;
const listeners = new Set<() => void>();

export function markIntroDone(): void {
  if (introDone) return;
  introDone = true;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIntroDone(): boolean {
  return useSyncExternalStore(subscribe, () => introDone, () => false);
}
