// Firebase 初始化（在 config.js 之後載入）
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const db      = firebase.firestore();
const auth    = firebase.auth();
const storage = firebase.storage();

// Firestore 集合參考
const Collections = {
  USERS:     'users',
  ORG:       'org',
  ADDRESSES: 'addresses',
  PROJECTS:  'projects',
  STUDENTS:  'students',
  TEMPLATES: 'templates',
  CERTS:     'certs'
};
