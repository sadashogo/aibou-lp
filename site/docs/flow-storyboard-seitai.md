# Flow 映像台本：整体院「ととのい整体院」（架空）

スクロールに合わせて映像が進む制作サンプル用。5つの場面の静止画（キーフレーム）を作り、隣り合う場面を「最初と最後のコマを指定」してつなぐ動画を4本作る。

```
S1 ──clip1──▶ S2 ──clip2──▶ S3 ──clip3──▶ S4 ──clip4──▶ S5
問診            姿勢チェック    施術            セルフケア指導  軽くなった体
```

## 注意（必ず守る）
- 実在の人物・院・ブランドに似せない。ロゴや文字は入れない
- 医療行為に見せない（注射・医療機器・白衣の医師は出さない）。「整体・ストレッチ」の範囲にとどめる
- 体への触れ方は、肩・背中・腰に手を添える程度の穏やかなものにする
- 顔ははっきり映さない。服装を全場面でそろえる

## 共通スタイル（すべてのプロンプトの先頭に付ける）
```
Photorealistic, clean and calm Japanese bodywork clinic, off-white walls,
pale blue and natural light wood accents, soft daylight, minimal and tidy,
the practitioner is a man in his 40s wearing a navy short-sleeve polo,
the client is a woman in her 40s wearing a light gray T-shirt and dark pants,
faces not clearly visible, editorial photography, shallow depth of field,
subject centered in frame, no text, no logo, no medical equipment.
```

## 1. キーフレーム画像（横16:9 と 縦9:16 の両方を作る）
| # | 場面 | プロンプト（共通スタイルの後に続ける） |
|---|---|---|
| S1 | 問診 | `The practitioner and the client sit facing each other at a small wooden table, he listens and takes notes on a clipboard while she gestures to her shoulder.` |
| S2 | 姿勢チェック | （S1 を添付）`Keep the same people and room. The client stands upright; the practitioner observes her posture from the side, one hand lightly near her shoulder blade.` |
| S3 | 施術 | （S2 を添付）`Keep the same people and room. The client lies face down on a padded treatment table with a pale blue towel; the practitioner gently presses along her upper back with both palms.` |
| S4 | セルフケア指導 | （S3 を添付）`Keep the same people and room. The client sits on a stool doing a gentle shoulder stretch while the practitioner demonstrates the same stretch beside her.` |
| S5 | 軽くなった体 | （S4 を添付）`Keep the same people and room. The client stands by the bright window, rolling her shoulders back with a relaxed, light posture; the practitioner in the soft background.` |

## 2. 動画クリップ（Flow の「最初と最後のコマを指定」機能、8秒）
| クリップ | 開始→終了 | プロンプト |
|---|---|---|
| clip1 | S1→S2 | `The client stands up from the table and the practitioner steps beside her to check her posture. Calm, continuous motion, camera nearly still.` |
| clip2 | S2→S3 | `The client lies down on the treatment table and the practitioner places a towel and begins gently pressing her back. Smooth continuous motion.` |
| clip3 | S3→S4 | `The client sits up slowly; both move to stools and begin a gentle shoulder stretch together. Calm, continuous motion.` |
| clip4 | S4→S5 | `The client finishes the stretch, walks to the window and rolls her shoulders, looking relaxed and light. Slow gentle push-in.` |

## 3. 送ってほしいもの
- 横16:9 の動画4本（clip1〜clip4）。縦9:16 版も作れれば、スマホ用に使う
- 動画が作れない場合は、キーフレーム画像 S1〜S5（横と縦）だけでもOK。静止画の切り替え演出で使う
