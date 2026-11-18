const get = (id) => document.getElementById(id);
// iOS 15.2 Safari predates native dialog support.
const legacyStack = [];

function openDialog(dialog) {
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }
  const backdrop = document.createElement('div');
  backdrop.className = 'legacy-backdrop';
  const depth = legacyStack.length * 2 + 20;
  backdrop.style.zIndex = String(depth);
  dialog.style.zIndex = String(depth + 1);
  dialog.before(backdrop);
  legacyStack.push({ dialog, backdrop, previousFocus: document.activeElement });
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('open', '');
  dialog.classList.add('legacy-dialog');
  document.body.classList.add('legacy-modal-open');
  dialog.querySelector('[autofocus]').focus();
}

function closeDialog(dialog) {
  if (typeof dialog.close === 'function') {
    dialog.close();
    return;
  }
  if (legacyStack[legacyStack.length - 1]?.dialog !== dialog) return;
  const { backdrop, previousFocus } = legacyStack.pop();
  backdrop.remove();
  dialog.removeAttribute('open');
  dialog.classList.remove('legacy-dialog');
  if (!legacyStack.length) document.body.classList.remove('legacy-modal-open');
  previousFocus?.focus();
  dialog.dispatchEvent(new Event('close'));
}

document.addEventListener('submit', (event) => {
  const dialog = event.target.closest('.legacy-dialog');
  if (!dialog || event.target.getAttribute('method') !== 'dialog') return;
  event.preventDefault();
  closeDialog(dialog);
});

document.addEventListener('keydown', (event) => {
  const dialog = legacyStack[legacyStack.length - 1]?.dialog;
  if (!dialog) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeDialog(dialog);
  }
  if (event.key !== 'Tab') return;
  const controls = [...dialog.querySelectorAll('a[href], button:not(:disabled)')];
  const edge = event.shiftKey ? controls[0] : controls[controls.length - 1];
  if (document.activeElement === edge || !dialog.contains(document.activeElement)) {
    event.preventDefault();
    (event.shiftKey ? controls[controls.length - 1] : controls[0]).focus();
  }
});

const featured = [
  {
    slug: 'keyboard', id: 'jp.puteihirose.keyboard', name: 'P.H.S KEYBOARD',
    version: '0.0.19', icon: '⌨',
    summary: 'CLIPを対応アプリ間で共有。コピーしたパスワードにも対応。KEYバーの配置・移動も改善。',
    keywords: 'キーボード コピー CLIP クリップボード 入力 テキスト 履歴'
  },
  {
    slug: 'pin', id: 'jp.puteihirose.pin', name: 'P.H.S PIN',
    version: '0.4.1', icon: '⌖',
    summary: '複数の画像を固定し、全部隠す／戻す・位置とサイズのリセットができる。スクショ起動処理も改善。',
    keywords: 'ピン 画像 スクリーンショット OCR QR 範囲 切り抜き'
  },
  {
    slug: 'gesture', id: 'jp.puteihirose.gesture', name: 'P.H.S GESTURE',
    version: '0.1.5', icon: '✦',
    summary: '0.1.5録画安定化試用版。録画要求の重複を抑止。ライト・スクショは前版で成功報告あり。',
    keywords: 'ジェスチャー タップ ライト 録画 スクリーンショット 触覚 試用版'
  },
  {
    slug: 'notes', id: 'jp.puteihirose.locknote', name: 'LockNote',
    version: '0.1.3', icon: '≡',
    summary: 'ロック画面の付箋。文字サイズ・位置固定・位置リセット、入力の取り消し・やり直しに対応。',
    keywords: 'ノーツ ノート メモ ロック画面 付箋'
  }
].map((entry) => ({
  author: '広瀬プティ', category: 'Tweaks', architecture: 'iphoneos-arm64', ...entry
}));

// Copy the same canonical source URL used by all three package managers.
const copyRepoButton = get('copy-repository-url');
if (copyRepoButton) {
  copyRepoButton.addEventListener('click', async () => {
    const url = get('repository-url').textContent.trim();
    let success = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        success = true;
      } catch (error) {
        // Some iOS web views do not grant clipboard access.
      }
    }
    if (!success) {
      const field = document.createElement('textarea');
      field.value = url;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.focus();
      field.select();
      field.setSelectionRange(0, url.length);
      try { success = document.execCommand('copy'); } catch (error) { /* fallback failed */ }
      field.remove();
    }
    get('install-copy-status').textContent = window.PHSI18N.translate(success
      ? 'コピーしたよ'
      : 'コピーできなかったよ。URLを長押ししてコピーしてね。');
  });
}

const grid = get('package-grid');
const search = get('package-search');
const category = get('category');
const packageDialog = get('package-dialog');
let entries = featured;
let activeSlug = null;

