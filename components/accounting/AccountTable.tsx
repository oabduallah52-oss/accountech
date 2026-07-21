"use client";

import { Eye, FolderTree, Pencil, Plus, Trash2 } from "lucide-react";

import { Account } from "@/types/account";

interface Props {
  accounts: Account[];
  refresh: () => void;
  onView: (account: Account) => void;
  onEdit: (account: Account) => void;
  onCreateChild: (account: Account) => void;
}

function renderAccountRows(accounts: Account[], level = 0, onView: (account: Account) => void, onEdit: (account: Account) => void, onCreateChild: (account: Account) => void, refresh: () => void) {
  return accounts.map((account) => (
    <tr key={account.id} className="border-t border-slate-700 hover:bg-[#162344]">
      <td className="p-5 font-semibold text-cyan-400" style={{ paddingLeft: `${level * 24 + 20}px` }}>
        {account.code}
      </td>
      <td className="p-5 text-white">
        <div className="flex items-center gap-3">
          <FolderTree size={18} className="text-cyan-400" />
          <div>
            <p className="font-semibold text-white">{account.arabicName || account.name}</p>
            <p className="text-xs text-slate-400">{account.englishName || account.name}</p>
          </div>
        </div>
      </td>
      <td className="p-5 text-white">{account.englishName || account.name}</td>
      <td className="p-5 text-slate-300">{account.parent?.englishName || account.parent?.name || "-"}</td>
      <td className="p-5 text-slate-300">{account.accountType}</td>
      <td className="p-5 text-slate-300">{account.accountClass}</td>
      <td className="p-5 text-slate-300">{account.normalBalance}</td>
      <td className="p-5 text-slate-300">{account.currency}</td>
      <td className="p-5 text-slate-300">{account.allowPosting ? "Yes" : "No"}</td>
      <td className="p-5">
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">{account.isActive ? "Active" : "Inactive"}</span>
      </td>
      <td className="p-5">
        <div className="flex justify-center gap-2">
          <button onClick={() => onView(account)} className="rounded-lg bg-slate-600 p-2.5 text-white hover:bg-slate-500" aria-label="View account">
            <Eye size={16} />
          </button>
          <button onClick={() => onEdit(account)} className="rounded-lg bg-blue-500 p-2.5 text-white hover:bg-blue-600" aria-label="Edit account">
            <Pencil size={16} />
          </button>
          <button onClick={() => onCreateChild(account)} className="rounded-lg bg-amber-500 p-2.5 text-white hover:bg-amber-600" aria-label="Create child account">
            <Plus size={16} />
          </button>
          <button
            onClick={async () => {
              if (!confirm(`Delete ${account.name}?`)) {
                return;
              }

              const response = await fetch(`/api/accounts/${account.id}`, { method: "DELETE" });
              if (response.ok) {
                refresh();
              }
            }}
            className="rounded-lg bg-red-500 p-2.5 text-white hover:bg-red-600"
            aria-label="Delete account"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  ));
}

export default function AccountTable({ accounts, refresh, onView, onEdit, onCreateChild }: Props) {
  const rows = renderAccountRows(accounts, 0, onView, onEdit, onCreateChild, refresh);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111C34] shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px]">
          <thead className="bg-[#0B162C] text-slate-300">
            <tr>
              <th className="p-5 text-left">Code</th>
              <th className="p-5 text-left">Arabic Name</th>
              <th className="p-5 text-left">English Name</th>
              <th className="p-5 text-left">Parent</th>
              <th className="p-5 text-left">Type</th>
              <th className="p-5 text-left">Class</th>
              <th className="p-5 text-left">Nature</th>
              <th className="p-5 text-left">Currency</th>
              <th className="p-5 text-left">Posting</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      {accounts.length === 0 && <div className="p-8 text-center text-slate-400">No accounts found.</div>}
    </div>
  );
}
