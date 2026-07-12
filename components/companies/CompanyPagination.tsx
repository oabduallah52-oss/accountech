export default function CompanyPagination() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-700 bg-[#111C34] p-5">

      <p className="text-sm text-slate-400">
        Showing 1 to 10 of 124 Companies
      </p>

      <div className="flex gap-2">

        <button className="rounded-lg border border-slate-600 bg-[#071426] px-4 py-2 text-white hover:border-cyan-500">
          Previous
        </button>

        <button className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black">
          1
        </button>

        <button className="rounded-lg border border-slate-600 bg-[#071426] px-4 py-2 text-white">
          2
        </button>

        <button className="rounded-lg border border-slate-600 bg-[#071426] px-4 py-2 text-white">
          3
        </button>

        <button className="rounded-lg border border-slate-600 bg-[#071426] px-4 py-2 text-white hover:border-cyan-500">
          Next
        </button>

      </div>

    </div>
  );
}