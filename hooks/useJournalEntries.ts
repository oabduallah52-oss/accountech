"use client";

import { useCallback, useEffect, useState } from "react";

import { JournalEntry, JournalEntryQueryInput } from "@/types/journal";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to load journal entries";
}

export default function useJournalEntries(filters: JournalEntryQueryInput = {}) {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams();

      if (filters.search) {
        query.set("search", filters.search);
      }

      if (filters.status) {
        query.set("status", filters.status);
      }

      const response = await fetch(`/api/journal-entries${query.toString() ? `?${query.toString()}` : ""}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load journal entries");
      }

      setEntries(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [filters.search, filters.status]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchEntries();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchEntries]);

  return { entries, loading, error, refresh: fetchEntries };
}
