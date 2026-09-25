"use client";

import { useState, useEffect } from "react";

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

type KanaItem = { kana: string; romaji: string };
type FallingKana = { kana: KanaItem; x: number; y: number; dx: number };

export default function KanaFallHiragana() {
const spawnX = () => Math.random() * (window.innerWidth - 100);
const spawnY = () => -(Math.random() * 300 + 100);

const randomDirection = () => (Math.random() < 0.5 ? -2 : 2);
  const [started, setStarted] = useState(false);
  const [kanas, setKanas] = useState<FallingKana[]>([]);
  const [answer, setAnswer] = useState("");
const [score, setScore] = useState(0);
const [hp, setHp] = useState(100);
const [time, setTime] = useState(0);
const [levelText, setLevelText] = useState("");

const getNextLevelTime = () => {
  if (time < 20) return 20 - time;
  if (time < 40) return 40 - time;
  return 0;
};
const getCurrentLevel = () => {
  if (time < 20) return "easy";
  if (time < 40) return "medium";
  return "hard";
};
const randomKana = () => {
  const level = getCurrentLevel();

  if (level === "easy") {
    return kanaList[Math.floor(Math.random() * kanaList.length)];
  }

  if (level === "medium") {
    if (Math.random() < 0.75) {
      return mediumExtra[Math.floor(Math.random() * mediumExtra.length)];
    }

    return kanaList[Math.floor(Math.random() * kanaList.length)];
  }

  const roll = Math.random();

  if (roll < 0.75) {
    return hardExtra[Math.floor(Math.random() * hardExtra.length)];
  }

  if (roll < 0.9) {
    return mediumExtra[Math.floor(Math.random() * mediumExtra.length)];
  }

  return kanaList[Math.floor(Math.random() * kanaList.length)];
};

const getKanaDamage = (kana: KanaItem) => {
  if (mediumExtra.includes(kana)) {
    return 10;
  }

  if (hardExtra.includes(kana)) {
    return 15;
  }

  return 5;
};

const getKanaScore = (kana: KanaItem) => {
  if (mediumExtra.includes(kana)) {
    return 10;
  }

  if (hardExtra.includes(kana)) {
    return 15;
  }

  return 5;
};

useEffect(() => {
  setKanas([
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
  { kana: randomKana(), x: spawnX(), y: spawnY(), dx: randomDirection() },
]);
}, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    if (!started && e.key === "Enter") {
      setStarted(true);
    }
  };

  window.addEventListener("keydown", handleKey);

  return () => {
    window.removeEventListener("keydown", handleKey);
  };
}, [started]);

useEffect(() => {
  if (!started) return;

  const interval = setInterval(() => {
    setKanas((prev) => {
      const next = prev.map((k) => {
        let x = k.x + k.dx;
        const y = k.y + 1;
        let dx = k.dx;

        // Odbicie od lewej i prawej strony
        const width = k.kana.kana.length > 1 ? 128 : 112;

if (x <= 0) {
  x = 0;
  dx = Math.abs(dx);
}

if (x + width >= window.innerWidth) {
  x = window.innerWidth - width;
  dx = -Math.abs(dx);
}

        return {
          ...k,
          x,
          y,
          dx,
        };
      });

      // Kolizje między znakami
      for (let i = 0; i < next.length; i++) {
        for (let j = i + 1; j < next.length; j++) {
          const a = next[i];
          const b = next[j];

          const aWidth = a.kana.kana.length > 1 ? 128 : 112;
          const bWidth = b.kana.kana.length > 1 ? 128 : 112;

          const height = 112;

          const collision =
            a.x < b.x + bWidth &&
            a.x + aWidth > b.x &&
            a.y < b.y + height &&
            a.y + height > b.y;

          if (collision) {
            // Zmiana kierunku poziomego
            next[i].dx = -next[i].dx;
            next[j].dx = -next[j].dx;

            // Rozdzielenie kwadratów, żeby nie nachodziły na siebie
            const overlap =
              Math.min(a.x + aWidth, b.x + bWidth) -
              Math.max(a.x, b.x);

            if (a.x < b.x) {
              next[i].x -= overlap / 2;
              next[j].x += overlap / 2;
            } else {
              next[i].x += overlap / 2;
              next[j].x -= overlap / 2;
            }
          }
        }
      }

      return next;
    });
  }, 16);

  return () => clearInterval(interval);
}, [started]);

useEffect(() => {
  if (!started) return;

  const missedIndex = kanas.findIndex(
    (k) => k.y > window.innerHeight - 120
  );

  if (missedIndex === -1) return;

  const missedKana = kanas[missedIndex].kana;

  setHp((h) => Math.max(h - getKanaDamage(missedKana), 0));

  setKanas((prev) =>
    prev.map((k, i) =>
      i === missedIndex
        ? {
            kana: randomKana(),
            x: spawnX(),
            y: spawnY(),
            dx: randomDirection(),
          }
        : k
    )
  );
}, [kanas, started]); // eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
  let index = -1;
let lowestY = -Infinity;

kanas.forEach((k, i) => {
  const matches =
    answer === k.kana.romaji ||
    answer === k.kana.kana;

  if (matches && k.y > lowestY) {
    lowestY = k.y;
    index = i;
  }
});

  if (index === -1) return;

setScore((s) => s + getKanaScore(kanas[index].kana));

  setKanas((prev) =>
    prev.map((k, i) =>
      i === index
        ? {
            kana: randomKana(),
            x: spawnX(),
y: spawnY(),
dx: randomDirection(),

          }
        : k
    )
  );

  setAnswer("");
}, [answer]); // eslint-disable-line react-hooks/exhaustive-deps

