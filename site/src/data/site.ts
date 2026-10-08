// サイトの文章・リンクはここにまとめる。料金の目安を載せるときは services[].price を書き換える。

export const site = {
  name: 'AIBOU',
  nameKana: 'アイボウ',
  tagline: '経営者の隣に、AIの相棒を。',
  title: 'AIBOU（アイボウ）｜小さな会社と個人事業主のAI・デジタル支援',
  description:
    'AIの使い方の相談から、業務の自動化、LINE公式アカウントやWebサイトづくりまで。小さな会社と個人事業主の仕事を、隣で一緒に軽くします。無料30分相談受付中。',
  url: 'https://aibou.pages.dev',
  owner: '定方 翔吾',
  bookingUrl: 'https://calendar.app.google/BoqLTYmykRKZVpJb9',
  lineUrl: 'https://lin.ee/uCJpe5v',
  gaId: 'G-DV61552QWH',
  consultHours: '平日夜（18:00〜22:00）と土日',
};

export const nav = [
  { href: '/services/', label: 'サービス' },
  { href: '/works/', label: '実績' },
  { href: '/about/', label: 'AIBOUについて' },
];

export interface Service {
  id: string;
  name: string;
  summary: string;
  price: string;
  details: string[];
  examples?: string[];
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
    id: 'automation',
    name: '業務の自動化・LINE公式アカウントの構築',
    summary: '毎日くり返している手作業を、仕組みに置きかえます。',
    price: '内容を伺ってからお見積り',
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
    price: '内容を伺ってからお見積り',
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
    price: '内容を伺ってからお見積り',
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
    description: 'スクロールに合わせて映像が進む、運送会社のWebサイトの制作サンプルです。',
    points: ['架空の会社', 'スクロール連動の映像演出'],
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
