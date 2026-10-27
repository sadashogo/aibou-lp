# ととのい整体院：スクロール演出

対象：`/samples/seitai/`。風景の実写動画、日本人という設定の架空モデルのAI写真、手元・足元・セルフケアの実写動画を組み合わせています。人物の各章は写真から別撮影の実写へ切り替わります。有料の動画生成サービスは使いません。

## 構成

1. 木漏れ日の道：導入。
2. 相談：院内の写真から、メモを書く手へ。
3. 姿勢の確認：立ち姿の写真から、足元の重心移動へ。
4. からだのケア：写真から、背中をケアする手元へ。
5. セルフケア：自宅の写真から、腕を伸ばして戻す実写へ。
6. いつもの日常：公園の道。

各4秒、計24秒。スクロール停止で映像が止まり、逆スクロールで戻ります。02と04は写真・実写ともに別素材で、部位と行動が異なります。写真0.75秒の後、0.25秒で実写へ切り替わり、章の1秒以降は実写のみです。出典・確認記録は [素材の記録](seitai-media-credits.md) と `src/data/samples/seitai-assets.json` を参照してください。

## 実装

- `src/components/samples/SeitaiFilmStory.astro`：整体専用の構図。
- `src/scripts/seitai-film.ts`：スクロール・章移動・動画シーク。
- `src/data/samples/seitai-film.ts`：動画・ポスター・英語ラベル。
- `src/data/samples/seitai.ts`：院の情報と日本語の文章。
- `public/samples/seitai/film-ai/`：人物写真。
- `public/samples/seitai/film-hybrid/`：写真と実写を編集した連結動画。
- `scripts/build-seitai-hybrid.mjs`：無料素材を取得・編集する再生成スクリプト。
- `public/samples/seitai/film/`：風景ポスターのみ。

動画はfetchしてBlob URLに変換するため、HTTP Range非対応でもシークできます。requestAnimationFrameでなめらかにスクロールを反映し、停止時は連続描画しません。動きを減らす設定・JavaScript無効では6章を縦に並べ、動画を取得しません。動画読込失敗時は章ごとのポスターを表示します。

`ShopPage.astro` の任意のstoryスロットとcinematic設定、`SampleBase.astro` の任意の素材説明・headスロットを利用。美容室など他のサンプルは従来の構成を維持します。

## 検証

```bash
npm ci
npm run build
npm run check
npm run preview -- --host 0.0.0.0
# 別ターミナル。初回のみ npx playwright install chromium
npm run test:seitai
```

既存のChromiumを使う場合は `TEST_BROWSER_PATH`、確認先を変える場合は `TEST_BASE_URL` を指定できます。制限付き環境では `ASTRO_TELEMETRY_DISABLED=1` を付けます。

自動確認：人物写真と実写原動画の識別子の重複、公開画像のハッシュ、各章の画像割当と映像区間、同じ章内の進行、逆スクロール、章移動、予約サンプル、390px/320px幅、動きを減らす設定の切替、JavaScript無効、動画失敗時のポスター、美容室ページ。別途、PC・スマホの画面キャプチャで人物や文字の見え方を目視確認します。iOS Safari実機は未検証です。
