"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  account?: null;
}

export default function AddAccountModal({ open, setOpen, refresh }: Props) {
  const [form, setForm] = useState({
    code: "",
    name: "",
    accountType: "ASSET",
    normalBalance: "DEBIT",
    currency: "USD",
    parentId: "",
    allowPosting: true,
    isSystem: false,
    isActive: true,
    level: 1,
    description: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function saveAccount() {
    const response = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        parentId: form.parentId ? Number(form.parentId) : null,
        level: Number(form.level),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.message || "Error creating account");
      return;
    }

    setOpen(false);
    setForm({ code: "", name: "", accountType: "ASSET", normalBalance: "DEBIT", currency: "USD", parentId: "", allowPosting: true, isSystem: false, isActive: true, level: 1, description: "" });
    refresh();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-3xl rounded-3xl border border-slate-700 bg-[#111C34] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Add New Account</h2>
          <button onClick={() => setOpen(false)} aria-label="Close"><X className="text-white" /></button>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <input name="code" placeholder="Account Code" value={form.code} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white" />
          <input name="name" placeholder="Account Name" value={form.name} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white" />
          <select name="accountType" value={form.accountType} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white">
            <option value="ASSET">Asset</option><option value="LIABILITY">Liability</option><option value="EQUITY">Equity</option><option value="REVENUE">Revenue</option><option value="EXPENSE">Expense</option>
          </select>
          <select name="normalBalance" value={form.normalBalance} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white">
            <option value="DEBIT">Debit</option><option value="CREDIT">Credit</option>
          </select>
          <input name="currency" placeholder="Currency" value={form.currency} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white" />
          <input name="level" type="number" placeholder="Level" value={form.level} onChange={handleChange} className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white" />
        </div>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="mt-5 w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white" />
        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setOpen(false)} className="rounded-xl border border-slate-700 px-5 py-3 text-white">Cancel</button>
          <button onClick={saveAccount} className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600">Save Account</button>
        </div>
      </div>
    </div>
  );
}
