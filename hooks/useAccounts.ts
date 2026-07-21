"use client";

import { useCallback, useEffect, useState } from "react";

import { Account, AccountQueryInput } from "@/types/account";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to load accounts";
}

export default function useAccounts(filters: AccountQueryInput = {}) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const query = new URLSearchParams();

      if (filters.search) {
        query.set("search", filters.search);
      }

      if (filters.accountType) {
        query.set("type", filters.accountType);
      }

      if (typeof filters.status === "boolean") {
        query.set("status", filters.status ? "active" : "inactive");
      }

      if (typeof filters.posting === "boolean") {
        query.set("posting", String(filters.posting));
      }

      const response = await fetch(`/api/accounts${query.toString() ? `?${query.toString()}` : ""}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load accounts");
      }

      setAccounts(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [filters.accountType, filters.posting, filters.search, filters.status]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchAccounts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchAccounts]);

  return { accounts, loading, error, refresh: fetchAccounts };
}
