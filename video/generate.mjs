// AIBOU 業種別デモ動画 — 生成スクリプト
//
// 使い方:
//   node video/generate.mjs                # 全業種 × 縦横 を生成
//   node video/generate.mjs beauty         # 指定業種だけ
//   node video/generate.mjs beauty vertical  # 業種 + フォーマット指定
//
// 依存: playwright(Chromium) と ffmpeg。README.md 参照。
// 仕組み: シーンごとに template.html をPNG化 → ffmpeg で xfade 結合して mp4 出力。

import { chromium } from "playwright";
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { industries, scenesFor, formats, fps, xfade } from "./config.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const framesDir = join(here, "frames");
const outDir = join(here, "..", "videos");
const templateUrl = pathToFileURL(join(here, "template.html")).href;

const argBiz = process.argv[2];
const argFmt = process.argv[3];

const targetIndustries = argBiz ? industries.filter((b) => b.id === argBiz) : industries;
const targetFormats = argFmt ? [argFmt] : Object.keys(formats);
if (!targetIndustries.length) throw new Error(`未知の業種: ${argBiz}`);

rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

// 環境によっては別途インストールしたChromiumを指すために CHROMIUM_PATH で上書きできる
const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);

for (const biz of targetIndustries) {
  const scenes = scenesFor(biz);
  for (const fmt of targetFormats) {
    const { w, h } = formats[fmt];
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });

    const framePaths = [];
    for (let i = 0; i < scenes.length; i++) {
      const q = `format=${fmt}&scene=${encodeURIComponent(JSON.stringify(scenes[i]))}`;
      await page.goto(`${templateUrl}?${q}`);
      await page.waitForFunction("window.__ready === true", { timeout: 5000 }).catch(() => {});
      const p = join(framesDir, `${biz.id}-${fmt}-${String(i).padStart(2, "0")}.png`);
      await page.screenshot({ path: p });
      framePaths.push({ path: p, seconds: scenes[i].seconds });
    }
    await page.close();

    const out = join(outDir, `${biz.id}-${fmt}.mp4`);
    encode(framePaths, w, h, out);
    console.log(`✓ ${biz.name} [${formats[fmt].label}] → ${out}`);
  }
}

await browser.close();
console.log("完了。");

// PNG列 → mp4(シーン間クロスフェード)
function encode(frames, w, h, out) {
  const args = [];
  for (const f of frames) args.push("-loop", "1", "-t", String(f.seconds), "-i", f.path);

  // 各入力を整形(fps・sar・yuv420p)
  const parts = frames.map(
    (_, i) => `[${i}:v]fps=${fps},setsar=1,format=yuv420p[v${i}]`
  );

  // xfade を鎖状に連結
  let prev = "v0";
  let acc = 0; // これまでの実尺(重なり分を差し引き済み)
  for (let i = 1; i < frames.length; i++) {
    acc += frames[i - 1].seconds;
    const offset = (acc - i * xfade).toFixed(3);
    const label = i === frames.length - 1 ? "vout" : `x${i}`;
    parts.push(
      `[${prev}][v${i}]xfade=transition=fade:duration=${xfade}:offset=${offset}[${label}]`
    );
    prev = label;
  }
  const map = frames.length === 1 ? "[v0]" : "[vout]";

  args.push(
    "-filter_complex", parts.join(";"),
    "-map", map,
    "-r", String(fps),
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-y", out
  );
  execFileSync("ffmpeg", args, { stdio: ["ignore", "ignore", "inherit"] });
}
