// 制作サンプル（架空のお店）の型

export interface Scene { label: string; title: string; body: string }

// 素材の種類：
//   frames      … 動画から書き出した連番画像をキャンバスにコマ送りで描く（Flow の動画が届いたら）
//   stills      … 場面ごとの静止画を、ゆっくり拡大しながら切り替える
//   placeholder … 素材が届くまでの仮表示（色の面）
export type StoryMedia =
  | { mode: 'frames'; count: number; ext: string; desktop: string; mobile: string }
  | { mode: 'stills'; desktop: string[]; mobile: string[] }
  | { mode: 'placeholder' };

export interface ShopData {
  name: string;
  nameSub: string;
  kind: string;
  scenes: Scene[];
  media: StoryMedia;
  intro: { title: string; body: string };
  menuTitle: string;
  menu: { name: string; price: string; note?: string }[];
  menuNote: string;
  people: { title: string; list: { role: string; name: string; body: string }[] };
  faqs: { q: string; a: string }[];
  access: { address: string; hours: string; closed: string; parking: string; tel: string };
  reserveLead: string;
}
