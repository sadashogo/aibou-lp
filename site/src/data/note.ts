// note の新着記事を、サイトを書き出すとき（ビルド時）に RSS から読む。
// 読めないとき（5秒以上かかる・失敗する）は空の配列を返し、画面には「noteを読む」リンクだけを出す。

export interface NoteArticle {
  title: string;
  url: string;
  date: string; // 例: 2026.10.06
}

const pick = (xml: string, tag: string) => {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  if (!m) return '';
  return m[1].replace(/^<!\[CDATA\[|\]\]>$/g, '').trim();
};

const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

export async function getNoteArticles(rssUrl: string, limit = 3): Promise<NoteArticle[]> {
  try {
    const res = await fetch(rssUrl, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.match(/<item[\s>][\s\S]*?<\/item>/g) ?? [];
    return items
      .slice(0, limit)
      .map((item) => {
        const d = new Date(pick(item, 'pubDate'));
        return {
          title: decode(pick(item, 'title')),
          url: pick(item, 'link'),
          date: Number.isNaN(d.getTime())
            ? ''
            : `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`,
        };
      })
      .filter((a) => a.title && /^https:\/\/note\.com\//.test(a.url));
  } catch {
    return [];
  }
}
