export interface SiteData {
  brandTitle: string;
  brandSub: string;
  title: string;
  description: string;
  headerCtaLabel: string;
  headerCtaHref: string;
  bookingUrl: string;
}

export const site: SiteData = {
  brandTitle: 'THE RIGHT HAND',
  brandSub: '｜ 経営専任AI顧問室',
  title: 'THE RIGHT HAND — 経営専任AI顧問室',
  description:
    '流行のツールを追うのではなく、自社専任の「右腕」を築く。経営者のためのAI投資セカンドオピニオンと、社内専用AIの実装顧問。',
  headerCtaLabel: '対話の要請',
  headerCtaHref: '#inquiry',
  bookingUrl: 'https://calendar.app.google/BoqLTYmykRKZVpJb9',
};
