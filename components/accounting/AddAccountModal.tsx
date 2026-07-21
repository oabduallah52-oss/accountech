"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";

import { Account, AccountClass, CreateAccountInput } from "@/types/account";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  accounts: Account[];
  account: Account | null;
  onAfterSave?: () => void;
}

const emptyForm = {
  code: "",
  arabicName: "",
  englishName: "",
  accountClass: "ASSETS" as AccountClass,
  accountType: "ASSET",
  normalBalance: "DEBIT" as CreateAccountInput["normalBalance"],
  currency: "USD",
  parentId: "",
  allowPosting: true,
  controlAccount: false,
  systemAccount: false,
  isActive: true,
  level: 1,
  description: "",
};

export default function AddAccountModal({ open, setOpen, refresh, accounts, account, onAfterSave }: Props) {
  const [form, setForm] = useState(() => {
    if (!account) {
      return emptyForm;
    }

    return {
      code: account.code,
      arabicName: account.arabicName,
      englishName: account.englishName,
      accountClass: account.accountClass,
      accountType: account.accountType,
      normalBalance: account.normalBalance,
      currency: account.currency,
      parentId: account.parentId ? String(account.parentId) : "",
      allowPosting: account.allowPosting,
      controlAccount: account.controlAccount,
      systemAccount: account.systemAccount,
      isActive: account.isActive,
      level: account.level,
      description: account.description ?? "",
    };
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const parentOptions = useMemo(() => {
    return accounts.filter((item) => item.id !== account?.id);
  }, [account?.id, accounts]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const target = event.target;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setForm((current) => ({
        ...current,
        [name]: target.checked,
      }));
      return;
    }

    setForm((current) => ({
      ...current,
      [name]: target.value,
    }));
  }

  function validateForm(): string[] {
    const issues: string[] = [];

    if (!form.code.trim()) issues.push("Account code is required.");
    if (!form.arabicName.trim()) issues.push("Arabic name is required.");
    if (!form.englishName.trim()) issues.push("English name is required.");
    if (!form.accountClass) issues.push("Account class is required.");
    if (!form.accountType.trim()) issues.push("Account type is required.");
    if (!form.normalBalance) issues.push("Normal balance is required.");

    return issues;
  }

  async function saveAccount() {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const method = account?.id ? "PUT" : "POST";
      const endpoint = account?.id ? `/api/accounts/${account.id}` : "/api/accounts";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          parentId: form.parentId ? Number(form.parentId) : null,
          level: Number(form.level),
          description: form.description.trim() || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save account.");
      }

      setSubmitted(true);
      setOpen(false);
      onAfterSave?.();
      refresh();
    } catch (error: unknown) {
      const fallback = error instanceof Error ? error.message : "Failed to save account.";
      setErrors([fallback]);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-700 bg-[#111C34] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">{account ? "Edit Account" : "Add New Account"}</h2>
            <p className="text-sm text-slate-400">Create professional master account records for the aviation accounting chart.</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-lg border border-slate-700 p-2 text-white">
            <X size={18} />
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-5 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {errors.map((message) => (
              <p key={message}>{message}</p>
            ))}
          </div>
        )}

        {submitted && <div className="mb-5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-200">Account saved successfully.</div>}

        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm text-slate-300">Account Code</span>
            <input name="code" value={form.code} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Arabic Name</span>
            <input name="arabicName" value={form.arabicName} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">English Name</span>
            <input name="englishName" value={form.englishName} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Parent Account</span>
            <select name="parentId" value={form.parentId} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none">
              <option value="">No Parent</option>
              {parentOptions.map((item) => (
                <option key={item.id} value={item.id}>{item.code} - {item.englishName}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Account Class</span>
            <select name="accountClass" value={form.accountClass} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none">
              <option value="ASSETS">Assets</option>
              <option value="LIABILITIES">Liabilities</option>
              <option value="EQUITY">Equity</option>
              <option value="REVENUE">Revenue</option>
              <option value="EXPENSES">Expenses</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Account Type</span>
            <input name="accountType" value={form.accountType} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Normal Balance</span>
            <select name="normalBalance" value={form.normalBalance} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none">
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm text-slate-300">Currency</span>
            <input name="currency" value={form.currency} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm text-slate-300">Description</span>
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} className="w-full rounded-xl border border-slate-700 bg-[#071426] p-3 text-white outline-none" />
          </label>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input name="allowPosting" type="checkbox" checked={form.allowPosting} onChange={handleChange} className="h-4 w-4" />
            Allow Posting
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input name="controlAccount" type="checkbox" checked={form.controlAccount} onChange={handleChange} className="h-4 w-4" />
            Control Account
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input name="systemAccount" type="checkbox" checked={form.systemAccount} onChange={handleChange} className="h-4 w-4" />
            System Account
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button onClick={() => setOpen(false)} className="rounded-xl border border-slate-700 px-5 py-3 text-white">Cancel</button>
          <button onClick={saveAccount} disabled={loading} className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Saving..." : "Save Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
