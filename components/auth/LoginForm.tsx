"use client";

export default function LoginForm() {
  return (
    <form className="space-y-6">

      <div>

        <label className="mb-2 block text-sm text-slate-300">
          Username
        </label>

        <input
          type="text"
          placeholder="Enter username"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            px-5
            py-3
            text-white
            outline-none
            focus:border-cyan-500
          "
        />

      </div>

      <div>

        <label className="mb-2 block text-sm text-slate-300">
          Password
        </label>

        <input
          type="password"
          placeholder="Enter password"
          className="
            w-full
            rounded-xl
            border
            border-slate-700
            bg-[#07111F]
            px-5
            py-3
            text-white
            outline-none
            focus:border-cyan-500
          "
        />

      </div>

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm text-slate-300">

          <input type="checkbox" />

          Remember me

        </label>

        <button
          type="button"
          className="text-sm text-cyan-400"
        >
          Forgot Password?
        </button>

      </div>

      <button
        className="
          w-full
          rounded-xl
          bg-cyan-500
          py-3
          text-lg
          font-bold
          text-black
          transition
          hover:bg-cyan-400
        "
      >
        LOGIN
      </button>

      <div className="pt-4 text-center text-sm text-slate-400">

        English | العربية

      </div>

    </form>
  );
}