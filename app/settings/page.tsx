import { Building2, GitBranch, CalendarDays, CircleDollarSign, RefreshCcw, ListOrdered, Users, Shield, KeyRound, DatabaseBackup, SlidersHorizontal } from "lucide-react";

const settings = [
  { title: "Company Profile", description: "Single legal entity, tax, address, and base-currency information.", icon: Building2 },
  { title: "Branches", description: "Operational bases, airport stations, and departmental locations.", icon: GitBranch },
  { title: "Fiscal Year", description: "Define the active aviation accounting year and close controls.", icon: CalendarDays },
  { title: "Accounting Periods", description: "Monthly and custom financial periods for posting governance.", icon: CalendarDays },
  { title: "Currency", description: "Base and transaction currencies for aviation finance.", icon: CircleDollarSign },
  { title: "Exchange Rates", description: "Effective-dated FX rates for treasury and reporting.", icon: RefreshCcw },
  { title: "Number Series", description: "Controlled numbering for journals, documents, and operations.", icon: ListOrdered },
  { title: "Users", description: "Finance, operations, maintenance, and management users.", icon: Users },
  { title: "Roles", description: "Role templates aligned to ERP responsibilities.", icon: Shield },
  { title: "Permissions", description: "Granular access controls for accounting and aviation modules.", icon: KeyRound },
  { title: "Backup", description: "Database backup, retention, and recovery configuration.", icon: DatabaseBackup },
  { title: "System Settings", description: "Global preferences for the single-company installation.", icon: SlidersHorizontal },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-[#0B162C] to-[#111C34] p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Settings</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Single Company Administration</h1>
        <p className="mt-3 max-w-3xl text-slate-300">Configure the single AccountTech ERP company profile, accounting controls, users, security, and system operations from one professional control center.</p>
      </section>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {settings.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="rounded-2xl border border-slate-800 bg-[#111C34] p-6 transition hover:border-cyan-500/70 hover:bg-[#162344]">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300"><Icon size={24} /></div>
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
