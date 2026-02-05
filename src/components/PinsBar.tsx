"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const BAR_H = 64;
const PAD_V = 6;
const PAD_H = 16;
const GAP = 28;

const PIN_SIDE = 52;
const PIN_MAIN = 62; // 52 * 1.2

export default function PinsBar() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const o = Math.max(0, 1 - y / 150);
      setOpacity(o);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-label="PinsBar"
      className="relative z-30 w-full bg-white/55 border-t border-white/35 border-b border-black/5"
      style={{
        height: BAR_H,
        paddingTop: PAD_V,
        paddingBottom: PAD_V,
        paddingLeft: PAD_H,
        paddingRight: PAD_H,
        opacity,
        transition: "opacity 80ms linear",
        overflow: "visible",
      }}
    >
      <div
        className="flex justify-center"
        style={{
          gap: GAP,
          height: "100%",
          alignItems: "center", // ← ここが最重要：はみ出しを作らない
          overflow: "visible",
        }}
      >
        <Image
          src="/pins/new.png"
          alt="新着"
          width={PIN_SIDE}
          height={PIN_SIDE}
          style={{ height: PIN_SIDE, width: "auto", objectFit: "contain" }}
          priority
        />
        <Image
          src="/pins/over100k.png"
          alt="10万+"
          width={PIN_MAIN}
          height={PIN_MAIN}
          style={{ height: PIN_MAIN, width: "auto", objectFit: "contain" }}
          priority
        />
        <Image
          src="/pins/vibe.png"
          alt="空気感"
          width={PIN_SIDE}
          height={PIN_SIDE}
          style={{ height: PIN_SIDE, width: "auto", objectFit: "contain" }}
          priority
        />
      </div>
    </section>
  );
}
