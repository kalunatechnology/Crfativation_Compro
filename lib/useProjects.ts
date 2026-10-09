"use client";

import { useEffect, useState } from "react";
import { dummyProjects } from "@/data/dummy";
import type { Project } from "@/lib/types";

/**
 * Shared active-project list for homepage carousel and /projects.
 * SQLite through GET /api/projects is the single source of truth.
 * Seeded dummy data is only shown while loading or after a network error.
 * An intentionally empty API list stays empty: never fabricate projects.
 */
const fallback: Project[] = dummyProjects.map((item, index) => ({ ...item, id: index + 1 }));

type State = { items: Project[]; status: "loading" | "ready" | "error" };
export function useProjects(): State {
  const [state, setState] = useState<State>({ items: fallback, status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/projects", { signal: controller.signal, cache: "no-store" });
        if (!response.ok) throw new Error("Tidak dapat membaca daftar proyek");
        const payload: unknown = await response.json();
        if (!payload || typeof payload !== "object" || !("data" in payload) || !Array.isArray(payload.data)) {
          throw new Error("Format daftar proyek tidak valid");
        }
        const items = (payload.data as Project[])
          .filter(item => item && typeof item.id === "number" && typeof item.title === "string" && item.isActive !== false)
          .sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id);
        if (!controller.signal.aborted) setState({ items, status: "ready" });
      } catch {
        if (!controller.signal.aborted) setState({ items: fallback, status: "error" });
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  return state;
}
