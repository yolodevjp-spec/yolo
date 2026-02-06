"use client";

import FeedItem from "@/components/FeedItem";
import articlesData from "@/data/articles.json";

type Article = {
  id: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  time: string;
  category: string;
  views: string;
  isOver100k: boolean;
  isYesterdaySummary: boolean;
  isOverseasJP: boolean;
};

type Props = {
  tab: string;
};

export default function FeedShell({ tab }: Props) {
  const articles = articlesData as Article[];

  const rows =
    tab === "over100k"
      ? articles.filter((a) => a.isOver100k === true)
      : tab === "yesterday"
        ? articles.filter((a) => a.isYesterdaySummary === true)
        : articles.filter((a) => a.category === tab);

  return (
    <section className="space-y-2 px-2 py-2">
      {rows.map((r) => (
        <FeedItem
          key={r.id}
          title={r.title}
          summary={r.summary}
          meta={`${r.time} / ${r.category} / ${r.views}`}
        />
      ))}
    </section>
  );
}
