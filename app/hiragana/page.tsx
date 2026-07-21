"use client";

import Link from "next/link";
import { useState } from "react";

export default function HiraganaPage() {
  const [kanaPage, setKanaPage] = useState(0);
  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-10">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-6 border border-purple-500/30">
  <h1 className="text-6xl font-bold text-purple-300 text-center">
    Hiragana
  </h1>
</div>

      <div className="flex flex-col gap-2 w-full max-w-2xl">

        <Link
          href="/hiragana/easy"
          className="bg-green-900 rounded-3xl p-8 border-2 border-transparent hover:border-green-400 hover:scale-105 transition"
        >
          <h2 className="text-5xl font-bold">あ Easy</h2>
          <p className="text-zinc-300 mt-3 text-xl">
            Basic hiragana characters.
          </p>
        </Link>

        <Link
          href="/hiragana/medium"
          className="bg-yellow-800 rounded-3xl p-8 border-2 border-transparent hover:border-yellow-400 hover:scale-105 transition"
        >
          <h2 className="text-5xl font-bold">あ Medium</h2>
          <p className="text-zinc-300 mt-3 text-xl">
            Basic hiragana + dakuten and handakuten.
          </p>
        </Link>

        <Link
          href="/hiragana/hard"
          className="bg-red-900 rounded-3xl p-8 border-2 border-transparent hover:border-red-400 hover:scale-105 transition"
        >
          <h2 className="text-5xl font-bold">あ Hard</h2>
          <p className="text-zinc-300 mt-3 text-xl">
            All hiragana, including yōon combinations.
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