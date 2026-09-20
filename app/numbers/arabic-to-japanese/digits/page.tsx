"use client";

import { useState, useEffect, useRef } from "react";
import { toKanjiNumber, toRomaji, normalizeRomaji, generateUniqueNumbers } from "../../kanjiUtils";

export default function ArabicToJapaneseDigitsPage() {
  const [phase, setPhase] = useState<"setup" | "playing" | "results">("setup");
  const [digitLength, setDigitLength] = useState(2);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => setResult(""), 1000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  useEffect(() => {
    if (phase === "playing") inputRef.current?.focus();
  }, [phase, index]);

  function startGame() {
    const nums = generateUniqueNumbers(10, digitLength);
    setNumbers(nums);
    setIndex(0);
    setScore(0);
    setAnswer("");
    setResult("");
    setPhase("playing");
  }

  function checkAnswer() {
    const current = numbers[index];
    const correctKanji = toKanjiNumber(current);

    if (answer === correctKanji) {
      setScore((s) => s + 1);
      setResult("Correct");
    } else {
      setResult("Wrong");
    }

    if (index + 1 >= numbers.length) {
      setPhase("results");
      return;
    }

    setIndex((i) => i + 1);
    setAnswer("");
  }

  if (phase === "setup") {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-10 px-6">
        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-orange-500/30 p-8">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
            ◆ Custom Drill ◆
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-orange-500/30 p-8 flex flex-col items-center gap-6">
          <p className="text-zinc-400 text-xl text-center">How many digits should the numbers have?</p>
          <span className="text-7xl font-bold text-orange-400">{digitLength}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={digitLength}
            onChange={(e) => setDigitLength(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between w-full text-zinc-500 text-sm px-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <button
          autoFocus
          onClick={startGame}
          className="w-full max-w-xl py-6 rounded-2xl bg-orange-600 text-4xl font-bold hover:bg-orange-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(249,115,22,0.5)]"
        >
          Start
        </button>

        <div className="w-full max-w-xl">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-6 text-2xl font-bold text-zinc-300 transition-all duration-300 hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    return (
      <div className="min-h-screen text-white flex items-center justify-center px-6">
        <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-orange-500/30 flex flex-col items-center gap-6">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">Complete!</h1>
          <p className="text-4xl font-bold text-white">Score: {score} / {numbers.length}</p>
          <button
            onClick={startGame}
            className="bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold"
          >
            Retry
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-zinc-800 hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold border border-zinc-600 text-zinc-300 hover:text-red-500 hover:border-red-500"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const current = numbers[index];

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-8 px-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-orange-500/20">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400">
          ◆ Custom Drill ◆
        </h1>
      </div>

      <div className="w-[500px] max-w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-orange-400 transition-all duration-300"
          style={{ width: `${(index / numbers.length) * 100}%` }}
        />
      </div>

      <div className="bg-zinc-900 border border-orange-500/30 rounded-2xl px-8 py-4 flex gap-12 text-2xl font-bold shadow-[0_0_15px_rgba(249,115,22,0.15)]">
        <p>Question: {index + 1}/{numbers.length}</p>
        <p>Score: {score}</p>
      </div>

      <div className="w-full max-w-2xl min-h-[9rem] bg-zinc-900 border border-orange-500/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.2)] px-4 py-6">
        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-center break-words">{current}</span>
        {result && (
          <p
            className={`mt-4 text-3xl font-bold h-10 ${
              result === "Correct"
                ? "text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.9)]"
                : "text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]"
            }`}
          >
            {result === "Correct" ? "Correct!" : "Wrong!"}
          </p>
        )}
      </div>

      <input
        type="text"
        ref={inputRef}
        value={answer}
        onKeyDown={(e) => {
          if (e.key === "Enter") checkAnswer();
        }}
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          if (normalizeRomaji(value) === toRomaji(current)) {
            setAnswer(toKanjiNumber(current));
          } else {
            setAnswer(value);
          }
        }}
        placeholder="Type romaji..."
        className="w-full max-w-md px-6 py-4 rounded-2xl text-3xl text-center bg-zinc-900 text-white border border-purple-500 outline-none transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.35)] focus:shadow-[0_0_22px_rgba(168,85,247,0.8)] focus:border-purple-400"
      />

      <button
        onClick={checkAnswer}
        className="w-full max-w-xl py-5 rounded-2xl border border-orange-500 text-orange-400 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 transition shadow-[0_0_20px_rgba(249,115,22,0.3)]"
      >
        Check
      </button>

      <div className="w-full max-w-2xl">
        <button
          onClick={() => window.history.back()}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-4 text-2xl font-bold text-zinc-300 transition-all duration-300 hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95"
        >
          Back
        </button>
      </div>
    </div>
  );
}