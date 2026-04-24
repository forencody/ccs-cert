// ── 身份驗證模組 ───────────────────────────────────────────────

const Auth = (() => {
  let _currentUser = null;   // Firebase User
  let _userProfile = null;   // Firestore users doc
  let _resolveReady;
  const _ready = new Promise(res => { _resolveReady = res; });

  // 監聽 Firebase 登入狀態
  auth.onAuthStateChanged(async user => {
    if (user) {
      _currentUser = user;
      try {
        const doc = await db.collection(Collections.USERS).doc(user.uid).get();
        _userProfile = doc.exists ? doc.data() : null;
      } catch (e) {
        _userProfile = null;
      }
    } else {
      _currentUser  = null;
      _userProfile  = null;
    }
    _resolveReady();
  });

  return {
    // 等待 Firebase 狀態初始化完成
    ready: () => _ready,

    get user()    { return _currentUser; },
    get profile() { return _userProfile; },
    get role()    { return _userProfile?.role || null; },
    get isLoggedIn() { return !!_currentUser; },
    get isSuperAdmin()  { return this.role === APP_CONFIG.roles.SUPER_ADMIN; },
    get isCertManager() { return this.role === APP_CONFIG.roles.CERT_MANAGER || this.isSuperAdmin; },
    get isStudent()     { return this.role === APP_CONFIG.roles.STUDENT; },

    // ── 路由保護 ────────────────────────────────

    // 管理員頁面（superadmin + certmanager）
    async requireAdmin() {
      await this.ready();
      if (!this.isLoggedIn) { this._toLogin(); return false; }
      if (!this.isCertManager) { this._toLogin(); return false; }
      return true;
    },

    // 僅主管理員
    async requireSuperAdmin() {
      await this.ready();
      if (!this.isLoggedIn || !this.isSuperAdmin) { this._toLogin(); return false; }
      return true;
    },

    // 學員頁面
    async requireStudent() {
      await this.ready();
      if (!this.isLoggedIn) { this._toVerify(); return false; }
      if (!this.isStudent && !this.isCertManager) { this._toVerify(); return false; }
      return true;
    },

    // ── 登入 ────────────────────────────────────

    // 管理員：Email + 密碼
    async signInWithPassword(email, password) {
      const cred = await auth.signInWithEmailAndPassword(email, password);
      const doc  = await db.collection(Collections.USERS).doc(cred.user.uid).get();
      const profile = doc.exists ? doc.data() : null;
      if (!profile || profile.role === APP_CONFIG.roles.STUDENT) {
        await auth.signOut();
        throw { code: 'auth/not-authorized' };
      }
      _currentUser = cred.user;
      _userProfile = profile;
      return profile;
    },

    // 學員：發送 Magic Link
    async sendMagicLink(email) {
      const actionCodeSettings = {
        url: APP_CONFIG.magicLinkUrl,
        handleCodeInApp: true,
      };
      await auth.sendSignInLinkToEmail(email, actionCodeSettings);
      localStorage.setItem('ccs_magic_email', email);
    },

    // Magic Link 完成登入（在 login.html 頁面處理）
    async completeMagicLink() {
      if (!auth.isSignInWithEmailLink(window.location.href)) return false;
      let email = localStorage.getItem('ccs_magic_email');
      if (!email) {
        email = window.prompt('請輸入您的 Email 以完成登入：');
        if (!email) return false;
      }
      const cred = await auth.signInWithEmailLink(email, window.location.href);
      localStorage.removeItem('ccs_magic_email');
      const doc = await db.collection(Collections.USERS).doc(cred.user.uid).get();
      _currentUser = cred.user;
      _userProfile = doc.exists ? doc.data() : null;
      return true;
    },

    // 登出
    async signOut() {
      await auth.signOut();
      _currentUser = null;
      _userProfile  = null;
      this._toLogin();
    },

    // ── 帳號管理（主管理員用）────────────────────

    async createUser(email, password, displayName, role) {
      // 建立 Firebase Auth 帳號
      const cred = await auth.createUserWithEmailAndPassword(email, password || this._tempPwd());
      await db.collection(Collections.USERS).doc(cred.user.uid).set({
        email, displayName, role,
        orgId: APP_CONFIG.orgId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // 學員不需密碼，發送密碼重設信（實際使用 magic link）
      if (role === APP_CONFIG.roles.STUDENT) {
        await auth.sendPasswordResetEmail(email);
      }
      return cred.user.uid;
    },

    async updateUserProfile(uid, data) {
      await db.collection(Collections.USERS).doc(uid).update(data);
    },

    async deleteUser(uid) {
      await db.collection(Collections.USERS).doc(uid).delete();
    },

    async listUsers() {
      const snap = await db.collection(Collections.USERS)
        .where('orgId', '==', APP_CONFIG.orgId)
        .orderBy('createdAt', 'desc')
        .get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },

    // ── 工具函式 ────────────────────────────────
    _tempPwd() {
      return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2).toUpperCase();
    },

    _toLogin() {
      const root = APP_CONFIG.rootPath;
      window.location.href = root + 'login.html';
    },

    _toVerify() {
      const root = APP_CONFIG.rootPath;
      window.location.href = root + 'verify.html';
    },
  };
})();
