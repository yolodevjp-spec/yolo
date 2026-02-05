import Link from "next/link";
import PinsBar from "@/components/PinsBar";
import FeedShell from "@/components/FeedShell";

const TABS = [
  { label: "トレンド", slug: "trend" },
  { label: "10万+", slug: "over100k" },
  { label: "企画", slug: "kikaku" },
  { label: "トーク", slug: "talk" },
  { label: "芸能", slug: "geino" },
  { label: "スポーツ", slug: "sports" },
  { label: "音楽", slug: "music" },
  { label: "社会", slug: "society" },
  { label: "昨日のまとめ", slug: "yesterday" },
];

export default function TabPage({ params }: { params: { tab: string } }) {
  const tab = params.tab ?? "trend";

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー（簡易） */}
      <header className="px-[16px] pt-[16px] pb-[8px]">
        <div className="text-[18px] leading-[18px] font-semibold tracking-[0.02em] text-black">
          YOLO
        </div>
      </header>

      {/* タブ（sticky） */}
      <nav className="sticky top-0 z-20 bg-white border-b border-black/5">
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap px-[16px] py-[10px]">
          {TABS.map((t) => {
            const active = tab === t.slug;
            return (
              <Link
                key={t.slug}
                href={`/${t.slug}`}
                className={[
                  "text-[14px] leading-[14px] font-semibold",
                  active ? "text-black" : "text-black/55",
                ].join(" ")}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* PinsBar */}
      <PinsBar />

      {/* TimeRow（SSOT） */}
      <div className="h-[44px] px-[16px] flex items-center bg-white/55 border-t border-white/35 border-b border-black/5">
        <div className="text-[18px] leading-[18px] font-semibold tracking-[0.02em] text-black/55">
          12:00〜14:00
        </div>
      </div>

      {/* Feed */}
      <main className="px-[16px] py-[12px]">
        <FeedShell tab={tab} />
      </main>
    </div>
  );
}
