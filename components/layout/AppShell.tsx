"use client";

import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import AppHeader from "./AppHeader";

interface Props {
  children: ReactNode;
}

export default function AppShell({ children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#07111F]">

      {/* Sidebar */}

      <aside className="z-30">
        <AppSidebar />
      </aside>

      {/* Content */}

      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Header */}

        <header className="border-b border-slate-800 bg-[#0D1728]">
          <AppHeader />
        </header>

        {/* Main */}

        <main className="flex-1 overflow-y-auto bg-[#07111F] p-8">

          <div className="mx-auto max-w-[1800px]">
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}