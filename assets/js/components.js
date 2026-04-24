// ── 共用 UI 元件 ───────────────────────────────────────────────

const UI = (() => {

  // ── SVG 圖示庫 ────────────────────────────────
  const icons = {
    dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
    projects:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
    templates: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>`,
    settings:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>`,
    org:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`,
    address:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
    accounts:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
    logout:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`,
    menu:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>`,
    close:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>`,
    check:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>`,
    warning:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
    edit:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
    trash:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
    plus:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>`,
    star:      `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    download:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
    upload:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>`,
  };

  // ── 側欄 HTML ────────────────────────────────
  function renderSidebar(activeKey) {
    const role = Auth.role;
    const isSA = Auth.isSuperAdmin;

    const navItems = [
      { key: 'dashboard', icon: 'dashboard', labelKey: 'nav.dashboard',  href: '../index.html',          rootHref: 'index.html',          show: true },
      { key: 'projects',  icon: 'projects',  labelKey: 'nav.projects',   href: '../projects/index.html', rootHref: 'projects/index.html', show: true },
      { key: 'templates', icon: 'templates', labelKey: 'nav.templates',  href: '../templates/index.html',rootHref: 'templates/index.html',show: true },
    ];

    const settingsItems = [
      { key: 'org',      icon: 'org',     labelKey: 'nav.org',       href: '../settings/org.html',       rootHref: 'settings/org.html',      show: isSA },
      { key: 'addresses',icon: 'address', labelKey: 'nav.addresses', href: '../settings/addresses.html', rootHref: 'settings/addresses.html', show: isSA },
      { key: 'accounts', icon: 'accounts',labelKey: 'nav.accounts',  href: '../settings/accounts.html',  rootHref: 'settings/accounts.html',  show: isSA },
    ];

    // 判斷目前是否在根目錄或子目錄
    const isRoot = !window.location.pathname.includes('/settings/') &&
                   !window.location.pathname.includes('/projects/') &&
                   !window.location.pathname.includes('/templates/');

    function href(item) { return isRoot ? item.rootHref : item.href; }

    const navHTML = navItems.filter(i => i.show).map(item => `
      <a href="${href(item)}" class="nav-link ${activeKey === item.key ? 'active' : ''}">
        ${icons[item.icon]}
        <span data-i18n="${item.labelKey}">${i18n.t(item.labelKey)}</span>
      </a>`).join('');

    const settingsVisible = settingsItems.some(i => i.show);
    const settingsHTML = settingsVisible ? `
      <div class="px-4 pt-4 pb-1">
        <p class="text-xs font-semibold text-blue-300 uppercase tracking-wider" data-i18n="nav.settings">${i18n.t('nav.settings')}</p>
      </div>
      ${settingsItems.filter(i => i.show).map(item => `
        <a href="${href(item)}" class="nav-sub-link ${activeKey === item.key ? 'active' : ''}">
          ${icons[item.icon]}
          <span data-i18n="${item.labelKey}">${i18n.t(item.labelKey)}</span>
        </a>`).join('')}` : '';

    const user = Auth.user;
    const profile = Auth.profile;
    const displayName = profile?.displayName || user?.email || '';
    const roleLabel = {
      superadmin:  i18n.t('accounts.role_superadmin'),
      certmanager: i18n.t('accounts.role_certmanager'),
      student:     i18n.t('accounts.role_student'),
    }[Auth.role] || '';

    return `
      <div class="p-4 flex items-center gap-3 border-b border-blue-900">
        <img src="${isRoot ? '' : '../'}assets/img/logo.png" alt="CCS" class="h-8 object-contain" onerror="this.style.display='none'">
        <div>
          <div class="text-white text-sm font-bold leading-tight" data-i18n="app.name">${i18n.t('app.name')}</div>
          <div class="text-blue-300 text-xs">CCS ESG</div>
        </div>
      </div>
      <nav class="flex-1 py-3 flex flex-col gap-0.5">
        ${navHTML}
        ${settingsHTML}
      </nav>
      <div class="p-4 border-t border-blue-900">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white text-sm font-bold">
            ${(displayName[0] || '?').toUpperCase()}
          </div>
          <div class="flex-1 min-w-0">
            <div class="text-white text-sm font-medium truncate">${displayName}</div>
            <div class="text-blue-300 text-xs">${roleLabel}</div>
          </div>
        </div>
        <button onclick="Auth.signOut()" class="nav-link w-full text-left" style="margin:0">
          ${icons.logout}
          <span data-i18n="nav.logout">${i18n.t('nav.logout')}</span>
        </button>
      </div>`;
  }

  // ── 頂部欄 HTML ──────────────────────────────
  function renderTopBar(pageTitle) {
    const lang = i18n.lang;
    return `
      <header class="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div class="flex items-center gap-3">
          <button id="sidebar-toggle" class="btn-icon md:hidden" onclick="UI.toggleSidebar()">
            ${icons.menu}
          </button>
          <h1 class="text-lg font-bold text-gray-800" id="page-title">${pageTitle}</h1>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <select onchange="i18n.setLang(this.value)" class="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white cursor-pointer focus:outline-none focus:border-blue-400">
              ${APP_CONFIG.supportedLangs.map(l => `
                <option value="${l}" ${l === lang ? 'selected' : ''}>${i18n.t('lang.' + l)}</option>
              `).join('')}
            </select>
          </div>
        </div>
      </header>`;
  }

  // ── 頁面初始化 ───────────────────────────────
  async function initAdminPage(options = {}) {
    const { active = 'dashboard', title = '', titleKey = '', roles = ['superadmin', 'certmanager'] } = options;

    // 先載入語系（避免閃爍）
    await i18n.load();

    // 顯示 loading 畫面
    document.getElementById('loading-screen')?.style && (
      document.getElementById('loading-screen').style.display = 'flex'
    );

    // 驗證登入
    const ok = await Auth.requireAdmin();
    if (!ok) return;

    // 渲染側欄與頂部欄
    const sidebar = document.getElementById('sidebar');
    const topbar  = document.getElementById('topbar');
    if (sidebar) sidebar.innerHTML = renderSidebar(active);
    if (topbar)  topbar.innerHTML  = renderTopBar(title || (titleKey ? i18n.t(titleKey) : i18n.t('nav.' + active)));

    // 隱藏 loading，顯示 app
    const loading = document.getElementById('loading-screen');
    const app     = document.getElementById('app');
    if (loading) loading.style.display = 'none';
    if (app)     app.style.display     = 'flex';

    // 初始化 Toast 容器
    if (!document.getElementById('toast-container')) {
      const tc = document.createElement('div');
      tc.id = 'toast-container';
      document.body.appendChild(tc);
    }
  }

  // ── Toast 通知 ───────────────────────────────
  function toast(message, type = 'info', duration = 3500) {
    const tc = document.getElementById('toast-container');
    if (!tc) return;
    const toastIcons = {
      success: `<svg style="width:16px;height:16px;color:#22c55e" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>`,
      error:   `<svg style="width:16px;height:16px;color:#ef4444" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
      warning: `<svg style="width:16px;height:16px;color:#f59e0b" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`,
      info:    `<svg style="width:16px;height:16px;color:#3165A7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`,
    };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `${toastIcons[type] || ''}<span>${message}</span>`;
    tc.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, duration);
  }

  // ── Modal 輔助 ───────────────────────────────
  function showModal(id) { document.getElementById(id)?.style && (document.getElementById(id).style.display = 'flex'); }
  function hideModal(id) { document.getElementById(id)?.style && (document.getElementById(id).style.display = 'none'); }

  function confirmDialog(message, onConfirm) {
    if (confirm(message)) onConfirm();
  }

  // ── 手機側欄切換 ─────────────────────────────
  function toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
  }

  // ── 日期格式化 ───────────────────────────────
  function formatDate(ts, locale) {
    if (!ts) return '—';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  return { initAdminPage, renderSidebar, renderTopBar, toast, showModal, hideModal, confirmDialog, toggleSidebar, formatDate, icons };
})();
