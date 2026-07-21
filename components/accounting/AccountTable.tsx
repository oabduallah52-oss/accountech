"use client";

import { Pencil, Trash2, FolderTree } from "lucide-react";
import { Account } from "@/types/account";

interface Props {
  accounts: Account[];
  refresh: () => void;
}

export default function AccountTable({ accounts, refresh }: Props) {
  async function deleteAccount(id: number, name: string) {
    if (!confirm(`Delete ${name}?`)) return;

    const response = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
    if (response.ok) refresh();
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-700 bg-[#111C34] shadow-xl shadow-black/20">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-[#0B162C] text-slate-300">
            <tr>
              <th className="p-5 text-left">Code</th>
              <th className="p-5 text-left">Account Name</th>
              <th className="p-5 text-left">Type</th>
              <th className="p-5 text-left">Balance</th>
              <th className="p-5 text-left">Currency</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border-t border-slate-700 hover:bg-[#162344]">
                <td className="p-5 font-semibold text-cyan-400">{account.code}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3 text-white">
                    <FolderTree size={20} className="text-cyan-400" />
                    <div>
                      <p className="font-semibold">{account.name}</p>
                      {account.parent && <p className="text-xs text-slate-400">Parent: {account.parent.name}</p>}
                    </div>
                  </div>
                </td>
                <td className="p-5 text-slate-300">{account.accountType}</td>
                <td className="p-5 text-slate-300">{account.normalBalance}</td>
                <td className="p-5 text-slate-300">{account.currency}</td>
                <td className="p-5"><span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">{account.isActive ? "Active" : "Inactive"}</span></td>
                <td className="p-5">
                  <div className="flex justify-center gap-3">
                    <button className="rounded-lg bg-blue-500 p-3 hover:bg-blue-600" aria-label="Edit account"><Pencil size={18} className="text-white" /></button>
                    <button onClick={() => deleteAccount(account.id, account.name)} className="rounded-lg bg-red-500 p-3 hover:bg-red-600" aria-label="Delete account"><Trash2 size={18} className="text-white" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {accounts.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-slate-400">No accounts found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
