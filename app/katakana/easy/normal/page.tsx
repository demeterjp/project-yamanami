"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

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

function PlayPageContent() {
  const searchParams = useSearchParams();
  const requested = parseInt(searchParams.get("questions") || "10", 10);
const totalQuestions = Number.isFinite(requested)
  ? Math.min(Math.max(requested, 1), 46)
  : 10;

  const [currentKana, setCurrentKana] = useState(
  katakana[0]
);
  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);

  const [kanaPool, setKanaPool] = useState<typeof katakana>([]);

  const [question, setQuestion] = useState(1);

  const [result, setResult] = useState("");

  useEffect(() => {
  if (result) {
    const timer = setTimeout(() => {
      setResult("");
    }, 1000);

    return () => clearTimeout(timer);
  }
}, [result]);

  const [gameOver, setGameOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
  if (!gameOver) return;

  const timeout = setTimeout(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        window.location.reload();
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, 100);

  return () => clearTimeout(timeout);
}, [gameOver]);

  useEffect(() => {
  const shuffled = [...katakana]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalQuestions);

  setKanaPool(shuffled);
  setCurrentKana(shuffled[0]);
}, [totalQuestions]);

useEffect(() => {
  inputRef.current?.focus();
}, [currentKana]);

  function checkAnswer() {
    if (
      answer === currentKana.romaji ||
      answer === currentKana.kana
    ) {
      setScore(score + 1);
      setResult("Correct");
    } else {
      setResult("Wrong");
    }

    if (question >= totalQuestions) {
  setGameOver(true);
  return;
}

setQuestion(question + 1);

setCurrentKana(kanaPool[question]);

setAnswer("");
  }

  if (gameOver) {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-green-500/30 flex flex-col items-center gap-8">

        <h1 className="text-7xl font-bold text-green-400">
          Complete!
        </h1>

        <p className="text-4xl font-bold text-white">
          Score: {score} / {totalQuestions}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="
            bg-green-500
            hover:bg-green-600
            hover:scale-105
            active:scale-95
            transition-all
            px-23
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
            px-23
            py-4
            rounded-2xl
            text-2xl
            font-bold
            border
            border-zinc-600
            text-zinc-300
            hover:text-red-500
            hover:border-red-500
            hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]
          "
        >
          Back
        </button>

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-8">

      <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-8 border border-green-500/20">
  <h1 className="text-6xl font-bold text-green-400 text-center">
    ◆ Normal Easy ◆
  </h1>
</div>

      <div className="w-[500px] h-4 bg-zinc-800 rounded-full overflow-hidden">

  <div
    className="h-full bg-green-400 transition-all duration-300"
    style={{
      width: `${((question - 1) / totalQuestions) * 100}%`,
    }}
  />

</div>
      <div
  className="
    bg-zinc-900
    border
    border-green-500/30
    rounded-2xl
    px-8
    py-4
    flex
    gap-12
    text-2xl
    font-bold
    shadow-[0_0_15px_rgba(34,197,94,0.15)]
  "
>
        <p>Question: {question}/{totalQuestions}</p>
        <p>Score: {score}</p>
      </div>

      <div
  className="
  w-72
  h-72
  bg-zinc-900
  border
  border-green-500/40
  rounded-3xl
  flex
  flex-col
  items-center
  justify-center
  shadow-[0_0_30px_rgba(34,197,94,0.2)]
"
>
  <span className="text-9xl">
    {currentKana.kana}
  </span>
{result && (
  <p
    className={`mt-4 text-4xl font-bold h-10 ${
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
          if (e.key === "Enter") {
            checkAnswer();
          }
        }}

        onChange={(e) => {
          const value = e.target.value.toLowerCase();

          const found = katakana.find(
            (h) => h.romaji === value
          );

          if (found) {
            setAnswer(found.kana);
          } else {
            setAnswer(value);
          }
        }}

        placeholder="Type romaji..."

        className="
w-[400px]
px-6
py-4
rounded-2xl
text-3xl
bg-zinc-900
text-white
border
border-purple-500
outline-none
transition-all
duration-300
shadow-[0_0_12px_rgba(168,85,247,0.35)]
focus:shadow-[0_0_22px_rgba(168,85,247,0.8)]
focus:border-purple-400
"
      />

      <button
  onClick={checkAnswer}
  className="
w-[500px]
py-5
rounded-2xl
border
border-green-500
text-green-400
text-2xl
font-bold
bg-zinc-900
hover:bg-zinc-800
transition
shadow-[0_0_20px_rgba(34,197,94,0.3)]
"
>
        Check
      </button>

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
    Back
  </button>
</div>
</div>
);
}

export default function PlayPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayPageContent />
    </Suspense>
  );
}