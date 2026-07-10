# 業種別デモ動画ジェネレーター

`ideas.md` の ①(Instagram展開)＋②(業種別動画生成)を実装したもの。
**業種を1つ足すと、その業種の「AIで問い合わせ返信を自動化する仕組み」デモ動画が
縦(IG用 1080×1920)と横(LP用 1280×720)の両方で生成される。**

音なし・字幕前提の構成なので、そのままIGのリール／ストーリーズに載せられる。

## 仕組み

```
config.mjs      … 業種リスト + 台本テンプレ(全業種共通の型)
template.html   … 1シーンを描画するHTML(手描きノート風・縦横をCSSで切替)
generate.mjs    … 各シーンをPlaywrightでPNG化 → ffmpegでクロスフェード結合 → mp4
videos/<業種>-<縦横>.mp4   … 出力
```

業種ごとに変わるのは `config.mjs` の4項目だけ:
`name`(業種名) / `task`(自動化する作業) / `inquiry`(お客様の問い合わせ例) / `draft`(AIの下書き例)。

## 使い方

### 1. 依存を入れる

```sh
npm install          # playwright
npx playwright install chromium
# ffmpeg も必要(例: apt-get install ffmpeg / brew install ffmpeg)
```

### 2. 生成する

```sh
npm run video                     # 全業種 × 縦横をまとめて生成
node video/generate.mjs beauty            # 業種を指定
node video/generate.mjs beauty vertical   # 業種 + フォーマット(vertical|landscape)
```

出力は `videos/` に入る。

> 環境が用意した既存のChromiumを使いたい場合は `CHROMIUM_PATH` で実行ファイルを指定できる:
> `CHROMIUM_PATH=/path/to/chrome node video/generate.mjs`

## 業種を追加する

`config.mjs` の `industries` 配列に1つ足すだけ:

```js
{
  id: "clinic",
  name: "整体院",
  task: "予約と問い合わせの返信",
  inquiry: "腰痛がひどく、今日の夕方に見てもらえますか？",
  draft: "ご連絡ありがとうございます。本日17時／18時が空いております…",
}
```

## 今後のメモ

- BGM / ナレーションは未対応(IGは音なし前提なので現状は無音+字幕)。
  必要なら ffmpeg で BGM を後段ミックスする余地あり。
- LP(`index.html`)側に業種別動画を出し分ける導線は未実装。
