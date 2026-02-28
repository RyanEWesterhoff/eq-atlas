// ============================================================
//  EverQuest Atlas — Campaign Reference Site
//  main.js — Navigation, filtering, rendering
// ============================================================

// ── Difficulty helper ──────────────────────────────────────
function levelToDifficulty(levelStr) {
  const min = parseInt(levelStr) || 0;
  if (min <= 15) return { label: 'Easy',      color: '#3a7a3a', border: '#4fa84f' };
  if (min <= 30) return { label: 'Medium',    color: '#7a6a18', border: '#c9a84c' };
  if (min <= 50) return { label: 'Hard',      color: '#7a3a10', border: '#c96830' };
  return             { label: 'Very Hard',  color: '#7a1a1a', border: '#c03030' };
}

function difficultyBadge(levelStr) {
  const d = levelToDifficulty(levelStr);
  return `<span class="level-badge" style="background:${d.color};border-color:${d.border};color:#f0e8d0;">${d.label}</span>`;
}

// ── Active page detection ──────────────────────────────────
(function markActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.top-nav a, .sidebar-section a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── Zone grid rendering (zones.html) ───────────────────────
function renderZoneGrid(containerSelector, filter = {}) {
  const container = document.querySelector(containerSelector);
  if (!container || typeof ZONES === 'undefined') return;

  let zones = [...ZONES];

  // Text filter
  if (filter.search) {
    const q = filter.search.toLowerCase();
    zones = zones.filter(z =>
      z.name.toLowerCase().includes(q) ||
      z.region.toLowerCase().includes(q) ||
      z.continent.toLowerCase().includes(q) ||
      z.excerpt.toLowerCase().includes(q) ||
      (z.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }

  // Region filter
  if (filter.region) {
    zones = zones.filter(z => z.continent === filter.region);
  }

  // Tag filter
  if (filter.tag) {
    zones = zones.filter(z => (z.tags || []).includes(filter.tag));
  }

  if (zones.length === 0) {
    container.innerHTML = '<p style="color:var(--text-secondary);padding:20px 0;">No lands match your search.</p>';
    return;
  }

  const gmMode = typeof isGM === 'function' && isGM();

  container.innerHTML = zones.map(zone => {
    const cardHidden = gmMode && typeof isZoneHidden === 'function' && isZoneHidden(zone.id);
    const isCity = zone.levelRange === 'City' || zone.levelRange === 'Trade Zone' || zone.levelRange === 'Hub Zone';
    return `
      <a href="zones/${zone.id}.html" class="zone-card${cardHidden ? ' gm-card-hidden' : ''}" data-zone-id="${zone.id}">
        ${gmMode ? `<div class="gm-hide-btn${cardHidden ? ' gm-hide-btn-on' : ''}" title="${cardHidden ? 'Reveal to players' : 'Hide from players'}" onclick="gmToggleZone('${zone.id}', event)">${cardHidden ? '👁' : '🚫'}</div>` : ''}
        <div class="zone-region">${zone.continent}</div>
        <h3>${zone.name}</h3>
        <p class="zone-excerpt">${zone.excerpt}</p>
        <div class="zone-tags">
          ${(zone.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
          <span class="tag ${isCity ? 'safe' : 'danger'}">${isCity ? '🏙 City' : `⚔ ${zone.levelRange}`}</span>
        </div>
      </a>
    `;
  }).join('');
}

// ── Zone detail rendering ──────────────────────────────────
function renderZoneDetail(zoneId) {
  const zone = typeof ZONES !== 'undefined' ? ZONES.find(z => z.id === zoneId) : null;
  const container = document.getElementById('zone-detail-content');
  if (!zone || !container) return;

  // Breadcrumb
  const bc = document.getElementById('zone-breadcrumb');
  if (bc) bc.innerHTML = `
    <a href="../index.html">Home</a>
    <span class="sep">›</span>
    <a href="../zones.html">Lands</a>
    <span class="sep">›</span>
    ${zone.continent}
    <span class="sep">›</span>
    ${zone.name}
  `;

  // Page title
  const pt = document.getElementById('zone-page-title');
  if (pt) pt.textContent = zone.name;

  // Bestiary rows
  const bestiaryRows = (zone.bestiary || []).map(b => `
    <tr>
      <td>${b.name}</td>
      <td>${difficultyBadge(b.level)}</td>
      <td>${b.type}</td>
    </tr>
  `).join('') || '<tr><td colspan="3" style="color:var(--text-dim);font-style:italic;">No hostile creatures recorded in this area.</td></tr>';

  // Notable NPCs
  const gmMode = typeof isGM === 'function' && isGM();
  const npcItems = (zone.notableNPCs || []).map(n => {
    const npcHidden = gmMode && typeof isNPCHidden === 'function' && isNPCHidden(zone.id, n.name);
    const safeAttr  = n.name.replace(/"/g, '&quot;');
    const safeZone  = zone.id.replace(/"/g, '&quot;');
    return `
      <li data-npc-name="${safeAttr}"${npcHidden ? ' class="gm-npc-hidden"' : ''}>
        ${gmMode ? `<div class="gm-hide-btn npc-hide-btn${npcHidden ? ' gm-hide-btn-on' : ''}" title="${npcHidden ? 'Reveal to players' : 'Hide from players'}" data-zone="${safeZone}" data-npc="${safeAttr}" onclick="gmToggleNPC(this.dataset.zone, this.dataset.npc, this, event)">${npcHidden ? '👁' : '🚫'}</div>` : ''}
        <span class="npc-name">${n.name}</span>
        <span class="npc-desc">${n.role}</span>
      </li>
    `;
  }).join('') || '<li><span class="npc-desc" style="color:var(--text-dim);font-style:italic;">No notable NPCs recorded.</span></li>';

  // Adjacent zones
  const adjacentList = (zone.adjacentZones || []).map(az => {
    const found = ZONES.find(z => z.name === az);
    return found
      ? `<a href="${found.id}.html" style="color:var(--link-color);text-decoration:none;">${az}</a>`
      : az;
  }).join(', ') || 'Unknown';

  container.innerHTML = `
    <div class="zone-header">
      <h1>${zone.name}</h1>
      <div class="zone-subtitle">${zone.excerpt}</div>
      <div class="zone-meta">
        <div class="meta-item">
          <span class="meta-label">Region</span>
          <span class="meta-value">${zone.region}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Continent</span>
          <span class="meta-value">${zone.continent}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Level Range</span>
          <span class="meta-value">${zone.levelRange}</span>
        </div>
        <div class="meta-item">
          <span class="meta-label">Connected Lands</span>
          <span class="meta-value" style="font-size:13px;">${adjacentList}</span>
        </div>
      </div>
      <div class="zone-tags" style="margin-top:14px;">
        ${(zone.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <span>📜</span>
        <h2>Background</h2>
      </div>
      <div class="section-body">
        ${zone.background.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <span>⚠️</span>
        <h2>Dangers</h2>
      </div>
      <div class="section-body">
        ${zone.dangers.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <span>✨</span>
        <h2>Benefits &amp; Rewards</h2>
      </div>
      <div class="section-body">
        ${zone.benefits.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>

    <div class="content-section">
      <div class="section-header">
        <span>🐉</span>
        <h2>Bestiary</h2>
      </div>
      <div class="section-body" style="padding:0;">
        <table class="bestiary-table">
          <thead>
            <tr>
              <th>Creature</th>
              <th>Difficulty</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            ${bestiaryRows}
          </tbody>
        </table>
      </div>
    </div>

    ${zone.notableNPCs && zone.notableNPCs.length > 0 ? `
    <div class="content-section">
      <div class="section-header">
        <span>👤</span>
        <h2>Notable NPCs</h2>
      </div>
      <div class="section-body">
        <ul class="npc-list">
          ${npcItems}
        </ul>
      </div>
    </div>
    ` : ''}

    ${zone.gmNotes ? `
    <div class="content-section gm-only">
      <div class="section-header">
        <span>🔮</span>
        <h2>GM Notes</h2>
      </div>
      <div class="section-body">
        ${zone.gmNotes.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')}
      </div>
    </div>
    ` : ''}
  `;
}

// ── Filter setup (zones.html) ──────────────────────────────
function setupFilters(gridSelector) {
  const searchInput = document.getElementById('zone-search');
  const regionBtns = document.querySelectorAll('button[data-filter-region]');
  const tagBtns = document.querySelectorAll('button[data-filter-tag]');

  let activeFilter = {};

  function applyFilter() {
    renderZoneGrid(gridSelector, activeFilter);
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      activeFilter.search = e.target.value.trim();
      applyFilter();
    });
  }

  regionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const region = btn.dataset.filterRegion;
      if (activeFilter.region === region) {
        delete activeFilter.region;
        btn.classList.remove('active');
      } else {
        activeFilter.region = region;
        regionBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      applyFilter();
    });
  });

  tagBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.filterTag;
      if (activeFilter.tag === tag) {
        delete activeFilter.tag;
        btn.classList.remove('active');
      } else {
        activeFilter.tag = tag;
        tagBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      applyFilter();
    });
  });

  // Initial render
  applyFilter();
}

// ── Homepage stats ─────────────────────────────────────────
function renderHomepageStats() {
  if (typeof ZONES === 'undefined') return;
  const zoneCountEl = document.getElementById('stat-zones');
  if (zoneCountEl) zoneCountEl.textContent = ZONES.length;

  const continents = new Set(ZONES.map(z => z.continent));
  const contEl = document.getElementById('stat-continents');
  if (contEl) contEl.textContent = continents.size;

  const allCreatures = ZONES.flatMap(z => z.bestiary || []);
  const creatureEl = document.getElementById('stat-creatures');
  if (creatureEl) creatureEl.textContent = allCreatures.length + '+';
}
