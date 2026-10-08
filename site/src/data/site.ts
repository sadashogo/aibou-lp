// サイトの文章・リンクはここにまとめる。料金の目安を載せるときは services[].price を書き換える。

export const site = {
  name: 'AIBOU',
  nameKana: 'アイボウ',
  tagline: '経営者の隣に、AIの相棒を。',
  title: 'AIBOU（アイボウ）｜小さな会社と個人事業主のAI・デジタル支援',
  description:
    'AIの使い方の相談から、業務の自動化、LINE公式アカウントやWebサイトづくりまで。小さな会社と個人事業主の仕事を、隣で一緒に軽くします。無料30分相談受付中。',
  url: 'https://aibou-ai.pages.dev',
  owner: '定方 翔吾',
  bookingUrl: 'https://calendar.app.google/BoqLTYmykRKZVpJb9',
  lineUrl: 'https://lin.ee/R67gFib',
  gaId: 'G-DV61552QWH',
  consultHours: '平日夜（18:00〜22:00）と土日',
};

export const nav = [
  { href: '/services/', label: 'サービス' },
  { href: '/works/', label: '実績' },
  { href: '/about/', label: 'AIBOUについて' },
];

// 自動化パックのモニター枠。決まるたびに remaining を減らす。0 にするとモニター価格の文言が消える。
export const packMonitor = { remaining: 3, price: '55,000円（税込）' };

export interface Service {
  id: string;
  name: string;
  summary: string;
  price: string;
  priceNote?: string;
  details: string[];
  extra?: string;
}

export const services: Service[] = [
  {
    id: 'consult',
    name: '無料30分AI相談',
    summary: '仕事の話を聞いて、AIで楽にできる作業と、そのやり方をその場でお見せします。',
    price: '0円',
    details: [
      'いまの仕事の流れと、時間を取られている作業を伺います',
      '「見積書づくり」「問い合わせの返信」「日報」など、AIで軽くできる所を一緒に探します',
      '実際の使い方を画面共有でお見せします。持ち帰って、その日から真似できます',
    ],
  },
  {
    id: 'booking-pack',
    name: '予約・申込の事務 自動化パック',
    summary:
      '講座・セミナー、サロン・整体・教室、説明会や体験会を開く小さな会社向け。LINE公式・フォーム・スプレッドシートで、予約・申込まわりの事務をまとめて自動にします。',
    price: '初期 165,000円（税込） ＋ 保守 月11,000円（税込・任意）',
    priceNote: `${packMonitor.remaining > 0 ? `先着3社はモニター価格 ${packMonitor.price}。` : ''}月額のツール代はかからず、データはすべてお客さまのアカウントに置きます。`,
    details: [
      '申込・予約の受付（フォームからスプレッドシートに自動で記録）',
      'LINEで受付完了・ご案内を自動送信',
      '前日・当日のリマインド（日時・URL）',
      '入金管理（済／未済の一覧）と、未入金の方への催促文',
      '終了後のアンケートと次回のご案内',
      '顧客台帳（来店・受講履歴の自動追記、常連・休眠・未入金の分類）と、休眠客への再来案内',
    ],
    extra: '専用画面・ログイン付きのシステム、売上分析、他のソフトとの連携は個別にお見積りします。',
  },
  {
    id: 'automation',
    name: '業務の自動化・LINE公式アカウントの構築',
    summary: '毎日くり返している手作業を、仕組みに置きかえます。',
    price: '55,000円〜（税込）',
    priceNote: '業務の自動化は1つの作業あたり、LINE公式アカウントは初期設定一式の目安です。内容を伺ってからお見積りします。',
    details: [
      'Excel・スプレッドシートの集計や月次処理の自動化',
      'LINE公式アカウントでの予約・問い合わせの受付、自動返信',
      'Webサイトからのデータ取得など、ブラウザ操作の自動化',
      '業務マニュアルづくり（引き継ぎや新人教育に）',
    ],
  },
  {
    id: 'web',
    name: 'Webサイト・LP制作',
    summary: 'お店や会社の紹介ページ、サービスのLPをつくります。スマホで見やすく、表示が速いことを重視します。',
    price: '1ページのLP 77,000円〜（税込）',
    priceNote: 'スクロールに合わせて映像が進むような演出や、数ページの会社サイトは、内容を伺ってからお見積りします。',
    details: [
      '1ページのLPから、数ページの会社サイトまで',
      'スクロールに合わせて映像が進むような、印象に残る演出も可能です',
      '予約ボタンやLINE公式アカウントへの導線までまとめて設計します',
    ],
  },
  {
    id: 'advisor',
    name: '月額サポート（AI顧問）',
    summary: '月1回のオンライン定例で、AIの使い方や新しいツールを入れるべきかを一緒に判断します。',
    price: '月22,000円〜（税込）',
    priceNote: '月1回のオンライン定例が基本です。相談の頻度や作業の量に合わせてお見積りします。',
    details: [
      '進行中の見積書や提案を中立の立場で見直し、過剰な投資を削ります',
      '業務手順や過去の記録を、AIが使える形に整理します',
      '社外に情報を出さない仕組みを整えたうえで、中心の業務を自動化します',
      '月次の定例で、最新のAIを使うべきかどうかを判断します',
    ],
  },
];

