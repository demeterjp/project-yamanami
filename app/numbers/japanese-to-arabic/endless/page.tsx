"use client";

import { useState, useEffect, useRef } from "react";
import { toKanjiNumber, randomInRange, digitRange } from "../../kanjiUtils";
import { HeartIcon } from "../../icons";

function randomNumberFor(digitLength: number): number {
  const [min, max] = digitRange(digitLength);
  return randomInRange(min, max);
}

export default function JapaneseToArabicEndlessPage() {
  const [phase, setPhase] = useState<"setup" | "playing" | "gameover">("setup");
  const [digitLength, setDigitLength] = useState(1);
  const [tierProgress, setTierProgress] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === "playing" && feedback === null) inputRef.current?.focus();
  }, [phase, current, feedback]);

  useEffect(() => {
    if (phase === "setup" || phase === "gameover") {
      const timer = setTimeout(() => {
        focusBtnRef.current?.focus();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  function startGame() {
    setDigitLength(1);
    setTierProgress(0);
    setHearts(3);
    setTotalCorrect(0);
    setCurrent(randomNumberFor(1));
    setInput("");
    setFeedback(null);
    setPhase("playing");
  }

  function handleSubmit() {
    if (feedback !== null) return;
    const isCorrect = Number(input) === current;

    if (isCorrect) {
      setFeedback("correct");
      setTotalCorrect((c) => c + 1);
      const newProgress = tierProgress + 1;

      setTimeout(() => {
        if (newProgress >= 5) {
          const nextLength = digitLength + 1;
          setDigitLength(nextLength);
          setTierProgress(0);
          setCurrent(randomNumberFor(nextLength));
        } else {
          setTierProgress(newProgress);
          setCurrent(randomNumberFor(digitLength));
        }
        setInput("");
        setFeedback(null);
      }, 600);
    } else {
      setFeedback("wrong");
      const newHearts = hearts - 1;

      setTimeout(() => {
        if (newHearts <= 0) {
          setHearts(0);
          setPhase("gameover");
        } else {
          setHearts(newHearts);
          setCurrent(randomNumberFor(digitLength));
          setInput("");
          setFeedback(null);
        }
      }, 1200);
    }
  }

  if (phase === "setup") {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-12 px-6">
        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-fuchsia-500/30 p-8">
          <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 flex items-center justify-center gap-3">
            <HeartIcon className="w-12 h-12 text-fuchsia-400" /> Survival Count
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-fuchsia-500/30 p-6 flex flex-col gap-3">
          <p className="text-center text-xl text-zinc-400">
            A number appears in kanji. Type the Arabic digits.
          </p>
          <p className="text-center text-xl text-zinc-400">
            5 correct in a row moves you to longer numbers. You have 3 lives.
          </p>
        </div>

        <button
          ref={focusBtnRef}
          onClick={startGame}
          className="w-full max-w-xl py-6 rounded-2xl bg-fuchsia-600 text-4xl font-bold hover:bg-fuchsia-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(217,70,239,0.5)]"
        >
          Start
        </button>

        <div className="w-full max-w-xl">
          <button
            onClick={() => window.history.back()}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-6 text-2xl font-bold text-zinc-300 transition-all duration-300 hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    );
  }

  if (phase === "gameover") {
    return (
      <div className="min-h-screen text-white flex items-center justify-center px-6">
        <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-fuchsia-500/30 flex flex-col items-center gap-6">
          <h1 className="text-7xl font-bold text-red-400">Game Over</h1>
          <p className="text-3xl">You reached {digitLength}-digit numbers</p>
          <p className="text-3xl">Total correct: {totalCorrect}</p>
          <button
            ref={focusBtnRef}
            onClick={startGame}
            className="bg-fuchsia-500 hover:bg-fuchsia-600 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold"
          >
            Try Again
          </button>
          <button
            onClick={() => window.history.back()}
            className="bg-zinc-800 hover:bg-zinc-700 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold border border-zinc-600 text-zinc-300 hover:text-red-500 hover:border-red-500"
          >
            ⬅ Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-6 px-6">
      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-fuchsia-500/20">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 flex items-center justify-center gap-3">
          <HeartIcon className="w-10 h-10 text-fuchsia-400" /> Survival Count
        </h1>
      </div>

      <div className="bg-zinc-900 border border-fuchsia-500/30 rounded-2xl px-8 py-4 flex gap-8 text-xl font-bold shadow-[0_0_15px_rgba(217,70,239,0.15)] flex-wrap justify-center items-center">
        <p>{digitLength}-digit</p>
        <p>{tierProgress} / 5</p>
        <p>Total correct: {totalCorrect}</p>
        <p className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <HeartIcon
              key={i}
              className={`w-7 h-7 transition-all ${
                i < hearts ? "text-fuchsia-500 drop-shadow-[0_0_6px_rgba(217,70,239,0.8)]" : "text-zinc-700"
              }`}
            />
          ))}
        </p>
      </div>

      <div className="w-full max-w-2xl min-h-[9rem] bg-zinc-900 border border-fuchsia-500/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.2)] px-4 py-6">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-center break-words leading-snug">
          {toKanjiNumber(current)}
        </span>
      </div>

      <input
        ref={inputRef}
        type="text"
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
            : "border-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.35)]"
        }`}
      />

      {feedback === "wrong" && (
        <p className="text-red-400 text-2xl font-bold">Correct answer: {current}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={feedback !== null}
        className="w-full max-w-xl py-5 rounded-2xl border border-fuchsia-500 text-fuchsia-400 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 transition shadow-[0_0_20px_rgba(217,70,239,0.3)] disabled:opacity-50"
      >
        Check
      </button>

      <div className="w-full max-w-2xl">
        <button
          onClick={() => window.history.back()}
          className="w-full bg-zinc-900 border border-zinc-700 rounded-2xl py-4 text-2xl font-bold text-zinc-300 transition-all duration-300 hover:text-red-500 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:scale-105 active:scale-95"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );
}