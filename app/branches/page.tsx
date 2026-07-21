export default function BranchesPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold text-white">
            Branches
          </h1>

          <p className="mt-2 text-slate-400">
            Manage Operational Branches
          </p>
        </div>

        <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 transition">
          + New Branch
        </button>

      </div>

      <div className="grid grid-cols-4 gap-6">

        <div className="rounded-2xl border border-cyan-700 bg-[#111C34] p-6">
          <p className="text-slate-400">Branches</p>
          <h2 className="mt-3 text-4xl font-bold text-cyan-400">12</h2>
        </div>

        <div className="rounded-2xl border border-green-700 bg-[#111C34] p-6">
          <p className="text-slate-400">Active</p>
          <h2 className="mt-3 text-4xl font-bold text-green-400">10</h2>
        </div>

        <div className="rounded-2xl border border-orange-700 bg-[#111C34] p-6">
          <p className="text-slate-400">Airports</p>
          <h2 className="mt-3 text-4xl font-bold text-orange-400">6</h2>
        </div>

        <div className="rounded-2xl border border-blue-700 bg-[#111C34] p-6">
          <p className="text-slate-400">Stations</p>
          <h2 className="mt-3 text-4xl font-bold text-blue-400">4</h2>
        </div>

      </div>

      <div className="rounded-2xl border border-slate-700 bg-[#111C34] p-6">

        <div className="flex gap-4">

          <input
            placeholder="Search Branch..."
            className="flex-1 rounded-xl border border-slate-700 bg-[#07111F] px-5 py-3 text-white outline-none"
          />

          <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black">
            Search
          </button>

        </div>

      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111C34]">

        <table className="w-full">

          <thead className="bg-[#0D1728]">

            <tr>

              <th className="p-5 text-left text-slate-300">Code</th>
              <th className="p-5 text-left text-slate-300">Branch Name</th>
              <th className="p-5 text-left text-slate-300">Airport</th>
              <th className="p-5 text-left text-slate-300">Country</th>
              <th className="p-5 text-left text-slate-300">Status</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t border-slate-700 hover:bg-[#162344]">

              <td className="p-5 text-white">BR001</td>

              <td className="p-5 font-semibold text-white">
                Cairo Head Office
              </td>

              <td className="p-5 text-slate-300">
                Cairo International Airport
              </td>

              <td className="p-5 text-slate-300">
                Egypt
              </td>

              <td className="p-5">

                <span className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
                  Active
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}