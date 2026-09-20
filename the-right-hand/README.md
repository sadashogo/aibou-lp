# THE RIGHT HAND — 経営専任AI顧問室

Astro 5 + Tailwind CSS 4 による静的LP。

## 開発

```bash
npm run dev       # 開発サーバー起動
npm run build     # 本番ビルド（dist/ を生成）
npm run preview   # ビルド済み dist/ をローカルでプレビュー
npm run check      # astro check（型・構文チェック）
```

## Vercel デプロイ設定

- Framework Preset: **Astro**
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `the-right-hand`

`astro.config.mjs` に `site` / `base` は設定していません。ドメインのルートに配信される前提です。

## 未対応タスク（引き継ぎ事項）

1. **予約リンクが AIBOU（個人事業主向け無料30分相談）と同一枠になっている。**
   法人向けの別枠を Google カレンダー側で作成し、`src/data/site.ts` の `bookingUrl` を差し替えること。
2. **公開ドメインが未確定。**
   確定次第 `astro.config.mjs` に `site` を設定し、OGP 用の絶対URLを有効化すること。
3. **動画（`public/roadmap-sequence.mp4`）に不要な音声トラックが含まれている。**
   ミュート自動再生のため実際には再生されず、死に荷重になっている。手元で以下を実行すると数百KB削減できる。
   ```bash
   ffmpeg -i roadmap-sequence.mp4 -an -c:v copy out.mp4
   ```
   作業環境にあった ffmpeg は Playwright 内蔵ビルドで、入力が webm/matroska のみ・
   H.264 デコーダ非搭載のため MP4 を読めず、未実施。通常版の ffmpeg で実行すること。
4. **ポスター画像が未設定。**
   動画の先頭フレームから作成して `public/` に配置し、`VideoFrame.astro` の `<video>` に `poster` 属性を渡すと初期表示が改善する。
5. **アクセス解析は未導入。**
