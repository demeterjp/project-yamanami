"use client";

import { useState, useEffect, useRef } from "react";
import { toKanjiNumber, toRomaji, normalizeRomaji, generateUniqueNumbers } from "../../kanjiUtils";
import { HeartIcon } from "../../icons";

export default function ArabicToJapaneseEndlessPage() {
  const [phase, setPhase] = useState<"setup" | "playing" | "gameover">("setup");
  const [digitLength, setDigitLength] = useState(1);
  const [tierProgress, setTierProgress] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [tierNumbers, setTierNumbers] = useState<number[]>([]);
  const [tierIndex, setTierIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<"" | "Correct" | "Wrong">("");
  const [locked, setLocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const focusBtnRef = useRef<HTMLButtonElement>(null);

  const current = tierNumbers[tierIndex] ?? 0;

  useEffect(() => {
    if (phase === "playing" && !locked) inputRef.current?.focus();
  }, [phase, current, locked]);

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
    setTierNumbers(generateUniqueNumbers(5, 1));
    setTierIndex(0);
    setAnswer("");
    setResult("");
    setLocked(false);
    setPhase("playing");
  }

  function advanceWithinTier(currentDigitLength: number) {
    if (tierIndex + 1 >= tierNumbers.length) {
      setTierNumbers(generateUniqueNumbers(5, currentDigitLength));
      setTierIndex(0);
    } else {
      setTierIndex(tierIndex + 1);
    }
  }

  function checkAnswer() {
    if (locked) return;
    const isCorrect = answer === toKanjiNumber(current);
    setLocked(true);

    if (isCorrect) {
      setResult("Correct");
      setTotalCorrect((c) => c + 1);
      const newProgress = tierProgress + 1;

      setTimeout(() => {
        if (newProgress >= 5) {
          const nextLength = digitLength + 1;
          setDigitLength(nextLength);
          setTierProgress(0);
          setTierNumbers(generateUniqueNumbers(5, nextLength));
          setTierIndex(0);
        } else {
          setTierProgress(newProgress);
          advanceWithinTier(digitLength);
        }
        setAnswer("");
        setResult("");
        setLocked(false);
      }, 600);
    } else {
      setResult("Wrong");
      const newHearts = hearts - 1;

      setTimeout(() => {
        if (newHearts <= 0) {
          setHearts(0);
          setPhase("gameover");
        } else {
          setHearts(newHearts);
          advanceWithinTier(digitLength);
          setAnswer("");
          setResult("");
          setLocked(false);
        }
      }, 900);
    }
  }

  if (phase === "setup") {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-12 px-6">
        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-rose-500/30 p-8">
          <h1 className="text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center gap-3">
            <HeartIcon className="w-12 h-12 text-rose-400" /> Survival Count
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-rose-500/30 p-6 flex flex-col gap-3">
          <p className="text-center text-xl text-zinc-400">
            Type the reading in romaji — it turns into kanji once it&apos;s correct.
          </p>
          <p className="text-center text-xl text-zinc-400">
            5 correct in a row moves you to longer numbers. You have 3 lives.
          </p>
        </div>

        <button
          ref={focusBtnRef}
          onClick={startGame}
          className="w-full max-w-xl py-6 rounded-2xl bg-rose-600 text-4xl font-bold hover:bg-rose-500 hover:scale-105 transition-all shadow-[0_0_30px_rgba(244,63,94,0.5)]"
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
        <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-rose-500/30 flex flex-col items-center gap-6">
          <h1 className="text-7xl font-bold text-red-400">Game Over</h1>
          <p className="text-3xl">You reached {digitLength}-digit numbers</p>
          <p className="text-3xl">Total correct: {totalCorrect}</p>
          <button
            ref={focusBtnRef}
            onClick={startGame}
            className="bg-rose-500 hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all px-20 py-4 rounded-2xl text-2xl font-bold"
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
      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-rose-500/20">
        <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 flex items-center justify-center gap-3">
          <HeartIcon className="w-10 h-10 text-rose-400" /> Survival Count
        </h1>
      </div>

      <div className="bg-zinc-900 border border-rose-500/30 rounded-2xl px-8 py-4 flex gap-8 text-xl font-bold shadow-[0_0_15px_rgba(244,63,94,0.15)] flex-wrap justify-center items-center">
        <p>{digitLength}-digit</p>
        <p>{tierProgress} / 5</p>
        <p>Total correct: {totalCorrect}</p>
        <p className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <HeartIcon
              key={i}
              className={`w-7 h-7 transition-all ${
                i < hearts ? "text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)]" : "text-zinc-700"
              }`}
            />
          ))}
        </p>
      </div>

      <div className="w-full max-w-2xl min-h-[9rem] bg-zinc-900 border border-rose-500/40 rounded-3xl flex flex-col items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.2)] px-4 py-6">
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
        ref={inputRef}
        type="text"
        value={answer}
        disabled={locked}
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
        className="w-full max-w-md px-6 py-4 rounded-2xl text-3xl text-center bg-zinc-900 text-white border border-purple-500 outline-none transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.35)] focus:shadow-[0_0_22px_rgba(168,85,247,0.8)] focus:border-purple-400 disabled:opacity-50"
      />

      <button
        onClick={checkAnswer}
        disabled={locked}
        className="w-full max-w-xl py-5 rounded-2xl border border-rose-500 text-rose-400 text-2xl font-bold bg-zinc-900 hover:bg-zinc-800 transition shadow-[0_0_20px_rgba(244,63,94,0.3)] disabled:opacity-50"
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