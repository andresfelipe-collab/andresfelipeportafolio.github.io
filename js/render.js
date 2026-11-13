/* Construye las tarjetas de trabajos y reels a partir de js/config.js */
(function () {
'use strict';
const C = window.PORTFOLIO || { works: [], reels: [] };
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ytId = u => { const m = String(u || '').match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/); return m ? m[1] : null; };
const thumb = id => 'https://i.ytimg.com/vi/' + id + '/maxresdefault.jpg';
const thumbFb = id => 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
const img = (src, id, alt, cls) => '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"' +
  (id ? ' onerror="this.onerror=null;this.src=\'' + thumbFb(id) + '\'"' : '') + '>';

/* Trabajos */
const grid = document.getElementById('workGrid');
if (grid) {
  grid.innerHTML = (C.works || []).filter(w => w && w.url).map((w, i) => {
    const id = ytId(w.url), poster = w.poster || (id ? thumb(id) : '');
    const feat = i === 0, d = i % 3;
    return '<article class="work-card' + (feat ? ' feat' : '') + ' rv"' +
      (feat ? '' : ' data-cat="' + esc(w.cat || 'campanas') + '"') + (d ? ' data-d="' + d + '"' : '') +
      (id ? ' data-yt="' + id + '"' : ' data-video="' + esc(w.url) + '"') + ' data-title="' + esc(w.title) + '">' +
      (poster ? img(poster, id, w.title) : '') +
      '<div class="w-grad"></div>' + (w.dur ? '<span class="w-dur">' + esc(w.dur) + '</span>' : '') +
      '<div class="w-meta"><span class="w-cat">' + esc(w.catLabel) + '</span><h3 class="w-title">' + esc(w.title) + '</h3></div>' +
      '<span class="w-play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></article>';
  }).join('');
}

/* Reels */
const track = document.getElementById('reelTrack');
const reels = (C.reels || []).filter(r => r && r.url);
if (track) {
  if (!reels.length) {
    const s = document.getElementById('reels'); if (s) s.remove();
    document.querySelectorAll('a[href="#reels"]').forEach(a => a.remove());
  } else {
    track.innerHTML = reels.map(r => {
      const id = ytId(r.url);
      const media = id ? img(thumb(id), id, r.title, 'r-thumb')
        : '<video src="' + esc(r.url) + '" autoplay muted loop playsinline preload="metadata"></video>';
      return '<article class="reel-card"' + (id ? ' data-yt="' + id + '"' : '') + '>' + media +
        '<div class="r-grad"></div><span class="r-tag">REEL</span><div class="r-meta"><div class="r-title">' + esc(r.title) +
        '</div><div class="r-views">' + esc(r.views) + '</div></div></article>';
    }).join('');
  }
}
/* Filtros: solo si los trabajos tienen categorías */
const works = (C.works || []).filter(w => w && w.url);
const filters = document.getElementById('filters');
if (filters && !works.slice(1).some(w => w.cat)) filters.remove();

/* Portada (hero) */
const hero = document.querySelector('.hero-bg');
if (hero) {
  const H = C.hero || {};
  const first = works[0] && ytId(works[0].url);
  const setPoster = src => { if (src) hero.setAttribute('poster', src); };
  if (H.video) hero.src = H.video; else hero.removeAttribute('src');
  if (H.poster && H.poster !== 'auto') setPoster(H.poster);
  else if (first) { const t = new Image(); t.onload = () => setPoster(thumb(first)); t.onerror = () => setPoster(thumbFb(first)); t.src = thumb(first); }
  else if (!H.video) hero.remove();
}
})();
