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
  /** 代表の似顔絵（public/ 以下のパス。例：'/owner.webp'）。空のあいだは頭文字の丸を出す */
  ownerIllustration: '/owner.webp',
  /** 代表紹介（トップ・AIBOUとは で使う） */
  ownerBio:
    '製造・人事総務・営業・運送の現場を6社で経験。前職の運送会社では配車・請求・DXを担当し、配車の連絡や在庫管理の仕組みを自分で作って現場で動かしてきました。ITの専門家というより「現場の困りごとを一緒に片づける人」として、隣で手を動かします。',
  bookingUrl: 'https://calendar.app.google/BoqLTYmykRKZVpJb9',
  lineUrl: 'https://lin.ee/R67gFib',
  noteUrl: 'https://note.com/shogo_ai',
  noteRss: 'https://note.com/shogo_ai/rss',
  gaId: 'G-DV61552QWH',
  consultHours: '平日夜（18:00〜22:00）と土日',
};

// まだ決まっていない値。公開前に必ず書き換える（残っているとビルド時に警告が出る）
export const TBD = '【未定】';

export const nav = [
  { href: '/services/', label: 'サービス' },
  { href: '/industry/', label: '業種別' },
  { href: '/pricing/', label: '料金' },
  { href: '/made/', label: 'つくったもの' },
  { href: '/column/', label: 'コラム' },
];

// フッターにだけ出すページ
export const footNav = [
  { href: '/works/', label: '実績' },
  { href: '/about/', label: 'AIBOUとは' },
];

// 無料相談の流れ（トップとサービスページで共通）
export const consultSteps = [
  { title: '日時を選んで予約', body: '空いている枠をタップするだけ。約1分で予約完了です。' },
  { title: '当日、オンラインで30分', body: '予約と同時にGoogle MeetのURLが自動で届きます。顔出しは任意、スマホ参加もOKです。' },
  { title: '道筋を持ち帰る', body: '「まず何から始めるか」を整理してお渡しします。売り込みはしません。' },
];

// 料金。金額はすべて税込。未定のものは TBD のまま（公開前に埋める）
export const pricing = {
  /** AI導入（初期費用） */
  introSolo: '165,000円〜',
  advisor: '月55,000円〜',
  /** 顧問の打ち合わせの回数と形 */
  advisorMeetings: '月2回の打ち合わせ（訪問またはオンライン）',
  /** 顧問で対応する作業時間の上限。超えた分は別にお見積り */
  advisorWorkHours: '月8時間まで',
};

// 未定の金額が残っていたら、ビルドのたびに知らせる
{
  const left = Object.entries(pricing).filter(([, v]) => v.includes(TBD)).map(([k]) => k);
  if (left.length > 0) console.warn(`[AIBOU] 料金に未定の項目があります（src/data/site.ts の pricing）: ${left.join(', ')}`);
}

export type ServiceStep = 'start' | 'keep' | 'build';

export interface Service {
  id: string;
  /** 旧ページのリンク（#booking-pack など）を壊さないための別名 */
  aliases?: string[];
  step?: ServiceStep;
  stepLabel?: string;
  name: string;
  summary: string;
  /** 「こんな方に」 */
  forWho?: string[];
  price: string;
  priceNote?: string;
  /** 含まれるもの */
  details: string[];
  /** 含まれないもの */
  excludes?: string[];
  /** 料金の内訳（オーダーメイド制作の目安など） */
  priceRows?: { label: string; price: string }[];
}

export const consult = {
  id: 'consult',
  name: '無料30分相談（業務診断）',
  summary: '仕事の話を聞いて、AIや仕組みで軽くできる作業と、そのやり方をその場でお見せします。',
  price: '0円',
  details: [
    'いまの仕事の流れと、時間を取られている作業を伺います',
    '「見積書づくり」「予約の連絡」「日報」など、AIや仕組みで軽くできる所を一緒に探します',
    '実際の使い方を画面共有でお見せします。持ち帰って、その日から真似できます',
  ],
};

