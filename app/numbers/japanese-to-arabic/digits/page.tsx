"use client";

import { useState, useEffect, useRef } from "react";
import { toKanjiNumber, generateUniqueNumbers } from "../../kanjiUtils";

export default function JapaneseToArabicDigitsPage() {
  const [phase, setPhase] = useState<"setup" | "playing" | "results">("setup");
  const [digitLength, setDigitLength] = useState(2);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (phase === "playing" && feedback === null) inputRef.current?.focus();
  }, [phase, index, feedback]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return;
      if (phase === "setup" || phase === "results") startGame();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function startGame() {
    const nums = generateUniqueNumbers(10, digitLength);
    setNumbers(nums);
    setIndex(0);
    setCorrectCount(0);
    setInput("");
    setFeedback(null);
    setPhase("playing");
  }

  function handleSubmit() {
    if (feedback !== null) return;
    const isCorrect = Number(input) === numbers[index];
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setCorrectCount((c) => c + 1);

    setTimeout(() => {
      if (index + 1 < numbers.length) {
        setIndex((i) => i + 1);
        setInput("");
        setFeedback(null);
      } else {
        setPhase("results");
      }
    }, 700);
  }

  if (phase === "setup") {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-10 px-6">
        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-violet-500/30 p-8">
          <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            ◆ Custom Drill ◆
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-violet-500/30 p-8 flex flex-col items-center gap-6">
          <p className="text-zinc-400 text-xl text-center">How many digits should the numbers have?</p>
          <span className="text-7xl font-bold text-violet-400">{digitLength}</span>
          <input
            type="range"
            min={1}
            max={10}
            value={digitLength}
            onChange={(e) => setDigitLength(Number(e.target.value))}
            className="w-full accent-violet-500"
          />
          <div className="flex justify-between w-full text-zinc-500 text-sm px-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <button
          onClick={startGame}
          className="w-full max-w-xl py-6 rounded-2xl bg-violet-600 text-4xl font-bold hover:bg-violet-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(139,92,246,0.5)]"
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
        <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-violet-500/30 flex flex-col items-center gap-6">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Complete!</h1>
          <p className="text-4xl font-bold text-white">Score: {correctCount} / {numbers.length}</p>
          <button
            onClick={startGame}
            className="bg-violet-500 hover:bg-violet-600 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold"
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

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-8 px-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-violet-500/20">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
          ◆ Custom Drill ◆
        </h1>
      </div>

      <div className="w-[500px] max-w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-violet-400 transition-all duration-300"
          style={{ width: `${(index / numbers.length) * 100}%` }}
        />
      </div>

      <div className="bg-zinc-900 border border-violet-500/30 rounded-2xl px-8 py-4 flex gap-12 text-2xl font-bold shadow-[0_0_15px_rgba(139,92,246,0.15)]">
        <p>Question: {index + 1}/{numbers.length}</p>
        <p>Score: {correctCount}</p>
      </div>

      <div className="w-full max-w-2xl min-h-[9rem] bg-zinc-900 border border-violet-500/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.2)] px-4 py-6">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-center break-words leading-snug">
          {toKanjiNumber(numbers[index])}
        </span>
      </div>

      <input
        type="text"
        ref={inputRef}
        inputMode="numeric"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={feedback !== null}
        placeholder="Type the number..."
        className={`w-full max-w-md px-6 py-4 rounded-2xl text-3xl text-center bg-zinc-900 text-white border outline-none transition-all duration-300 ${
          feedback === "correct"
            ? "border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            : feedback === "wrong"
            ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
            : "border-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.35)]"
        }`}
      />

      {feedback === "wrong" && (
        <p className="text-red-400 text-2xl font-bold">Correct answer: {numbers[index]}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={feedback !== null}
        className="w-full max-w-xl py-5 rounded-2xl border border-violet-500 text-violet-400 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 transition shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50"
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