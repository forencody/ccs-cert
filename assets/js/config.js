// =============================================================
// Firebase 設定 — 請至 Firebase Console 取得後填入
// https://console.firebase.google.com
// =============================================================
const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// =============================================================
// 應用程式設定
// =============================================================
const APP_CONFIG = {
  // Phase 1 單組織設定
  orgId: 'ccsustain',

  // 預設語系
  defaultLang: 'zh_TW',
  supportedLangs: ['zh_TW', 'vi'],

  // 應用程式根路徑（自動偵測）
  // 本機開發時指向 '/'，GitHub Pages 時指向 '/ccs-cert/'
  get rootPath() {
    const script = document.querySelector('script[src*="config.js"]');
    if (script) {
      return new URL(script.src).pathname.replace(/assets\/js\/config\.js$/, '');
    }
    return '/';
  },

  // Magic Link 登入導向 URL（學員免密碼登入）
  get magicLinkUrl() {
    return window.location.origin + this.rootPath + 'login.html';
  },

  // 帳號角色定義
  roles: {
    SUPER_ADMIN:  'superadmin',
    CERT_MANAGER: 'certmanager',
    STUDENT:      'student'
  }
};
