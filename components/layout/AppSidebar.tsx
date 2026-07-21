"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, FileBarChart2, FileText, Fuel, Gauge, Landmark, LayoutDashboard, Plane, Receipt, Settings, ShoppingCart, Wrench, Cpu, Wallet, Warehouse } from "lucide-react";

const menu = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Accounting", icon: Landmark, children: [
    { title: "Chart of Accounts", href: "/accounting/chart-of-accounts", icon: BookOpen },
    { title: "Journal Entries", href: "/accounting/journal-entries", icon: Receipt },
    { title: "General Ledger", href: "/accounting/general-ledger", icon: FileText },
    { title: "Trial Balance", href: "/accounting/trial-balance", icon: Gauge },
    { title: "Financial Statements", href: "/accounting/financial-statements", icon: FileBarChart2 },
  ]},
  { title: "Treasury", href: "/treasury", icon: Wallet },
  { title: "Purchasing", href: "/purchasing", icon: ShoppingCart },
  { title: "Sales", href: "/sales", icon: Warehouse },
  { title: "Aircraft", href: "/aircraft", icon: Plane },
  { title: "Engines", href: "/engines", icon: Cpu },
  { title: "Maintenance", href: "/maintenance", icon: Wrench },
  { title: "Fuel", href: "/fuel", icon: Fuel },
  { title: "Flight Operations", href: "/flights", icon: Plane },
  { title: "Reports", href: "/reports", icon: FileBarChart2 },
  { title: "Documents", href: "/documents", icon: FileText },
  { title: "AI Assistant", href: "/ai", icon: Bot },
  { title: "Settings", href: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#08111F]">
      <div className="border-b border-slate-800 px-7 py-6">
        <h1 className="text-2xl font-extrabold tracking-wide text-cyan-400">AccountTech</h1>
        <p className="mt-2 text-xs leading-5 text-slate-400">Single-company Aviation ERP</p>
      </div>
      <nav className="flex-1 overflow-y-auto py-5">
        {menu.map((item) => {
          if (item.children) {
            const ParentIcon = item.icon;
            return <div key={item.title} className="mb-2"><div className="mx-3 flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-500"><ParentIcon size={18}/>{item.title}</div>{item.children.map((child) => { const Icon = child.icon; const active = pathname === child.href; return <Link key={child.href} href={child.href} className={`mx-3 mb-1 flex items-center gap-3 rounded-xl px-8 py-2.5 text-sm transition ${active ? "bg-cyan-500 text-black font-semibold" : "text-slate-300 hover:bg-[#162344] hover:text-white"}`}><Icon size={18}/><span>{child.title}</span></Link>; })}</div>;
          }
          const Icon = item.icon;
          const active = pathname === item.href;
          return <Link key={item.href} href={item.href} className={`mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${active ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-semibold" : "text-slate-300 hover:bg-[#162344] hover:text-white"}`}><Icon size={20}/><span>{item.title}</span></Link>;
        })}
      </nav>
    </aside>
  );
}
