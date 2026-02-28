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
  apiKey:            "REPLACE_ME",
  authDomain:        "REPLACE_ME.firebaseapp.com",
  databaseURL:       "https://REPLACE_ME-default-rtdb.firebaseio.com",
  projectId:         "REPLACE_ME",
  storageBucket:     "REPLACE_ME.appspot.com",
  messagingSenderId: "REPLACE_ME",
  appId:             "REPLACE_ME"
});

window.firebaseDB = firebase.database();
