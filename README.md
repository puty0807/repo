# Ｐ.Ｈ.Ｓ

広瀬プティの脱獄ツイーク配布リポジトリ。

**正規の登録先：** `https://puteihirose.com/profile/`（Ｐ.Ｈ.Ｓ PROFILE）。このGitHub Pages（`https://puty0807.github.io/repo/`）はTweakの紹介・スクリーンショットを見るためのページ。登録ボタンもPROFILE側を使用する。以前に別のソースURLを登録している場合は、パッケージマネージャー内で重複を確認してね。

**Official package manager source:** `https://puteihirose.com/profile/`. The GitHub Pages site is the tweak explorer; its add-source buttons use the PROFILE address.

[本家PROFILE](https://puteihirose.com/profile/)の「JAILBREAK」からSileo・Zebra・Cydiaに追加できる。[ツイーク詳細](https://puty0807.github.io/repo/)では使い方とスクリーンショットを確認できる。パッケージはiOS 15・Dopamine Rootless向け。Zebra・Cydiaでの動作は実機確認待ち。

- [Keyboardのスクリーンショット](https://puty0807.github.io/repo/#keyboard)
- [PINの使い方とスクリーンショット](https://puty0807.github.io/repo/#pin)
- [GESTUREの使い方・試用版の検証状態](https://puty0807.github.io/repo/#gesture)
- [LockNoteのスクリーンショット](https://puty0807.github.io/repo/#notes)
- [Ｐ.Ｈ.Ｓ 公式サイト](https://puteihirose.com/)

## LockNote 0.1.3（Beta / 位置固定・文字サイズ・編集操作）

ロック画面から編集できる付箋。黄色い見出しと薄い罫線の入った紙の背景。本文欄は約4行から始まり、改行や折り返しで縦に広がる。

- **位置を固定：** 上の帯をドラッグして移動し、歯車の設定から「位置を固定」をONにすると固定できる。初期値はOFF。背景を透明にしていても、畳むと黄色い「Notes」が表示され、固定していなければそのままドラッグできる。
- **文字サイズ：** 歯車から12〜24の範囲で調整できる。初期値は16で、変更した値を保存する。
- **位置を戻す：** 位置だけを初期状態へ戻す。本文・透明度・折りたたみ状態は維持する。
- **元に戻す／やり直す：** 本文の入力中に、キーボード上のボタンからiOS標準の編集履歴を操作できる。
- **対応環境と検証状態：** iOS 15・Dopamine Rootless向け。メモ本文は端末内に保存され、ロック解除前の画面に表示される。従来のロック画面での表示・編集の初期動作は維持する。0.1.3の新しい操作はiPhone実機未確認。0.1.2も戻せるよう残す。

掲載中のLockNoteのスクリーンショットは旧版UI。0.1.3の位置固定・文字サイズ・位置を戻す操作・元に戻す／やり直すを撮影した画像ではない。

## P.H.S KEYBOARD 0.0.19（Beta / 共通CLIP履歴・パスワードコピー）

0.0.14を起点とした既存のTheosプロジェクトから更新。0.0.17の配置改善と0.0.18の共通履歴を引き継ぎ、0.0.19ではコピーしたパスワードも保存対象にする。配布停止した0.0.15のコードは取り込んでいない。

- **配置と操作：** 純正編集メニュー・入力欄・送信/添付ボタンを避け、狭い空き領域も探す。横向きの左右の安全領域やウィンドウサイズ変更への追従を改善した。「⋮」を上下にドラッグしてアプリごとの位置を保存し、タップで自動配置に戻す。中断したドラッグは開始前の設定を保つ。
- **共通履歴：** libSandyで共有権限を取得できたKEYBOARD対応アプリは、同じテキスト・画像・PINNED・お気に入り・カテゴリーを使う。権限を取得できない場合は個別履歴を使い、設定画面にその状態を表示する。既存のシステムUI・金融/認証系アプリ等の除外は維持し、SpringBoardはロック解除中のSpotlightだけに限る。
- **自動保存はアプリごと：** 初期値はメモ・Safari・メッセージ・メールがON、それ以外はOFF。設定済みの値は変えない。別の対応アプリのコピーを履歴に残すには、そのアプリのCLIP設定で自動保存をONにする。
- **パスワードコピー：** 自動保存ONではコピーしたパスワード・新規パスワードも通常の履歴と同じ保存先に残り、共通履歴ONなら他の対応アプリでも使える。入力欄の文字列を直接取得する処理は追加しない。自動保存OFF、バックグラウンド、編集中の入力欄がない場合、ワンタイムコードとして指定された入力欄からは自動保存しない。
- **データの扱い：** 初回共有時に個別履歴を既存の共通履歴へマージし、元の個別履歴・画像は残す。履歴は最大25件、うち画像10件で、移行にも上限を適用する。編集・削除の対象を項目キーで確認し、他アプリによる履歴追加後の誤操作を防ぐ。「履歴をすべて削除」は共通履歴全体に反映される。
- **共有権限：** libSandyの読み書き対象は `/var/mobile/Library/PHSKeyboard` のみ。`AllowedProcesses = ["*"]` により任意のプロセスが明示的にそのプロファイルを要求できるが、全プロセスへの自動適用やツイークの注入範囲の拡大は行わない。
- **検証状態：** 0.0.19の仕様を確認し、TheosのRootless arm64eビルド・パッケージ検証・配置/共通ストア/権限ポリシーのホストテストはCIで成功。iPhone実機での共有権限・パスワードコピー・アプリ固有の配置や動作は未確認。旧版0.0.14は戻せるよう公開を継続する。

## P.H.S PIN 0.4.1（Beta / 撮影処理の改善・全部隠す／戻す）

- **撮影：** ロック解除中のサイドボタン＋音量上から、通常のスクショか範囲の切り取りを選べる。撮影APIのフォールバック、ロック・画面接続変更・別の撮影後の古い処理の無効化、メニュー連打時の重複処理防止を改善した。純正スクショへの転送時はPINの画像・メニューを一時的に描画対象から外す。
- **全部隠す／戻す：** 端のピンか画像の「…」から切り替える。画像は削除せず、位置・大きさ・透明度・折りたたみ状態を保つ。非表示中も端のピンは残り、新しく追加した画像も隠して保持する。個別のピンを選ぶと全体の非表示を解除してその画像を開く。
- **リセット：** 画像の「…」から位置・サイズを初期状態へ戻せる。画像の内容・透明度・折りたたみ状態は保つ。
- **既存機能：** 複数画像の固定、コピー、共有・保存、OCR/QR、直近12件の履歴、画像保持枠64 MiB、ロック中の非表示、SpringBoard限定の注入を維持する。
- **検証状態：** 元のTheosプロジェクトからのRootless arm64eビルド・パッケージ検証・ホスト上の状態テストはCIで成功。0.4.1のハードウェアボタン、実際の描画タイミング、全部隠す／戻す、リセットはiPhone実機未確認。0.4.0も戻せるよう残す。

## P.H.S GESTURE 0.1.7（試用版 / ステータスバー入力窓の固定）

0.1.6の実機画像は上端入力143・2回目候補46でも認識/実行0。0.1.7は実機で受信を確認できた専用ステータスバー窓だけで認識し、別窓の入力で状態を消さないよう修正。画像だけでは取消の唯一の原因を確定できないため、個別の取消理由も表示する。

- **使い方：** Sileoで0.1.7へ更新→リスプリング。有効化ON、範囲「ロック解除中の全画面」、上端2tapへライトを割当。ホームの時計側などを軽く2回タップして点灯/消灯を試す。初期OFF、PreferenceLoaderが必要。
- **入力の扱い：** 認識中の別窓入力は無視し、タップの完了を待つ。短い1本指2回目タップ・0.35秒/12ptの条件、ホーム/解除/範囲/除外/実行元、前面アプリなし・通知/CC非表示の確認を維持する。iOSの取消では実行しない。標準イベントを取消・置換しない。
- **診断：** 「上端判定」に別タッチ/指の数/回数/時刻/時間超過/領域外/移動/領域変更/iOS取消などを個別表示。「上端入力」「2回目候補」「上端受信窓」「認識中の別窓入力」も確認できる。件数や録画APIの応答だけで成功を判断しない。
- **維持する機能：** 3本指、録画・スクショ・ライトの出力処理と権限検査は維持。アプリ内は触覚テストのみ。認識中の座標・指の参照・時刻は診断へ保存せず、入力内容・画像・イベント履歴も記録しない。録画は未完了要求や遅延応答で自動再送しない。
- **検証：** ソース36641a4の[CI](https://github.com/puty0807/P.H.S/actions/runs/44295715274)で窓の正順/逆順・別窓・重複・取消原因の回帰、既存の上端/ホーム/通知/CC/録画/撮影/権限/ホスト/trace、iOS15 arm64eビルドとパッケージ検査が成功。0.1.7の上端認識・回帰は実機未確認。0.1.5の録画開始/停止/保存の成功報告は保持。初回録画拒否の原因・再現性は別途検証する。旧版もすべて保持する。

**English:** Version 0.1.6 received top input and second-tap candidates but canceled before recognition. Preview 0.1.7 uses the dedicated status-bar window, prevents foreign delivery from replacing/canceling that owner, preserves an eligible Home reference and exposes individual cancellation causes. The 0.35-second/12-point limits and Home/unlock/scope/exclusion/origin/cover/Control Center gates remain. Native cancellation never executes an action. Three-finger/recording/screenshot/flashlight implementations remain unchanged. Update and respring, then test flashlight near the Home-screen clock. Device recognition and regression on 0.1.7 remain pending; the initial recording rejection remains unexplained. All rollback packages are retained.

## 公開ページと更新

登録先は引き続き [本家PROFILE](https://puteihirose.com/profile/)。パッケージと `Release`・`Packages` の更新元は、このリポジトリの `main` とGitHub Pagesを継続する。

各リリースでは配布パッケージ・索引とあわせて、日本語/英語のツイーク詳細ページ・パッケージ詳細・このREADMEを更新する。掲載中のKEYBOARD/PINのスクリーンショットは旧版UIであり、0.0.19/0.4.1の新機能や設定を撮り直した画像ではない。

Sileo・Zebra・Cydiaでの登録完了は、iPhone実機で試せた場合だけ確認済みとする。
