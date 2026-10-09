// 「つくったもの」の一覧。説明は Notion の各開発記録に書いてある事実だけで書く（記録にないことは書かない）。
// 会社名・荷主名・画面の中の数字は出さない。

export type MadeFor = 'client' | 'employer' | 'own' | 'sample';

// for は表示には使わない（お客さまの事例にだけ「お客さま事例」の印を付ける）。
// 運送業の事例が社内のDX担当として作ったものであることは、ページの説明文に書く。

// 図の種類（MadeFigure.astro が描き分ける）
export type FigureKind = 'chat' | 'sheet' | 'dashboard' | 'pallet' | 'robot' | 'book' | 'bubble' | 'route' | 'site';

export interface Made {
  id: string;
  name: string;
  for: MadeFor;
  /** 業種などの補足（会社名は出さない） */
  context: string;
  before?: string;
  what: string;
  after?: string;
  /** 業種・仕事の内容・手段のタグ。検索とタグ絞り込みに使う */
  tags: string[];
  figure: FigureKind;
  /** 外部の公開ページがあるもの（制作サンプル） */
  url?: string;
  /** この事例を書いた note 記事の URL。あればカードに「noteで詳しく読む」を出す */
  note?: string;
  /** トップに載せる順番（小さいほど先）。未指定はトップに載せない */
  top?: number;
}

