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
  ownerIllustration: '',
  /** 代表紹介（トップ・AIBOUとは で使う） */
  ownerBio:
    '製造・人事総務・営業・運送の現場を6社で経験。運送会社では配車・請求・DXを担当し、配車の連絡や在庫管理の仕組みを自分で作って現場で動かしてきました。ITの専門家というより「現場の困りごとを一緒に片づける人」として、隣で手を動かします。',
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
  /** AI導入を単体で頼むとき */
  introSolo: TBD,
  /** AI導入をAI顧問とセットで頼むとき（顧問の最低契約期間が条件） */
  introSet: TBD,
  /** セット価格の条件になる、顧問の最低契約期間（例：6ヶ月） */
  advisorMinTerm: TBD,
  advisor: '月30,000円',
  /** 顧問で対応する小さな修正・追加の上限（例：月2時間まで） */
  advisorSmallFixes: TBD,
  /** 顧問の契約中にオーダーメイド制作を頼むときの割引（例：10%引き） */
  customDiscount: TBD,
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
    price: `${pricing.introSolo}（AI顧問とセットなら ${pricing.introSet}）`,
    priceNote: `セット価格は、AI顧問を${pricing.advisorMinTerm}以上ご契約いただく場合です。`,
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
    summary: '毎月の相談とチャットで、作った仕組みの修正や小さな追加を続けます。社内の「AI担当」を外に持つ感覚です。',
    forWho: ['導入したけれど使いこなせていない', '気軽に聞ける相手がほしい', '少しずつ自動化を増やしたい'],
    price: `${pricing.advisor}`,
    priceNote: '作った仕組みの保守・不具合対応も含みます。',
    details: [
      '月1回のオンライン定例',
      'チャットでの質問対応',
      '使い方の指導と、新しいAIを使うべきかどうかの判断',
      '作った仕組みの保守・不具合対応',
      `小さな修正・追加（${pricing.advisorSmallFixes}）`,
    ],
    excludes: [`新しい仕組みを一から作ること → オーダーメイド制作で別にお見積り（顧問の契約中は${pricing.customDiscount}）`],
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

// 業務改善の実績（会社名は出さない）
export const results = {
  metric: {
    value: '約80分 → 10〜15分',
    label: '運送会社の配車作業を、Excelの自動化で短縮',
    /** この取り組みを書いた note 記事 */
    note: 'https://note.com/shogo_ai/n/n3726eb04e7ce',
  },
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
    a: `含まれるのは、相談・使い方の指導・作った仕組みの保守と、小さな修正・追加（${pricing.advisorSmallFixes}）までです。新しく作るものは別にお見積りし、顧問の契約中は${pricing.customDiscount}です。`,
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
    a: '相談も毎月の定例も、オンライン（Google Meet）で行います。顔出しは任意です。',
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

// いただいた声。CASE 01 は AIBOU のお客さまではなく、独立前の勤務先での取り組み（その旨を注記で明示する）
export const voices: Voice[] = [
  {
    case: 'CASE 01',
    context: '運送業・従業員30名規模（勤務先での取り組み）',
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
