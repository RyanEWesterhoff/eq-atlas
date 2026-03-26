// ============================================================
//  EverQuest Atlas — Hover Cards
//  Shows a popup synopsis when mousing over internal links.
// ============================================================
(function () {
  'use strict';

  // Guard against double-load (e.g. injected twice by search.js)
  if (window._hcLoaded) return;
  window._hcLoaded = true;

  var _path = window.location.pathname.replace(/\\/g, '/');
  var ROOT  = (_path.includes('/zones/') || _path.includes('/factions/')) ? '../' : '';

  // Disabled on the Lands browser page (zone cards already show context)
  if (_path.endsWith('/zones.html') || _path === '/zones.html') return;

  // ── Card element ──────────────────────────────────────────
  var card = null;
  function _ensureCard() {
    if (card) return;
    // Remove any stale cards left by a previous (double-loaded) instance
    document.querySelectorAll('.hc-card').forEach(function (el) { el.remove(); });
    card = document.createElement('div');
    card.className = 'hc-card';
    document.body.appendChild(card);
  }

  // ── HTML escaping ─────────────────────────────────────────
  function esc(s) {
    return String(s || '').replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  // ── Unified ID → entry index (built once, lazily) ────────
  // Each entity ID maps to exactly ONE entry regardless of which
  // data source it came from. GLOSSARY_DATA takes priority so a
  // hand-written glossary entry can override an auto-generated one.
  var _idx = null;
  function _getIdx() {
    if (_idx) return _idx;
    _idx = {};

    if (typeof ZONES !== 'undefined') {
      for (var zi = 0; zi < ZONES.length; zi++) {
        var z = ZONES[zi];
        _idx[z.id] = { type: 'zone', name: z.name, continent: z.continent, region: z.region, def: z.excerpt };
      }
    }
    if (typeof window.FIGURES_DATA !== 'undefined') {
      for (var fi = 0; fi < window.FIGURES_DATA.length; fi++) {
        var f = window.FIGURES_DATA[fi];
        _idx[f.id] = { type: 'figure', name: f.name, section: f.section, portrait: f.portrait, title: f.title, meta: f.meta, def: f.desc };
      }
    }
    if (typeof window.FACTIONS_DATA !== 'undefined') {
      for (var fai = 0; fai < window.FACTIONS_DATA.length; fai++) {
        var fa = window.FACTIONS_DATA[fai];
        _idx[fa.id] = { type: 'faction', name: fa.name, tagline: fa.tagline, def: fa.excerpt };
      }
    }
    // Glossary last — overrides any same-id entry above
    if (typeof window.GLOSSARY_DATA !== 'undefined') {
      for (var gi = 0; gi < window.GLOSSARY_DATA.length; gi++) {
        var g = window.GLOSSARY_DATA[gi];
        _idx[g.id] = { type: 'glossary', name: g.term, def: g.def };
      }
    }
    return _idx;
  }

  // ── Extract the entity ID from a link ────────────────────
  function _linkId(a) {
    var href = a.getAttribute('href') || '';
    var h = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');
    var m;
    if ((m = h.match(/^zones\/([^/?#]+)\.html$/)))         return m[1];
    if ((m = h.match(/^allies\.html#(.+)$/)))              return m[1];
    if ((m = h.match(/^glossary\.html#entry-(.+)$/)))      return m[1];
    if ((m = h.match(/^factions\/([^/?#]+)\.html$/)))      return m[1];
    // Fallback: set by the auto-linker
    return a.dataset.mentionKey || null;
  }

  // ── Resolve an <a> to one entry ───────────────────────────
  function resolve(a) {
    var id = _linkId(a);
    if (!id) return null;
    return _getIdx()[id] || null;
  }

  // ── Build card inner HTML ─────────────────────────────────
  function buildHTML(e) {
    if (e.type === 'zone') {
      return '<div class="hc-icon">🗺</div>' +
        '<div class="hc-body">' +
          '<div class="hc-badge">' + esc(e.continent) + (e.region ? ' · ' + esc(e.region) : '') + '</div>' +
          '<div class="hc-name">' + esc(e.name) + '</div>' +
          '<div class="hc-desc">' + esc(e.def || '') + '</div>' +
        '</div>';
    }
    if (e.type === 'figure') {
      var isAlly   = e.section === 'ally';
      var badge    = isAlly ? 'Ally' : 'Enemy';
      var color    = isAlly ? '#6aaa6a' : '#c05050';
      var fallback = isAlly ? '🤝' : '⚔️';
      var portrait = e.portrait
        ? '<div class="hc-portrait">' +
            '<img src="' + ROOT + esc(e.portrait) + '" alt=""' +
            ' onerror="this.parentNode.innerHTML=\'<div class=\\\"hc-portrait-icon\\\">' + fallback + '</div>\'">' +
          '</div>'
        : '<div class="hc-portrait"><div class="hc-portrait-icon">' + fallback + '</div></div>';
      return portrait +
        '<div class="hc-body">' +
          '<div class="hc-badge" style="color:' + color + ';">' + badge + '</div>' +
          '<div class="hc-name">' + esc(e.name) + '</div>' +
          '<div class="hc-title">' + esc(e.title) + '</div>' +
          '<div class="hc-meta">' + esc(e.meta) + '</div>' +
          (e.def ? '<div class="hc-desc">' + esc(e.def) + '</div>' : '') +
        '</div>';
    }
    if (e.type === 'faction') {
      return '<div class="hc-icon">⚔</div>' +
        '<div class="hc-body">' +
          '<div class="hc-badge">Faction</div>' +
          '<div class="hc-name">' + esc(e.name) + '</div>' +
          '<div class="hc-title">' + esc(e.tagline) + '</div>' +
          '<div class="hc-desc">' + esc(e.def) + '</div>' +
        '</div>';
    }
    // Default: glossary
    return '<div class="hc-icon">📖</div>' +
      '<div class="hc-body">' +
        '<div class="hc-badge">Glossary</div>' +
        '<div class="hc-name">' + esc(e.name) + '</div>' +
        '<div class="hc-desc">' + esc(e.def) + '</div>' +
      '</div>';
  }

  // ── Show / position / hide ────────────────────────────────
  var _current = null, _hideTimer = null;

  function show(a) {
    if (a === _current) return;
    _current = a;
    var r = resolve(a);
    if (!r) { hide(); return; }
    var html = buildHTML(r);
    if (!html) { hide(); return; }
    _ensureCard();
    card.innerHTML = html;
    card.classList.add('hc-visible');
    position(a);
  }

  function position(a) {
    var rect  = a.getBoundingClientRect();
    var gap   = 10;
    var left  = rect.left;
    var top   = rect.bottom + gap;
    var w     = card.offsetWidth  || 400;
    var h     = card.offsetHeight || 180;

    if (left + w > window.innerWidth - 8) left = window.innerWidth - w - 8;
    if (left < 8) left = 8;
    if (top + h > window.innerHeight - 8) top = rect.top - h - gap;

    card.style.left = left + 'px';
    card.style.top  = top  + 'px';
  }

  function hide() {
    if (card) card.classList.remove('hc-visible');
    _current = null;
  }

  function scheduleHide() {
    clearTimeout(_hideTimer);
    _hideTimer = setTimeout(hide, 120);
  }

  // ── Global listeners ──────────────────────────────────────
  document.addEventListener('mouseover', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) { scheduleHide(); return; }
    clearTimeout(_hideTimer);
    show(a);
  });

  document.addEventListener('mouseout', function (e) {
    if (!e.target.closest || !e.target.closest('a[href]')) return;
    scheduleHide();
  });

  document.addEventListener('click', hide);

  // Init card element once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _ensureCard);
  } else {
    _ensureCard();
  }

})();