export interface Work {
  name: string;
  kind: string;
  url: string;
  description: string;
  points: string[];
  image?: string;
}

// 制作サンプル。どちらも架空の会社・ブランド。埋め込まず、別タブで開く（スクロール演出がぶつかるため）。
export const works: Work[] = [
  {
    name: '赤城急送',
    kind: '運送会社のWebサイト',
    url: 'https://akagi-express.pages.dev/',
    description: '夜間の幹線輸送を担う運送会社を想定したWebサイトです。スクロールに合わせて映像が進み、画面の隅に走行距離と時刻を表示しています。',
    points: ['架空の会社', 'スクロール連動の映像演出'],
    image: '/works/akagi-express.jpg',
  },
  {
    name: 'MAISON KUROGANE',
    kind: 'オーダースーツ店のWebサイト',
    url: 'https://maison-kurogane.pages.dev/',
    description:
      'スクロールに合わせて映像がコマ送りで進み、採寸から仕立てまでの流れを見せるオーダースーツ店のサイトです。',
    points: ['架空のブランド', '映像はAI（Google Veo）で生成', 'スマホ・PC対応'],
    image: '/works/maison-kurogane.jpg',
  },
];

// 業務改善の実績（会社名は出さない）
export const results = {
  metric: { value: '約80分 → 10〜15分', label: '運送会社の配車作業を、Excelの自動化で短縮' },
  facts: [
    'デジタコ（運行記録計）のデータ分析による燃費改善',
    'テールゲートリフター補助金の申請、ホワイト物流・健康経営の認定取得',
  ],
  built: ['業務を自動化するLINE Bot', 'Excel VBAによる月次処理の自動化', 'Chrome拡張', 'ブラウザ操作の自動化によるデータ取得', '業務マニュアル作成ツール'],
  ongoing: 'サロン業の2社を、月額で継続して支援しています',
};

export const faqs = [
  {
    q: '本当に無料？あとから請求されない？',
    a: 'はい、30分の相談は完全に無料です。相談後に費用が発生することは一切ありません。',
  },
  {
    q: 'パソコンやITが苦手でも大丈夫？',
    a: '大丈夫です。専門用語を使わずにお話しします。準備も不要で、「いま困っていること」を頭に浮かべて来ていただくだけでOKです。',
  },
  {
    q: 'しつこい営業をされない？',
    a: 'しません。相談の最後に「もし続けたい場合」の選択肢を1分ほどご紹介するだけで、その後こちらから何度も連絡することはありません。',
  },
];
