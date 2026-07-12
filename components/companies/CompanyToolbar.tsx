"use client";

import {
  Upload,
  Download,
  RefreshCw,
} from "lucide-react";

import AddCompanyModal from "./AddCompanyModal";
import PageHeader from "@/components/ui/PageHeader";

export default function CompanyToolbar() {
  return (
    <PageHeader
      badge="MASTER DATA"
      title="Companies"
      description="Manage all companies inside AccountTech ERP"
    >
      <button className="flex items-center gap-2 rounded-xl border border-slate-600 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500">
        <RefreshCw size={18} />
        Refresh
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-slate-600 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500">
        <Upload size={18} />
        Import
      </button>

      <button className="flex items-center gap-2 rounded-xl border border-slate-600 bg-[#071426] px-4 py-3 text-white transition hover:border-cyan-500">
        <Download size={18} />
        Export
      </button>

      <AddCompanyModal />
    </PageHeader>
  );
}