// サイト内コラム（src/pages/column/*.md）の一覧を読む。
// 記事を足すときは src/pages/column/ に .md を1つ置くだけ（書き方は src/pages/column/_template.md を参照）。

export interface Column {
  url: string;
  title: string;
  description: string;
  /** 例: 2026-10-20 */
  date: string;
  /** 一覧に出す分類（業種名や「AIの基本」など） */
  tag?: string;
  draft?: boolean;
}

interface ColumnModule {
  url?: string;
  frontmatter: Omit<Column, 'url'>;
}

export function getColumns(limit?: number): Column[] {
  const mods = import.meta.glob<ColumnModule>('../pages/column/*.md', { eager: true });
  const list = Object.values(mods)
    .filter((m) => m.url && !m.frontmatter.draft)
    .map((m) => ({ ...m.frontmatter, url: m.url! }))
    .sort((a, b) => b.date.localeCompare(a.date));
  return limit ? list.slice(0, limit) : list;
}

export const formatDate = (d: string) => d.replaceAll('-', '.');
