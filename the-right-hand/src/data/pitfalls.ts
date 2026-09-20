export interface Pitfall {
  num: string;
  title: string;
  description: string;
}

export const pitfalls: Pitfall[] = [
  {
    num: '[ 01 ]',
    title: '「汎用チャットツール」の丸投げ導入',
    description:
      '月額アカウントを全社に配っただけで、どの業務プロセスを代替するか設計されておらず、単なる固定費として垂れ流しになるケース。',
  },
  {
    num: '[ 02 ]',
    title: 'ベンダーによる数百万円〜数千万円の過剰開発',
    description:
      '安価な連携で十分に実現可能な要件に対し、開発会社の言い値で巨大なスクラッチ開発を発注し、投資回収が不可能になるケース。',
  },
  {
    num: '[ 03 ]',
    title: '社内機密・ノウハウの流出と法的無防備',
    description:
      '顧客リストや決算数値を保護する防護壁がないまま現場が使い始め、知らぬ間にデータ漏洩や利用規約違反のリスクに晒されるケース。',
  },
];
