"use client";

import { useState, useEffect, useRef } from "react";

const hiragana = [
  { kana: "あ", romaji: "a" },
  { kana: "い", romaji: "i" },
  { kana: "う", romaji: "u" },
  { kana: "え", romaji: "e" },
  { kana: "お", romaji: "o" },

  { kana: "か", romaji: "ka" },
  { kana: "き", romaji: "ki" },
  { kana: "く", romaji: "ku" },
  { kana: "け", romaji: "ke" },
  { kana: "こ", romaji: "ko" },

  { kana: "さ", romaji: "sa" },
  { kana: "し", romaji: "shi" },
  { kana: "す", romaji: "su" },
  { kana: "せ", romaji: "se" },
  { kana: "そ", romaji: "so" },

  { kana: "た", romaji: "ta" },
  { kana: "ち", romaji: "chi" },
  { kana: "つ", romaji: "tsu" },
  { kana: "て", romaji: "te" },
  { kana: "と", romaji: "to" },

  { kana: "な", romaji: "na" },
  { kana: "に", romaji: "ni" },
  { kana: "ぬ", romaji: "nu" },
  { kana: "ね", romaji: "ne" },
  { kana: "の", romaji: "no" },

  { kana: "は", romaji: "ha" },
  { kana: "ひ", romaji: "hi" },
  { kana: "ふ", romaji: "fu" },
  { kana: "へ", romaji: "he" },
  { kana: "ほ", romaji: "ho" },

  { kana: "ま", romaji: "ma" },
  { kana: "み", romaji: "mi" },
  { kana: "む", romaji: "mu" },
  { kana: "め", romaji: "me" },
  { kana: "も", romaji: "mo" },

  { kana: "や", romaji: "ya" },
  { kana: "ゆ", romaji: "yu" },
  { kana: "よ", romaji: "yo" },

  { kana: "ら", romaji: "ra" },
  { kana: "り", romaji: "ri" },
  { kana: "る", romaji: "ru" },
  { kana: "れ", romaji: "re" },
  { kana: "ろ", romaji: "ro" },

  { kana: "わ", romaji: "wa" },
  { kana: "を", romaji: "wo" },
  { kana: "ん", romaji: "nn" },
];

const mediumExtra = [
  { kana: "が", romaji: "ga" },
  { kana: "ぎ", romaji: "gi" },
  { kana: "ぐ", romaji: "gu" },
  { kana: "げ", romaji: "ge" },
  { kana: "ご", romaji: "go" },

  { kana: "ざ", romaji: "za" },
  { kana: "じ", romaji: "ji" },
  { kana: "ず", romaji: "zu" },
  { kana: "ぜ", romaji: "ze" },
  { kana: "ぞ", romaji: "zo" },

  { kana: "だ", romaji: "da" },
  { kana: "ぢ", romaji: "dji" },
  { kana: "づ", romaji: "dzu" },
  { kana: "で", romaji: "de" },
  { kana: "ど", romaji: "do" },

  { kana: "ば", romaji: "ba" },
  { kana: "び", romaji: "bi" },
  { kana: "ぶ", romaji: "bu" },
  { kana: "べ", romaji: "be" },
  { kana: "ぼ", romaji: "bo" },

  { kana: "ぱ", romaji: "pa" },
  { kana: "ぴ", romaji: "pi" },
  { kana: "ぷ", romaji: "pu" },
  { kana: "ぺ", romaji: "pe" },
  { kana: "ぽ", romaji: "po" },
];

function getRandomKana(currentKana?: string) {
  const weightedPool = [
    ...hiragana,

    ...mediumExtra,
    ...mediumExtra,
    ...mediumExtra,
    ...mediumExtra,
  ];

  let next;

  do {
    next =
      weightedPool[
        Math.floor(Math.random() * weightedPool.length)
      ];
  } while (next.kana === currentKana);

  return next;
}