const categoryName = (value) => window.PHSI18N.translate(value === 'Tweaks' ? 'ツイーク' : value);
const architectureName = (value) => ({
  'iphoneos-arm64': 'arm64 · Rootless', 'iphoneos-arm': 'arm · Rootful',
  'iphoneos-arm64e': 'arm64e'
})[value] ?? value;
const normalize = (value) => value.normalize('NFKC').toLowerCase();
const byline = (entry) => [entry.version && `v${entry.version}`, entry.author].filter(Boolean).join(' · ');

function updateCategories() {
  const selected = category.value;
  const values = [...new Set(entries.map((entry) => entry.category))].sort();
  category.replaceChildren(new Option(window.PHSI18N.translate('すべてのカテゴリ'), ''));
  for (const value of values) category.add(new Option(categoryName(value), value));
  if (values.includes(selected)) category.value = selected;
}

function renderCards() {
  const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  const cards = [];
  for (const entry of entries) {
    const description = normalize([entry.name, entry.id, entry.summary, entry.keywords, entry.author,
      window.PHSI18N.english(entry.summary), window.PHSI18N.english(entry.keywords), window.PHSI18N.english(entry.author)].join(' '));
    if (category.value && category.value !== entry.category) continue;
    if (!terms.every((term) => description.includes(term))) continue;
    const card = get('package-card').content.cloneNode(true);
    const icon = card.querySelector('.package-icon');
    icon.textContent = entry.icon ?? '◈';
    icon.dataset.tone = entry.slug;
    card.querySelector('h3').textContent = entry.name;
    card.querySelector('.byline').textContent = byline(entry);
    card.querySelector('.category-tag').textContent = categoryName(entry.category);
    card.querySelector('.architecture-tag').textContent = architectureName(entry.architecture);
    card.querySelector('.package-summary').textContent = window.PHSI18N.translate(entry.summary);
    const action = card.querySelector('.card-action');
    action.href = `#${entry.slug}`;
    action.setAttribute('aria-label', window.PHSI18N.language() === 'en' ? 'View details for ' + entry.name : entry.name + 'の詳細を見る');
    cards.push(card);
  }
  grid.replaceChildren(...cards);
  window.PHSI18N.translateElement(grid);
  get('result-count').textContent = window.PHSI18N.count(cards.length);
  get('no-results').hidden = cards.length > 0;
}

function setMetadata(entry) {
  get('package-title').textContent = entry.name;
  get('package-byline').textContent = byline(entry);
  get('detail-category').textContent = categoryName(entry.category);
  get('detail-architecture').textContent = architectureName(entry.architecture);
  get('detail-summary').textContent = window.PHSI18N.translate(entry.summary);
  get('detail-version').textContent = entry.version;
  get('detail-arch-value').textContent = entry.architecture;
  get('detail-id').textContent = entry.id;
}

function showRequestedPackage() {
  const entry = entries.find((candidate) => `#${candidate.slug}` === location.hash);
  if (entry?.slug !== activeSlug && viewer.hasAttribute('open')) closeDialog(viewer);
  if (!entry) {
    if (packageDialog.hasAttribute('open')) {
      activeSlug = null;
      closeDialog(packageDialog);
    }
    return;
  }
  setMetadata(entry);
  if (entry.slug !== activeSlug) {
    const template = get(`${entry.slug}-detail`);
    get('package-content').replaceChildren(...(template ? [template.content.cloneNode(true)] : []));
    activeSlug = entry.slug;
    packageDialog.scrollTop = 0;
  }
  window.PHSI18N.translateElement(packageDialog);
  if (!packageDialog.hasAttribute('open')) openDialog(packageDialog);
}

search.addEventListener('input', renderCards);
category.addEventListener('change', renderCards);
get('clear-filters').addEventListener('click', () => {
  search.value = '';
  category.value = '';
  renderCards();
  search.focus();
});
window.addEventListener('hashchange', showRequestedPackage);

document.addEventListener('phs:languagechange', () => {
  updateCategories();
  renderCards();
  if (!activeSlug) return;
  const entry = entries.find((candidate) => candidate.slug === activeSlug);
  if (!entry) return;
  const scrollTop = packageDialog.scrollTop;
  const template = get(entry.slug + '-detail');
  get('package-content').replaceChildren(...(template ? [template.content.cloneNode(true)] : []));
  setMetadata(entry);
  window.PHSI18N.translateElement(packageDialog);
  packageDialog.scrollTop = scrollTop;
});

packageDialog.addEventListener('close', () => {
  if (location.hash === `#${activeSlug}`) history.replaceState(null, '', location.pathname + location.search);
  activeSlug = null;
});

