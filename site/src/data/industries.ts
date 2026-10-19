// 業種別ページ（/industry/<slug>/）のデータ。業種を増やすときは、ここに1件足すだけでページができる。
// 追加の目安：その業種の実例か見本が1つ以上あり、よくある質問が3つ書けること。中身の薄いページは作らない。
// 事例は「つくったもの」（made.ts）の事実だけで書く。数字も記録にあるものだけ。

import type { Faq } from './site';

export type IndustryIcon = 'truck' | 'scissors';

export interface Solution {
  label: string;
  title: string;
  body: string;
  /** いま → 導入後（記録にある数字・事実だけ） */
  before?: string;
  after?: string;
}

export interface Industry {
  slug: string;
  name: string;
  /** 一覧カードの一言 */
  short: string;
  icon: IndustryIcon;
  /** 見出し。mark は黄色いマーカーを引く部分 */
  heading: { before: string; mark: string; after: string };
  lead: string;
  /** 事例の出どころの注記 */
  sourceNote?: string;
  pains: string[];
  solutions: Solution[];
  /** made.ts の id。ページ下部に「つくったもの」として出す */
  madeIds: string[];
  /** site.ts の voices の case。あれば声を1つ出す */
  voiceCase?: string;
  /** 進め方：AI導入で何から始め、顧問で何に広げるか */
  start: { intro: string; advisor: string };
  faqs: Faq[];
  /** 検索結果に出る説明文 */
  description: string;
}

