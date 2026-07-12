import "./globals.css";
import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Financial Advisor ERP",
  description:
    "Financial Advisor ERP - Aviation Financial Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-[#07111F]
          text-white
          antialiased
          overflow-hidden
        "
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}