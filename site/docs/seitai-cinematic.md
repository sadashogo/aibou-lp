# ととのい整体院：実写スクロール版

対象：`/samples/seitai/`。ブランド・料金・予約サンプルを維持し、冒頭から日常までを実写ストック動画で構成しています。

## 構成

1. 木漏れ日の道：自分をいたわる時間への導入。
2. 相談：ゆっくり話を聴く。
3. 動きの確認：立った状態で腕や身体の動きを確認。
4. からだのケア：支えながら肩を動かす場面。
5. セルフケア：自宅で身体を動かす場面。
6. いつもの日常：公園の道を歩く。

各4秒、計24秒の無音動画。スクロールを止めると動画も停止し、逆スクロールで戻ります。首・背骨の矯正、医療機器、強い施術を示す映像は使用していません。別々のストック素材を並べた利用の流れのイメージで、同一の利用者や院での実録、施術効果の実証ではありません。

## 実装

- `src/components/samples/SeitaiFilmStory.astro`：整体専用の構図・画面。
- `src/scripts/seitai-film.ts`：スクロール・章移動・動画シーク。
- `src/data/samples/seitai-film.ts`：動画・ポスター・英語ラベル。
- `src/data/samples/seitai.ts`：院の情報と日本語の文章。
- `public/samples/seitai/film/`：動画と静止画。

動画はfetchしてBlob URLに変換するため、HTTP Range非対応の配信経路でもシークできます。ライブラリは追加せず、requestAnimationFrameでスクロールをなめらかに反映します。停止時は連続描画しません。動きを減らす設定・JavaScript無効では6章を縦に並べ、動画を取得しません。動画の読込に失敗した場合は章ごとのポスターを表示します。

`ShopPage.astro` は任意のstoryスロットとcinematic設定、`SampleBase.astro` は任意の素材説明・headスロットを追加。美容室など他のサンプルは従来の表示を維持します。

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

確認項目：各章と映像区間の一致、同じ章内の映像進行、逆スクロール、章の移動、予約サンプルのダイアログ、390px/320px幅、動きを減らす設定の切替、JavaScript無効、動画読込失敗時のポスター、美容室ページの従来構成。iOS Safari実機では未検証です。
