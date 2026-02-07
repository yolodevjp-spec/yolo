import { exec } from "child_process";

export async function GET() {
  return new Promise((resolve) => {
    exec("node scripts/fetchAndGenerate.js", (error, stdout, stderr) => {
      if (error) {
        resolve(
          new Response("Error: " + error.message, { status: 500 })
        );
        return;
      }
      resolve(new Response("OK"));
    });
  });
}
