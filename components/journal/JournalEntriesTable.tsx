"use client";

import { JournalEntry } from "@/types/journal";

interface Props {
  entries: JournalEntry[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function summarizeTotals(lines: JournalEntry["lines"]) {
  const totals = lines.reduce(
    (summary, line) => {
      summary.debit += Number(line.debit || 0);
      summary.credit += Number(line.credit || 0);
      return summary;
    },
    { debit: 0, credit: 0 },
  );

  return totals;
}

export default function JournalEntriesTable({ entries }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111C34] shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-[#0B162C] text-slate-300">
            <tr>
              <th className="p-4 text-left">Entry #</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-left">Lines</th>
              <th className="p-4 text-left">Debit</th>
              <th className="p-4 text-left">Credit</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => {
              const totals = summarizeTotals(entry.lines);

              return (
                <tr key={entry.id} className="border-t border-slate-700 hover:bg-[#162344]">
                  <td className="p-4 font-semibold text-cyan-400">{entry.entryNumber}</td>
                  <td className="p-4 text-slate-200">{new Date(entry.entryDate).toLocaleDateString()}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${entry.status === "POSTED" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-200">{entry.description || "-"}</td>
                  <td className="p-4 text-slate-200">{entry.lines.length}</td>
                  <td className="p-4 text-slate-200">{formatCurrency(totals.debit)}</td>
                  <td className="p-4 text-slate-200">{formatCurrency(totals.credit)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {entries.length === 0 && <div className="p-8 text-center text-slate-400">No journal entries found.</div>}
    </div>
  );
}
