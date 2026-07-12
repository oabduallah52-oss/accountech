"use client";

import { RefreshCw, Upload, Download } from "lucide-react";
import AddAccountModal from "./AddAccountModal";

export default function AccountsToolbar() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-[#111C34] p-6">

      {/* Left */}

      <div>
        <h1 className="text-3xl font-bold text-white">
          Chart of Accounts
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your accounting structure
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">

        <button
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

        <button
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500"
        >
          <Upload size={18} />
          Import
        </button>

        <button
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500"
        >
          <Download size={18} />
          Export
        </button>

        {/* زر إضافة الحساب */}

        <AddAccountModal />

      </div>

    </div>
  );
}