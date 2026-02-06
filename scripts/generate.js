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

function createDummyArticle(id, category, index) {
  return {
    id: `${category}-${id}`,
    title: `${category} ダミー記事タイトル${index + 1}`,
    summary: "これはYOLO用の自動生成ダミー概要テキストです。",
    thumbnailUrl: "",
    time: `12:${String(index).padStart(2, "0")}`,
    category,
    views: `${(Math.random() * 20 + 1).toFixed(1)}万回`,
    isOver100k: category === "over100k",
    isYesterdaySummary: category === "yesterday",
    isOverseasJP: false,
  };
}

let articles = [];
let id = 1;

for (const category of categories) {
  for (let i = 0; i < 10; i++) {
    articles.push(createDummyArticle(id++, category, i));
  }
}

fs.writeFileSync(
  "src/data/articles.json",
  JSON.stringify(articles, null, 2),
  "utf-8"
);

console.log("articles.json を自動生成しました");
