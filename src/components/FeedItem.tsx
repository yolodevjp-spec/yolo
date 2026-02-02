"use client";

type Props = {
  title: string;
  summary: string;
  meta: string;
};

export default function FeedItem({ title, summary, meta }: Props) {
  return (
    <article className="bg-white flex gap-3 px-3 py-2 rounded-[10px]">
      <div className="w-[72px] h-[72px] bg-black/10 rounded-[8px]" />
      <div className="flex-1">
        <div className="font-semibold text-[14px] line-clamp-2">{title}</div>
        <div className="text-[12px] text-black/65 line-clamp-2 mt-[2px]">
          {summary}
        </div>
        <div className="text-[11px] text-black/40 mt-[2px]">{meta}</div>
      </div>
    </article>
  );
}
