// ============================================================
//  EverQuest Atlas — Site Authentication
//  Password gate for private campaign reference site
// ============================================================

const AUTH_KEY   = 'eq_atlas_auth';
const AUTH_TOKEN = 'authenticated';
// SHA-256 of the site password
const PASS_HASH  = '1ae3ca3ea0e1b7f7f8c7a978f20747a79dd94c08ec0e17ae574028f9462d82d0';

// GM Mode — separate elevated session
// SHA-256 of the GM password. Default: "gamemaster"
// To change: compute sha256 of your chosen password and replace the hash below.
const GM_KEY        = 'eq_atlas_gm';
const GM_TOKEN      = 'gm_active';
const GM_PASS_HASH  = 'aba9796a63f9a96b21885a899240408c7783b91fccaabe57482918d71fc5d5bd';

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
  sessionStorage.removeItem(GM_KEY);
  window.location.replace('/eq-atlas/login.html');
}

// ── GM Mode ─────────────────────────────────────────────────

function isGM() {
  return sessionStorage.getItem(GM_KEY) === GM_TOKEN;
}

async function attemptGMLogin(password) {
  const hash = await sha256(password);
  if (hash === GM_PASS_HASH) {
    sessionStorage.setItem(GM_KEY, GM_TOKEN);
    return true;
  }
  return false;
}

function deactivateGM() {
  sessionStorage.removeItem(GM_KEY);
  location.reload();
}

// Inject GM UI elements after the DOM is ready (runs on every protected page)
document.addEventListener('DOMContentLoaded', function () {
  if (!isAuthenticated()) return;

  // Apply body class immediately so CSS can show/hide .gm-only elements
  if (isGM()) document.body.classList.add('gm-mode');

  // Add GM toggle button to the top nav (before Sign Out)
  const nav = document.querySelector('.top-nav ul');
  if (nav) {
    const li = document.createElement('li');
    if (isGM()) {
      li.innerHTML = `<a href="#" onclick="deactivateGM();return false;" class="gm-nav-active">🔮 GM Mode</a>`;
    } else {
      li.innerHTML = `<a href="#" onclick="showGMModal();return false;" class="gm-nav-inactive">🔮 GM</a>`;
    }
    const signOutLi = nav.querySelector('li:last-child');
    nav.insertBefore(li, signOutLi);
  }

  // Persistent GM mode bar at top of page
  if (isGM()) {
    const bar = document.createElement('div');
    bar.className = 'gm-mode-bar';
    bar.innerHTML = `
      <span>🔮 GM Mode Active — content with a dashed border is hidden from players</span>
      <button onclick="deactivateGM()" class="gm-mode-bar-btn">Deactivate GM Mode</button>
    `;
    document.body.insertBefore(bar, document.body.firstChild);
  }

  // GM login modal (always injected; displayed on demand)
  const overlay = document.createElement('div');
  overlay.id = 'gm-modal-overlay';
  overlay.className = 'gm-modal-overlay';
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('role', 'dialog');
  overlay.style.display = 'none';
  overlay.innerHTML = `
    <div class="gm-modal">
      <div class="gm-modal-emblem">🔮</div>
      <div class="gm-modal-title">GM Mode</div>
      <div class="gm-modal-subtitle">Enter the GM passphrase to unlock hidden content</div>
      <form onsubmit="handleGMLogin(event)">
        <div class="gm-modal-field">
          <input type="password" id="gm-password-input" placeholder="GM passphrase…" autocomplete="off">
        </div>
        <button type="submit" class="gm-modal-btn">Unlock</button>
        <div class="gm-modal-error" id="gm-modal-error"></div>
      </form>
      <button type="button" onclick="closeGMModal()" class="gm-modal-cancel">Cancel</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // Close on backdrop click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeGMModal();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeGMModal();
  });
});

function showGMModal() {
  const overlay = document.getElementById('gm-modal-overlay');
  if (!overlay) return;
  overlay.style.display = 'flex';
  setTimeout(() => {
    const inp = document.getElementById('gm-password-input');
    if (inp) inp.focus();
  }, 50);
}

function closeGMModal() {
  const overlay = document.getElementById('gm-modal-overlay');
  if (overlay) overlay.style.display = 'none';
}

async function handleGMLogin(e) {
  e.preventDefault();
  const pw  = document.getElementById('gm-password-input').value;
  const err = document.getElementById('gm-modal-error');
  err.textContent = '';

  const ok = await attemptGMLogin(pw);
  if (ok) {
    closeGMModal();
    location.reload();
  } else {
    err.textContent = 'Invalid passphrase.';
    const inp = document.getElementById('gm-password-input');
    inp.value = '';
    inp.focus();
  }
}

// Auto-protect: run requireAuth immediately on page load
// (only on protected pages — login.html does NOT include this call)
if (document.currentScript && document.currentScript.dataset.protect === 'true') {
  requireAuth();
}
