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
  className={`flex flex-col items-center justify-center min-h-screen gap-8 transition-all duration-500 bg-cover bg-center ${
  theme === "light"
  ? "bg-white text-black"
  : theme === "dark"
  ? "bg-black text-white"
  : "text-white"
}`}
style={
  theme === "japan"
    ? {
        backgroundImage: "url('/japan 1 Main.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : theme === "dark"
    ? { backgroundColor: "black" }
    : { backgroundColor: "white" }
}
>
  <Sakura />
      {/* Logo lewy górny róg */}
<div className="absolute top-8 left-8 z-20">
  <h1 className="text-9xl font-black tracking-tight text-zinc-100 drop-shadow-[0_0_35px_#ff4fd8] leading-none">
    YAMANAMI
  </h1>

  <p className="text-white/90 text-5xl text-center mt-1">
  山波
</p>
</div>

<div className="absolute left-20 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
<div className="mb-8">
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
    bg-emerald-600
    border
border-emerald-300/60
hover:bg-emerald-700
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12
    py-5
    rounded-2xl
    text-3xl
    font-bold
    shadow-[0_0_25px_#10b981]
    flex
    items-center
    gap-4
  "
>
  <span className="text-5xl">あ</span>

  <span className="mt-1">
    Hiragana
  </span>

{hoveredMode === "hiragana" && (
  <div className="absolute right-[-460px] top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[90px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
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
    mt-6
    bg-cyan-500
    border
border-cyan-300/60
hover:bg-cyan-600
    hover:scale-105
    active:scale-95
    active:translate-y-1
    transition-all
    duration-150
    px-12
    py-5
    rounded-2xl
    text-3xl
    font-bold
    shadow-[0_0_25px_#06b6d4]
    flex
    items-center
    gap-4
  "
>
  <span className="text-5xl">ア</span>

  <span className="mt-1">
    Katakana
  </span>

{hoveredMode === "katakana" && (
  <div className="absolute right-[-460px] top-1/2 -translate-y-1/2 flex items-center bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4 text-white/90 text-lg w-80 min-h-[120px] animate-fadeIn shadow-[0_0_25px_rgba(120,80,255,0.25)]">
    Practice Katakana used in foreign words and names.
  </div>
)}

</Link>

</div>

<div className="fixed bottom-4 right-4 text-white/40 text-base tracking-widest z-50 select-none">
  v1.0
</div>

</div>

  );
}