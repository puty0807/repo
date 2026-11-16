# Ｐ.Ｈ.Ｓ

広瀬プティの脱獄ツイーク配布リポジトリ。

**正規の登録先：** `https://puteihirose.com/profile/`（Ｐ.Ｈ.Ｓ PROFILE）。このGitHub Pages（`https://puty0807.github.io/repo/`）はTweakの紹介・スクリーンショットを見るためのページ。登録ボタンもPROFILE側を使用する。以前に別のソースURLを登録している場合は、パッケージマネージャー内で重複を確認してね。

**Official package manager source:** `https://puteihirose.com/profile/`. The GitHub Pages site is the tweak explorer; its add-source buttons use the PROFILE address.

[本家PROFILE](https://puteihirose.com/profile/)の「JAILBREAK」からSileo・Zebra・Cydiaに追加できる。[ツイーク詳細](https://puty0807.github.io/repo/)では使い方とスクリーンショットを確認できる。パッケージはiOS 15・Dopamine Rootless向け。Zebra・Cydiaでの動作は実機確認待ち。

- [Keyboardのスクリーンショット](https://puty0807.github.io/repo/#keyboard)
- [PINの使い方とスクリーンショット](https://puty0807.github.io/repo/#pin)
- [LockNoteのスクリーンショット](https://puty0807.github.io/repo/#notes)
- [Ｐ.Ｈ.Ｓ 公式サイト](https://puteihirose.com/)

## LockNote 0.1.2（試験版）

ロック画面から編集できる付箋。黄色い見出しと薄い罫線の入った紙の背景。上の帯をドラッグして位置を変えられる。背景を透明にしていても、畳むと黄色い「Notes」が表示され、そのままドラッグできる。本文欄は約4行から始まり、改行や折り返しで縦に広がる。

対象環境はiOS 15・Dopamine Rootless。新版のドラッグとロック中の編集は実機での確認待ち。メモ本文は端末内に保存され、ロック解除前の画面に表示される。

## P.H.S KEYBOARD 0.0.16（Beta / 自動配置・手動移動専用更新）

**0.0.14のソースを起点にした配置改善版。** 0.0.15は不具合のため配布停止したまま。0.0.15で試したLINE・ChatGPTの共通CLIP拡張は含まない。

- **安全な自動配置：** iOS純正の編集メニュー、LINE等のチャット入力欄、キーボード付近の送信・添付などの操作ボタンを避ける。衝突しない最寄りの位置を探す。操作を妨げる場合はKEYだけ一時的に隠す。
- **手動移動：** KEY左端の「⋮」を上下にドラッグして移動。アプリごとに位置を保存。日本語・英語・Simejiなどのキーボードの高さにも追従。「⋮」をタップすると自動配置へ戻る。
- **従来機能を維持：** 0.0.14の純正メニュー共存とSpotlight対応、LINE送信ボタン回避、CLIPの検索・PINNED・画像・お気に入り・カテゴリーを継続。共通履歴はメモ・Safari・メッセージ・メールの4アプリ限定。その他は従来どおり個別履歴。
- **検証状態：** Rootless arm64eビルド・パッケージ検証成功。新しいドラッグ挙動やアプリ独自ボタンとの衝突判定は実機確認待ち。動作しない場合に備え0.0.14も公開したままにしている。
- **安全上の注意：** 0.0.15で保存した履歴を自動削除・変換しない。Sileoで更新後は必要に応じてリスプリングしてね。

[Ｐ.Ｈ.Ｓ Sileoリポジトリ](https://puty0807.github.io/repo/)

## P.H.S PIN 0.4.0（Beta / 実機確認待ち）

サイドボタン＋音量上から、通常のスクショか範囲の切り取りを選べる。切り取った画像を複数枚ピン留めできる。
