// 整体院の制作サンプル（架空のお店）。名前・料金・住所・スタッフはすべて架空。
// 医療行為ではないので「治る」「治療」などの言葉は使わない。
import type { ShopData } from './types';

export const seitaiTheme = {
  '--s-bg': '#f8f7f3',
  '--s-surface': '#dde5ea',
  '--s-surface-2': '#eef2f3',
  '--s-ink': '#24313a',
  '--s-ink-soft': '#5c6a73',
  '--s-rule': 'rgb(36 49 58 / 0.14)',
  '--s-accent': '#4f7c95',
  '--s-on-accent': '#ffffff',
  '--s-on-image': '#ffffff',
  '--s-shade': 'rgb(20 32 40 / 0.7)',
  '--s-ph-a': '#a9bcc6',
  '--s-ph-b': '#4f7c95',
  '--s-font-head': "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, sans-serif",
  '--s-font-body': "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, sans-serif",
};

export const seitai: ShopData = {
  name: 'ととのい整体院',
  nameSub: 'TOTONOI',
  kind: '整体院',
  scenes: [
    { label: '問診', title: 'まず、|お話を。', body: 'いつから、どんなときにつらいのか。お仕事や暮らしのクセまで丁寧に伺います。' },
    { label: '姿勢のチェック', title: 'からだの|クセを知る。', body: '立ち姿と歩き方から、負担がかかっているところを一緒に確かめます。' },
    { label: '施術', title: 'ゆっくり、|やさしく。', body: 'ボキボキと鳴らさない、やさしい力の施術です。' },
    { label: 'セルフケア', title: 'おうちでも|続けられるように。', body: '1日3分でできるストレッチを、その場で一緒に練習します。' },
    { label: 'お帰りのとき', title: '明日の朝を、|軽く。', body: '次に来ていただくまでの過ごし方をお伝えして、お見送りします。' },
  ],
  media: { mode: 'frames', count: 150, ext: 'avif', desktop: '/samples/seitai/seq/desktop', mobile: '/samples/seitai/seq/mobile' },
  intro: {
    title: '「もう少し早く来ればよかった」をなくしたい。',
    body: '肩や腰のつらさを我慢しがちな方のための、予約制の整体院です。施術だけで終わらず、ご自宅でのケアまで一緒に考えます。',
  },
  menuTitle: '料金',
  menu: [
    { name: '初回（お話・姿勢チェック・施術）', price: '6,600円', note: '約60分' },
    { name: '2回目以降', price: '5,500円', note: '約45分' },
    { name: '回数券（5回）', price: '25,000円', note: '有効期限 6か月' },
  ],
  menuNote: '料金はすべて税込・架空です。健康保険は使えません。感じ方には個人差があります。',
  people: {
    title: '院長あいさつ',
    list: [
      { role: '院長', name: '高瀬 まこと', body: '整体の仕事について18年。「痛くなる前に来られる場所」を目指して開院しました。お話を伺う時間を大切にしています。' },
    ],
  },
  faqs: [
    { q: '服装はどうすればいいですか？', a: '動きやすい服装でお越しください。着替えもご用意しています。' },
    { q: '痛くないですか？', a: '強く押したり、関節を鳴らしたりはしません。力加減はその都度お聞きします。' },
    { q: '健康保険は使えますか？', a: '整体は保険の対象外のため、使えません。' },
  ],
  access: {
    address: '群馬県〇〇市〇〇町4-5-6（架空）',
    hours: '9:00〜20:00（土日は 17:00 まで）',
    closed: '水曜日',
    parking: '3台',
    tel: '000-0000-0000（架空）',
  },
  reserveLead: '空いている日時を選んで、LINEで予約できます。前日にお知らせ、施術の翌日にはセルフケアの動画をお送りします。',
};
