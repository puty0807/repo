/* P.H.S repository language support. Display-only; package metadata stays unchanged. */
(function () {
  'use strict';

  var storageKey = 'phs-repo-language';
  var translations = {
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