export const industries: Industry[] = [
  {
    slug: 'transport',
    name: '運送業',
    short: '配車の連絡・請求・倉庫の手間を減らす',
    icon: 'truck',
    heading: { before: '配車・請求・倉庫の', mark: '「確認の手間」', after: 'を減らす' },
    lead: '運送会社のDX担当として、配車や請求、倉庫の仕組みを自分で作って現場で動かしてきました。いまのExcelや仕事の流れを活かしたまま、ひとつずつ置きかえます。',
    sourceNote: 'このページの事例は、定方がAIBOUとして独立する前に、運送会社のDX担当として社内で作ったものです。',
    pains: [
      '毎朝、ドライバー一人ひとりに電話で配車を伝えている',
      '配車表と請求の運賃を、毎月手で照らし合わせている',
      '請求の締めを、荷主ごとに1件ずつ処理している',
      '倉庫の在庫と荷出しを、転記と暗算で回している',
    ],
    solutions: [
      {
        label: '配車',
        title: '配車の連絡を、LINEで済ませる',
        body: 'Excelの配車表を読み込んでおくと、ドライバーがLINEで名前か車番を送るだけで、その日の配車がカードで届きます。',
        before: '毎朝 約30分の電話',
        after: 'LINEで完結',
      },
      {
        label: '配車表',
        title: '配車表づくりを、Excelの自動化で短縮',
        body: 'いまお使いのExcelを活かしたまま、集計や転記の手作業を自動にします。',
        before: '約80分',
        after: '10〜15分',
      },
      {
        label: '請求',
        title: '運賃の照合と請求の締めを、まとめて',
        body: '荷主とエリアから、あるべき運賃を料金表で引いて自動で照合し、違う行に印を付けます。締め処理も荷主ごとではなく一括で。',
        before: '照合 月約30分',
        after: '約1分',
      },
      {
        label: '倉庫',
        title: '在庫と荷出しを、スマホで見える化',
        body: '出庫明細のメールを自動で取り込んで在庫を引き、品番ごとに「○パレット＋バラ○ケース」をスマホに大きく表示します。',
      },
    ],
    madeIds: ['dispatch-line', 'warehouse', 'billing-close'],
    voiceCase: 'CASE 01',
    start: {
      intro: '配車の連絡をLINEにする、など1つから',
      advisor: '請求・倉庫・日報へ、少しずつ広げる',
    },
    faqs: [
      {
        q: '年配のドライバーでも使えますか？',
        a: 'ふだん使っているLINEで、名前か車番を送るだけの形にしています。新しいアプリを覚えてもらう必要はありません。',
      },
      {
        q: 'いまの配車表（Excel）はそのまま使えますか？',
        a: 'はい。配車確認のLINE Botも、いまあるExcelの配車表を読み込む形で作りました。表の作り方を大きく変えずに始められます。',
      },
      {
        q: 'いま使っている業務システムに手を入れますか？',
        a: '基本は、いまのシステムやExcelはそのままに、その外側に仕組みを足します。請求の一括締めツールも、既存の業務システム本体には手を加えずに作りました。',
      },
      {
        q: '運送業の事例は、お客さまの事例ですか？',
        a: 'いいえ。定方がAIBOUとして独立する前に、運送会社のDX担当として社内で作ったものです。現場で毎日使われる形にするところまで、自分で手を動かしてきました。',
      },
    ],
    description:
      '運送会社の配車の連絡、配車表づくり、運賃の照合と請求の締め、倉庫の在庫と荷出しを、LINEやExcelの自動化で軽くします。運送会社のDX担当として現場で作ってきた事例つき。',
  },
  {
    slug: 'beauty',
    name: '美容業',
    short: '予約・顧客台帳・再来店のご案内を自動に',
    icon: 'scissors',
    heading: { before: '予約と顧客管理の', mark: '事務を、', after: 'LINEで自動に' },
    lead: 'サロン・整体院・教室の、予約の受付、前日のリマインド、来店後のご案内、顧客台帳までを、いつものLINEとスプレッドシートでまとめて自動にします。',
    pains: [
      '施術中・接客中に、予約の電話が鳴る',
      '当日のキャンセルや、無断キャンセルが痛い',
      '予約の確認やリマインドを、手で送っている',
      '来店後のお礼や、次回のご案内まで手が回らない',
    ],
    solutions: [
      {
        label: '予約',
        title: '予約の受付とリマインドを、LINEで自動に',
        body: 'フォームからの予約をスプレッドシートに自動で記録し、受付完了のご案内と、前日・当日のリマインドをLINEで自動送信します。',
      },
      {
        label: '顧客台帳',
        title: '顧客台帳と回数券を、ブラウザで管理',
        body: '来店・回数券・物販の記録をまとめて管理。回数券の残りは記録から自動で計算するので、手で直して食い違うことがありません。',
        before: 'Excelの数字が静かに間違う',
        after: '記録から自動計算',
      },
      {
        label: '再来店',
        title: '常連・休眠のお客さまを分けて、再来のご案内',
        body: '来店履歴から常連・休眠を自動で分け、しばらく来ていないお客さまに再来のご案内を送れるようにします。',
      },
      {
        label: '数字',
        title: 'お店の数字を、毎月レポートに',
        body: '売上や来店の状況を月ごとにまとめてお届けします。店舗ごとの数字の確認が楽になります。',
      },
    ],
    madeIds: ['salon-customer', 'salon-report', 'sample-salon', 'sample-seitai'],
    voiceCase: 'CASE 02',
    start: {
      intro: '予約の受付とリマインドの自動化から',
      advisor: '顧客台帳・再来店のご案内・月次の数字へ広げる',
    },
    faqs: [
      {
        q: 'お客さまにアプリを入れてもらう必要はありますか？',
        a: 'ありません。お客さまはいつものLINEでやり取りするだけです。',
      },
      {
        q: 'お客さまのデータはどこに置かれますか？',
        a: '予約・申込の自動化では、データはすべてお店のアカウント（LINE公式・Googleのスプレッドシートなど）に置きます。',
      },
      {
        q: '整体院や教室でも使えますか？',
        a: '使えます。予約を受けて、前日にお知らせし、来店後にご案内する流れは同じです。講座・セミナーや説明会の申込にも使えます。',
      },
    ],
    description:
      'サロン・整体院・教室の予約受付、前日のリマインド、来店後のご案内、顧客台帳と回数券の管理を、LINEとスプレッドシートで自動にします。群馬から、オンラインで。',
  },
];

export const findIndustry = (slug: string) => industries.find((i) => i.slug === slug);
