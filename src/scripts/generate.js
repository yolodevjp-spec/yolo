import fs from "fs";

const categories = [
  "trend",
  "over100k",
  "kikaku",
  "talk",
  "geino",
  "sports",
  "music",
  "society",
  "yesterday",
];

const TAB_RULES = {
  over100k: { isOver100k: true, isYesterdaySummary: false },
  yesterday: { isOver100k: false, isYesterdaySummary: true },
};

function requireEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}. Put it in .env.local`);
  return v;
}

function buildPrompt({ category, index }) {
  // 今はYouTube取得がまだなので、ダミーの「ネタ」から文章を作る
  // 後でここを YouTube API のデータに差し替える
  const dummyTopic = {
    trend: "急上昇で目立つ動画の動き",
    over100k: "10万超え動画の伸び方",
    kikaku: "検証・チャレンジ系の企画",
    talk: "雑談・本音・裏話のトーク",
    geino: "芸能人・タレント話題",
    sports: "スポーツの試合・反応",
    music: "新曲・MV・ライブ話題",
    society: "社会・ドキュメンタリー",
    yesterday: "昨日のまとめ用トピック",
  }[category];

  return `
あなたはYOLO(YouTube短文情報メディア)の編集者です。
次の条件で、日本語の短文記事を1本だけ作ってください。

【条件】
- 450〜550字
- 断定しすぎず「〜と見られる」「〜の声もある」等で安全に
- 見出しは不要（本文だけ）
- 事実整理の文体。絵文字禁止。箇条書き禁止。
- 対象カテゴリ: ${category}
- ネタ（仮）: ${dummyTopic}（${index + 1}本目）

本文のみ出力してください。
`.trim();
}

async function generateSummaryOpenAI({ category, index }) {
  const apiKey = requireEnv("OPENAI_API_KEY");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.6,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: buildPrompt({ category, index }) },
      ],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenAI API error: ${res.status}\n${txt}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content?.trim() ?? "";
  return content;
}

function createBaseArticle({ id, category, index }) {
  const time = `12:${String(index).padStart(2, "0")}`;

  const flags =
    category === "over100k"
      ? TAB_RULES.over100k
      : category === "yesterday"
      ? TAB_RULES.yesterday
      : { isOver100k: false, isYesterdaySummary: false };

  return {
    id: `${category}-${id}`,
    title: `${category} 記事タイトル${index + 1}`,
    summary: "",
    thumbnailUrl: "",
    time,
    category,
    views: `${(Math.random() * 20 + 1).toFixed(1)}万回`,
    isOver100k: flags.isOver100k,
    isYesterdaySummary: flags.isYesterdaySummary,
    isOverseasJP: false,
  };
}

async function main() {
  // .env.local を読む（Nextじゃなくても読むように）
  // Windowsでも動くように簡易パース
  if (fs.existsSync(".env.local")) {
    const envText = fs.readFileSync(".env.local", "utf-8");
    for (const line of envText.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const k = trimmed.slice(0, idx).trim();
      const v = trimmed.slice(idx + 1).trim();
      if (!process.env[k]) process.env[k] = v;
    }
  }

  // まずは各カテゴリ3本だけ生成（無料枠・速度優先）
  const PER_CATEGORY = 3;

  let articles = [];
  let id = 1;

  for (const category of categories) {
    for (let i = 0; i < PER_CATEGORY; i++) {
      const a = createBaseArticle({ id: id++, category, index: i });
      a.summary = await generateSummaryOpenAI({ category, index: i });
      articles.push(a);
      console.log(`generated: ${a.id}`);
    }
  }

  fs.mkdirSync("src/data", { recursive: true });
  fs.writeFileSync("src/data/articles.json", JSON.stringify(articles, null, 2), "utf-8");
  console.log("✅ articles.json をOpenAIで生成して上書きしました");
}

main().catch((e) => {
  console.error("❌ failed:", e);
  process.exit(1);
});
