"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const katakana = [
  { kana: "ア", romaji: "a" },
  { kana: "イ", romaji: "i" },
  { kana: "ウ", romaji: "u" },
  { kana: "エ", romaji: "e" },
  { kana: "オ", romaji: "o" },

  { kana: "カ", romaji: "ka" },
  { kana: "キ", romaji: "ki" },
  { kana: "ク", romaji: "ku" },
  { kana: "ケ", romaji: "ke" },
  { kana: "コ", romaji: "ko" },

  { kana: "サ", romaji: "sa" },
  { kana: "シ", romaji: "shi" },
  { kana: "ス", romaji: "su" },
  { kana: "セ", romaji: "se" },
  { kana: "ソ", romaji: "so" },

  { kana: "タ", romaji: "ta" },
  { kana: "チ", romaji: "chi" },
  { kana: "ツ", romaji: "tsu" },
  { kana: "テ", romaji: "te" },
  { kana: "ト", romaji: "to" },

  { kana: "ナ", romaji: "na" },
  { kana: "ニ", romaji: "ni" },
  { kana: "ヌ", romaji: "nu" },
  { kana: "ネ", romaji: "ne" },
  { kana: "ノ", romaji: "no" },

  { kana: "ハ", romaji: "ha" },
  { kana: "ヒ", romaji: "hi" },
  { kana: "フ", romaji: "fu" },
  { kana: "ヘ", romaji: "he" },
  { kana: "ホ", romaji: "ho" },

  { kana: "マ", romaji: "ma" },
  { kana: "ミ", romaji: "mi" },
  { kana: "ム", romaji: "mu" },
  { kana: "メ", romaji: "me" },
  { kana: "モ", romaji: "mo" },

  { kana: "ヤ", romaji: "ya" },
  { kana: "ユ", romaji: "yu" },
  { kana: "ヨ", romaji: "yo" },

  { kana: "ラ", romaji: "ra" },
  { kana: "リ", romaji: "ri" },
  { kana: "ル", romaji: "ru" },
  { kana: "レ", romaji: "re" },
  { kana: "ロ", romaji: "ro" },

  { kana: "ワ", romaji: "wa" },
  { kana: "ヲ", romaji: "wo" },
  { kana: "ン", romaji: "nn" },
];

const mediumExtra = [
  { kana: "ガ", romaji: "ga" },
  { kana: "ギ", romaji: "gi" },
  { kana: "グ", romaji: "gu" },
  { kana: "ゲ", romaji: "ge" },
  { kana: "ゴ", romaji: "go" },

  { kana: "ザ", romaji: "za" },
  { kana: "ジ", romaji: "ji" },
  { kana: "ズ", romaji: "zu" },
  { kana: "ゼ", romaji: "ze" },
  { kana: "ゾ", romaji: "zo" },

  { kana: "ダ", romaji: "da" },
  { kana: "ヂ", romaji: "dji" },
  { kana: "ヅ", romaji: "dzu" },
  { kana: "デ", romaji: "de" },
  { kana: "ド", romaji: "do" },

  { kana: "バ", romaji: "ba" },
  { kana: "ビ", romaji: "bi" },
  { kana: "ブ", romaji: "bu" },
  { kana: "ベ", romaji: "be" },
  { kana: "ボ", romaji: "bo" },

  { kana: "パ", romaji: "pa" },
  { kana: "ピ", romaji: "pi" },
  { kana: "プ", romaji: "pu" },
  { kana: "ペ", romaji: "pe" },
  { kana: "ポ", romaji: "po" },
];

const hardExtra = [
  { kana: "キャ", romaji: "kya" },
  { kana: "キュ", romaji: "kyu" },
  { kana: "キョ", romaji: "kyo" },

  { kana: "シャ", romaji: "sha" },
  { kana: "シュ", romaji: "shu" },
  { kana: "ショ", romaji: "sho" },

  { kana: "チャ", romaji: "cha" },
  { kana: "チュ", romaji: "chu" },
  { kana: "チョ", romaji: "cho" },

  { kana: "ニャ", romaji: "nya" },
  { kana: "ニュ", romaji: "nyu" },
  { kana: "ニョ", romaji: "nyo" },

  { kana: "ヒャ", romaji: "hya" },
  { kana: "ヒュ", romaji: "hyu" },
  { kana: "ヒョ", romaji: "hyo" },

  { kana: "ミャ", romaji: "mya" },
  { kana: "ミュ", romaji: "myu" },
  { kana: "ミョ", romaji: "myo" },

  { kana: "リャ", romaji: "rya" },
  { kana: "リュ", romaji: "ryu" },
  { kana: "リョ", romaji: "ryo" },

  { kana: "ギャ", romaji: "gya" },
  { kana: "ギュ", romaji: "gyu" },
  { kana: "ギョ", romaji: "gyo" },

  { kana: "ジャ", romaji: "ja" },
  { kana: "ジュ", romaji: "ju" },
  { kana: "ジョ", romaji: "jo" },

  { kana: "ビャ", romaji: "bya" },
  { kana: "ビュ", romaji: "byu" },
  { kana: "ビョ", romaji: "byo" },

  { kana: "ピャ", romaji: "pya" },
  { kana: "ピュ", romaji: "pyu" },
  { kana: "ピョ", romaji: "pyo" },
];

function getRandomKana(currentKana?: string) {
  const weightedPool = [
  ...katakana,

  ...mediumExtra,
  ...mediumExtra,

  ...hardExtra,
  ...hardExtra,
  ...hardExtra,
  ...hardExtra,
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
  const searchParams = useSearchParams();

  const selectedTime =
    Number(searchParams.get("time")) || 30;

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
          <h1 className="text-6xl font-bold text-center text-yellow-400">
            ⏱ Kana Rush Hard ⏱
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
        <h1 className="text-6xl font-bold text-yellow-400 text-center">
          ⏱ Kana Rush Hard ⏱
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

const found = [
  ...katakana,
  ...mediumExtra,
  ...hardExtra,
].find(
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