export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-[#111C34] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">AccountTech ERP</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Documents</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Controlled document storage for financial, aircraft, and operational records.</p>
      </section>
      <div className="grid gap-5 md:grid-cols-3">
        {["Operational Control", "Accounting Integration", "Management Reporting"].map((item) => (
          <article key={item} className="rounded-2xl border border-slate-800 bg-[#0D1728] p-6">
            <h2 className="text-lg font-semibold text-white">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Configured for the single-company aviation ERP workflow.</p>
          </article>
        ))}
      </div>
    </div>
  );
}
