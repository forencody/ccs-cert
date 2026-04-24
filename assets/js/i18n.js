// ── i18n 多語系模組 ────────────────────────────────────────────

const i18n = (() => {
  let _translations = {};
  let _lang = localStorage.getItem('ccs_lang') || APP_CONFIG.defaultLang;

  // 以點號分隔的 key 取值（例：'login.title'）
  function _get(key) {
    return key.split('.').reduce((obj, k) => (obj && obj[k] !== undefined ? obj[k] : null), _translations);
  }

  // 套用至 DOM 中所有 [data-i18n] 元素
  function _applyDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = _get(key);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = _get(key);
      if (val !== null) el.placeholder = val;
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = _get(key);
      if (val !== null) el.title = val;
    });
    // 更新 <html lang>
    document.documentElement.lang = _lang === 'zh_TW' ? 'zh-TW' : 'vi';
  }

  return {
    // 取得目前語系
    get lang() { return _lang; },

    // 翻譯函式
    t(key, replacements = {}) {
      let val = _get(key);
      if (val === null) return key; // fallback: 顯示 key
      Object.entries(replacements).forEach(([k, v]) => {
        val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      });
      return val;
    },

    // 載入語系 JSON 並套用
    async load(lang) {
      if (lang) _lang = lang;
      try {
        // 偵測路徑深度（根頁 vs 子目錄頁）
        const depth = window.location.pathname.split('/').filter(Boolean).length;
        const isSubDir = depth > (APP_CONFIG.rootPath.split('/').filter(Boolean).length + 1);
        const prefix = isSubDir ? '../' : './';
        const resp = await fetch(`${prefix}i18n/${_lang}.json?v=${Date.now()}`);
        _translations = await resp.json();
      } catch (e) {
        console.warn('i18n load failed, falling back to zh_TW', e);
        // 嘗試 zh_TW fallback
        if (_lang !== 'zh_TW') {
          const resp = await fetch('./i18n/zh_TW.json');
          _translations = await resp.json();
        }
      }
      _applyDOM();
    },

    // 切換語系
    async setLang(lang) {
      if (!APP_CONFIG.supportedLangs.includes(lang)) return;
      localStorage.setItem('ccs_lang', lang);
      _lang = lang;
      await this.load(lang);
    },

    // 套用至新插入的 DOM（動態渲染後呼叫）
    apply: _applyDOM,
  };
})();
