"use client";

import { useEffect, useState } from "react";
import { dummyStats } from "@/data/dummy";
import type { CompanyStat } from "@/lib/types";

/**
 * Shared active company statistics for hero section.
 * SQLite through GET /api/stats is the single source of truth.
 * Seeded dummy data (100, 52, 34) is shown while loading or after a network error.
 */
const fallback: CompanyStat[] = dummyStats.map((item, index) => ({
  ...item,
  id: index + 1,
}));

type State = { items: CompanyStat[]; status: "loading" | "ready" | "error" };

export function useStats(): State {
  const [state, setState] = useState<State>({ items: fallback, status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/stats", { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("Tidak dapat membaca data statistik");
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("data" in payload) || !Array.isArray(payload.data)) {
          throw new Error("Format data statistik tidak valid");
        }
        const items = (payload.data as CompanyStat[])
          .filter(item => item && typeof item.id === "number" && item.isActive !== false)
          .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
        if (!controller.signal.aborted) {
          setState({ items: items.length > 0 ? items : fallback, status: "ready" });
        }
      } catch {
        if (!controller.signal.aborted) setState({ items: fallback, status: "error" });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return state;
}
