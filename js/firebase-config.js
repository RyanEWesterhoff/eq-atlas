// ── Firebase Configuration ────────────────────────────────────────────────────
// Fill in your Firebase project values below.
// Get them from: Firebase Console → Project Settings → Your apps → Web → SDK setup
//
// SETUP STEPS:
//   1. Go to https://console.firebase.google.com and create a project
//   2. Add a Web app to the project
//   3. Copy the firebaseConfig values into the object below
//   4. In the Firebase Console, go to Build → Realtime Database → Create database
//      Choose "Start in test mode" (allows open read/write — fine for a private site)
//   5. Commit and push this file
// ─────────────────────────────────────────────────────────────────────────────

firebase.initializeApp({
  apiKey: "AIzaSyAUE1ZEEHszXNSf2_vMj6SQviqZyfB_V3A",
  authDomain: "eq-dnd-site.firebaseapp.com",
  databaseURL: "https://eq-dnd-site-default-rtdb.firebaseio.com",
  projectId: "eq-dnd-site",
  storageBucket: "eq-dnd-site.firebasestorage.app",
  messagingSenderId: "40453675548",
  appId: "1:40453675548:web:04d3171d2fd39daedc5dd9",
  measurementId: "G-FWV44JBXG3"
});

window.firebaseDB = firebase.database();
