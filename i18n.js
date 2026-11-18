/* P.H.S repository language support. Display-only; package metadata stays unchanged. */
(function () {
  'use strict';

  var storageKey = 'phs-repo-language';
  var translations = {
    "座標・入力内容・画像・イベント履歴は保存しない。件数と最後のウィンドウ種別はメモリで保持し、診断を要求したときだけ端末内へ保存する。": "No coordinates, input text, images or event history are stored. Counts and the last window type stay in memory and are saved locally only when diagnostics are requested.",
    "ホームで3本指タップ後、設定の「実行側の接続を確認」を押し、受信・認識・呼び出しの件数を確認する。「触覚だけをテスト」は認識処理とは別に触覚を呼ぶ。件数は動作成功の証明ではない。": "After a three-finger tap on Home, use Check Engine Connection in Settings to view receipt, recognition and call counts. Test Haptic Only calls haptics separately from recognition. Call counts do not prove physical success.",
    "0.1.2で接続確認は通るが3本指の触覚が出ないとの報告。0.1.3ではタップの受信・認識・呼び出しと停止理由を切り分ける。": "Ready was reported in 0.1.2, but the user felt no three-finger haptic. Version 0.1.3 separates touch receipt, recognition, dispatch and stop reasons.",
    "Ready後も無反応な場合の受信・認識・実行件数を表示する0.1.3試用版。": "Preview 0.1.3 shows input, recognition and action-call counts when Ready is reported but gestures do not respond.",
    "ジェスチャー タップ ライト 録画 スクリーンショット 触覚 試用版": "gesture tap flashlight recording screenshot haptic preview beta",
    "0.1.3 試用版": "0.1.3 Preview",
    "Sileoで0.1.3へ更新し、リスプリング後に設定 → P.H.S GESTUREを開く。初期状態はOFF。PreferenceLoaderが必要。": "Update to 0.1.3 in Sileo, respring, then open Settings \u2192 P.H.S GESTURE. It starts OFF and requires PreferenceLoader.",
    "最初は3本指タップか上端ダブルタップに「触覚フィードバック」を割り当て、有効にして対応アプリを開き直す。": "Start by assigning Haptic Feedback to a three-finger tap or top-edge double tap. Enable the tweak, then reopen the target app.",
    "アプリ内で使えるのは触覚テストのみ。ライト・録画・撮影は「ロック解除中の全画面」を選び、ホーム画面で直接操作した場合だけ実行する。": "Only haptic testing is available inside apps. For flashlight, recording or screenshots, select the unlocked-screen scope and perform the gesture directly on the Home screen.",
    "ロック中は無効。除外するアプリIDを設定できる。標準の3本指編集や他のジェスチャーとの競合は実機確認待ち。": "Disabled while locked. You can exclude apps by bundle ID. Conflicts with native three-finger editing and other gestures still need device testing.",
    "iOS 15・Dopamine Rootless向けの試用版。ビルド・自動テストは成功。設定表示と0.1.2のReady応答はユーザー確認済み。0.1.3の件数診断・触覚単独テスト・各操作は実機確認待ち。": "Preview for iOS 15 with Dopamine Rootless. Builds and automated tests passed. Settings and the 0.1.2 Ready response were confirmed by the user. Counters, haptic-only testing and actions in 0.1.3 still need device testing.",
    "設定画面が開かない場合は有効化せず、SileoからP.H.S GESTUREを削除する。": "If its Settings page will not open, leave it disabled and remove P.H.S GESTURE through Sileo.",
    "実機スクリーンショットは準備中。掲載画像はありません。": "Device screenshots are pending. No screenshots are published yet.",
    "「−」で畳む。背景を完全に透過しても黄色いNotesは残り、位置固定がOFFならそのまま移動できる。": "Tap “−” to collapse it. The yellow Notes header stays visible even with a fully transparent background and remains draggable when Position Lock is OFF.",
    "ロック画面の付箋。文字サイズ・位置固定・位置リセット、入力の取り消し・やり直しに対応。": "Lock-screen notes with text sizing, position lock and reset, plus undo and redo.",
    "本文をタップして編集。キーボード上の「元に戻す／やり直す」で入力中の変更を戻せる。": "Tap the note body to edit. Use Undo and Redo above the keyboard to reverse changes made while typing.",
    "歯車の「文字サイズ」で12〜24ポイントに調整。「位置を固定」でドラッグによる誤移動を防ぐ。": "Use Text Size in settings to choose 12–24 points. Position Lock prevents accidental dragging.",
    "「位置を戻す」は位置だけを初期に戻す。本文・背景の濃さ・文字サイズ・折りたたみ状態は維持する。": "Reset Position restores only the initial placement, preserving the text, background opacity, text size, and collapsed state.",
    "位置の固定がOFFなら、Notesの上の帯をドラッグして移動できる。歯車で背景の透明度も調整できる。": "With Position Lock OFF, drag the Notes header to move the note. Use the gear icon to adjust background opacity.",
    "iOS 15・Dopamine Rootless向け。最新版は0.1.3。本文・位置・背景の濃さ・文字サイズ・位置固定の設定を端末に保存する。本文はロック解除前の画面にも表示される。新しい操作のiPhone実機動作は未確認。": "For iOS 15 with Dopamine Rootless. Latest: 0.1.3. Text, position, background opacity, text size, and position-lock settings are stored on-device. The text is visible before the phone is unlocked. New controls have not been tested on an iPhone.",
    "CLIPを対応アプリ間で共有。コピーしたパスワードにも対応。KEYバーの配置・移動も改善。": "Share CLIP across supported apps, including copied passwords. Improved KEY toolbar placement and dragging.",
    "複数の画像を固定し、全部隠す／戻す・位置とサイズのリセットができる。スクショ起動処理も改善。": "Pin multiple images, hide or restore them together, and reset their position and size. Improved screenshot activation.",
    "左端の「⋮」を上下にドラッグして移動・位置保存。タップで自動配置へ戻す。": "Drag the ⋮ handle on the left up or down to move and save the toolbar position. Tap it to restore automatic placement.",
    "純正メニューや送信・添付ボタンを避けて自動配置。横向きにも追従し、ドラッグ中断時は元の設定に戻る。": "KEY avoids native menus and send or attachment buttons, follows landscape changes, and restores the previous setting when a drag is interrupted.",
    "CLIPのテキスト・画像・PINNED・お気に入り・カテゴリーを対応アプリで共有。共通履歴にはlibSandyが必要。": "Share CLIP text, images, pinned items, favorites, and categories across supported apps. Shared history requires libSandy.",
    "自動保存はアプリごと。メモ・Safari・メッセージ・メールは初期ON、それ以外は初期OFF。コピーしたパスワードも保存対象。ワンタイムコード欄は対象外。": "Autosave is set per app. Notes, Safari, Messages, and Mail default to ON; other apps default to OFF. Copied passwords can also be saved. One-time-code fields are excluded.",
    "共通履歴の「全部削除」は、他の対応アプリの履歴にも反映される。": "Clearing all shared history also removes it from the other supported apps.",
    "iOS 15・Dopamine Rootless向け。最新版は0.0.19ベータ。ビルド・自動テストは成功。共通履歴・パスワード保存・配置の実機動作は未確認。旧版0.0.16・0.0.14も配布中。": "For iOS 15 with Dopamine Rootless. Latest: 0.0.19 beta. Builds and automated tests passed. Shared history, password saving, and placement have not been tested on an iPhone. Versions 0.0.16 and 0.0.14 remain available.",
    "端のピンか画像の「…」から「固定画像を全部隠す／全部戻す」。各画像の位置・大きさ・透明度・折りたたみ状態を保つ。": "Use the edge pin or an image’s “…” menu to hide or restore all pinned images, preserving each image’s position, size, opacity, and collapsed state.",
    "画像の「…」の「位置・サイズをリセット」で初期配置に戻す。": "Choose “Reset position and size” from an image’s “…” menu to restore its initial placement.",
    "iOS 15・Dopamine Rootless向け。最新版は0.4.1ベータ。撮影失敗時の復帰、連打・ロック時の取消処理を改善。ビルド・自動テストは成功。スクショ起動・新しい表示操作の実機動作は未確認。": "For iOS 15 with Dopamine Rootless. Latest: 0.4.1 beta. Improved recovery from capture failures and cancellation during repeated presses or locking. Builds and automated tests passed. Screenshot activation and the new display controls have not been tested on an iPhone.",
    "画像は以前のバージョンの参考表示。最新の機能・設定は上の説明を確認してね。": "Screenshots show an earlier version for reference. See the description above for current features and settings.",
    'リポジトリを追加': 'Add this repository',
    '使っているパッケージマネージャーを選んで、登録画面を開ける。': 'Choose your package manager to open its Add Source screen.',
    'タップして追加': 'Tap to add',
    '手動登録用URL': 'Manual source URL',
    'URLをコピー': 'Copy URL',
    'コピーしたよ': 'URL copied',
    'コピーできなかったよ。URLを長押ししてコピーしてね。': 'Could not copy automatically. Touch and hold the URL to copy it.',
    '登録先はＰ.Ｈ.Ｓ PROFILEに統一しているよ。各アプリで追加を確認してね。': 'P.H.S PROFILE is the canonical source. Confirm the addition in your package manager.',
    'SileoでＰ.Ｈ.Ｓのリポジトリを追加': 'Add the P.H.S repository to Sileo',
    'ZebraでＰ.Ｈ.Ｓのリポジトリを追加': 'Add the P.H.S repository to Zebra',
    'CydiaでＰ.Ｈ.Ｓのリポジトリを追加': 'Add the P.H.S repository to Cydia',
    '一覧を表示するにはJavaScriptを有効にしてね。リポジトリ登録ボタンは上から利用できる。': 'Enable JavaScript to browse the packages. The source-registration buttons above work without it.',
    'ツイークの詳細': 'Tweak details',
    'ツイークの説明、スクリーンショット、対応環境を確認できる。': 'Explore tweak descriptions, screenshots, and compatibility.',
    'パッケージ名・機能で検索': 'Search packages or features',
    '例　PIN、クリップ履歴、付箋': 'e.g. PIN, clipboard history, sticky notes',
    'カテゴリ': 'Category',
    'すべてのカテゴリ': 'All categories',
    '条件に合うパッケージがないよ。': 'No packages match your filters.',
    '検索条件をクリア': 'Clear filters',
    '一覧を表示するにはJavaScriptを有効にしてね。ソース登録はＰ.Ｈ.ＳのPROFILEから。': 'Enable JavaScript to browse packages. Add the source from the P.H.S PROFILE page.',
    '詳細を見る': 'View details',
    '閉じる': 'Close',
    'パッケージ情報': 'Package information',
    'バージョン': 'Version',
    'アーキテクチャ': 'Architecture',
    'パッケージID': 'Package ID',
    'スクリーンショットの拡大表示': 'Enlarged screenshot',
    '前へ': 'Previous',
    '次へ': 'Next',
    '使い方と対応環境': 'How to use & compatibility',
    'スクリーンショット': 'Screenshots',
    'ツイーク': 'Tweaks',
    'その他': 'Other',
    '広瀬プティ': 'Putei Hirose',
    'キーボードから文字を編集。文章・画像・URLのクリップ履歴を探して貼り直せる。': 'Edit text from the keyboard. Search and reuse clipboard history for text, images, and URLs.',
    "新機能：左端の「⋮」を上下にドラッグすると、KEYバーを手動で移動できる。移動位置はアプリごとに保存。つまみをタップすると自動配置へ戻る。": "Drag the ⋮ handle on the left up or down to move the KEY toolbar. Its position is saved for each app. Tap the handle to restore automatic placement.",
    "純正メニューとLINE等の送信・添付ボタンを検出し、重ならない安全な位置へ自動調整。配置先がなければKEYだけ一時的に隠す。": "KEY automatically moves out of the way of the native menu and send or attachment buttons in apps such as LINE. If there is no room, the KEY toolbar hides temporarily.",
    "CLIP履歴やPINNED・画像は0.0.14と同じ仕様。共通履歴の対象はメモ・Safari・メッセージ・メールの4アプリ。0.0.15で試した共有対象拡張は含まない。": "CLIP history, pinned items, and images work as in 0.0.14. Shared history is available in Notes, Safari, Messages, and Mail. The experimental expansion from 0.0.15 was removed.",
    "iOS 15・Dopamine Rootless向け。最新版は0.0.16ベータ。0.0.15は不具合により配布停止済み。新しい自動配置・ドラッグの実機検証はこれから。旧版0.0.14は戻せるよう配布を継続。": "For iOS 15 with Dopamine Rootless. The latest version is 0.0.16 beta. Version 0.0.15 was withdrawn due to issues. The new placement and drag controls still need device testing. Version 0.0.14 remains available for rollback.",
    "バーの自動配置を強化。つまみで上下に移動・位置保存・タップで自動復帰。CLIPは0.0.14のまま。": "Improved automatic toolbar placement. Drag the handle to move KEY and save its position, or tap it to restore automatic placement. CLIP works as in 0.0.14.",
    'スクショの必要な範囲だけ切り取り、複数枚を画面に固定できる。': 'Crop screenshots to the area you need and pin multiple images on screen.',
    'ロック画面に書ける付箋。黄色い見出しごと移動でき、背景の透明度も調整できる。': 'An editable lock-screen sticky note with a movable yellow header and adjustable transparency.',
    'キーボード コピー CLIP クリップボード 入力 テキスト 履歴': 'keyboard copy clipboard input text editing history clip paste',
    'ピン 画像 スクリーンショット OCR QR 範囲 切り抜き': 'pin image screenshot capture crop OCR QR clip',
    'ノーツ ノート メモ ロック画面 付箋': 'notes sticky note memo lock screen draggable transparency',
    '入力欄を開き、キーボード上のP.H.S KEYから編集する。': 'Open a text field and use P.H.S KEY above the keyboard to edit text.',
    'CLIPから履歴やお気に入りを開く。共通履歴はメモ・Safari・メッセージ・メールが対象。': 'Open history and favorites in CLIP. Shared history supports Notes, Safari, Messages, and Mail.',
    'Spotlight検索の対応は試験中。0.0.14では純正の「テキストをスキャン」が出たときの位置調整を見直した。': 'Spotlight search support is experimental. Version 0.0.14 adjusts the toolbar position when the native “Scan Text” item appears.',
    'iOS 15・Dopamine Rootless向け。アプリの入力欄によって表示は異なる。Spotlightの0.0.14の変更は実機再確認待ち。': 'For iOS 15 with Dopamine Rootless. Display behavior depends on the app and text field. The Spotlight change in 0.0.14 still needs device retesting.',
    'P.H.S KEYの編集バー': 'P.H.S KEY editing toolbar',
    'P.H.S CLIPのコピー履歴': 'P.H.S CLIP clipboard history',
    '履歴を整理': 'Organize history',
    'CLIPの設定': 'CLIP settings',
    'P.H.S KEYの編集バーを拡大': 'Enlarge the P.H.S KEY editing toolbar',
    'P.H.S CLIPのコピー履歴を拡大': 'Enlarge the P.H.S CLIP clipboard history',
    '履歴の整理画面を拡大': 'Enlarge the history organizer',
    'CLIPの設定を拡大': 'Enlarge CLIP settings',
    '切り取り・コピー・貼り付け・全選択・取り消し・カーソル移動・履歴を開くボタン': 'Cut, copy, paste, select all, undo, cursor controls, and open-history buttons',
    '検索欄、カテゴリの絞り込み、固定した項目とコピー履歴の一覧': 'Search, category filters, pinned entries, and clipboard history',
    '履歴を長押しして固定・お気に入り・カテゴリを設定するメニュー': 'Long-press menu for pinning, favoriting, and categorizing history items',
    '共通履歴の対象アプリ、自動保存の切り替え、履歴の一括削除': 'Shared-history apps, autosave toggle, and clear-history controls',
    'サイドボタン＋音量上を押し、「通常のスクショ」か「範囲を切り取る」を選ぶ。': 'Press Side + Volume Up and choose a full screenshot or a cropped capture.',
    '範囲をなぞって「固定」。コピー済みの画像は、端のピンから追加できる。': 'Select an area and tap Pin. You can also add copied images from the edge pin.',
    '「…」からコピー・共有、OCR、QR読み取り。端のピンから直近12件の履歴を開ける。': 'Use “…” to copy, share, recognize text (OCR), or scan QR codes. The edge pin opens the 12 most recent captures.',
    'iOS 15・Dopamine Rootless向け。アプリをまたぐ基本表示は0.1.0で確認済み。0.4.0のスクショボタンからの起動は実機確認待ち。': 'For iOS 15 with Dopamine Rootless. Basic cross-app display was verified in 0.1.0. Screenshot-button activation in 0.4.0 awaits device testing.',
    '撮り方を選ぶ': 'Choose capture type',
    '画像を画面に固定': 'Pin an image on screen',
    '複数枚を同時に固定': 'Pin multiple images',
    'PINの操作メニュー': 'PIN actions menu',
    '撮り方の選択画面を拡大': 'Enlarge capture-type selection',
    '固定した画像のスクリーンショットを拡大': 'Enlarge a screenshot of a pinned image',
    '複数枚を固定したスクリーンショットを拡大': 'Enlarge a screenshot of multiple pinned images',
    'PINの操作メニューの画像を拡大': 'Enlarge the PIN actions menu',
    '通常のスクショと範囲の切り取りを選ぶメニュー': 'Menu for choosing a full screenshot or cropped capture',
    '切り取った画像をツールバー付きで画面上に固定した状態': 'A cropped image pinned on screen with its toolbar',
    '複数の画像を重ねて画面に固定した状態': 'Multiple overlapping images pinned on screen',
    '画像のコピー、共有と保存、文字認識、QR読み取り、履歴を開くメニュー': 'Menu for copying, sharing, saving, text recognition, QR scanning, and history',
    'Notesの上の帯をドラッグして移動。歯車で背景の透明度を変える。': 'Drag the top Notes bar to move it. Use the gear icon to change background opacity.',
    '「−」で畳む。背景を完全に透過しても、畳んだ黄色いNotesは残り、そのまま移動できる。': 'Tap “−” to collapse it. Even with a fully transparent background, the yellow Notes header stays visible and draggable.',
    'iOS 15・Dopamine Rootless向け。本文は端末に保存され、ロック解除前の画面にも表示される。': 'For iOS 15 with Dopamine Rootless. Notes are stored on-device and can be visible before the phone is unlocked.',
    '開いた状態': 'Expanded',
    '折りたたんだ状態': 'Collapsed',
    '背景の濃さを調整': 'Adjust background opacity',
    '開いた状態の画像を拡大': 'Enlarge the expanded note',
    '折りたたんだ状態の画像を拡大': 'Enlarge the collapsed note',
    '背景の濃さを調整の画像を拡大': 'Enlarge the opacity controls',
    'ロック画面に表示した、黄色い見出しと透ける罫線付きのメモ': 'Lock-screen note with a yellow header and translucent ruled paper',
    '折りたたむと黄色いNotesの見出しだけが残る': 'Only the yellow Notes header remains after collapsing',
    '歯車から開く背景の濃さのスライダー': 'Background-opacity slider opened from the gear icon'
  };

  var textOriginals = new WeakMap();
  var attributeOriginals = new WeakMap();
  var language = 'ja';

  try {
    var stored = window.localStorage.getItem(storageKey);
    if (stored === 'ja' || stored === 'en') language = stored;
    else language = /^ja(?:-|$)/i.test(navigator.language || '') ? 'ja' : 'en';
  } catch (error) {
    language = /^ja(?:-|$)/i.test(navigator.language || '') ? 'ja' : 'en';
  }

  function english(original) {
    return Object.prototype.hasOwnProperty.call(translations, original) ? translations[original] : original;
  }
  function translate(original) {
    return language === 'en' ? english(original) : original;
  }

  function translateElement(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || node.parentElement.closest('script,style,template')) continue;
      var original = textOriginals.has(node) ? textOriginals.get(node) : node.nodeValue;
      if (!textOriginals.has(node)) textOriginals.set(node, original);
      var trimmed = original.trim();
      if (!trimmed || !Object.prototype.hasOwnProperty.call(translations, trimmed)) continue;
      node.nodeValue = original.replace(trimmed, translate(trimmed));
    }
    var all = [root].concat(Array.from(root.querySelectorAll('*')));
    all.forEach(function (element) {
      if (!element.getAttribute || element.closest('template')) return;
      var originals = attributeOriginals.get(element) || {};
      ['alt', 'aria-label', 'placeholder', 'title'].forEach(function (name) {
        if (!element.hasAttribute(name)) return;
        if (!Object.prototype.hasOwnProperty.call(originals, name)) originals[name] = element.getAttribute(name);
        var original = originals[name];
        if (Object.prototype.hasOwnProperty.call(translations, original)) element.setAttribute(name, translate(original));
      });
      attributeOriginals.set(element, originals);
    });
  }

  function setLanguage(next) {
    if (next !== 'ja' && next !== 'en') return;
    language = next;
    try { window.localStorage.setItem(storageKey, language); } catch (error) { /* private mode */ }
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'P.H.S | Package Explorer' : 'Ｐ.Ｈ.Ｓ | パッケージ一覧';
    document.dispatchEvent(new CustomEvent('phs:languagechange', { detail: { language: language } }));
    translateElement(document.body);
    updateButtons();
  }

  var buttons = [];
  function updateButtons() {
    buttons.forEach(function (button) {
      var selected = button.getAttribute('data-language') === language;
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      button.classList.toggle('is-active', selected);
    });
  }

  var source = document.querySelector('.source');
  if (source) {
    var switcher = document.createElement('div');
    switcher.className = 'language-switch';
    switcher.setAttribute('role', 'group');
    switcher.setAttribute('aria-label', 'Language / 言語');
    [['ja', 'JP'], ['en', 'EN']].forEach(function (item) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = item[1];
      button.className = 'language-button';
      button.setAttribute('data-language', item[0]);
      button.setAttribute('lang', item[0]);
      button.setAttribute('aria-label', item[0] === 'ja' ? '日本語で表示' : 'Display in English');
      button.addEventListener('click', function () { setLanguage(item[0]); });
      switcher.appendChild(button);
      buttons.push(button);
    });
    source.appendChild(switcher);
  }

  window.PHSI18N = {
    language: function () { return language; },
    translate: translate,
    english: english,
    translateElement: translateElement,
    count: function (number) { return language === 'en' ? number + (number === 1 ? ' package' : ' packages') : number + '件のパッケージ'; },
    setLanguage: setLanguage
  };

  document.documentElement.lang = language;
  document.title = language === 'en' ? 'P.H.S | Package Explorer' : 'Ｐ.Ｈ.Ｓ | パッケージ一覧';
  translateElement(document.body);
  updateButtons();
})();
