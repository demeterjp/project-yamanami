"use client";

import { useEffect, useState, useMemo } from "react";

export default function Sakura() {
  const [mounted, setMounted] = useState(false);
  const sakuras = useMemo(
    () =>
      Array.from({ length: 35 }).map(() => ({
        top: Math.random() * 90,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 5,
        size: 10 + Math.random() * 18,
      })),
    []
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {sakuras.map((sakura, i) => (
        <div
          key={i}
          className="sakura"
          style={{
            top: `${sakura.top}%`,
            animationDuration: `${sakura.duration}s`,
            animationDelay: `${sakura.delay}s`,
            fontSize: `${sakura.size}px`,
          }}
        >
          ❀
        </div>
      ))}
    </>
  );
}