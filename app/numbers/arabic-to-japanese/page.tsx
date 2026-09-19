"use client";

import Link from "next/link";
import { HeartIcon } from "../icons";

export default function ArabicToJapaneseModePage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-8 pb-32">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-orange-500/30 shadow-[0_0_25px_rgba(249,115,22,0.3)]">
        <h1 className="text-5xl font-bold text-orange-400 text-center">
          Arabic to Japanese
        </h1>
      </div>

      <Link
        href="/numbers/arabic-to-japanese/digits"
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left border-2 border-transparent hover:border-orange-500 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-orange-400">◆ Digit Length</h2>
        <p className="text-zinc-400 text-xl">
          Choose how many digits (1 to 10). Type the romaji reading for 10 numbers.
        </p>
      </Link>

      <Link
        href="/numbers/arabic-to-japanese/endless"
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left border-2 border-transparent hover:border-amber-500 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-amber-400 flex items-center gap-2">
          <HeartIcon className="w-8 h-8" /> Endless
        </h2>
        <p className="text-zinc-400 text-xl">
          Type the reading in romaji. 3 lives — numbers get longer every 5 correct in a row.
        </p>
      </Link>

      <button
        onClick={() => (window.location.href = "/numbers")}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[670px] py-5 bg-zinc-900 border border-zinc-700 rounded-2xl text-zinc-300 text-xl font-bold transition-all duration-300 hover:text-red-400 hover:border-red-400 hover:shadow-[0_0_20px_rgba(248,113,113,0.5)] hover:scale-105 active:scale-95"
      >
        ⬅ Back
      </button>

    </div>
  );
}