"use client";

import { useCallback, useEffect, useState } from "react";
import { Account } from "@/types/account";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Failed to load accounts";
}

export default function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAccounts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/accounts");
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to load accounts");
      setAccounts(data);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, refresh: fetchAccounts };
}
