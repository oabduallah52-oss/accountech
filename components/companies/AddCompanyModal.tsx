"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function AddCompanyModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"
      >
        + New Company
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

          <div className="w-[700px] rounded-2xl border border-slate-700 bg-[#111C34] p-8">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-2xl font-bold text-white">
                Add New Company
              </h2>

              <button onClick={() => setOpen(false)}>
                <X className="text-white" />
              </button>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <input
                placeholder="Company Name"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

              <input
                placeholder="Legal Name"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

              <input
                placeholder="Country"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

              <input
                placeholder="Currency"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

              <input
                placeholder="Industry"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

              <input
                placeholder="Fiscal Year"
                className="rounded-xl bg-[#071426] border border-slate-700 p-3 text-white"
              />

            </div>

            <div className="mt-8 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-600 px-5 py-3 text-white"
              >
                Cancel
              </button>

              <button
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black"
              >
                Save Company
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}