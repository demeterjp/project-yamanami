"use client";

import { useEffect, useState } from "react";

const kanaList = [
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

const hardExtra = [
  { kana: "きゃ", romaji: "kya" },
  { kana: "きゅ", romaji: "kyu" },
  { kana: "きょ", romaji: "kyo" },

  { kana: "しゃ", romaji: "sha" },
  { kana: "しゅ", romaji: "shu" },
  { kana: "しょ", romaji: "sho" },

  { kana: "ちゃ", romaji: "cha" },
  { kana: "ちゅ", romaji: "chu" },
  { kana: "ちょ", romaji: "cho" },

  { kana: "にゃ", romaji: "nya" },
  { kana: "にゅ", romaji: "nyu" },
  { kana: "にょ", romaji: "nyo" },

  { kana: "ひゃ", romaji: "hya" },
  { kana: "ひゅ", romaji: "hyu" },
  { kana: "ひょ", romaji: "hyo" },

  { kana: "みゃ", romaji: "mya" },
  { kana: "みゅ", romaji: "myu" },
  { kana: "みょ", romaji: "myo" },

  { kana: "りゃ", romaji: "rya" },
  { kana: "りゅ", romaji: "ryu" },
  { kana: "りょ", romaji: "ryo" },

  { kana: "ぎゃ", romaji: "gya" },
  { kana: "ぎゅ", romaji: "gyu" },
  { kana: "ぎょ", romaji: "gyo" },

  { kana: "じゃ", romaji: "ja" },
  { kana: "じゅ", romaji: "ju" },
  { kana: "じょ", romaji: "jo" },

  { kana: "びゃ", romaji: "bya" },
  { kana: "びゅ", romaji: "byu" },
  { kana: "びょ", romaji: "byo" },

  { kana: "ぴゃ", romaji: "pya" },
  { kana: "ぴゅ", romaji: "pyu" },
  { kana: "ぴょ", romaji: "pyo" },
];

type Kana = { kana: string; romaji: string };

export default function RecallMode() {

  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [time, setTime] = useState(0);

  const [selectedKana, setSelectedKana] = useState<Kana[]>([]);

  const [input, setInput] = useState("");

  useEffect(() => {
  const shuffled = [
    ...kanaList.sort(() => Math.random() - 0.5).slice(0, 10),
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
    }, [input, started]); // eslint-disable-line react-hooks/exhaustive-deps

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
          Back
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
    Back
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
    Back
  </button>
</div>
        </div>
            )
    );
}