// AIBOU 業種別デモ動画 — 生成設定
//
// industries に業種を追加すれば、その業種の動画が縦(IG)・横(LP)で生成される。
// scenesFor() が1業種ぶんの「台本(シーン列)」を組み立てる。台本の型は全業種共通で、
// 業種ごとに変わるのは { name / task / inquiry / draft } の4項目だけ。

export const industries = [
  {
    id: "beauty",
    name: "美容室",
    task: "予約と問い合わせの返信",
    inquiry: "はじめまして。今週の土曜、午後にカット＋カラーで予約できますか？",
    draft:
      "ご連絡ありがとうございます！土曜13時／15時が空いております。\nカット＋カラーで所要約2時間です。ご希望の時間をお知らせください🙇",
  },
  {
    id: "koumuten",
    name: "工務店",
    task: "見積もりと問い合わせの返信",
    inquiry: "外壁の塗り替えを検討中です。ざっくりの費用感だけ先に知りたいです。",
    draft:
      "お問い合わせありがとうございます。一般的な戸建て（30坪目安）で\n概算80〜120万円ほどです。現地を拝見しての正式見積もりも無料で承ります。",
  },
  {
    id: "shigyou",
    name: "士業事務所",
    task: "初回相談の受付と書類案内",
    inquiry: "相続の手続きについて相談したいのですが、何を準備すればいいですか？",
    draft:
      "ご相談ありがとうございます。まずは戸籍・遺産の一覧が分かる資料をご用意ください。\n初回30分は無料です。ご希望の日時を2〜3候補いただけますか。",
  },
];

// 1業種ぶんの台本を作る。scene.kind ごとに template.html が描き分ける。
export function scenesFor(biz) {
  return [
    {
      kind: "title",
      seconds: 3.5,
      badge: biz.name,
      title: `${biz.task}、\nAIにやってもらう`,
      note: "AIBOU｜無料30分AI相談",
    },
    {
      kind: "chat",
      seconds: 4.5,
      caption: "① お客様から問い合わせが届く",
      who: biz.name === "士業事務所" ? "相談者" : "お客様",
      text: biz.inquiry,
    },
    {
      kind: "draft",
      seconds: 5.5,
      caption: "② AIが返信の下書きを自動作成",
      text: biz.draft,
    },
    {
      kind: "notify",
      seconds: 4,
      caption: "③ スマホのLINEに通知が届く",
      text: "AIが下書きを用意しました。\n送信してよいですか？",
    },
    {
      kind: "approve",
      seconds: 3.5,
      caption: "④ 内容を確認して「GO」を押すだけ",
      text: "GO",
    },
    {
      kind: "done",
      seconds: 4,
      caption: "⑤ そのまま自動でお客様へ返信",
      text: "返信を送信しました ✓",
    },
    {
      kind: "cta",
      seconds: 4.5,
      title: "こんな仕組みを\n一緒に作りませんか",
      note: "AIBOU｜無料・30分・オンライン",
      url: "sadashogo.github.io/aibou-lp",
    },
  ];
}

// 出力フォーマット定義。縦=IG(リール/ストーリーズ)、横=LP。
export const formats = {
  vertical: { w: 1080, h: 1920, label: "IG縦型" },
  landscape: { w: 1280, h: 720, label: "LP横型" },
};

export const fps = 30;
export const xfade = 0.5; // シーン間クロスフェード秒
