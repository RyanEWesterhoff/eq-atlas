// ============================================================
//  EverQuest Atlas — Site Authentication
//  Password gate for private campaign reference site
// ============================================================

const AUTH_KEY   = 'eq_atlas_auth';
const AUTH_TOKEN = 'authenticated';
// SHA-256 of the site password
const PASS_HASH  = '1ae3ca3ea0e1b7f7f8c7a978f20747a79dd94c08ec0e17ae574028f9462d82d0';

// Hash a string with SHA-256, return hex string
async function sha256(str) {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Check if the current session is authenticated
function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === AUTH_TOKEN;
}

// Redirect to login if not authenticated.
// Call this at the top of every protected page.
function requireAuth() {
  if (!isAuthenticated()) {
    const dest = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace('/eq-atlas/login.html?next=' + dest);
  }
}

// Attempt login — called from login.html form submit
async function attemptLogin(password, redirectTo) {
  const hash = await sha256(password);
  if (hash === PASS_HASH) {
    sessionStorage.setItem(AUTH_KEY, AUTH_TOKEN);
    window.location.replace(redirectTo || '/eq-atlas/');
    return true;
  }
  return false;
}

// Logout
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  window.location.replace('/eq-atlas/login.html');
}

// Auto-protect: run requireAuth immediately on page load
// (only on protected pages — login.html does NOT include this call)
if (document.currentScript && document.currentScript.dataset.protect === 'true') {
  requireAuth();
}
