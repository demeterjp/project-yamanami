"use client";

import Link from "next/link";

export default function KanaFallPage() {
  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-10">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-6 border border-cyan-500/30">
        <h1 className="text-6xl font-bold text-cyan-300 text-center">
          Kana Fall
        </h1>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-2xl">

        <Link
          href="/kana-fall/hiragana"
          className="bg-emerald-900 rounded-3xl p-8 border-2 border-transparent hover:border-emerald-400 hover:scale-105 transition"
        >
          <h2 className="text-5xl font-bold">あ Hiragana</h2>
          <p className="text-zinc-300 mt-3 text-xl">
            Falling hiragana characters.
          </p>
        </Link>

        <Link
          href="/kana-fall/katakana"
          className="bg-purple-900 rounded-3xl p-8 border-2 border-transparent hover:border-purple-400 hover:scale-105 transition"
        >
          <h2 className="text-5xl font-bold">ア Katakana</h2>
          <p className="text-zinc-300 mt-3 text-xl">
            Falling katakana characters.
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
          ⬅ Back
        </button>

      </div>

    </div>
  );
}