export default function AccountsFilters() {
  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111C34] p-6">

      <div className="flex gap-4">

        <input
          placeholder="Search account..."
          className="flex-1 rounded-xl border border-slate-700 bg-[#071426] px-5 py-3 text-white"
        />

        <select className="rounded-xl border border-slate-700 bg-[#071426] px-5 py-3 text-white">

          <option>All Types</option>

        </select>

      </div>

    </div>
  );
}