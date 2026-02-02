"use client";

import { useEffect, useState } from "react";

/**
 * YOLO PinsBar - FINAL(想定) one-shot
 * ✅ ① PinsBar の高さを抑えて「タブ/記事が小さく見える問題」を解消
 * ✅ ② 3ピンは A方式（ベースライン=下端揃え）で統一
 * ✅ ③ 背景画像は“今は入れない”が、実装段階で入れる前提の器は作っておく（CSS差し替えだけでOK）
 * ✅ ④ 余計な箇所は触らない（PinsBarだけで完結）
 */

/** ===== 調整パラメータ（ここだけ触ればOK） ===== */
const FADE = { START: 40, END: 150 } as const;

// 3ピン表示エリアの「背景込みの高さ」：大きすぎると記事が小さく見えるので抑える
const BAR_H = 120; // ←まずはこれで“目立ちすぎ”を止める（必要なら 112〜128 で微調整）

// ピンの最大表示高さ（ベースラインは下端揃え）
const PIN_MAIN_H = 92; // 金（中央）
const PIN_SIDE_H = 86; // 赤・青（少しだけ小さく）

// ピン同士の間隔
const GAP = 30;

// タブとの上下間隔：詰めたいので上側余白は最小
const PAD_TOP = 6;
const PAD_BOTTOM = 10;

// ほんの少しタブ側に寄せる（“断絶感”を消す）
const PULL_UP = 4; // 0〜8 で調整（まずは4）

export default function PinsBar() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const o = 1 - (y - FADE.START) / (FADE.END - FADE.START);
      setOpacity(Math.max(0, Math.min(1, o)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-label="PinsBar"
      className="relative w-full border-t border-white/35 border-b border-black/5"
      style={{
        // ① 高さを固定して、PinsBarが“主役”にならないように抑える
        height: BAR_H,
        // タブとの間隔を詰める
        marginTop: -PULL_UP,
        // 透過感は維持（背景は後で入れる前提の器）
        opacity,
        transition: "opacity 80ms linear",
        overflow: "hidden",
      }}
    >
      {/* ===== 背景レイヤー（今は画像入れない／後で差し替え） ===== */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          // 今は画像なしでOK：うっすら“接地感”だけ作る
          // 実装段階で背景画像を入れるときは ↓ を image に差し替えるだけ
          // backgroundImage: "url(/pins/bg.jpg)",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(245,245,245,0.55) 55%, rgba(255,255,255,0.85) 100%)",
          filter: "saturate(1.02)",
        }}
      />

      {/* ===== 3ピン（ベースライン下端揃え） ===== */}
      <div
        className="relative mx-auto flex items-end justify-center"
        style={{
          height: "100%",
          paddingTop: PAD_TOP,
          paddingBottom: PAD_BOTTOM,
          gap: GAP,
        }}
      >
        {/* NEW */}
        <img
          src="/pins/new.png"
          alt="新着"
          draggable={false}
          style={{
            height: PIN_SIDE_H,
            width: "auto",
            display: "block",
            // ② 下端揃え（A）
            alignSelf: "flex-end",
            userSelect: "none",
          }}
        />

        {/* OVER100K */}
        <img
          src="/pins/over100k.png"
          alt="10万+"
          draggable={false}
          style={{
            height: PIN_MAIN_H,
            width: "auto",
            display: "block",
            alignSelf: "flex-end",
            userSelect: "none",
          }}
        />

        {/* VIBE */}
        <img
          src="/pins/vibe.png"
          alt="空気感"
          draggable={false}
          style={{
            height: PIN_SIDE_H,
            width: "auto",
            display: "block",
            alignSelf: "flex-end",
            userSelect: "none",
          }}
        />
      </div>
    </section>
  );
}
