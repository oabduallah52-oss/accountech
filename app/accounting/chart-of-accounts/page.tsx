"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import AccountTable from "@/components/accounting/AccountTable";
import AddAccountModal from "@/components/accounting/AddAccountModal";
import useAccounts from "@/hooks/useAccounts";
import { Account } from "@/types/account";

const accountTypeOptions = ["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"];

export default function ChartOfAccountsPage() {
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("");
  const [status, setStatus] = useState<boolean | undefined>(undefined);
  const [posting, setPosting] = useState<boolean | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const { accounts, loading, error, refresh } = useAccounts({
    search,
    accountType,
    status,
    posting,
  });

  const statistics = useMemo(() => {
    const active = accounts.filter((item) => item.isActive).length;
    const postingAccounts = accounts.filter((item) => item.allowPosting).length;
    const parentAccounts = accounts.filter((item) => !item.parentId).length;

    return {
      totalAccounts: accounts.length,
      activeAccounts: active,
      postingAccounts,
      parentAccounts,
    };
  }, [accounts]);

  function handleView(account: Account) {
    setSelectedAccount(account);
    setOpen(true);
  }

  function handleEdit(account: Account) {
    setSelectedAccount(account);
    setOpen(true);
  }

  function handleCreateChild(account: Account) {
    setSelectedAccount({
      ...account,
      id: 0,
      parentId: account.id,
      code: "",
      arabicName: "",
      englishName: "",
      description: "",
    });
    setOpen(true);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Chart of Accounts</h1>
          <p className="text-slate-400">Production-grade accounting hierarchy and master data.</p>
        </div>
        <button
          onClick={() => {
            setSelectedAccount(null);
            setOpen(true);
          }}
          className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"
        >
          + New Account
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total Accounts", value: statistics.totalAccounts },
          { label: "Active Accounts", value: statistics.activeAccounts },
          { label: "Posting Accounts", value: statistics.postingAccounts },
          { label: "Parent Accounts", value: statistics.parentAccounts },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-700 bg-[#111C34] p-5">
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-700 bg-[#111C34] p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_0.9fr_0.8fr_0.8fr]">
          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-slate-300">
            <Search size={18} className="text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search account code or name" className="w-full bg-transparent outline-none" />
          </label>

          <select value={accountType} onChange={(event) => setAccountType(event.target.value)} className="rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-slate-300">
            <option value="">Account Type</option>
            {accountTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>

          <select value={status === undefined ? "" : String(status)} onChange={(event) => setStatus(event.target.value === "" ? undefined : event.target.value === "true")} className="rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-slate-300">
            <option value="">Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <select value={posting === undefined ? "" : String(posting)} onChange={(event) => setPosting(event.target.value === "" ? undefined : event.target.value === "true")} className="rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-slate-300">
            <option value="">Posting</option>
            <option value="true">Allow Posting</option>
            <option value="false">No Posting</option>
          </select>
        </div>
      </div>

      {loading && <div className="rounded-xl bg-slate-900/50 p-4 text-slate-300">Loading accounts...</div>}
      {error && <div className="rounded-xl bg-red-500/15 p-4 text-red-300">{error}</div>}

      {!loading && !error && (
        <AccountTable
          accounts={accounts}
          refresh={refresh}
          onView={handleView}
          onEdit={handleEdit}
          onCreateChild={handleCreateChild}
        />
      )}

      <AddAccountModal
        open={open}
        setOpen={setOpen}
        accounts={accounts}
        account={selectedAccount}
        refresh={refresh}
        onAfterSave={() => {
          setSelectedAccount(null);
        }}
      />
    </div>
  );
}