const viewer = get('screenshot-viewer');
const preview = get('screenshot-image');
const caption = get('screenshot-caption');
const previous = get('screenshot-prev');
const next = get('screenshot-next');
let screenshots = [];
let current = 0;

function showScreenshot(index) {
  if (index < 0 || index >= screenshots.length) return;
  current = index;
  const link = screenshots[current];
  preview.src = link.href;
  preview.alt = link.querySelector('img').alt;
  caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
  previous.disabled = current === 0;
  next.disabled = current === screenshots.length - 1;
}

get('package-content').addEventListener('click', (event) => {
  const link = event.target.closest('.tweak-gallery a');
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  screenshots = [...link.closest('.tweak-gallery').querySelectorAll('a')];
  showScreenshot(screenshots.indexOf(link));
  openDialog(viewer);
});
previous.addEventListener('click', () => showScreenshot(current - 1));
next.addEventListener('click', () => showScreenshot(current + 1));
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showScreenshot(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});

// Debian compares epoch, upstream version, then revision. In each part, "~"
// sorts before end-of-string and letters before other non-numeric characters.
function compareVersionPart(left, right) {
  const rank = (char) => char === '~' ? -1 : !char ? 0 : /[a-z]/i.test(char) ? char.charCodeAt(0) : char.charCodeAt(0) + 256;
  let a = 0;
  let b = 0;
  while (a < left.length || b < right.length) {
    while (/[^0-9]/.test(left[a] ?? '') || /[^0-9]/.test(right[b] ?? '')) {
      const aText = /[^0-9]/.test(left[a] ?? '');
      const bText = /[^0-9]/.test(right[b] ?? '');
      const delta = rank(aText ? left[a] : '') - rank(bText ? right[b] : '');
      if (delta) return delta;
      if (aText) a++;
      if (bText) b++;
    }
    const aDigits = left.slice(a).match(/^\d*/)[0];
    const bDigits = right.slice(b).match(/^\d*/)[0];
    a += aDigits.length;
    b += bDigits.length;
    const aValue = aDigits.replace(/^0+/, '');
    const bValue = bDigits.replace(/^0+/, '');
    if (aValue.length !== bValue.length) return aValue.length - bValue.length;
    if (aValue !== bValue) return aValue > bValue ? 1 : -1;
  }
  return 0;
}

function unpackVersion(version) {
  const separator = version.indexOf(':');
  const epoch = separator < 0 ? '0' : version.slice(0, separator);
  const rest = version.slice(separator + 1);
  const dash = rest.lastIndexOf('-');
  return [epoch, dash < 0 ? rest : rest.slice(0, dash), dash < 0 ? '0' : rest.slice(dash + 1)];
}

function compareVersions(left, right) {
  const a = unpackVersion(left);
  const b = unpackVersion(right);
  return compareVersionPart(a[0], b[0]) || compareVersionPart(a[1], b[1]) || compareVersionPart(a[2], b[2]);
}

function readPackages(text) {
  const latest = new Map();
  for (const stanza of text.trim().split(/\r?\n\s*\r?\n/)) {
    const fields = Object.fromEntries([...stanza.matchAll(/^([\w-]+):[ \t]*(.*)$/gm)].map(([, key, value]) => [key, value.trim()]));
    const id = fields.Package;
    if (!id || !/^[a-z0-9][a-z0-9+.-]*$/.test(id) || !fields.Version) continue;
    const previous = latest.get(id);
    if (!previous || compareVersions(fields.Version, previous.Version) > 0) latest.set(id, fields);
  }
  return latest;
}

async function loadIndex() {
  try {
    const response = await fetch('./Packages', { cache: 'no-cache' });
    if (!response.ok) return;
    const latest = readPackages(await response.text());
    if (!latest.size) return;
    const preferred = new Map(featured.map((entry) => [entry.id, entry]));
    const available = [...featured.map((entry) => entry.id).filter((id) => latest.has(id))];
    available.push(...[...latest.keys()].filter((id) => !preferred.has(id)));
    entries = available.map((id) => {
      const fields = latest.get(id);
      const entry = preferred.get(id);
      return {
        ...entry, id, slug: entry?.slug ?? id, name: entry?.name ?? fields.Name ?? id,
        version: fields.Version, author: entry?.author ?? fields.Author ?? fields.Maintainer ?? '',
        architecture: fields.Architecture ?? '', category: fields.Section ?? 'その他',
        summary: entry?.summary ?? fields.Description ?? ''
      };
    });
    updateCategories();
    renderCards();
    showRequestedPackage();
  } catch {
    // Featured packages are available even if the index cannot load.
  }
}

updateCategories();
renderCards();
showRequestedPackage();
loadIndex();
