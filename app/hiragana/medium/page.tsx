"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function HiraganaPage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState("");

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-10 gap-10">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-orange-500/30 shadow-[0_0_25px_rgba(249,115,22,0.3)]">
        <h1 className="text-7xl font-bold text-orange-400 text-center">
          Hiragana Medium
        </h1>
      </div>

      {/* NORMAL */}
      <div
        onClick={() => setSelectedMode("normal")}
        style={{
          border: "2px solid transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "2px solid #22c55e";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "2px solid transparent";
        }}
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-left text-green-400">
          ◆ Normal
        </h2>

        <p className="text-zinc-400 text-xl">
          Answer a fixed number of selected kana with no time limit.
        </p>

        {selectedMode === "normal" && (
          <div className="flex gap-4 mt-4">
            <Link
              href="/hiragana/medium/normal?questions=10"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-2xl font-bold"
            >
              10 Questions
            </Link>

            <Link
              href="/hiragana/medium/normal?questions=20"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl text-2xl font-bold"
            >
              20 Questions
            </Link>
          </div>
        )}
      </div>

      {/* KANA RUSH */}
      <div
        onClick={() => setSelectedMode("time")}
        style={{
          border: "2px solid transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "2px solid #facc15";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "2px solid transparent";
        }}
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-left text-yellow-400">
          ⏱ Kana Rush
        </h2>

        <p className="text-zinc-400 text-xl">
          Type as many kana as possible before time runs out.
        </p>

        {selectedMode === "time" && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => router.push("/hiragana/medium/kanarush?time=15")}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl text-2xl font-bold"
            >
              15s
            </button>

            <button
              onClick={() => router.push("/hiragana/medium/kanarush?time=30")}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl text-2xl font-bold"
            >
              30s
            </button>

            <button
              onClick={() => router.push("/hiragana/medium/kanarush?time=60")}
              className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl text-2xl font-bold"
            >
              60s
            </button>
          </div>
        )}
      </div>

      {/* SPEED */}
      <div
        onClick={() => router.push("/hiragana/medium/speed")}
        style={{
          border: "2px solid transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = "2px solid #ef4444";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = "2px solid transparent";
        }}
        className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 flex flex-col gap-4 text-left cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        <h2 className="text-4xl font-bold text-left text-red-500">
          ⚡ Speed
        </h2>

        <p className="text-zinc-400 text-xl">
          Type all kana correctly as fast as possible.
        </p>
      </div>

      <button
        onClick={() => (window.location.href = "/hiragana")}
        className="
          fixed
          bottom-6
          left-1/2
          -translate-x-1/2
          z-50
          w-[670px]
          py-5
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
  );
}