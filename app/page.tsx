"use client";

import Link from "next/link";

import { useState } from "react";
import Sakura from "./components/Sakura";

export default function Home() {
  
  const [theme, setTheme] = useState("japan");
  const [hoveredMode, setHoveredMode] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  return (
    <div
  className="flex flex-col items-center justify-center min-h-screen gap-8 transition-all duration-500 bg-cover bg-center text-white"
>
  <Sakura />
      {/* Logo lewy górny róg */}
<div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 flex flex-col gap-6 sm:gap-10 lg:gap-14">

  <div>
    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-zinc-100 drop-shadow-[0_0_35px_#ff4fd8] leading-none">
      YAMANAMI
    </h1>
    <p className="text-white/90 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-center mt-1">
      山波
    </p>
  </div>

  <div className="flex flex-col items-center">
    <div className="mb-8 [@media(max-height:800px)]:mb-4">
      <h2 className="text-5xl text-center text-white font-bold tracking-widest drop-shadow-[0_0_20px_#ffffff]">
        PRACTICE
      </h2>
      <p className="text-zinc-300 text-center text-2xl tracking-[0.4em] text-center mt-1">
        練習
      </p>
    </div>

      <Link
  href="/hiragana"
  onMouseEnter={() => setHoveredMode("hiragana")}
onMouseLeave={() => setHoveredMode("")}
    className="
    relative
    bg-emerald-600
    border
border-emerald-300/60
hover:bg-emerald-700
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8
    py-5 [@media(max-height:800px)]:py-3
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl
    font-bold
    shadow-[0_0_25px_#10b981]
    flex
    items-center
    gap-4
  "
>
  <div className="w-16 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl">あ</span>
</div>

<div className="w-40">
  <span className="mt-1 block">
    Hiragana
  </span>
</div>

{hoveredMode === "hiragana" && (
  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[90px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
    Practice basic Japanese characters.
  </div>
)}


</Link>

<Link
  href="/katakana"
  onMouseEnter={() => setHoveredMode("katakana")}
onMouseLeave={() => setHoveredMode("")}
  className="
  relative
    mt-6 [@media(max-height:800px)]:mt-3
    bg-purple-600
    border
border-purple-300/60
hover:bg-purple-700
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8
    py-5 [@media(max-height:800px)]:py-3
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl
    font-bold
    shadow-[0_0_25px_#9333ea]
    flex
    items-center
    gap-4
  "
>
  <div className="w-16 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl">ア</span>
</div>

<div className="w-40">
  <span className="mt-1 block">
    Katakana
  </span>
</div>

{hoveredMode === "katakana" && (
  <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[120px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
    Practice Katakana used in foreign words and names.
  </div>
)}

</Link>

<Link
  href="/kana-fall"
  onMouseEnter={() => setHoveredMode("kanafall")}
  onMouseLeave={() => setHoveredMode("")}
  className="
    relative
    mt-6 [@media(max-height:800px)]:mt-3
    bg-cyan-500
    border
    border-cyan-300/60
    hover:bg-cyan-600
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8
    py-5 [@media(max-height:800px)]:py-3
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl
    font-bold
    shadow-[0_0_25px_#06b6d4]
    flex
    items-center
    gap-4
  "
>
<div className="w-16 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl">滝</span>
</div>

<div className="w-40">
  <span className="mt-1 block">
    Kana Fall
  </span>
</div>

  {hoveredMode === "kanafall" && (
    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[120px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
      Type the correct answer before the kana reaches the bottom.
    </div>
  )}
</Link>

<Link
  href="/numbers"
  onMouseEnter={() => setHoveredMode("numbers")}
  onMouseLeave={() => setHoveredMode("")}
  className="
    relative
    mt-6 [@media(max-height:800px)]:mt-3
    bg-orange-500
    border
    border-orange-300/60
    hover:bg-orange-600
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8
    py-5 [@media(max-height:800px)]:py-3
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl
    font-bold
    shadow-[0_0_25px_#f97316]
    flex
    items-center
    gap-4
  "
>
  <div className="w-16 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl whitespace-nowrap">数字</span>
</div>

  <div className="w-40">
    <span className="mt-1 block">
      Numbers
    </span>
  </div>

  {hoveredMode === "numbers" && (
    <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[90px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
      Practice Japanese numbers.
    </div>
  )}
</Link>

</div>

</div>
</div>
  );
}