export default function ReportsPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold text-white">
        Reports Center
      </h1>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-[#111C34] rounded-xl p-6 border border-cyan-500">
          Trial Balance
        </div>

        <div className="bg-[#111C34] rounded-xl p-6 border border-cyan-500">
          Balance Sheet
        </div>

        <div className="bg-[#111C34] rounded-xl p-6 border border-cyan-500">
          Income Statement
        </div>

        <div className="bg-[#111C34] rounded-xl p-6 border border-cyan-500">
          Cash Flow
        </div>

      </div>

    </div>
  );
}