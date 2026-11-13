/* ════════════════════════════════════════════════════════════════
   Andres Gallego — Portfolio · interacciones (vanilla JS)
   ════════════════════════════════════════════════════════════════ */
(function () {
'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* — Menú móvil — */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

/* — Aparición al hacer scroll — */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .14 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* — Filtros de trabajos Full HD — */
const filterBox = document.getElementById('filters');
if (filterBox) {
  filterBox.addEventListener('click', e => {
    const chip = e.target.closest('.chip'); if (!chip) return;
    filterBox.querySelectorAll('.chip').forEach(c => c.classList.remove('act'));
    chip.classList.add('act');
    const f = chip.dataset.f;
    document.querySelectorAll('.work-card:not(.feat)').forEach(card => {
      card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f);
    });
  });
}

/* — Lightbox — */
const lb = document.getElementById('lb');
const lbVideo = document.getElementById('lbVideo');
const lbTitle = document.getElementById('lbTitle');
const lbFrame = document.getElementById('lbFrame');
if (lb && lbVideo) {
  document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('click', () => {
      lbTitle.textContent = '▶ ' + (card.dataset.title || '');
      lb.classList.add('open');
      if (card.dataset.yt) {
        lbVideo.style.display = 'none';
        lbFrame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + card.dataset.yt + '?autoplay=1&rel=0&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="' + (card.dataset.title || 'Video').replace(/"/g, '&quot;') + '"></iframe>';
      } else {
        lbFrame.innerHTML = '';
        lbVideo.style.display = '';
        lbVideo.src = card.dataset.video;
        lbVideo.play().catch(() => {});
      }
    });
  });
  const closeLb = () => { lb.classList.remove('open'); lbFrame.innerHTML = ''; lbVideo.pause(); lbVideo.removeAttribute('src'); lbVideo.load(); };
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

/* — Carrusel de reels: foco central, dots, flechas y auto-avance — */
const track = document.getElementById('reelTrack');
if (track) {
  const cards = [...track.querySelectorAll('.reel-card')];
  const dotsBox = document.getElementById('rDots');
  let current = 0, timer = null, idleTimer = null, sectionVisible = true;

  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'r-dot'; d.setAttribute('aria-label', 'Ir al reel ' + (i + 1));
    d.addEventListener('click', () => { goTo(i); holdAutoplay(); });
    dotsBox.appendChild(d);
  });
  const dots = [...dotsBox.children];

  function setYt(c, on) {
    const id = c.dataset.yt; if (!id) return;
    let f = c.querySelector('iframe');
    if (on && !f) {
      f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&mute=1&loop=1&playlist=' + id + '&controls=0&playsinline=1&modestbranding=1&rel=0';
      f.allow = 'autoplay; encrypted-media'; f.tabIndex = -1; f.title = 'Reel';
      c.insertBefore(f, c.querySelector('.r-grad'));
    } else if (!on && f) { f.remove(); }
  }
  const centerOf = el => { const r = el.getBoundingClientRect(); return r.left + r.width / 2; };
  function update() {
    const cx = centerOf(track);
    let best = 0, bd = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(centerOf(c) - cx);
      if (d < bd) { bd = d; best = i; }
    });
    current = best;
    cards.forEach((c, i) => { c.classList.toggle('is-on', i === best); setYt(c, i === best && sectionVisible); });
    dots.forEach((d, i) => d.classList.toggle('act', i === best));
  }
  function goTo(i, smooth = true) {
    const c = cards[(i + cards.length) % cards.length];
    track.scrollTo({ left: c.offsetLeft - (track.clientWidth - c.clientWidth) / 2, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  }
  let raf = null;
  track.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { update(); raf = null; });
  });

  /* auto-avance cada 4 s; se pausa al interactuar o al salir de pantalla */
  function startAutoplay() {
    if (reduced || timer) return;
    timer = setInterval(() => { if (sectionVisible) goTo(current + 1); }, 4000);
  }
  function stopAutoplay() { clearInterval(timer); timer = null; }
  function holdAutoplay() { stopAutoplay(); clearTimeout(idleTimer); idleTimer = setTimeout(startAutoplay, 6000); }

  ['pointerdown', 'touchstart', 'wheel'].forEach(ev => track.addEventListener(ev, holdAutoplay, { passive: true }));
  track.addEventListener('pointerenter', stopAutoplay);
  track.addEventListener('pointerleave', () => holdAutoplay());
  const prev = document.getElementById('rPrev'), next = document.getElementById('rNext');
  if (prev) prev.addEventListener('click', () => { goTo(current - 1); holdAutoplay(); });
  if (next) next.addEventListener('click', () => { goTo(current + 1); holdAutoplay(); });

  new IntersectionObserver(([e]) => {
    sectionVisible = e.isIntersecting;
    update();
    cards.forEach(c => { const v = c.querySelector('video'); if (!v) return; sectionVisible ? v.play().catch(() => {}) : v.pause(); });
  }, { threshold: .15 }).observe(track);

  /* arranque centrado en el primer reel */
  addEventListener('load', () => {
    goTo(0, false); update();
    cards.forEach(c => { const v = c.querySelector('video'); if (v) v.play().catch(() => {}); });
    startAutoplay();
  });
}
})();
