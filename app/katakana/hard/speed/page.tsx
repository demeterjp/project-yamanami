"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function RecallMode() {
  const router = useRouter();

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [time, setTime] = useState(0);

  const [selectedKana, setSelectedKana] = useState<any[]>([]);

  const [input, setInput] = useState("");

  useEffect(() => {
  const shuffled = [
    ...katakana.sort(() => Math.random() - 0.5).slice(0, 10),
    ...mediumExtra.sort(() => Math.random() - 0.5).slice(0, 10),
    ...hardExtra.sort(() => Math.random() - 0.5).slice(0, 10),
  ];

  setSelectedKana(shuffled);
}, []);

  useEffect(() => {
    if (!started || completed) return;

    const timer = setInterval(() => {
      setTime((prev) => prev + 0.1);
    }, 100);

    return () => clearInterval(timer);
  }, [started, completed]);

useEffect(() => {
  const handleRetryEnter = (e: KeyboardEvent) => {
    if (completed && e.key === "Enter") {
      window.location.reload();
    }
  };

  window.addEventListener("keydown", handleRetryEnter);

  return () => {
    window.removeEventListener("keydown", handleRetryEnter);
  };
}, [started, completed]);
  
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!started && e.code === "Enter") {
      e.preventDefault();
      setStarted(true);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [started]);
  
  const romajiArray: string[] = [];

let currentIndex = 0;

while (currentIndex < input.length) {
  const kana = selectedKana[romajiArray.length];

  if (!kana) break;

  const expected = kana.romaji;

  romajiArray.push(
    input.slice(currentIndex, currentIndex + expected.length)
  );

  currentIndex += expected.length;
}

  useEffect(() => {
    if (!started) return;

    const allCorrect = selectedKana.every(
      (kana, index) =>
        romajiArray[index] === kana.romaji
    );

    if (
      allCorrect &&
      romajiArray.length === selectedKana.length
    ) {
      setCompleted(true);
    }
  }, [input, started]);

      if (!started) {
  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center gap-16 px-6">

      <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-red-500/30 p-8">
        <h1 className="text-6xl font-bold text-center text-red-500">
          ⚡ Speed Hard ⚡
        </h1>
      </div>

      <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-red-500/30 p-6">
        <p className="text-center text-3xl font-bold text-red-500">
          Speed Challenge
        </p>

        <p className="text-center text-xl text-zinc-400 mt-4">
          Type all kana correctly as fast as possible.
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

  return (
      completed ? (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-full max-w-2xl bg-zinc-900 rounded-3xl p-10 border border-green-500/30 flex flex-col items-center gap-8">

  <h1 className="text-7xl font-bold text-green-400">
    Complete!
  </h1>

  <p className="text-4xl font-bold text-white">
    Finished in {time.toFixed(1)}s
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
    ⬅ Back
  </button>

</div>
  </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-5 w-full min-h-screen max-w-7xl mx-auto">

          <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-red-500/20 p-8">
  <h1 className="text-6xl font-bold text-center text-red-500">
    ⚡ Speed Hard ⚡
  </h1>
</div>

          <div className="bg-zinc-900 rounded-2xl px-8 py-4 border border-red-500/20">
  <p className="text-3xl font-bold text-white text-center">
    Time: {time.toFixed(1)}s
  </p>
</div>

          
  <div className="bg-zinc-900 rounded-3xl px-12 py-8 border border-red-500/20 flex flex-col gap-6 items-center justify-center">

            <div className="flex flex-row gap-6 justify-center mb-6">
  {selectedKana.slice(0, 10).map((kana, rowIndex) => {
  const index = rowIndex;

  const expected = kana.romaji;

  const position = selectedKana
    .slice(0, index)
    .reduce((sum, kana) => sum + kana.romaji.length, 0);

  const currentPart = input.substring(
    position,
    position + expected.length
  );

  const correct = currentPart === expected;

  const wrong =
    currentPart.length > 0 &&
    !expected.startsWith(currentPart);

  return (
    <div
      key={index}
      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-bold transition-all
      ${
        correct
          ? "text-green-400"
          : wrong
          ? "text-red-500"
          : "text-white"
      }`}
    >
      {kana.kana}
    </div>
  );
})}
</div>

<div className="flex flex-row gap-6 justify-center mb-6">
  {selectedKana.slice(10, 20).map((kana, rowIndex) => {
  const index = rowIndex + 10;

  const expected = kana.romaji;

  const position = selectedKana
    .slice(0, index)
    .reduce((sum, kana) => sum + kana.romaji.length, 0);

  const currentPart = input.substring(
    position,
    position + expected.length
  );

  const correct = currentPart === expected;

  const wrong =
    currentPart.length > 0 &&
    !expected.startsWith(currentPart);

  return (
    <div
      key={index}
      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-bold transition-all
      ${
        correct
          ? "text-green-400"
          : wrong
          ? "text-red-500"
          : "text-white"
      }`}
    >
      {kana.kana}
    </div>
  );
})}
</div>

<div className="flex flex-row gap-6 justify-center">
  {selectedKana.slice(20, 30).map((kana, rowIndex) => {
  const index = rowIndex + 20;

  const expected = kana.romaji;

  const position = selectedKana
    .slice(0, index)
    .reduce((sum, kana) => sum + kana.romaji.length, 0);

  const currentPart = input.substring(
    position,
    position + expected.length
  );

  const correct = currentPart === expected;

  const wrong =
    currentPart.length > 0 &&
    !expected.startsWith(currentPart);

  return (
    <div
      key={index}
      className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl font-bold transition-all
      ${
        correct
          ? "text-green-400"
          : wrong
          ? "text-red-500"
          : "text-white"
      }`}
    >
      {kana.kana}
    </div>
  );
})}
</div>

          </div>

          <input
  autoFocus
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Type without spaces"
  className="
w-[900px]
bg-zinc-900
border-2
border-purple-500
rounded-3xl
px-12
py-6
text-2xl
text-center
outline-none
placeholder:font-sans
placeholder:text-sm
"
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
            )
    );
}