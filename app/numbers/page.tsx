"use client";

import Link from "next/link";

export default function NumbersPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-10">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-6 border border-orange-500/30">
        <h1 className="text-6xl font-bold text-red-500 text-center">
          数字 Numbers
        </h1>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-2xl">

        <Link
          href="/numbers/arabic-to-japanese"
          className="bg-gradient-to-br from-orange-500 to-rose-500 rounded-3xl p-8 border-2 border-transparent hover:border-white/60 hover:scale-105 transition shadow-[0_0_25px_rgba(249,115,22,0.35)]"
        >
          <h2 className="text-5xl font-bold">1 to 一</h2>
          <p className="text-white/90 mt-3 text-xl">
            Arabic numerals to Japanese.
          </p>
        </Link>

        <Link
          href="/numbers/japanese-to-arabic"
          className="bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl p-8 border-2 border-transparent hover:border-white/60 hover:scale-105 transition shadow-[0_0_25px_rgba(217,70,239,0.35)]"
        >
          <h2 className="text-5xl font-bold">一 to 1</h2>
          <p className="text-white/90 mt-3 text-xl">
            Japanese to Arabic numerals.
          </p>
        </Link>

        <button
          onClick={() => window.location.href = "/"}
          className="
            mt-10
            px-10 py-4
            bg-zinc-900
            border border-zinc-700
            rounded-2xl
            text-zinc-300
            text-xl
            font-bold
            transition-all duration-300
            hover:text-red-400
            hover:border-red-400
            hover:shadow-[0_0_20px_rgba(248,113,113,0.5)]
            hover:scale-105
            active:scale-95
          "
        >
          Back
        </button>

      </div>

    </div>
  );
}