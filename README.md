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

## P.H.S KEYBOARD 0.0.14（Beta / 0.0.15からロールバック）

**安定していた0.0.14を最新版として再公開。** 0.0.15はユーザーから不具合が報告されたため配布停止。従来の共通CLIP履歴はメモ・Safari・メッセージ・メールの4アプリ限定に戻し、LINE・ChatGPT用の任意共有設定を含まない。

- Spotlightの純正「テキストをスキャン」メニューとKEYの共存、純正メニュー終了後の位置復帰、Simeji等のキーボード高さ追従、LINEの送信・＋ボタン回避を維持。
- CLIPの検索、PINNED、画像履歴、お気に入り、カテゴリー、個別アプリの履歴は0.0.14の仕様。
- 0.0.15がインストール済みの場合、リポジトリの最新版表示が0.0.14になってもiOSのパッケージ管理上は自動で下がらない。Sileoで**0.0.14へのダウングレード操作**を行い、必要ならリスプリングする。
- 0.0.15の設定で共有した履歴や画像は端末から自動削除しない。旧バージョンの表示対象とデータ形式の違いに注意。既存履歴を消さないため、インストール中に「設定やデータを削除」のような操作は避ける。

[Ｐ.Ｈ.Ｓ Sileoリポジトリ](https://puty0807.github.io/repo/)

## P.H.S PIN 0.4.0（Beta / 実機確認待ち）

サイドボタン＋音量上から、通常のスクショか範囲の切り取りを選べる。切り取った画像を複数枚ピン留めできる。
