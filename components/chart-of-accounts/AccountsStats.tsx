const stats = [
  { title: "Accounts", value: "152", color: "cyan" },
  { title: "Assets", value: "48", color: "green" },
  { title: "Liabilities", value: "26", color: "orange" },
  { title: "Expenses", value: "61", color: "blue" },
];

export default function AccountsStats() {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((s) => (
        <div
          key={s.title}
          className="rounded-2xl border border-slate-700 bg-[#111C34] p-6"
        >
          <p className="text-slate-400">{s.title}</p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            {s.value}
          </h2>

        </div>
      ))}

    </div>
  );
}