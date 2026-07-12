"use client";

import {
  Bell,
  Search,
  Globe,
  UserCircle2,
  ChevronDown,
  CalendarDays,
  Moon,
} from "lucide-react";

export default function AppHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-[#0D1728] px-8">

      {/* LEFT */}

      <div className="flex items-center gap-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Financial Advisor ERP
          </h1>

          <p className="text-sm text-slate-400">
            Aviation Financial Management System
          </p>

        </div>

        <div className="relative w-[600px]">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            placeholder="Search anything..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-700
              bg-[#07111F]
              py-3
              pl-12
              pr-4
              text-white
              placeholder:text-slate-500
              outline-none
              transition
              focus:border-cyan-500
            "
          />

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-4">

        {/* Date */}

        <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-[#07111F] px-4 py-2">

          <CalendarDays size={18} className="text-cyan-400"/>

          <span className="text-sm text-slate-300">
            10 Jul 2026
          </span>

        </div>

        {/* Language */}

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            px-4
            py-2
            text-white
            transition
            hover:border-cyan-500
          "
        >

          <Globe size={18}/>

          EN

          <ChevronDown size={16}/>

        </button>

        {/* Theme */}

        <button
          className="
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            p-3
            transition
            hover:border-cyan-500
          "
        >
          <Moon size={18}/>
        </button>

        {/* Notifications */}

        <button
          className="
            relative
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            p-3
            transition
            hover:border-cyan-500
          "
        >

          <Bell size={20} className="text-white"/>

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"/>

        </button>

        {/* User */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            px-4
            py-2
          "
        >

          <UserCircle2
            size={44}
            className="text-cyan-400"
          />

          <div>

            <p className="font-semibold text-white">
              Abdullah Farhat
            </p>

            <p className="text-xs text-slate-400">
              Finance Manager
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}