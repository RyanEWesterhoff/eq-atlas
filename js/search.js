// ============================================================
//  EverQuest Atlas — Global Search
//  Injects a search bar into the nav; searches ZONES data
//  across zone names, descriptions, bestiary, and NPCs.
// ============================================================

(function () {
  'use strict';

  // Detect path depth: zone pages live in /zones/ subdirectory
  const ROOT = window.location.pathname.replace(/\\/g, '/').includes('/zones/') ? '../' : '';

  // ── Inject search bar into nav ────────────────────────────
  function init() {
    const navUl = document.querySelector('.top-nav ul');
    if (!navUl) return;

    const li = document.createElement('li');
    li.id = 'gs-li';
    li.innerHTML =
      '<div class="gs-wrap" id="gs-wrap">' +
        '<input id="gs-input" class="gs-input" type="text"' +
        ' placeholder="Search…" autocomplete="off" spellcheck="false"' +
        ' aria-label="Global search" aria-expanded="false" aria-haspopup="listbox">' +
        '<div id="gs-panel" class="gs-panel" role="listbox" hidden></div>' +
      '</div>';
    navUl.appendChild(li);

    const input = document.getElementById('gs-input');
    const panel = document.getElementById('gs-panel');

    input.addEventListener('input', function () {
      var q = input.value.trim();
      if (q.length < 2) { hide(); return; }
      render(doSearch(q), panel, q);
      input.setAttribute('aria-expanded', 'true');
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { hide(); input.blur(); return; }
      if (e.key === 'Enter') {
        var first = panel.querySelector('.gs-item');
        if (first) window.location.href = first.getAttribute('href');
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var items = panel.querySelectorAll('.gs-item');
        if (items.length) items[0].focus();
      }
    });

    panel.addEventListener('keydown', function (e) {
      var items = Array.prototype.slice.call(panel.querySelectorAll('.gs-item'));
      var idx = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); if (items[idx + 1]) items[idx + 1].focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); if (idx === 0) input.focus(); else if (items[idx - 1]) items[idx - 1].focus(); }
      if (e.key === 'Escape')    { hide(); input.focus(); }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      var wrap = document.getElementById('gs-wrap');
      if (wrap && !wrap.contains(e.target)) hide();
    });

    // '/' shortcut to open search (when not in a text field)
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

    function hide() {
      panel.hidden = true;
      panel.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
    }
  }

  // ── Search engine ─────────────────────────────────────────
  function doSearch(q) {
    if (typeof ZONES === 'undefined') return { zones: [], creatures: [], npcs: [] };

    var ql = q.toLowerCase();
    var zones = [], creatures = [], npcs = [];

    for (var i = 0; i < ZONES.length; i++) {
      var z = ZONES[i];

      // Zone — match any text field
      var zoneText = [
        z.name, z.region, z.continent, z.excerpt,
        (z.tags || []).join(' '),
        z.background || '', z.dangers || '', z.benefits || ''
      ].join(' ').toLowerCase();

      if (zoneText.includes(ql)) {
        // Choose the most readable snippet source
        var snipSrc = z.excerpt;
        if (!z.excerpt.toLowerCase().includes(ql)) {
          var fields = [z.background, z.dangers, z.benefits];
          for (var f = 0; f < fields.length; f++) {
            if (fields[f] && fields[f].toLowerCase().includes(ql)) {
              snipSrc = fields[f];
              break;
            }
          }
        }
        zones.push({ zone: z, snipSrc: snipSrc, url: ROOT + 'zones/' + z.id + '.html' });
      }

      // Bestiary creatures
      var bestiary = z.bestiary || [];
      for (var b = 0; b < bestiary.length; b++) {
        var creature = bestiary[b];
        if ((creature.name + ' ' + creature.type).toLowerCase().includes(ql)) {
          creatures.push({ creature: creature, zone: z, url: ROOT + 'zones/' + z.id + '.html' });
        }
      }

      // Notable NPCs
      var npcsArr = z.notableNPCs || [];
      for (var n = 0; n < npcsArr.length; n++) {
        var npc = npcsArr[n];
        if ((npc.name + ' ' + npc.role).toLowerCase().includes(ql)) {
          npcs.push({ npc: npc, zone: z, url: ROOT + 'zones/' + z.id + '.html' });
        }
      }
    }

    return {
      zones:     zones.slice(0, 7),
      creatures: creatures.slice(0, 6),
      npcs:      npcs.slice(0, 6)
    };
  }

  // ── Rendering helpers ─────────────────────────────────────
  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }

  function hilite(raw, q) {
    var safe = esc(raw);
    var escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safe.replace(new RegExp('(' + escaped + ')', 'gi'), '<mark class="gs-hl">$1</mark>');
  }

  function snip(text, q, pad) {
    pad = pad || 40;
    var idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text.slice(0, 90) + (text.length > 90 ? '…' : '');
    var s = Math.max(0, idx - pad);
    var e = Math.min(text.length, idx + q.length + pad);
    return (s > 0 ? '…' : '') + text.slice(s, e) + (e < text.length ? '…' : '');
  }

  // ── Render results panel ──────────────────────────────────
  function render(hits, panel, q) {
    var total = hits.zones.length + hits.creatures.length + hits.npcs.length;

    if (total === 0) {
      panel.innerHTML = '<div class="gs-empty">No results for <em>' + esc(q) + '</em></div>';
      panel.hidden = false;
      return;
    }

    var html = '';

    if (hits.zones.length) {
      html += '<div class="gs-group">Zones</div>';
      for (var i = 0; i < hits.zones.length; i++) {
        var z   = hits.zones[i].zone;
        var src = hits.zones[i].snipSrc;
        var url = hits.zones[i].url;
        html += '<a href="' + url + '" class="gs-item" tabindex="0">' +
          '<span class="gs-title">' + hilite(z.name, q) + '</span>' +
          '<span class="gs-sub">' + hilite(z.continent, q) + ' &mdash; ' + hilite(snip(src, q), q) + '</span>' +
          '</a>';
      }
    }

    if (hits.creatures.length) {
      html += '<div class="gs-group">Creatures</div>';
      for (var j = 0; j < hits.creatures.length; j++) {
        var c    = hits.creatures[j].creature;
        var cz   = hits.creatures[j].zone;
        var curl = hits.creatures[j].url;
        html += '<a href="' + curl + '" class="gs-item" tabindex="0">' +
          '<span class="gs-title">' + hilite(c.name, q) + '</span>' +
          '<span class="gs-sub">' + hilite(c.type, q) + ' &bull; Lvl ' + esc(c.level) + ' &bull; ' + hilite(cz.name, q) + '</span>' +
          '</a>';
      }
    }

    if (hits.npcs.length) {
      html += '<div class="gs-group">Notable NPCs</div>';
      for (var k = 0; k < hits.npcs.length; k++) {
        var npc  = hits.npcs[k].npc;
        var nz   = hits.npcs[k].zone;
        var nurl = hits.npcs[k].url;
        html += '<a href="' + nurl + '" class="gs-item" tabindex="0">' +
          '<span class="gs-title">' + hilite(npc.name, q) + '</span>' +
          '<span class="gs-sub">' + hilite(snip(npc.role, q), q) + ' &mdash; ' + hilite(nz.name, q) + '</span>' +
          '</a>';
      }
    }

    html += '<div class="gs-footer"><kbd>&#8593;&#8595;</kbd> navigate &nbsp;&bull;&nbsp; <kbd>Enter</kbd> go &nbsp;&bull;&nbsp; <kbd>Esc</kbd> close</div>';

    panel.innerHTML = html;
    panel.hidden = false;
  }

  // ── Boot ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
