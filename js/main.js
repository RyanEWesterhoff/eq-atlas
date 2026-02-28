// ============================================================
//  EverQuest Atlas — Campaign Reference Site
//  main.js — Navigation, filtering, rendering
// ============================================================

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
    container.innerHTML = '<p style="color:var(--text-secondary);padding:20px 0;">No zones match your search.</p>';
    return;
  }

  container.innerHTML = zones.map(zone => `
    <a href="zones/${zone.id}.html" class="zone-card">
      <div class="zone-region">${zone.continent}</div>
      <h3>${zone.name}</h3>
      <p class="zone-excerpt">${zone.excerpt}</p>
      <div class="zone-tags">
        ${(zone.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
        <span class="tag ${zone.levelRange === 'City' || zone.levelRange === 'Trade Zone' || zone.levelRange === 'Hub Zone' ? 'safe' : 'danger'}">
          ${zone.levelRange === 'City' || zone.levelRange === 'Trade Zone' || zone.levelRange === 'Hub Zone' ? '🏙 City' : `⚔ ${zone.levelRange}`}
        </span>
      </div>
    </a>
  `).join('');
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
    <a href="../zones.html">Zones</a>
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
      <td><span class="level-badge">${b.level}</span></td>
      <td>${b.type}</td>
    </tr>
  `).join('') || '<tr><td colspan="3" style="color:var(--text-dim);font-style:italic;">No hostile creatures recorded in this area.</td></tr>';

  // Notable NPCs
  const npcItems = (zone.notableNPCs || []).map(n => `
    <li>
      <span class="npc-name">${n.name}</span>
      <span class="npc-desc">${n.role}</span>
    </li>
  `).join('') || '<li><span class="npc-desc" style="color:var(--text-dim);font-style:italic;">No notable NPCs recorded.</span></li>';

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
          <span class="meta-label">Connected Zones</span>
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
              <th>Level Range</th>
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
  `;
}

// ── Filter setup (zones.html) ──────────────────────────────
function setupFilters(gridSelector) {
  const searchInput = document.getElementById('zone-search');
  const regionBtns = document.querySelectorAll('[data-filter-region]');
  const tagBtns = document.querySelectorAll('[data-filter-tag]');

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