// 商品は3つだけ。AI導入ではじめて、AI顧問でつづける。大きく作るときはオーダーメイド制作。
export const services: Service[] = [
  {
    id: 'intro',
    aliases: ['booking-pack', 'automation'],
    step: 'start',
    stepLabel: 'STEP 1・はじめる',
    name: 'AI導入',
    summary: 'AIの初期設定と社内の使い方ルールづくりに加えて、時間を取られている業務をひとつ自動化します。',
    forWho: ['何から始めればいいか分からない', '電話や紙の受付・連絡を減らしたい', 'AIを社内で使える状態にしたい'],
    price: pricing.introSolo,
    priceNote: '自動化する業務の大きさによって変わります。無料相談のあとでお見積りします。',
    details: [
      '業務の棚卸し（どこに時間がかかっているかを一緒に洗い出す）',
      'AIの初期設定と、社内での使い方ルールづくり',
      '業務をひとつ自動化（予約・申込の受付とLINEでのご案内／顧客台帳／Excel・スプレッドシートの集計／業務マニュアルづくり などから選択）',
      '使い方マニュアル',
      '導入後の効果ふりかえり面談（減った時間を一緒に確認します）',
    ],
  },
  {
    id: 'advisor',
    step: 'keep',
    stepLabel: 'STEP 2・つづける',
    name: 'AI顧問',
    summary: '月2回の打ち合わせとチャットで、仕組みの改善に加えて、業務マニュアルづくりや補助金を使う計画づくりまで現場目線で支えます。社内の「改善担当」を外に持つ感覚です。',
    forWho: ['導入したけれど使いこなせていない', '業務のやり方そのものを見直したい', '補助金を使った設備・IT投資を考えている'],
    price: `${pricing.advisor}`,
    priceNote: `作った仕組みの保守・不具合対応も含みます。修正・資料づくりなどの作業は${pricing.advisorWorkHours}で、超えた分は別にお見積りします。`,
    details: [
      pricing.advisorMeetings,
      'チャットでの質問対応',
      '使い方の指導と、新しいAIを使うべきかどうかの判断',
      '作った仕組みの保守・不具合対応と、小さな修正・追加',
      '業務マニュアルづくり（現場のやり方を聞き取って文書にします）',
      '業務改善の提案（時間を取られている作業の洗い出しと、次に自動化する作業の優先順位づけ）',
      '補助金を使う計画づくり・現場の整理の支援（どの業務に何を入れるかの整理や、事業計画の材料づくり）',
    ],
    excludes: [
      '新しい仕組みを一から作ること → オーダーメイド制作で別にお見積り',
      '補助金の申請書の作成代行（必要な場合は専門家をご紹介します）',
    ],
  },
  {
    id: 'custom',
    aliases: ['web'],
    step: 'build',
    stepLabel: '必要なときに・つくる',
    name: 'オーダーメイド制作',
    summary: '顧問の範囲を超える仕組みや、ホームページ・LPを一から作ります。',
    forWho: ['専用の業務アプリやツールがほしい', 'ホームページやLPを作りたい・作り直したい'],
    price: 'お見積り',
    priceNote: '無料相談のあとで、内容と金額をお見積りします。保守は月額でご相談できます。',
    details: [
      '自社ツール・業務アプリ（在庫・請求・顧客管理など）',
      'ホームページ（数ページの会社サイト）',
      'LP（1ページ）。スクロールに合わせて映像が進むような演出も可能です',
      '予約ボタンやLINE公式アカウントへの導線までまとめて設計します',
    ],
    priceRows: [
      { label: '業務の自動化（1つの作業あたり）', price: '55,000円〜' },
      { label: 'LP（1ページ）', price: '77,000円〜' },
      { label: 'ホームページ・自社ツール', price: 'お見積り' },
    ],
  },
];

// ご依頼の流れ（料金ページ）
export const orderSteps = [
  { title: '無料30分相談', body: 'オンラインで、困っている作業を一緒に洗い出します' },
  { title: 'ご提案・お見積り', body: '自動化する業務と、金額を決めます' },
  { title: 'AI導入', body: '仕組みを作り、最後に効果をふりかえります' },
  { title: 'AI顧問', body: '次の自動化を毎月すすめます' },
];

export interface Work {
  name: string;
  kind: string;
  url: string;
  description: string;
  points: string[];
  image?: string;
}

// 制作サンプル。すべて架空の会社・ブランド・お店。埋め込まず、別タブで開く（スクロール演出がぶつかるため）。
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
  {
    name: 'hair salon ソラ',
    kind: '美容室のWebサイト',
    url: '/samples/salon/',
    description: 'スクロールに合わせて、カウンセリングからシャンプー・カット・カラー・仕上がりまでの流れが映像で進む美容室のサイトです。予約はLINEで受け付ける想定です。',
    points: ['架空のお店', '写真・映像はAI（Google Flow）で生成', 'LINE予約の導線'],
    image: '/works/salon-sora.jpg',
  },
  {
    name: 'ととのい整体院',
    kind: '整体院のWebサイト',
    url: '/samples/seitai/',
    description: 'スクロールに合わせて、問診から施術、おうちでのセルフケアまでの流れが映像で進む整体院のサイトです。予約はLINEで受け付ける想定です。',
    points: ['架空のお店', '写真・映像はAI（Google Flow）で生成', 'LINE予約の導線'],
    image: '/works/seitai-totonoi.jpg',
  },
];

export interface Metric {
  before: string;
  after: string;
  label: string;
  /** この取り組みを書いた記事（あれば） */
  note?: string;
}

