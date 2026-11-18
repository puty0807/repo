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

## P.H.S GESTURE 0.1.4（試用版 / スクショ経路と標準バイブレーション）

ユーザーが3本指の認識・アクション呼び出しとライト点灯を確認。0.1.3ではスクショ割当と単独触覚に出力がなかったため、0.1.4で撮影の要求経路を見直し、触覚を標準バイブレーションAPIへ変更した。ライトの処理とロック/範囲/実行元の制限は維持する。

- **使い方：** Sileoで0.1.4へ更新→リスプリング。ホームで割当ジェスチャーを試し、反応がなければ設定の「実行側の接続を確認」に出る撮影経路・結果を確認する。「触覚だけをテスト」は認識とは別に振動を要求する。初期OFF、PreferenceLoaderが必要。
- **要求と結果：** SpringBoardの撮影要求、screenshotManager、legacyの順に存在とABIを検査する。要求送信または例外のあとには重複撮影を避けて再試行しない。「要求済み」は保存成功の証明ではない。録画・撮影の写真保存と触覚の体感は実機で別に確認する。
- **範囲・診断：** アプリ内は触覚テストのみ。ライト/録画/撮影は解除中の既知Home窓で直接認識した操作だけ。段階件数・停止理由・撮影/触覚経路を端末内で表示する。座標・入力内容・画像・イベント履歴を保存せず、件数と状態のsnapshotは診断時だけ保存。未認証の診断は権限判定に使わない。
- **検証：** ソースa000d52の[CI](https://github.com/puty0807/P.H.S/actions/runs/44231055052)でnative/manager/legacyの順序、ABI不一致・未検出・例外時の安全な中断と重複なし、既存の権限/ホスト/診断テスト、iOS15 arm64eビルドとパッケージ検査は成功。0.1.4の実機での撮影・振動・保存は未確認。旧版は戻せるよう保持する。

**English:** The user confirmed three-finger recognition/dispatch and working flashlight output. Preview 0.1.4 updates screenshot routing with runtime ABI validation and replaces undocumented haptic IDs with standard vibration. Update via Sileo and respring. Screenshot Route in diagnostics distinguishes dispatched requests, missing APIs, incompatible signatures and exceptions; dispatch does not prove a saved photo. Test Haptic Only is independent of recognition. Initial state is OFF and PreferenceLoader is required. Device screenshot/vibration/save verification remains pending. Existing permission gates and privacy boundaries are retained; earlier versions remain available.

## 公開ページと更新

登録先は引き続き [本家PROFILE](https://puteihirose.com/profile/)。パッケージと `Release`・`Packages` の更新元は、このリポジトリの `main` とGitHub Pagesを継続する。

各リリースでは配布パッケージ・索引とあわせて、日本語/英語のツイーク詳細ページ・パッケージ詳細・このREADMEを更新する。掲載中のKEYBOARD/PINのスクリーンショットは旧版UIであり、0.0.19/0.4.1の新機能や設定を撮り直した画像ではない。

Sileo・Zebra・Cydiaでの登録完了は、iPhone実機で試せた場合だけ確認済みとする。
