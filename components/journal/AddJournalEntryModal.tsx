"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { Account } from "@/types/account";
import { CreateJournalEntryInput } from "@/types/journal";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  accounts: Account[];
}

const emptyLine = {
  accountId: 0,
  description: "",
  debit: 0,
  credit: 0,
};

const emptyForm: CreateJournalEntryInput = {
  entryNumber: "",
  entryDate: new Date().toISOString().slice(0, 10),
  description: "",
  status: "DRAFT",
  lines: [
    { ...emptyLine },
    { ...emptyLine },
  ],
};

function parseNumber(value: string | number) {
  const result = typeof value === "number" ? value : Number.parseFloat(value);
  return Number.isFinite(result) ? result : 0;
}

export default function AddJournalEntryModal({ open, setOpen, refresh, accounts }: Props) {
  const [form, setForm] = useState<CreateJournalEntryInput>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totals = useMemo(() => {
    return form.lines.reduce(
      (summary, line) => {
        summary.debit += parseNumber(line.debit || 0);
        summary.credit += parseNumber(line.credit || 0);
        return summary;
      },
      { debit: 0, credit: 0 },
    );
  }, [form.lines]);

  function resetForm() {
    setForm(emptyForm);
    setError("");
  }

  function handleFieldChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleLineChange(index: number, field: keyof typeof emptyLine, value: string) {
    setForm((current) => ({
      ...current,
      lines: current.lines.map((line, lineIndex) => {
        if (lineIndex !== index) {
          return line;
        }

        if (field === "accountId") {
          return { ...line, accountId: Number(value) };
        }

        if (field === "debit" || field === "credit") {
          return { ...line, [field]: parseNumber(value) };
        }

        return { ...line, [field]: value };
      }),
    }));
  }

  function addLine() {
    setForm((current) => ({
      ...current,
      lines: [...current.lines, { ...emptyLine }],
    }));
  }

  function removeLine(index: number) {
    setForm((current) => ({
      ...current,
      lines: current.lines.filter((_, lineIndex) => lineIndex !== index),
    }));
  }

  async function saveEntry() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/journal-entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save journal entry.");
      }

      refresh();
      setOpen(false);
      resetForm();
    } catch (caughtError: unknown) {
      setError(caughtError instanceof Error ? caughtError.message : "Failed to save journal entry.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#111C34] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Create Journal Entry</h2>
            <p className="text-sm text-slate-400">Use the live Chart of Accounts as the posting source for journal lines.</p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg border border-slate-700 p-2 text-white" aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{error}</div>}

        <div className="grid gap-5 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Entry Number</span>
            <input name="entryNumber" value={form.entryNumber} onChange={handleFieldChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Entry Date</span>
            <input name="entryDate" type="date" value={form.entryDate} onChange={handleFieldChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Status</span>
            <select name="status" value={form.status} onChange={handleFieldChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none">
              <option value="DRAFT">Draft</option>
              <option value="POSTED">Posted</option>
            </select>
          </label>

          <label className="space-y-2 md:col-span-3">
            <span className="text-sm text-slate-300">Description</span>
            <textarea name="description" rows={3} value={form.description || ""} onChange={handleFieldChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-700 bg-[#0B162C] p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Journal Lines</h3>
            <button onClick={addLine} className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-black hover:bg-cyan-600">Add Line</button>
          </div>

          <div className="space-y-3">
            {form.lines.map((line, index) => (
              <div key={`${index}-${line.accountId}`} className="grid gap-3 rounded-xl border border-slate-700 bg-[#091225] p-3 md:grid-cols-[2fr_1.4fr_1fr_1fr_auto]">
                <label className="space-y-1">
                  <span className="text-xs text-slate-400">Account</span>
                  <select value={line.accountId || 0} onChange={(event) => handleLineChange(index, "accountId", event.target.value)} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-2.5 text-white outline-none">
                    <option value={0}>Select account</option>
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.code} - {account.englishName || account.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-400">Description</span>
                  <input value={line.description || ""} onChange={(event) => handleLineChange(index, "description", event.target.value)} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-2.5 text-white outline-none" />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-400">Debit</span>
                  <input type="number" min="0" step="0.01" value={line.debit || 0} onChange={(event) => handleLineChange(index, "debit", event.target.value)} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-2.5 text-white outline-none" />
                </label>

                <label className="space-y-1">
                  <span className="text-xs text-slate-400">Credit</span>
                  <input type="number" min="0" step="0.01" value={line.credit || 0} onChange={(event) => handleLineChange(index, "credit", event.target.value)} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-2.5 text-white outline-none" />
                </label>

                <div className="flex items-end">
                  {form.lines.length > 2 && (
                    <button onClick={() => removeLine(index)} className="rounded-xl border border-red-500/50 px-3 py-2 text-sm text-red-200">Remove</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#091225] px-4 py-3 text-sm text-slate-300">
            <span>Total Debit: {totals.debit.toFixed(2)}</span>
            <span>Total Credit: {totals.credit.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => setOpen(false)} className="rounded-xl border border-slate-700 px-5 py-3 text-white">Cancel</button>
          <button onClick={saveEntry} disabled={loading} className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Saving..." : "Save Journal Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
