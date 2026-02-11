import fs from "fs";
import fetch from "node-fetch";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// トレンド動画を取得
async function fetchTrendingVideos() {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=JP&maxResults=10&key=${YOUTUBE_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items;
}

// AIで記事生成
async function generateSummary(title) {
  const prompt = `
以下のYouTube動画タイトルを元に、
450〜550文字の日本語ニュース記事を書いてください。
事実ベースで、誇張せず、簡潔に。

タイトル：
${title}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

async function main() {
  const videos = await fetchTrendingVideos();
  let articles = [];
  let id = 1;

  for (const video of videos) {
    const title = video.snippet.title;
    const views = video.statistics.viewCount;

    console.log(`生成中: ${title}`);

    const summary = await generateSummary(title);

    articles.push({
      id: `trend-${id}`,
      title,
      summary,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      time: "12:00",
      category: "trend",
      views: `${Math.floor(views / 10000) / 10}万回`,
      isOver100k: views > 100000,
      isYesterdaySummary: false,
      isOverseasJP: false,
    });

    id++;
  }

  fs.writeFileSync(
    "src/data/articles.json",
    JSON.stringify(articles, null, 2)
  );

  console.log("YouTube記事生成完了");
}

main();
