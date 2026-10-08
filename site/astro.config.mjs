// @ts-check
import { defineConfig } from 'astro/config';

// 公開先: Cloudflare Pages（プロジェクト名 aibou-ai）。独自ドメインにしたらここを変える。
export default defineConfig({
  site: 'https://aibou-ai.pages.dev',
  build: { inlineStylesheets: 'always' },
});
