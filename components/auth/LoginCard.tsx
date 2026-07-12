"use client";

import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div
      className="
      w-[480px]
      rounded-3xl
      border
      border-slate-700
      bg-white/10
      p-10
      shadow-2xl
      backdrop-blur-xl
    "
    >
      <div className="mb-10 text-center">

        <h1 className="text-4xl font-bold text-cyan-400">
          Financial Advisor ERP
        </h1>

        <p className="mt-3 text-slate-300">
          Aviation Financial Management System
        </p>

      </div>

      <LoginForm />
    </div>
  );
}