// 業務改善の実績（会社名は出さない）。数字は記録が残っているものだけ載せる
export const results = {
  /** 大きく見せる数字。すべて前職（運送会社）での自社の取り組み */
  metrics: [
    {
      before: '約80分',
      after: '10〜15分',
      label: '配車表づくりを、Excelの自動化で短縮',
      note: 'https://note.com/shogo_ai/n/n3726eb04e7ce',
    },
    {
      before: '毎朝30分の電話',
      after: 'ゼロ',
      label: 'ドライバー約10名への配車の連絡を、LINEで自動化',
      note: '/column/dispatch-line-bot/',
    },
    {
      before: '約30分',
      after: '約1分',
      label: '運賃・高速代の照合を、Excelの自動化で短縮',
    },
  ] as Metric[],
  /** 数字の注記（打消し表示） */
  metricNote: '※ 定方の前職（運送会社）での自社の取り組みです。効果は業務の内容や量によって変わります。',
  facts: [
    'デジタコ（運行記録計）のデータ分析による燃費改善',
    'テールゲートリフター補助金の申請、ホワイト物流・健康経営の認定取得',
  ],
  ongoing: 'サロン業の2社を、月額で継続して支援しています',
};

export interface Faq { q: string; a: string }

export const faqs: Faq[] = [
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

// 料金ページのよくある質問
export const pricingFaqs: Faq[] = [
  {
    q: 'AI顧問の料金に、新しい仕組みづくりは含まれますか？',
    a: `含まれるのは、${pricing.advisorMeetings}、チャット相談、作った仕組みの保守、業務マニュアルづくりや改善の提案などで、作業は${pricing.advisorWorkHours}です。新しく作るものは別にお見積りします。`,
  },
  {
    q: 'なぜ月55,000円からなのですか？',
    a: 'AIの使い方の相談だけでなく、月2回の打ち合わせで現場の仕事の流れに入り、マニュアルづくりや補助金を使う計画づくりまで一緒に進めるためです。社内に改善担当を一人置くよりも小さな負担で、改善を止めずに続けられる形にしています。',
  },
  {
    q: '補助金の申請もお願いできますか？',
    a: 'どの業務に何を入れるかの整理や、事業計画の材料づくりなど、現場目線の準備をお手伝いします。申請書の作成代行は行っていないため、必要な場合は専門家をご紹介します。',
  },
  {
    q: 'AI導入だけの依頼もできますか？',
    a: 'できます。その場合、導入後の修正や不具合への対応は、その都度お見積りになります。',
  },
  {
    q: 'パソコンが苦手でも使えますか？',
    a: 'スマホとLINEで使える形を基本に作ります。新しいアプリを覚えていただく必要が出ないように設計します。',
  },
  {
    q: '打ち合わせはどこでしますか？',
    a: '無料相談はオンライン（Google Meet）です。AI顧問の打ち合わせは、訪問とオンラインのどちらでも選べます。オンラインの場合、顔出しは任意です。',
  },
];

export interface Voice {
  case: string;
  context: string;
  headline: string;
  person: string;
  body: string[];
  topics: string[];
  note?: string;
}

// いただいた声。CASE 01 は AIBOU のお客さまではなく、独立前の前職での取り組み（その旨を注記で明示する）
export const voices: Voice[] = [
  {
    case: 'CASE 01',
    context: '運送業・従業員30名規模（前職での取り組み）',
    headline: '毎月の集計に追われる時間が、経営を考える時間に変わりました。',
    person: '代表取締役・50代男性',
    body: [
      'これまでは、ドライバーの日報や運行データの確認、Excelへの転記などにかなりの時間を使っていました。',
      '社内でDXを担当していた定方さんから、今あるExcelを活かしながら、集計や確認作業を効率化する仕組みを提案してもらえました。',
      '特によかったのは、単にAIを導入するのではなく、現場の仕事の流れを理解したうえで考えてくれたことです。',
      '今では数字を確認する時間が減り、ドライバーの働き方や会社の利益について考える余裕が生まれました。',
    ],
    topics: ['日報集計の効率化', 'Excel業務の自動化', '経営データの可視化'],
    note: '※ 定方がAIBOUとして独立する前に、運送会社のDX担当として社内で取り組んだ事例です。',
  },
  {
    case: 'CASE 02',
    context: '美容サロン・3店舗運営',
    headline: '相談相手が一人増えたような感覚です。考える仕事に集中できるようになりました。',
    person: 'オーナー・30代女性',
    body: [
      '店舗が増えるにつれて、売上の確認、スタッフへの連絡、SNSの投稿、キャンペーンの企画など、やることがどんどん増えていました。',
      'AIBOUさんには、店舗ごとの数字をまとめる仕組みと、SNSの文章や企画案をAIで作る仕組みを整えてもらいました。',
      '最終的な判断は自分でするのですが、そこまでの準備を手伝ってもらえるだけで、気持ちがかなり楽になりました。',
      '外部にもう一人、仕事を理解してくれるスタッフがいるような安心感があります。',
    ],
    topics: ['売上ダッシュボード', 'SNS投稿支援', '販促企画のAI活用'],
  },
];
