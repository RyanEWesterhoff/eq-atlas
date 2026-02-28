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

// Returns relative prefix to site root from current page
function _rootPrefix() {
  return window.location.pathname.replace(/\\/g, '/').includes('/zones/') ? '../' : './';
}

// Redirect to login if not authenticated.
// Call this at the top of every protected page.
function requireAuth() {
  if (!isAuthenticated()) {
    const dest = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(_rootPrefix() + 'login.html?next=' + dest);
  }
}

// Attempt login — called from login.html form submit
async function attemptLogin(password, redirectTo) {
  const hash = await sha256(password);
  if (hash === PASS_HASH) {
    sessionStorage.setItem(AUTH_KEY, AUTH_TOKEN);
    window.location.replace(redirectTo || './index.html');
    return true;
  }
  return false;
}

// Logout
function logout() {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(GM_KEY);
  window.location.replace(_rootPrefix() + 'login.html');
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

// ── GM Hidden State (Firebase Realtime Database) ─────────────────────────────
// Hidden state is stored in Firebase so it persists across all browsers.
// sessionStorage is used as an instant-render cache for the current tab session.

const FIREBASE_HIDDEN_PATH = 'eq-atlas/hidden';
const GM_HIDDEN_CACHE_KEY  = 'eq_gm_hidden_cache';

// In-memory cache — initialized from sessionStorage for instant rendering,
// then kept in sync by the Firebase onValue listener.
let _gmHiddenCache = (function () {
  try { return JSON.parse(sessionStorage.getItem(GM_HIDDEN_CACHE_KEY)) || { zones: [], npcs: [] }; }
  catch (e) { return { zones: [], npcs: [] }; }
})();

function _getGMHidden() {
  return _gmHiddenCache;
}

function _saveGMHidden(data) {
  _gmHiddenCache = data;
  try { sessionStorage.setItem(GM_HIDDEN_CACHE_KEY, JSON.stringify(data)); } catch (e) {}
  if (window.firebaseDB) {
    window.firebaseDB.ref(FIREBASE_HIDDEN_PATH).set(data).catch(function (err) {
      console.error('Firebase write error (hidden state):', err);
    });
  }
}

function isZoneHidden(zoneId) {
  return _gmHiddenCache.zones.includes(zoneId);
}

function isNPCHidden(zoneId, npcName) {
  return _gmHiddenCache.npcs.includes(zoneId + '::' + npcName);
}

// Re-applies the current hidden state to all matching elements on the page.
// Called when Firebase pushes an update so all browsers stay in sync.
function _applyHiddenState() {
  // Zone cards (zones.html grid and any page using zone-card)
  document.querySelectorAll('.zone-card[data-zone-id]').forEach(function (card) {
    const zoneId = card.dataset.zoneId;
    const hidden = _gmHiddenCache.zones.includes(zoneId);
    card.classList.toggle('gm-card-hidden', hidden);
    const btn = card.querySelector('.gm-hide-btn');
    if (btn) _updateGMHideBtn(btn, hidden);
  });

  // NPC list items on individual zone pages
  document.querySelectorAll('.gm-hide-btn').forEach(function (btn) {
    if (btn.closest('.zone-card')) return; // already handled above
    const onclick = btn.getAttribute('onclick') || '';
    const match = onclick.match(/gmToggleNPC\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/);
    if (match) {
      const hidden = _gmHiddenCache.npcs.includes(match[1] + '::' + match[2]);
      const li = btn.closest('li');
      if (li) { li.classList.toggle('gm-npc-hidden', hidden); _updateGMHideBtn(btn, hidden); }
    }
  });
}

// Called by the hide button on zone cards; stops the card link from firing
function gmToggleZone(zoneId, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  if (!isGM()) return;
  const data = _getGMHidden();
  const idx = data.zones.indexOf(zoneId);
  if (idx === -1) data.zones.push(zoneId); else data.zones.splice(idx, 1);
  _saveGMHidden(data);
  // Optimistic local update (Firebase listener will confirm)
  const hidden = data.zones.includes(zoneId);
  document.querySelectorAll('.zone-card[data-zone-id="' + zoneId + '"]').forEach(function (card) {
    card.classList.toggle('gm-card-hidden', hidden);
    const btn = card.querySelector('.gm-hide-btn');
    if (btn) _updateGMHideBtn(btn, hidden);
  });
}

// Called by the hide button on NPC list items
// btnEl = the button div (passed as `this` from onclick)
function gmToggleNPC(zoneId, npcName, btnEl, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  if (!isGM()) return;
  const data = _getGMHidden();
  const key = zoneId + '::' + npcName;
  const idx = data.npcs.indexOf(key);
  if (idx === -1) data.npcs.push(key); else data.npcs.splice(idx, 1);
  _saveGMHidden(data);
  // Optimistic local update
  const hidden = data.npcs.includes(key);
  const li = btnEl.closest('li');
  if (li) { li.classList.toggle('gm-npc-hidden', hidden); _updateGMHideBtn(btnEl, hidden); }
}

function _updateGMHideBtn(btn, isHidden) {
  btn.title       = isHidden ? 'Reveal to players' : 'Hide from players';
  btn.textContent = isHidden ? '👁' : '🚫';
  btn.classList.toggle('gm-hide-btn-on', isHidden);
}

// Inject GM UI elements after the DOM is ready (runs on every protected page)
document.addEventListener('DOMContentLoaded', function () {
  if (!isAuthenticated()) return;

  // Apply body class immediately so CSS can show/hide .gm-only elements
  if (isGM()) document.body.classList.add('gm-mode');

  // Start Firebase hidden state listener — updates all browsers in real-time
  if (window.firebaseDB) {
    window.firebaseDB.ref(FIREBASE_HIDDEN_PATH).on('value', function (snapshot) {
      const data = snapshot.val() || { zones: [], npcs: [] };
      _gmHiddenCache = { zones: data.zones || [], npcs: data.npcs || [] };
      try { sessionStorage.setItem(GM_HIDDEN_CACHE_KEY, JSON.stringify(_gmHiddenCache)); } catch (e) {}
      _applyHiddenState();
    });
  }

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