export const made: Made[] = [
  {
    id: 'salon-customer',
    name: 'サロンの顧客管理',
    for: 'client',
    context: 'フェイシャルサロン',
    before: 'Excelの顧客台帳が見づらいうえに、計算の不具合で数字が静かに間違っていた。',
    what: '来店・回数券・物販・写真をブラウザで管理できる仕組み。回数券の残りは記録から自動で計算するので、手で直して食い違うことがない。Excelにも書き出せる。',
    tags: ['サロン・美容', '予約・顧客管理', 'Webアプリ', '業務効率化'],
    figure: 'dashboard',
    top: 1,
  },
  {
    id: 'salon-report',
    name: 'サロンの月次レポート',
    for: 'client',
    context: 'プライベートサロン',
    what: 'お店の毎月の状況をまとめたレポートを、月ごとに継続してお届けしている。',
    tags: ['サロン・美容', 'データ集計', '継続サポート'],
    figure: 'sheet',
  },
  {
    id: 'dispatch-line',
    name: '配車確認のLINE Bot',
    for: 'employer',
    context: '運送会社',
    before: '毎朝、ドライバー約10名に電話で配車を伝えていた（1人あたり約3分）。',
    what: 'Excelの配車表を読み込んでおくと、ドライバーがLINEで名前か車番を送るだけで、その日の配車がカードで届く。',
    after: '配車の連絡がLINEで完結し、1日約30分の電話がなくなった。',
    tags: ['運送業', '配車', 'LINE', '業務効率化'],
    figure: 'chat',
    note: 'https://note.com/shogo_ai/n/nd45fb22ef99c',
    top: 2,
  },
  {
    id: 'warehouse',
    name: '倉庫の在庫・荷出しアプリ',
    for: 'employer',
    context: '運送会社の自社倉庫（荷主の商品を保管）',
    before: '毎日メールで届く出庫明細を開き、自社倉庫にある品番だけ拾って手で転記していた。荷出しのたびに「何パレット＋バラ何ケースか」を暗算していた。',
    what: 'メールが届くと自動で取り込み、在庫を引き、品番ごとに「○パレット＋バラ○ケース」をスマホに大きく表示する。在庫と履歴は社内で共有できる。',
    after: '稼働初日の出荷数が、それまでのExcel運用と全品番で一致した。',
    tags: ['運送業', '在庫・出荷', 'Webアプリ', 'スマホ対応', '自動化'],
    figure: 'pallet',
    top: 3,
  },
  {
    id: 'manual',
    name: '業務マニュアル作成ツール',
    for: 'employer',
    context: '運送会社',
    before: '担当者の頭の中にしかない業務があり、引き継げない。',
    what: 'パソコンの操作を記録するレコーダーと、AIが「なぜそうしたか」を対話で聞き取る仕組みを組み合わせ、画像入りのマニュアルにまとめる。前面の画面だけを撮り、キー入力は記録しない作りにしている。',
    after: 'これまでに4つの業務をマニュアルにした。',
    tags: ['運送業', 'マニュアル・引き継ぎ', 'AI活用', '事務作業'],
    figure: 'book',
    note: 'https://note.com/shogo_ai/n/n023f693a211d',
  },
  {
    id: 'highway',
    name: '高速料金をまとめて調べるChrome拡張',
    for: 'employer',
    context: '運送会社',
    before: '高速料金の検索サイトは、1区間ずつしか入力できない。',
    what: '何区間でもまとめて検索し、合計金額の集計とCSV出力までできる。IC名は入力の途中で候補が出る。',
    tags: ['運送業', '事務作業', 'Chrome拡張', '業務効率化'],
    figure: 'route',
    note: 'https://note.com/shogo_ai/n/n0dddae700c5b',
  },
  {
    id: 'daily-csv',
    name: '運行データの自動取得',
    for: 'employer',
    context: '運送会社',
    before: '毎朝、運行管理システムにログインして、前の営業日の日報データを手で出力・保存していた。',
    what: '平日の朝8:30に自動でログインし、出力から保存までを無人で行う。データが0件の日は既存のファイルを上書きしない安全装置付き。',
    tags: ['運送業', 'データ集計', '自動化', '事務作業'],
    figure: 'robot',
  },
  {
    id: 'billing-close',
    name: '請求の一括締めツール',
    for: 'employer',
    context: '運送会社',
    before: '請求の締め処理を、荷主ごとに1件ずつ行っていた。',
    what: '締め日と月を選ぶと、まとめて締め・解除ができる。荷主ごとの状態を色分けし、1件失敗してもほかの荷主には影響しない。既存の業務システム本体には手を加えていない。',
    after: '検証用のデータで、これまでの締め27件と全項目が一致することを確認した。',
    tags: ['運送業', '請求・締め', '事務作業', '業務効率化'],
    figure: 'sheet',
  },
  {
    id: 'fare-check',
    name: '運賃の照合Excel',
    for: 'employer',
    context: '運送会社',
    before: '手書きの配車表と請求データの運賃を、毎月手作業で照らし合わせていた。',
    what: '荷主とエリアを選ぶと、あるべき運賃を料金表から引いて自動で照合し、違う行に印を付ける。',
    after: '月1回の照合作業が、約30分から約1分になった。',
    tags: ['運送業', '請求・締め', 'Excel', '事務作業', '自動化'],
    figure: 'sheet',
  },
  {
    id: 'stock-month',
    name: '在庫表の月初準備の自動化',
    for: 'employer',
    context: '運送会社',
    before: '毎月、前月の在庫シートをコピーして、日付・行数・前月からの繰越・数式を手で直していた。',
    what: 'ボタン1つで翌月のシートを作る。営業日の数に合わせて行を増減し、前月からの繰越は品番で探してつなぐので、列の並びが変わっても崩れない。',
    tags: ['運送業', '在庫・出荷', 'Excel', '自動化'],
    figure: 'sheet',
  },
  {
    id: 'holiday',
    name: '荷出し表の土日祝の自動色分け',
    for: 'employer',
    context: '運送会社',
    before: '祝日を毎年、手で入れ直す必要があった。',
    what: '年度を1か所変えるだけで、祝日と振替休日が自動で計算され、土日祝に色が付く。',
    tags: ['運送業', '在庫・出荷', 'Excel', '事務作業'],
    figure: 'sheet',
  },
  {
    id: 'wakaru',
    name: '英語の管理画面を日本語で解説する「わかる」',
    for: 'own',
    context: 'AIBOUの仕事用ツール',
    before: 'Webサイトの公開などに使う英語の管理画面が、読んでも分からない。',
    what: '分からない部分を選んで右クリックすると、それが何をする画面か、次にどこを押せばいいかを日本語で解説する。お客さまの情報が載る画面では内容を送らない設定ができる。',
    tags: ['AI活用', 'Chrome拡張', '業務効率化'],
    figure: 'bubble',
  },
  {
    id: 'sample-kurogane',
    name: 'オーダースーツ店のWebサイト',
    for: 'sample',
    context: '架空のブランド「MAISON KUROGANE」',
    what: 'スクロールに合わせて映像がコマ送りで進み、採寸から仕立てまでの流れを見せるサイト。映像はAI（Google Veo）で生成。',
    tags: ['Webサイト', '店舗', 'AI活用'],
    figure: 'site',
    url: 'https://maison-kurogane.pages.dev/',
  },
  {
    id: 'sample-akagi',
    name: '運送会社のWebサイト',
    for: 'sample',
    context: '架空の会社「赤城急送」',
    what: '夜間の幹線輸送を担う運送会社を想定したサイト。スクロールに合わせて映像が進み、画面の隅に走行距離と時刻を表示する。',
    tags: ['Webサイト', '運送業'],
    figure: 'site',
    url: 'https://akagi-express.pages.dev/',
  },
  {
    id: 'sample-salon',
    name: '美容室のWebサイト',
    for: 'sample',
    context: '架空のお店「hair salon ソラ」',
    what: 'スクロールに合わせて、カウンセリングから仕上がりまでの流れが映像で進むサイト。予約ボタンからLINE予約・前日のリマインドにつなげる想定。写真・映像はAI（Google Flow）で生成。',
    tags: ['サロン・美容', 'Webサイト', '予約・顧客管理', 'スクロール演出'],
    figure: 'site',
    url: '/samples/salon/',
  },
  {
    id: 'sample-seitai',
    name: '整体院のWebサイト',
    for: 'sample',
    context: '架空のお店「ととのい整体院」',
    what: 'スクロールに合わせて、問診から施術・セルフケアまでの流れが映像で進むサイト。予約ボタンからLINE予約・前日のリマインドにつなげる想定。写真・映像はAI（Google Flow）で生成。',
    tags: ['整体・治療院', 'Webサイト', '予約・顧客管理', 'スクロール演出'],
    figure: 'site',
    url: '/samples/seitai/',
  },
];

export const madeTop = made.filter((m) => m.top).sort((a, b) => (a.top ?? 0) - (b.top ?? 0));

// タグの一覧（多く使われている順）
export const allTags = (() => {
  const n = new Map<string, number>();
  made.forEach((m) => m.tags.forEach((t) => n.set(t, (n.get(t) ?? 0) + 1)));
  return [...n.entries()].sort((a, b) => b[1] - a[1]).map(([tag, count]) => ({ tag, count }));
})();
