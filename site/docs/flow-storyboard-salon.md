# Flow 映像台本：美容室「hair salon ソラ」（架空）

スクロールに合わせて映像が進む制作サンプル用。5つの場面の静止画（キーフレーム）を作り、隣り合う場面を「最初と最後のコマを指定」してつなぐ動画を4本作る。

```
S1 ──clip1──▶ S2 ──clip2──▶ S3 ──clip3──▶ S4 ──clip4──▶ S5
カウンセリング  シャンプー      カット          カラー          仕上がり
```

## 注意（必ず守る）
- 実在の人物・お店・ブランドに似せない。ロゴや文字は入れない
- 顔ははっきり映さない（後ろ姿・横顔・手元中心）。同じ人物に見えるよう、服装と髪型を全場面でそろえる
- カメラは固定（または、ごくゆっくり寄るだけ）。場面がつながって見えることを優先する

## 共通スタイル（すべてのプロンプトの先頭に付ける）
```
Photorealistic, calm modern Japanese hair salon, warm light oak wood, white walls,
muted sage green accents, soft natural window light from the left, clean and airy,
the stylist is a woman in her 30s wearing a beige linen apron with her hair tied back,
the client is a woman with shoulder-length dark hair wearing a light gray cape,
faces not clearly visible, editorial photography, shallow depth of field,
subject centered in frame, no text, no logo.
```

## 1. キーフレーム画像（横16:9 と 縦9:16 の両方を作る）
| # | 場面 | プロンプト（共通スタイルの後に続ける） |
|---|---|---|
| S1 | カウンセリング | `The stylist sits beside the seated client in front of a large round mirror, gently touching the ends of her hair while they talk, seen from behind at a slight angle.` |
| S2 | シャンプー | （S1 を添付）`Keep the same people and salon. The client reclines at a white shampoo bowl; the stylist's hands rinse her hair with warm water and soft foam, steam faintly visible.` |
| S3 | カット | （S2 を添付）`Keep the same people and salon. Close-up of the stylist's hands holding a comb and scissors, cutting a section of the client's damp hair at the mirror; small strands falling.` |
| S4 | カラー | （S3 を添付）`Keep the same people and salon. The stylist applies a soft brown hair color with a brush on sectioned hair; a small bowl and foil on a wooden tray.` |
| S5 | 仕上がり | （S4 を添付）`Keep the same people and salon. The finished glossy shoulder-length hair with soft waves, the client turning slightly toward the window light, the stylist holding a hand mirror behind her.` |

## 2. 動画クリップ（Flow の「最初と最後のコマを指定」機能、8秒）
| クリップ | 開始→終了 | プロンプト |
|---|---|---|
| clip1 | S1→S2 | `The client stands and moves to the shampoo bowl, the camera follows smoothly; warm water begins to run. Gentle, continuous motion.` |
| clip2 | S2→S3 | `Water and foam rinse away, a towel wraps the hair, then the scene settles at the mirror as the scissors start cutting. Smooth continuous motion.` |
| clip3 | S3→S4 | `Hair strands fall softly, the cut finishes, and the stylist picks up the color brush and begins applying color. Calm, continuous motion.` |
| clip4 | S4→S5 | `The color sets, a quick blow-dry with soft movement of the hair, ending on the glossy finished style in window light. Slow gentle push-in.` |

## 3. 送ってほしいもの
- 横16:9 の動画4本（clip1〜clip4）。縦9:16 版も作れれば、スマホ用に使う
- 動画が作れない場合は、キーフレーム画像 S1〜S5（横と縦）だけでもOK。静止画の切り替え演出で使う
