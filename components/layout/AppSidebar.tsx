"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  Network,
  BookOpen,
  Receipt,
  Wallet,
  Plane,
  Cpu,
  Map,
  Fuel,
  Wrench,
  FileBarChart2,
  Bot,
  Settings,
  GraduationCap,
  Calculator,
  FileSpreadsheet,
  Landmark,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Companies",
    href: "/companies",
    icon: Building2,
  },

  {
    title: "Branches",
    href: "/branches",
    icon: Network,
  },

  {
    divider: true,
    label: "ACCOUNTING",
  },

  {
    title: "Chart of Accounts",
    href: "/accounting/chart-of-accounts",
    icon: BookOpen,
  },

  {
    title: "Journal Entries",
    href: "/accounting/journal-entries",
    icon: Receipt,
  },

  {
    title: "Treasury",
    href: "/accounting/treasury",
    icon: Wallet,
  },

  {
    divider: true,
    label: "AVIATION",
  },

  {
    title: "Aircraft",
    href: "/operations/aircraft",
    icon: Plane,
  },

  {
    title: "Engines",
    href: "/operations/engines",
    icon: Cpu,
  },

  {
    title: "Flights",
    href: "/operations/flights",
    icon: Map,
  },

  {
    title: "Fuel",
    href: "/operations/fuel",
    icon: Fuel,
  },

  {
    title: "Maintenance",
    href: "/operations/maintenance",
    icon: Wrench,
  },

  {
    divider: true,
    label: "TOOLS",
  },

  {
    title: "Financial Tools",
    href: "/tools",
    icon: Calculator,
  },

  {
    title: "Excel Templates",
    href: "/excel",
    icon: FileSpreadsheet,
  },

  {
    title: "Tax & VAT",
    href: "/tax",
    icon: Landmark,
  },

  {
    divider: true,
    label: "LEARNING",
  },

  {
    title: "Learning Center",
    href: "/learning",
    icon: GraduationCap,
  },

  {
    divider: true,
    label: "REPORTS",
  },

  {
    title: "Reports",
    href: "/reports",
    icon: FileBarChart2,
  },

  {
    title: "AI Financial Advisor",
    href: "/ai",
    icon: Bot,
  },

  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-[#08111F] border-r border-slate-800 flex flex-col">

      <div className="border-b border-slate-800 px-8 py-7">

        <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400">
          Financial Advisor
        </h1>

        <h2 className="text-2xl font-bold text-white -mt-1">
          ERP
        </h2>

        <p className="mt-2 text-xs text-slate-400 leading-5">
          Aviation Financial Management System
        </p>

      </div>

      <nav className="flex-1 overflow-y-auto py-5">

        {menu.map((item, index) => {

          if ("divider" in item) {
            return (
              <div
                key={index}
                className="mt-6 mb-3 px-6 text-xs font-bold tracking-[3px] text-slate-500"
              >
                {item.label}
              </div>
            );
          }

          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20 font-semibold"
                  : "text-slate-300 hover:bg-[#162344] hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}