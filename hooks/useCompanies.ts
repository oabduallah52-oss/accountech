"use client";

import { useEffect, useState } from "react";
import { Company } from "@/types/company";

export default function useCompanies() {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  async function fetchCompanies() {

    try {

      setLoading(true);
      setError(null);

      const response = await fetch("/api/companies");

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }

      const data = await response.json();

      setCompanies(data);

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {
    fetchCompanies();
  }, []);


  return {
    companies,
    loading,
    error,
    refresh: fetchCompanies,
  };

}