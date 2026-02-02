"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import PinsBar from "@/components/PinsBar";

const TABS = [
  { label: "トレンド", slug: "trend" },
  { label: "10万+", slug: "over100k" },
  { label: "企画", slug: "project" },
  { label: "トーク", slug: "talk" },
  { label: "芸能", slug: "entertainment" },
  { label: "スポーツ", slug: "sports" },
  { label: "音楽", slug: "music" },
  { label: "社会", slug: "society" },
  { label: "昨日のまとめ", slug: "yesterday" },
];

export default function TabPage() {
  const params = useParams();
  const router = useRouter();

  const tab = useMemo(() => {
    const raw = (params as any)?.tab;
    return Array.isArray(raw) ? raw[0] : raw || "trend";
  }, [params]);

  const valid = useMemo(() => new Set(TABS.map((t) => t.slug)), []);

  useEffect(() => {
    if (!valid.has(tab)) router.replace("/trend");
  }, [tab, router, valid]);

  return (
    <main className="min-h-screen bg-[#f3f3f3] text-black">
      <header className="h-[50px] bg-white border-b border-black/5 flex items-center px-4 font-bold">
        YOLO
      </header>

      <nav className="sticky top-0 z-20 bg-white border-b border-black/5 px-4 py-2 text-sm">
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
          {TABS.map((t) => {
            const active = tab === t.slug;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={[
                  "pb-[6px] font-medium",
                  active ? "text-black border-b-2 border-black" : "text-black/50",
                ].join(" ")}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <PinsBar />

      <section className="h-[44px] px-[16px] flex items-center bg-white/55 border-t border-white/35 border-b border-black/5 text-[18px] font-semibold tracking-[0.02em] text-black/55">
        12:00〜14:00
      </section>

      <section className="space-y-2 px-2 py-2">
        {Array.from({ length: 30 }).map((_, i) => (
          <article key={i} className="bg-white flex gap-3 px-3 py-2 rounded-[10px]">
            <div className="w-[72px] h-[72px] bg-black/10 rounded-[8px]" />
            <div className="flex-1">
              <div className="font-semibold text-[14px] line-clamp-2">
                {tab} ダミー記事タイトル {i + 1}
              </div>
              <div className="text-[12px] text-black/65 line-clamp-2 mt-[2px]">
                これはYOLO用のダミー概要テキストです。
              </div>
              <div className="text-[11px] text-black/40 mt-[2px]">
                12:34 / {tab} / 12.3万回
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
