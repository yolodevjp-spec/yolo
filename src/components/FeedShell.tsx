"use client";

import FeedItem from "@/components/FeedItem";

type FeedRow = {
  id: string;
  title: string;
  summary: string;
  meta: string;
};

type Props = {
  tab: string;
  count?: number; // ダミー表示数（デフォ30）
};

export default function FeedShell({ tab, count = 30 }: Props) {
  const rows: FeedRow[] = Array.from({ length: count }).map((_, i) => ({
    id: `${tab}-${i}`,
    title: `${tab} ダミー記事タイトル ${i + 1}`,
    summary: "これはYOLO用のダミー概要テキストです。",
    meta: `12:34 / ${tab} / 12.3万回`,
  }));

  return (
    <section className="space-y-2 px-2 py-2">
      {rows.map((r) => (
        <FeedItem key={r.id} title={r.title} summary={r.summary} meta={r.meta} />
      ))}
    </section>
  );
}