export default function KanaRushPage() {
  const selectedTime = 30;

  const [started, setStarted] = useState(false);

  const [timeLeft, setTimeLeft] =
    useState(selectedTime);

  const [score, setScore] = useState(0);

  const [answer, setAnswer] = useState("");

  const [wrong, setWrong] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  const [currentKana, setCurrentKana] =
    useState(getRandomKana());

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!started || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [started, gameOver]);

  useEffect(() => {
    if (started) {
      inputRef.current?.focus();
    }
  }, [started, currentKana]);

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;

    if (!started) {
      setStarted(true);
      return;
    }

    if (gameOver) {
      window.location.reload();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [started, gameOver]);

  function submitAnswer() {
    const value = answer.trim().toLowerCase();

    if (
      value === currentKana.romaji ||
      value === currentKana.kana
    ) {
      setScore((prev) => prev + 1);
      setCurrentKana(getRandomKana());
      setAnswer("");
      setWrong(false);
      return;
    }

    setWrong(true);

    setTimeout(() => {
      setWrong(false);
    }, 500);
  }

    if (!started) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-16 px-6">

        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-yellow-500/30 p-8">
          <h1 className="text-5xl font-bold text-center text-yellow-400">
            ⏱ Kana Rush Medium ⏱
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-yellow-500/30 p-6">
          <p className="text-center text-3xl font-bold text-yellow-400">
            Time Limit: {selectedTime}s
          </p>

          <p className="text-center text-xl text-zinc-400 mt-4">
            Type as many kana as possible before time runs out.
          </p>
        </div>

        <button
          onClick={() => setStarted(true)}
          className="
            w-full max-w-xl
            py-6
            rounded-2xl
            bg-green-500
            text-4xl
            font-bold
            hover:bg-green-600
            hover:scale-105
            transition-all
            shadow-[0_0_30px_rgba(34,197,94,0.6)]
          "
        >
          Start
        </button>

        <div className="w-full max-w-xl">
          <button
            onClick={() => window.history.back()}
            className="
              w-full
              bg-zinc-900
              border
              border-zinc-700
              rounded-2xl
              py-6
              text-2xl
              font-bold
              text-zinc-300
              transition-all duration-300
              hover:text-red-500
              hover:border-red-500
              hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
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
  
  if (gameOver) {
    return (
      <div className="min-h-screen text-white flex items-center justify-center">

        <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-yellow-500/30 flex flex-col items-center gap-8">

          <h1 className="text-7xl font-bold text-yellow-400">
            Time's Up!
          </h1>

          <p className="text-4xl font-bold text-white">
            Score: {score}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="
              bg-yellow-500
              hover:bg-yellow-600
              hover:scale-105
              active:scale-95
              transition-all
              px-20
              py-4
              rounded-2xl
              text-2xl
              font-bold
            "
          >
            Retry
          </button>

          <button
            onClick={() => window.history.back()}
            className="
              bg-zinc-800
              hover:bg-zinc-700
              hover:scale-105
              active:scale-95
              transition-all
              px-20
              py-4
              rounded-2xl
              text-2xl
              font-bold
              border
              border-zinc-600
              text-zinc-300
              hover:text-red-500
              hover:border-red-500
            "
          >
            ⬅ Back
          </button>

        </div>

      </div>
    );
  }

    return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-8">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-yellow-500/20">
        <h1 className="text-5xl font-bold text-yellow-400 text-center">
          ⏱ Kana Rush Medium ⏱
        </h1>
      </div>

      <div
        className="
          bg-zinc-900
          border
          border-yellow-500/30
          rounded-2xl
          px-8
          py-4
          flex
          gap-12
          text-2xl
          font-bold
          shadow-[0_0_15px_rgba(250,204,21,0.15)]
        "
      >
        <p>Time: {timeLeft}s</p>
        <p>Score: {score}</p>
      </div>

      <div
        className="
          w-72
          h-72
          bg-zinc-900
          border
          border-yellow-500/40
          rounded-3xl
          flex
          items-center
          justify-center
          shadow-[0_0_30px_rgba(250,204,21,0.2)]
        "
      >
        <span
  className={`text-9xl font-bold ${
    wrong
      ? "text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
      : "text-white"
  }`}
>
  {currentKana.kana}
</span>

      </div>

      <input
        ref={inputRef}
        type="text"
        value={answer}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitAnswer();
          }
        }}
        onChange={(e) => {
  const value = e.target.value.toLowerCase();

const found = [...hiragana, ...mediumExtra].find(
  (h) => h.romaji === value
);

if (found) {
  setAnswer(found.kana);
} else {
  setAnswer(value);
}

if (currentKana.romaji.startsWith(value)) {
  setWrong(false);

  if (value === currentKana.romaji) {
    setScore((prev) => prev + 1);
    setCurrentKana(getRandomKana(currentKana.kana));
    setAnswer("");
  }
} else {
  setWrong(true);
}
}}
        placeholder="Type romaji..."
        className={`
          w-[400px]
          px-6
          py-4
          rounded-2xl
          text-3xl
          bg-zinc-900
          text-white
          border
          outline-none
          transition-all
          duration-300
          ${
            wrong
              ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]"
              : "border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.35)]"
          }
        `}
      />

      <div className="w-full max-w-2xl">
        <button
          onClick={() => window.history.back()}
          className="
            w-full
            bg-zinc-900
            border
            border-zinc-700
            rounded-2xl
            py-4
            text-2xl
            font-bold
            text-zinc-300
            transition-all duration-300
            hover:text-red-500
            hover:border-red-500
            hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
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