// ============================================================
//  EverQuest Atlas — Hover Cards
//  Shows a popup synopsis when mousing over internal links.
// ============================================================
(function () {
  'use strict';

  var _path = window.location.pathname.replace(/\\/g, '/');
  var ROOT  = (_path.includes('/zones/') || _path.includes('/factions/')) ? '../' : '';

  // ── Card element ──────────────────────────────────────────
  var card = null;
  function _ensureCard() {
    if (card) return;
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

  // ── Resolve an <a> to known content ──────────────────────
  function resolve(a) {
    var href = a.getAttribute('href') || '';
    // Normalize away leading ../ or ./
    var h = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '');

    // Zone page: zones/{id}.html
    var zm = h.match(/^zones\/([^/?#]+)\.html$/);
    if (zm && typeof ZONES !== 'undefined') {
      for (var zi = 0; zi < ZONES.length; zi++) {
        if (ZONES[zi].id === zm[1]) return { type: 'zone', d: ZONES[zi] };
      }
    }

    // Figure: allies.html#{id}
    var fm = h.match(/^allies\.html#(.+)$/);
    if (fm && typeof window.FIGURES_DATA !== 'undefined') {
      for (var fi = 0; fi < window.FIGURES_DATA.length; fi++) {
        if (window.FIGURES_DATA[fi].id === fm[1]) return { type: 'figure', d: window.FIGURES_DATA[fi] };
      }
    }

    // Glossary: glossary.html#entry-{id}
    var gm = h.match(/^glossary\.html#entry-(.+)$/);
    if (gm && typeof window.GLOSSARY_DATA !== 'undefined') {
      for (var gi = 0; gi < window.GLOSSARY_DATA.length; gi++) {
        if (window.GLOSSARY_DATA[gi].id === gm[1]) return { type: 'glossary', d: window.GLOSSARY_DATA[gi] };
      }
    }

    // Faction detail page: factions/{id}.html
    var fam = h.match(/^factions\/([^/?#]+)\.html$/);
    if (fam && typeof window.FACTIONS_DATA !== 'undefined') {
      for (var fai = 0; fai < window.FACTIONS_DATA.length; fai++) {
        if (window.FACTIONS_DATA[fai].id === fam[1]) return { type: 'faction', d: window.FACTIONS_DATA[fai] };
      }
    }

    // Fallback: data-mention-type / data-mention-key set by the auto-linker
    var mt = a.dataset.mentionType, mk = a.dataset.mentionKey;
    if (mt === 'zone' && mk && typeof ZONES !== 'undefined') {
      for (var zi2 = 0; zi2 < ZONES.length; zi2++) {
        if (ZONES[zi2].id === mk) return { type: 'zone', d: ZONES[zi2] };
      }
    }
    if (mt === 'character' && mk && typeof window.FIGURES_DATA !== 'undefined') {
      for (var fi2 = 0; fi2 < window.FIGURES_DATA.length; fi2++) {
        if (window.FIGURES_DATA[fi2].id === mk) return { type: 'figure', d: window.FIGURES_DATA[fi2] };
      }
    }
    if (mt === 'glossary' && mk && typeof window.GLOSSARY_DATA !== 'undefined') {
      for (var gi2 = 0; gi2 < window.GLOSSARY_DATA.length; gi2++) {
        if (window.GLOSSARY_DATA[gi2].id === mk) return { type: 'glossary', d: window.GLOSSARY_DATA[gi2] };
      }
    }

    return null;
  }

  // ── Build card inner HTML ─────────────────────────────────
  function buildHTML(r) {
    var d = r.d;
    if (r.type === 'zone') {
      return '<div class="hc-icon">🗺</div>' +
        '<div class="hc-body">' +
          '<div class="hc-badge">' + esc(d.continent) + (d.region ? ' · ' + esc(d.region) : '') + '</div>' +
          '<div class="hc-name">' + esc(d.name) + '</div>' +
          '<div class="hc-desc">' + esc(d.excerpt || '') + '</div>' +
        '</div>';
    }
    if (r.type === 'figure') {
      var isAlly   = d.section === 'ally';
      var badge    = isAlly ? 'Ally' : 'Enemy';
      var color    = isAlly ? '#6aaa6a' : '#c05050';
      var fallback = isAlly ? '🤝' : '⚔️';
      var portrait = d.portrait
        ? '<div class="hc-portrait">' +
            '<img src="' + ROOT + esc(d.portrait) + '" alt=""' +
            ' onerror="this.parentNode.innerHTML=\'<div class=\\\"hc-portrait-icon\\\">' + fallback + '</div>\'">' +
          '</div>'
        : '<div class="hc-portrait"><div class="hc-portrait-icon">' + fallback + '</div></div>';
      return portrait +
        '<div class="hc-body">' +
          '<div class="hc-badge" style="color:' + color + ';">' + badge + '</div>' +
          '<div class="hc-name">' + esc(d.name) + '</div>' +
          '<div class="hc-title">' + esc(d.title) + '</div>' +
          '<div class="hc-meta">' + esc(d.meta) + '</div>' +
          (d.desc ? '<div class="hc-desc">' + esc(d.desc) + '</div>' : '') +
        '</div>';
    }
    if (r.type === 'glossary') {
      return '<div class="hc-icon">📖</div>' +
        '<div class="hc-body">' +
          '<div class="hc-badge">Glossary</div>' +
          '<div class="hc-name">' + esc(d.term) + '</div>' +
          '<div class="hc-desc">' + esc(d.def) + '</div>' +
        '</div>';
    }
    if (r.type === 'faction') {
      return '<div class="hc-icon">⚔</div>' +
        '<div class="hc-body">' +
          '<div class="hc-badge">Faction</div>' +
          '<div class="hc-name">' + esc(d.name) + '</div>' +
          '<div class="hc-title">' + esc(d.tagline) + '</div>' +
          '<div class="hc-desc">' + esc(d.excerpt) + '</div>' +
        '</div>';
    }
    return '';
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
