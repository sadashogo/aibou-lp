# AIBOU ホームページ（site/）

Astro の静的サイト。トップ／サービス／実績／AIBOUについて の4ページ。

- 公開先: Cloudflare Pages（プロジェクト名 `aibou` → https://aibou.pages.dev ）。`main` ブランチを自動公開
- Cloudflare の設定: Root directory `site` / Framework「Astro」/ Build `npm run build` / Output `dist`
- 文章・料金・リンク（予約・LINE）: `src/data/site.ts` だけを直せば全ページに反映される
- 料金の目安を載せるとき: `services[].price` を「◯万円〜」のように書き換える
- 色・書体: `src/styles/global.css` の `:root`
- 制作サンプルは iframe で埋め込まない（スクロール演出がホームページ側のスクロールとぶつかるため）。別タブで開くリンクにする

```bash
npm install
npm run dev      # 開発サーバー
npm run build    # dist/ に書き出し
```
