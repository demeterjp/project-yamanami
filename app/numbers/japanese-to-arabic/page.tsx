"use client";

import Link from "next/link";
import { HeartIcon } from "../icons";

export default function JapaneseToArabicModePage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-8">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-violet-500/30 shadow-[0_0_25px_rgba(139,92,246,0.3)]">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
          Japanese to Arabic
        </h1>
      </div>

      <Link
        href="/numbers/japanese-to-arabic/digits"
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left border-2 border-transparent hover:border-violet-500 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-violet-400">◆ Custom Drill</h2>
        <p className="text-zinc-400 text-xl">
          Choose how many digits (1 to 10). 10 random unique numbers, no time limit.
        </p>
      </Link>

      <Link
        href="/numbers/japanese-to-arabic/endless"
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left border-2 border-transparent hover:border-fuchsia-500 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-fuchsia-400 flex items-center gap-2">
          <HeartIcon className="w-8 h-8" /> Survival Count
        </h2>
        <p className="text-zinc-400 text-xl">
          Type the reading in romaji. 3 lives — numbers get longer every 5 correct in a row.
        </p>
      </Link>

      <button
        onClick={() => (window.location.href = "/numbers")}
        className="w-full max-w-2xl mt-6 py-5 bg-zinc-900 border border-zinc-700 rounded-2xl text-zinc-300 text-xl font-bold transition-all duration-300 hover:text-red-400 hover:border-red-400 hover:shadow-[0_0_20px_rgba(248,113,113,0.5)] hover:scale-105 active:scale-95"
      >
        Back
      </button>

    </div>
  );
}