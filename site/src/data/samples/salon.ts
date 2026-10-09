// 美容室の制作サンプル（架空のお店）。名前・料金・住所・スタッフはすべて架空。
import type { ShopData } from './types';

export const salonTheme = {
  '--s-bg': '#faf8f4',
  '--s-surface': '#e9e4da',
  '--s-surface-2': '#f1ede5',
  '--s-ink': '#2f2b26',
  '--s-ink-soft': '#6b655c',
  '--s-rule': 'rgb(47 43 38 / 0.14)',
  '--s-accent': '#7d8f74',
  '--s-on-accent': '#ffffff',
  '--s-on-image': '#ffffff',
  '--s-shade': 'rgb(30 28 24 / 0.72)',
  '--s-ph-a': '#b9b09f',
  '--s-ph-b': '#7d8f74',
  '--s-font-head': "'Hiragino Mincho ProN', 'Yu Mincho', YuMincho, 'Noto Serif JP', serif",
  '--s-font-body': "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', Meiryo, sans-serif",
};

export const salon: ShopData = {
  name: 'hair salon ソラ',
  nameSub: 'SORA',
  kind: '美容室',
  scenes: [
    { label: 'カウンセリング', title: 'まず、|話すことから。', body: 'なりたい雰囲気と、毎朝のお手入れにかけられる時間を伺います。' },
    { label: 'シャンプー', title: 'ほどける時間。', body: '頭皮と髪の状態に合わせて、洗い方とお湯の温度を選びます。' },
    { label: 'カット', title: '骨格に|合わせて。', body: '乾かすだけでまとまるように、髪の生え方とクセを見て切ります。' },
    { label: 'カラー', title: '肌になじむ|色を。', body: '光の当たり方で印象が変わる、やわらかな色を一緒に選びます。' },
    { label: '仕上がり', title: '明日の朝も、|同じように。', body: 'ご自宅での乾かし方まで、鏡の前でお伝えします。' },
  ],
  media: { mode: 'frames', count: 150, ext: 'avif', desktop: '/samples/salon/seq/desktop', mobile: '/samples/salon/seq/mobile' },
  intro: {
    title: '毎朝が、少し楽になる髪を。',
    body: '席は3つだけの、小さな美容室です。お一人おひとりにかける時間を長くとり、乾かすだけでまとまる髪型をご提案します。',
  },
  menuTitle: 'メニューと料金',
  menu: [
    { name: 'カット', price: '4,950円' },
    { name: 'カット＋カラー', price: '9,900円', note: '根元だけのリタッチは 7,700円' },
    { name: 'カット＋パーマ', price: '11,000円' },
    { name: '髪質改善トリートメント', price: '＋2,200円', note: 'ほかのメニューと一緒に' },
    { name: '前髪カット', price: '1,100円' },
  ],
  menuNote: '料金はすべて税込・架空です。髪の長さや量によって変わることがあります。',
  people: {
    title: 'スタイリスト',
    list: [
      { role: 'オーナースタイリスト', name: '白石 そら', body: '美容師歴15年。忙しい朝でも扱いやすい、手入れの楽な髪型が得意です。' },
      { role: 'スタイリスト', name: '森川 ゆい', body: 'やわらかな色づくりが得意です。白髪をぼかすカラーもご相談ください。' },
    ],
  },
  faqs: [
    { q: '予約の変更はできますか？', a: '前日までにLINEでご連絡ください。当日の変更もできる限り対応します。' },
    { q: '子ども連れでも大丈夫ですか？', a: 'はい。お子さま用の椅子と絵本をご用意しています。' },
    { q: '駐車場はありますか？', a: '店の前に2台分あります。' },
  ],
  access: {
    address: '群馬県〇〇市〇〇町1-2-3（架空）',
    hours: '10:00〜19:00（最終受付 18:00）',
    closed: '火曜日・第3水曜日',
    parking: '2台',
    tel: '000-0000-0000（架空）',
  },
  reserveLead: '空いている日時を選んで、LINEで予約できます。前日にお知らせが届きます。',
};