useEffect(() => {
  if (!started || hp <= 0) return;

  const timer = setInterval(() => {
  setTime((t) => {
    const newTime = t + 1;

    if (newTime === 20 || newTime === 40) {
  setLevelText(
    newTime === 20
      ? " MEDIUM "
      : " HARD "
  );

  setAnswer("");

setTimeout(() => {
  setLevelText("");
}, 2000);
    }

    return newTime;
  });
}, 1000);

  return () => clearInterval(timer);
}, [started, hp]);

useEffect(() => {
  if (hp > 0) return;

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      window.location.reload();
    }
  };

  window.addEventListener("keydown", handleEnter);

  return () => window.removeEventListener("keydown", handleEnter);
}, [hp]);

  if (!started) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center justify-center gap-16 px-6">

        <div className="w-full max-w-xl bg-zinc-900 rounded-3xl border border-emerald-500/30 p-8">
          <h1 className="text-6xl font-bold text-center text-emerald-400">
            Kana Fall
          </h1>
        </div>

        <div className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-emerald-500/30 p-6">
          <p className="text-center text-3xl font-bold text-emerald-400">
            Hiragana
          </p>

          <p className="text-center text-xl text-zinc-400 mt-4">
            Type the reading before the kana reaches the bottom.
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
        "
        >
          Start
        </button>

        <button
  onClick={() => window.history.back()}
  className="
    w-full
    max-w-xl

    py-6

    bg-zinc-900
    border
    border-zinc-700

    rounded-2xl

    text-zinc-300
    text-2xl
    font-bold

    transition-all
    duration-300

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
if (hp <= 0) {
  return (
  <div
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: "url('/japan 1 Main.png')",
    }}
  >
    <div
      className="
        w-[600px]
        max-w-[92%]
        bg-zinc-900/95
        border
        border-zinc-700
        rounded-3xl
        p-12
        flex
        flex-col
        items-center
        gap-6
        shadow-2xl
      "
    >
      <h1 className="text-7xl font-bold text-red-500">
        Game Over
      </h1>

      <div className="text-3xl font-bold text-white">
        Survival Time
      </div>

      <div className="text-5xl font-bold text-emerald-400">
        {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </div>

      <div className="text-3xl font-bold text-yellow-300">
  Score: {score}
</div>

      <button
        onClick={() => window.location.reload()}
        className="
          w-52
          py-5
          rounded-2xl
          bg-green-500
          text-3xl
          font-bold
          hover:bg-green-600
          hover:scale-105
          transition-all
        "
      >
        Restart
      </button>

      <button
        onClick={() => window.location.href = "/kana-fall"}
        className="
          w-52
          py-5
          rounded-2xl
          bg-zinc-800
          border
          border-zinc-600
          text-2xl
          font-bold
          transition-all
          duration-300
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
  </div>
);
}

return (
  <div
  className="min-h-screen text-white relative overflow-hidden bg-cover bg-center"
  style={{
    backgroundImage: "url('/japan 1 Main.png')",
  }}
>
{levelText && (
    <div
      className="
        absolute
        inset-0
        flex
        items-center
        justify-center
        pointer-events-none
      "
    >
        <div
  className={`text-8xl font-black ${
    levelText.includes("MEDIUM")
  ? "text-orange-500"
  : levelText.includes("HARD")
  ? "text-red-500"
  : "text-white"
  } drop-shadow-[0_0_40px_rgba(255,215,0,1)] animate-bounce`}
>
        {levelText}
      </div>
        </div>
)}
  
    <div
  className="
    absolute
    top-10
    left-1/2
    -translate-x-1/2

    w-[560px]
    max-w-[95%]

    bg-black/55
    backdrop-blur-md

    border
    border-white/20

    rounded-2xl

    px-8
    py-4

    flex
    justify-between
    items-center

    shadow-2xl
  "
>

  <div className="flex items-center gap-2 text-emerald-400 text-2xl font-bold">
     HP: {hp}
  </div>

  <div className="flex flex-col items-center">
  <div className="text-white text-2xl font-bold">
    {String(Math.floor(time / 60)).padStart(2, "0")}:
    {String(time % 60).padStart(2, "0")}
  </div>

  <div className="text-sm text-zinc-300">
  {getCurrentLevel() === "easy"
    ? `Easy • ${getNextLevelTime()}s`
    : getCurrentLevel() === "medium"
    ? `Medium • ${getNextLevelTime()}s`
    : "Hard"}
</div>
</div>

  <div className="text-yellow-300 text-2xl font-bold">
  Score: {score}
</div>

</div>
<div
  className="absolute left-0 right-0 h-33 bg-red-600/20 border-t-4 border-red-500 pointer-events-none"
  style={{ bottom: 0 }}
/>
    {kanas.map((k, index) => (
  <div
  key={index}
  className={`absolute ${
  k.kana.kana.length > 1 ? "w-32 h-28" : "w-28 h-28"
} bg-zinc-900/80 border border-white/20 rounded-2xl flex items-center justify-center`}
  style={{
    top: k.y,
    left: k.x,
  }}
>
  <span
  className={`whitespace-nowrap relative top-2 ${
    k.kana.kana.length > 1 ? "text-6xl" : "text-7xl"
  }`}
>
  {k.kana.kana}
</span>
</div>
))}

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <input
        autoFocus
        placeholder="Type..."
        value={answer}
onChange={(e) => setAnswer(e.target.value)}
        className="
          bg-zinc-900
          border
          border-zinc-700
          rounded-xl
          px-6
          py-4
          text-3xl
          text-center
          outline-none
        "
      />
    </div>
<button
  onClick={() => window.location.href = "/kana-fall"}
  className="
absolute
bottom-8
left-8

px-10
py-4

bg-zinc-900
border
border-zinc-700

rounded-2xl

text-zinc-300
text-xl
font-bold

transition-all
duration-300

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