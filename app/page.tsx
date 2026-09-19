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
<div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20 flex flex-col gap-4 sm:gap-8 lg:gap-14">

  <div>
    <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl min-[1920px]:text-[9.5rem] min-[2560px]:text-[12rem] min-[3840px]:text-[16rem] font-black tracking-tight text-zinc-100 drop-shadow-[0_0_35px_#ff4fd8] leading-none">
      YAMANAMI
    </h1>
    <p className="text-white/90 text-xl sm:text-3xl md:text-4xl lg:text-5xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl text-center mt-1">
      山波
    </p>
  </div>

  <div className="flex flex-col items-center">
    <div className="mb-6 [@media(max-height:800px)]:mb-4">
      <h2 className="text-5xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl text-center text-white font-bold tracking-widest drop-shadow-[0_0_20px_#ffffff]">
        PRACTICE
      </h2>
      <p className="text-zinc-300 text-center text-2xl min-[1920px]:text-3xl min-[2560px]:text-4xl min-[3840px]:text-5xl tracking-[0.4em] text-center mt-1">
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
    px-12 [@media(max-height:800px)]:px-8 min-[1920px]:px-16 min-[2560px]:px-20 min-[3840px]:px-24
    py-5 [@media(max-height:800px)]:py-3 min-[1920px]:py-6 min-[2560px]:py-8 min-[3840px]:py-10
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl min-[1920px]:text-4xl min-[2560px]:text-5xl min-[3840px]:text-6xl
    font-bold
    shadow-[0_0_25px_#10b981]
    flex
    items-center
    gap-4 min-[1920px]:gap-6 min-[2560px]:gap-8 min-[3840px]:gap-10
  "
>
  <div className="w-16 min-[1920px]:w-20 min-[2560px]:w-24 min-[3840px]:w-28 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl">あ</span>
</div>

<div className="w-40 min-[1920px]:w-48 min-[2560px]:w-56 min-[3840px]:w-64">
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
    mt-4 [@media(max-height:800px)]:mt-3 min-[1920px]:mt-8 min-[2560px]:mt-10 min-[3840px]:mt-14
    bg-purple-600
    border
border-purple-300/60
hover:bg-purple-700
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8 min-[1920px]:px-16 min-[2560px]:px-20 min-[3840px]:px-24
    py-5 [@media(max-height:800px)]:py-3 min-[1920px]:py-6 min-[2560px]:py-8 min-[3840px]:py-10
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl min-[1920px]:text-4xl min-[2560px]:text-5xl min-[3840px]:text-6xl
    font-bold
    shadow-[0_0_25px_#9333ea]
    flex
    items-center
    gap-4 min-[1920px]:gap-6 min-[2560px]:gap-8 min-[3840px]:gap-10
  "
>
  <div className="w-16 min-[1920px]:w-20 min-[2560px]:w-24 min-[3840px]:w-28 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl">ア</span>
</div>

<div className="w-40 min-[1920px]:w-48 min-[2560px]:w-56 min-[3840px]:w-64">
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
    mt-4 [@media(max-height:800px)]:mt-3 min-[1920px]:mt-8 min-[2560px]:mt-10 min-[3840px]:mt-14
    bg-cyan-500
    border
    border-cyan-300/60
    hover:bg-cyan-600
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8 min-[1920px]:px-16 min-[2560px]:px-20 min-[3840px]:px-24
    py-5 [@media(max-height:800px)]:py-3 min-[1920px]:py-6 min-[2560px]:py-8 min-[3840px]:py-10
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl min-[1920px]:text-4xl min-[2560px]:text-5xl min-[3840px]:text-6xl
    font-bold
    shadow-[0_0_25px_#06b6d4]
    flex
    items-center
    gap-4 min-[1920px]:gap-6 min-[2560px]:gap-8 min-[3840px]:gap-10
  "
>
<div className="w-16 min-[1920px]:w-20 min-[2560px]:w-24 min-[3840px]:w-28 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl">滝</span>
</div>

<div className="w-40 min-[1920px]:w-48 min-[2560px]:w-56 min-[3840px]:w-64">
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
    mt-4 [@media(max-height:800px)]:mt-3 min-[1920px]:mt-8 min-[2560px]:mt-10 min-[3840px]:mt-14
    bg-red-600
    border
    border-red-400/60
    hover:bg-red-700
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12 [@media(max-height:800px)]:px-8 min-[1920px]:px-16 min-[2560px]:px-20 min-[3840px]:px-24
    py-5 [@media(max-height:800px)]:py-3 min-[1920px]:py-6 min-[2560px]:py-8 min-[3840px]:py-10
    rounded-2xl
    text-3xl [@media(max-height:800px)]:text-2xl min-[1920px]:text-4xl min-[2560px]:text-5xl min-[3840px]:text-6xl
    font-bold
    shadow-[0_0_25px_#ef4444]
    flex
    items-center
    gap-4 min-[1920px]:gap-6 min-[2560px]:gap-8 min-[3840px]:gap-10
  "
>
  <div className="w-16 min-[1920px]:w-20 min-[2560px]:w-24 min-[3840px]:w-28 flex justify-center">
  <span className="text-5xl [@media(max-height:800px)]:text-4xl min-[1920px]:text-6xl min-[2560px]:text-7xl min-[3840px]:text-8xl whitespace-nowrap">数字</span>
</div>

  <div className="w-40 min-[1920px]:w-48 min-[2560px]:w-56 min-[3840px]:w-64">
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