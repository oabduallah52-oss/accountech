"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import AddJournalEntryModal from "@/components/journal/AddJournalEntryModal";
import JournalEntriesTable from "@/components/journal/JournalEntriesTable";
import PageHeader from "@/components/ui/PageHeader";
import useAccounts from "@/hooks/useAccounts";
import useJournalEntries from "@/hooks/useJournalEntries";

export default function JournalEntriesPage() {
  const { entries, loading, error, refresh } = useJournalEntries();
  const { accounts } = useAccounts();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        badge="Accounting"
        title="Journal Entries"
        description="Create and review journal entries with real account posting control, line validation, and balance equality checks."
      >
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"
        >
          <Plus size={18} />
          New Entry
        </button>
      </PageHeader>

      {error && <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

      {loading ? (
        <div className="rounded-3xl border border-slate-700 bg-[#111C34] p-8 text-slate-300">Loading journal entries...</div>
      ) : (
        <JournalEntriesTable entries={entries} />
      )}

      <AddJournalEntryModal open={open} setOpen={setOpen} refresh={refresh} accounts={accounts} />
    </div>
  );
}