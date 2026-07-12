"use client";

import { useState } from "react";

export default function AddAccountModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-600"
      >
        + New Account
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <div className="w-[700px] rounded-2xl bg-[#111C34] p-8">

            <h2 className="mb-6 text-3xl font-bold text-white">
              Add New Account
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <input
                placeholder="Account Code"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white"
              />

              <input
                placeholder="Account Name"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white"
              />

              <select className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white">
                <option>Asset</option>
                <option>Liability</option>
                <option>Equity</option>
                <option>Revenue</option>
                <option>Expense</option>
              </select>

              <select className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white">
                <option>Debit</option>
                <option>Credit</option>
              </select>

              <input
                placeholder="Currency"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white"
              />

              <input
                placeholder="Parent Account"
                className="rounded-xl border border-slate-700 bg-[#071426] p-3 text-white"
              />

            </div>

            <div className="mt-8 flex justify-end gap-4">

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-700 px-5 py-3 text-white"
              >
                Cancel
              </button>

              <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black">
                Save Account
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}