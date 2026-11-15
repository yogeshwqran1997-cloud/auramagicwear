/* =========================================================
   AURA MAGIC – visual effects layer
   Optional: if anything here fails, the catalogue still works.
   - Effects run only while <html> has the class "fx".
   - A speed check turns them off by itself on a slow device.
   - The "Effects" button lets anyone switch them on or off.
   ========================================================= */
(() => {
  'use strict';
  const root = document.documentElement;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const safe = (name, fn) => { try { fn(); } catch (e) { if (window.console) console.warn('effect skipped:', name, e); } };
  const fxOn = () => root.classList.contains('fx');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const EASE = 'cubic-bezier(.22,1,.36,1)';
  const P = (window.AURA_DATA && window.AURA_DATA.products) || [];
  const byId = Object.fromEntries(P.map(p => [p.id, p]));
  const byName = Object.fromEntries(P.map(p => [p.name, p]));

  /* ---------- Switching effects on and off ---------- */
  const effects = [];                                    // each effect has start() and stop()
  const addEffect = e => { effects.push(e); if (fxOn()) safe('start', e.start); };
  const label = $('#fxLabel'), toggle = $('#fxToggle'), toastEl = $('#toast');
  let toastT;
  const say = msg => { if (!toastEl) return; toastEl.textContent = msg; toastEl.hidden = false; clearTimeout(toastT); toastT = setTimeout(() => { toastEl.hidden = true; }, 5200); };
  function syncButton() {
    if (!toggle) return;
    const on = fxOn(); toggle.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (label) label.textContent = on ? 'Effects on' : 'Effects off';
  }
  function setFx(on, who) {
    root.classList.toggle('fx', on);
    try { if (who) { if (on) localStorage.removeItem('am-fx'); else localStorage.setItem('am-fx', 'off'); } } catch (e) { /* ignore */ }
    effects.forEach(e => safe(on ? 'start' : 'stop', on ? e.start : e.stop));
    if (on) prepareReveals(); else $$('.pre').forEach(el => el.classList.remove('pre'));
    syncButton();
  }
  if (toggle) toggle.addEventListener('click', () => { const on = !fxOn(); setFx(on, 'user'); say(on ? 'Effects are on.' : 'Effects are off. The colours and glow stay, without the movement.'); });
  syncButton();

  /* ---------- Loader ---------- */
  const finishLoad = () => root.classList.add('loaded');
  if (document.readyState === 'complete') setTimeout(finishLoad, 300); else addEventListener('load', () => setTimeout(finishLoad, 300));

  /* ---------- Aura colour (the glow follows the outfit) ---------- */
  const setAura = a => { if (!a) return; root.style.setProperty('--ar', a[0]); root.style.setProperty('--ag', a[1]); root.style.setProperty('--ab', a[2]); };

  /* ---------- Hero: outfit carousel (works with or without effects) ---------- */
  safe('hero carousel', () => {
    const stage = $('#heroStage'), arch = $('#arch'), dotsEl = $('#heroDots');
    if (!stage || !arch || !dotsEl || !P.length) return;
    const nameEl = $('#heroName'), setEl = $('#heroSet'), viewBtn = $('#heroView');
    const line = p => p.price ? `${p.set} – ${p.price}` : p.set;
    let idx = 0, visible = true;
    arch.innerHTML = '';
    const slides = P.map((p, i) => {
      const el = new Image(); el.className = 'slide'; el.dataset.src = p.img; if (i < 2) el.src = p.img;
      el.width = p.w; el.height = p.h; el.alt = p.alt; el.decoding = 'async'; arch.appendChild(el); return el;
    });
    slides[0].classList.add('is-active');
    const load = i => { const el = slides[(i + slides.length) % slides.length]; if (el && el.dataset.src && !el.getAttribute('src')) el.src = el.dataset.src; };
    dotsEl.innerHTML = `
      <div class="hc-row">
        <button type="button" class="hc-btn" id="heroPrev" aria-label="Previous outfit"><svg aria-hidden="true"><use href="#i-prev"/></svg></button>
        <div class="hc-thumbs" id="heroThumbs"></div>
        <button type="button" class="hc-btn" id="heroNext" aria-label="Next outfit"><svg aria-hidden="true"><use href="#i-next"/></svg></button>
      </div>
      <span class="hc-bar" aria-hidden="true"><i></i></span>`;
    const thumbs = $('#heroThumbs'), bar = $('.hc-bar i', dotsEl);
    const restartBar = () => { bar.classList.remove('run'); void bar.offsetWidth; if (fxOn()) bar.classList.add('run'); };
    const renderThumbs = () => {
      thumbs.innerHTML = '';
      for (let k = -2; k <= 2; k++) {
        const i = (idx + k + P.length * 3) % P.length, p = P[i], b = document.createElement('button');
        b.type = 'button'; b.className = 'hc-thumb' + (k === 0 ? ' is-active' : ''); b.setAttribute('aria-label', `Show ${p.name}`);
        b.innerHTML = `<img src="${p.img}" alt="" width="${p.w}" height="${p.h}" loading="lazy" decoding="async">`;
        b.addEventListener('click', () => go(i)); thumbs.appendChild(b);
      }
    };
    const pause = () => stage.classList.toggle('is-paused', !visible || document.hidden || document.body.classList.contains('lb-open'));
    function go(n) {
      slides[idx].classList.remove('is-active'); idx = (n + P.length) % P.length; slides[idx].classList.add('is-active');
      renderThumbs(); restartBar(); load(idx); load(idx + 1); load(idx - 1);
      const p = P[idx]; setAura(p.aura);
      stage.classList.add('cap-swap');
      setTimeout(() => { nameEl.textContent = p.name; setEl.textContent = line(p); stage.classList.remove('cap-swap'); }, fxOn() ? 220 : 0);
      arch.dataset.open = p.id; if (viewBtn) viewBtn.dataset.open = p.id; arch.setAttribute('aria-label', `View ${p.name} up close`);
    }
    $('#heroPrev').addEventListener('click', () => go(idx - 1));
    $('#heroNext').addEventListener('click', () => go(idx + 1));
    bar.addEventListener('animationend', () => { if (fxOn()) go(idx + 1); });   // the thin line times the automatic change
    arch.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); arch.click(); } });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; pause(); }).observe(stage);
    document.addEventListener('visibilitychange', pause);
    new MutationObserver(pause).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    go(0);
    addEffect({ start: restartBar, stop: () => bar.classList.remove('run') });
  });

  /* ---------- Hero: sparkles ---------- */
  safe('sparkles', () => {
    const c = $('#sparkles'); if (!c) return;
    const ctx = c.getContext('2d'), dpr = 1, hues = [265, 305, 195, 42];
    let w = 0, h = 0, parts = [], running = false, visible = true, raf;
    const make = () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + .5, s: Math.random() * .22 + .06, a: Math.random() * 6.28, hue: hues[(Math.random() * hues.length) | 0] });
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height; if (!w || !h) return;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: Math.min(60, Math.floor(w / 18)) }, make);
    };
    const frame = t => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y -= p.s; p.x += Math.sin(p.a + t / 2200) * .12; if (p.y < -6) { p.y = h + 6; p.x = Math.random() * w; }
        const tw = .5 + .5 * Math.sin(t / 650 + p.a);
        ctx.fillStyle = `hsla(${p.hue},90%,82%,${.12 + tw * .2})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.283); ctx.fill();
        ctx.fillStyle = `hsla(${p.hue},95%,90%,${.35 + tw * .55})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    };
    const update = () => {
      const want = fxOn() && visible && !document.hidden;
      if (want && !running) { resize(); running = true; raf = requestAnimationFrame(frame); }
      else if (!want && running) { running = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); }
    };
    addEventListener('resize', () => { if (running) resize(); });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; update(); }).observe(c);
    document.addEventListener('visibilitychange', update);
    addEffect({ start: update, stop: update });
  });

  /* ---------- Hero logo: pink and blue smoke, gentle tilt ---------- */
  safe('logo smoke', () => {
    const stage = $('#logoStage'), c = $('#smoke'); if (!stage || !c) return;
    const ctx = c.getContext('2d'), dpr = 1, PINK = '255,72,172', BLUE = '64,128,255';
    let sprites = null, w = 0, h = 0, L = 0, parts = [], running = false, visible = true, raf, last = 0;
    const puff = rgb => {
      const n = 256, cv = document.createElement('canvas'); cv.width = cv.height = n;
      const g = cv.getContext('2d'); g.globalCompositeOperation = 'screen';
      for (let i = 0; i < 11; i++) {
        const a = Math.random() * 6.283, d = 14 + Math.random() * 56, x = 128 + Math.cos(a) * d, y = 128 + Math.sin(a) * d, r = 26 + Math.random() * 36;
        const gr = g.createRadialGradient(x, y, 0, x, y, r);
        gr.addColorStop(0, `rgba(${rgb},.30)`); gr.addColorStop(.5, `rgba(${rgb},.12)`); gr.addColorStop(1, `rgba(${rgb},0)`);
        g.fillStyle = gr; g.fillRect(0, 0, n, n);
      }
      return cv;
    };
    const spawn = (p, warm) => {
      const side = Math.random() < .5 ? 'pink' : 'blue', a = (side === 'pink' ? Math.PI : 0) + (Math.random() - .5) * 2.6, R = (.3 + Math.random() * .32) * L;
      p.x = w / 2 + Math.cos(a) * R; p.y = h / 2 + Math.sin(a) * R;
      p.vx = Math.cos(a) * (5 + Math.random() * 9) + (Math.random() - .5) * 6; p.vy = -(7 + Math.random() * 14) + Math.sin(a) * 5;
      p.size = (.5 + Math.random() * .6) * L; p.grow = .25 + Math.random() * .35; p.life = warm ? Math.random() : 0; p.dur = 8 + Math.random() * 7;
      p.rot = Math.random() * 6.283; p.vr = (Math.random() - .5) * .22; p.ph = Math.random() * 6.283; p.max = .5 + Math.random() * .35; p.img = sprites[side][(Math.random() * 3) | 0];
      return p;
    };
    const resize = () => {
      const r = c.getBoundingClientRect(); w = r.width; h = r.height; if (!w || !h) return; L = w / 1.64;
      c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      parts = Array.from({ length: w < 520 ? 22 : 34 }, () => spawn({}, true));
    };
    const frame = t => {
      if (!running) return;
      const dt = Math.min(.05, (t - last) / 1000 || .016); last = t;
      for (const p of parts) { p.life += dt / p.dur; if (p.life >= 1) spawn(p, false); p.x += p.vx * dt + Math.sin(p.life * 9 + p.ph) * 7 * dt; p.y += p.vy * dt; p.rot += p.vr * dt; }
      ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = 'screen';
      for (const p of parts) { const s = p.size * (1 + p.grow * p.life), a = Math.pow(Math.sin(Math.PI * p.life), 1.3) * p.max; ctx.globalAlpha = a; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.drawImage(p.img, -s / 2, -s / 2, s, s); ctx.restore(); }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(frame);
    };
    const update = () => {
      const want = fxOn() && visible && !document.hidden;
      if (want && !running) { if (!sprites) sprites = { pink: [puff(PINK), puff(PINK), puff(PINK)], blue: [puff(BLUE), puff(BLUE), puff(BLUE)] }; resize(); running = true; last = performance.now(); raf = requestAnimationFrame(frame); }
      else if (!want && running) { running = false; cancelAnimationFrame(raf); ctx.clearRect(0, 0, w, h); }
    };
    addEventListener('resize', () => { if (running) resize(); });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; update(); }).observe(stage);
    document.addEventListener('visibilitychange', update);
    addEffect({ start: update, stop: update });
  });

  safe('tilt', () => {
    if (!finePointer) return;
    const hero = $('#home'), stage = $('#logoStage'), tilt = $('#logoTilt'), wrap = $('.arch-wrap'), hs = $('#heroStage'); if (!hero || !tilt) return;
    let pending = null;
    hero.addEventListener('pointermove', e => {
      if (!fxOn() || pending) return;
      pending = requestAnimationFrame(() => {
        pending = null;
        const r = stage.getBoundingClientRect(), x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2))), y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (innerHeight / 2)));
        tilt.style.transform = `perspective(1100px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
        if (wrap && hs) { const q = hs.getBoundingClientRect(); wrap.style.transform = `perspective(1100px) rotateY(${((e.clientX - q.left) / q.width - .5) * 7}deg) rotateX(${-((e.clientY - q.top) / q.height - .5) * 5}deg)`; }
      });
    });
    hero.addEventListener('pointerleave', () => { tilt.style.transform = ''; if (wrap) wrap.style.transform = ''; });
  });

  /* ---------- Appear on scroll ---------- */
  const revealTargets = [...$$('.card, .coll-tile, .coll-head, .sec-title, .sec-sub, .pillars li, .steps li, .enquiry, .contact-copy .big-link, .coll-stats li'), ...$$('.coll')];
  revealTargets.forEach(el => { if (!el.classList.contains('coll')) el.classList.add('rv'); });   // sections only draw their top line (they never fade)
  $$('.coll, .pillar').forEach(el => el.classList.add('dl'));
  function reveal(el, i) { if (!el.classList.contains('pre')) return; el.style.setProperty('--d', Math.min(i || 0, 4) * .08 + 's'); el.classList.remove('pre'); el.classList.add('in'); }
  const revealIO = new IntersectionObserver(entries => {
    let k = 0; entries.forEach(en => { if (en.isIntersecting) { reveal(en.target, k++); revealIO.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -6% 0px', threshold: .06 });
  function prepareReveals() {
    if (!fxOn()) return;
    revealTargets.forEach(el => {
      if (el.classList.contains('in')) return;
      if (el.getBoundingClientRect().top > innerHeight * .92) { el.classList.add('pre'); revealIO.observe(el); }
    });
  }
  // safety nets: whatever is on screen when scrolling stops, or a few seconds after loading, always appears
  const revealVisible = reach => $$('.pre').forEach(el => { const r = el.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight * reach) reveal(el, 0); });
  let stopT; addEventListener('scroll', () => { clearTimeout(stopT); stopT = setTimeout(() => revealVisible(1), 180); }, { passive: true });
  setTimeout(() => revealVisible(1.4), 3500);
  safe('prepare reveals', prepareReveals);

  /* ---------- Whole page: only what is on screen moves ---------- */
  safe('pause off-screen', () => {
    const io = new IntersectionObserver(entries => entries.forEach(en => en.target.classList.toggle('paused', !en.isIntersecting)), { rootMargin: '80px' });
    $$('.amb, .enquiry, .hero, .marquee, .foot-brand').forEach(el => io.observe(el));
  });

  /* ---------- Progress line and header depth ---------- */
  safe('progress and header', () => {
    const bar = $('#progress'), head = $('#top'); let queued = false;
    const update = () => {
      queued = false; const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      if (head) head.classList.toggle('scrolled', scrollY > 30);
    };
    addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  });

  /* ---------- Menu highlights the section you are in ---------- */
  safe('active menu link', () => {
    const links = $$('#nav a'), byHref = {}; links.forEach(a => { byHref[a.getAttribute('href')] = a; });
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-active')); const a = byHref['#' + en.target.id]; if (a) a.classList.add('is-active');
    }), { rootMargin: '-45% 0px -50% 0px' });
    ['collections', 'why', 'order', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
  });

  /* ---------- Numbers count up when they appear ---------- */
  safe('counters', () => {
    const run = el => {
      const final = el.textContent, m = final.match(/^(\D*)([\d,]+)(.*)$/); if (!m) return;
      const pre = m[1], n = parseInt(m[2].replace(/,/g, ''), 10), post = m[3], D = 1400, t0 = performance.now();
      const fmt = v => pre + Math.round(v).toLocaleString('en-IN') + post;
      const tick = t => { const k = Math.min(1, (t - t0) / D); el.textContent = fmt(n * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); else el.textContent = final; };
      el.textContent = fmt(0); requestAnimationFrame(tick); setTimeout(() => { el.textContent = final; }, D + 400);   // fail-safe: the real number is always restored
    };
    const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { io.unobserve(en.target); if (fxOn()) run(en.target); } }), { threshold: .6 });
    $$('[data-count]').forEach(el => io.observe(el));
  });

  /* ---------- The collection glow follows the outfit ---------- */
  safe('stage glow', () => {
    const glow = $('#stageGlow'), sec = $('#collections'); if (!glow || !sec) return;
    const move = el => { const s0 = sec.getBoundingClientRect(), r = el.getBoundingClientRect(); glow.style.transform = `translate(${r.left - s0.left + r.width / 2}px, ${r.top - s0.top + r.height / 2}px)`; };
    document.addEventListener('pointerover', e => { if (!fxOn() || !finePointer) return; const c = e.target.closest && e.target.closest('.card'); if (c) move(c); });
    if (!finePointer && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting && fxOn()) { move(en.target); const p = byId[en.target.id.replace(/^p-/, '')]; if (p) setAura(p.aura); } }), { rootMargin: '-45% 0px -45% 0px' });
      $$('.card').forEach(c => io.observe(c));
    }
  });

  /* ---------- Glow follows the outfit you point at ---------- */
  safe('card aura', () => {
    document.addEventListener('pointerover', e => {
      if (!fxOn() || !finePointer) return; const c = e.target.closest && e.target.closest('.card'); if (!c) return;
      const p = byId[c.id.replace(/^p-/, '')]; if (p) setAura(p.aura);
    });
  });

  /* ---------- Pop-up: photo flies out of the card; glow follows the outfit ---------- */
  safe('pop-up', () => {
    const lb = $('#lb'), img = $('#lbImg'), title = $('#lbTitle'); if (!lb || !img) return;
    let from = null, fromAt = 0, wasOpen = false, openedAt = 0;
    document.addEventListener('click', e => {
      const t = e.target.closest && e.target.closest('[data-open]'); if (!t) return;
      const src = t.querySelector('img.slide.is-active') || t.querySelector('img') || t; from = src.getBoundingClientRect(); fromAt = performance.now();
    }, true);
    function fly() {
      const f = from; from = null;
      if (!fxOn() || !f || performance.now() - fromAt > 700) return;
      const to = img.getBoundingClientRect(); if (!to.width || !to.height || !f.width) return;
      const s = f.width / to.width, dx = f.left - to.left, dy = f.top - to.top;
      const clear = () => { img.style.transform = img.style.transition = img.style.transformOrigin = img.style.willChange = ''; };
      img.style.willChange = 'transform'; img.style.transformOrigin = '0 0'; img.style.transition = 'none'; img.style.transform = `translate(${dx}px,${dy}px) scale(${s})`;
      void img.offsetWidth; img.style.transition = `transform .62s ${EASE}`; img.style.transform = 'none';
      img.addEventListener('transitionend', clear, { once: true });
      setTimeout(clear, 800);                                  // fail-safe: the photo is always left in its normal place
    }
    new MutationObserver(() => {
      const open = !lb.hidden;
      if (open && !wasOpen) { openedAt = performance.now(); img.classList.remove('swap'); requestAnimationFrame(() => safe('fly', fly)); }
      wasOpen = open;
    }).observe(lb, { attributes: true, attributeFilter: ['hidden'] });
    new MutationObserver(() => {                               // next / previous: the new photo fades in
      if (!fxOn() || lb.hidden || !wasOpen || performance.now() - openedAt < 200) return;   // the first photo flies in, only the next ones fade
      img.classList.remove('swap'); void img.offsetWidth; img.classList.add('swap'); setTimeout(() => img.classList.remove('swap'), 700);
    }).observe(img, { attributes: true, attributeFilter: ['src'] });
    new MutationObserver(() => { const p = byName[title.textContent]; if (p) setAura(p.aura); }).observe(title, { childList: true, characterData: true, subtree: true });
  });

  /* ---------- Cursor ring (desktop with a mouse) ---------- */
  safe('cursor', () => {
    const ring = $('#cursor'); if (!ring || !finePointer) return;
    let tx = -200, ty = -200, cx = -200, cy = -200, run = false;
    const loop = () => {
      cx += (tx - cx) * .22; cy += (ty - cy) * .22; ring.style.transform = `translate(${cx}px,${cy}px)`;
      if (Math.abs(tx - cx) > .1 || Math.abs(ty - cy) > .1) requestAnimationFrame(loop); else run = false;
    };
    addEventListener('pointermove', e => {
      if (!fxOn()) return;
      if (!root.classList.contains('has-cursor')) { root.classList.add('has-cursor'); cx = tx = e.clientX; cy = ty = e.clientY; }
      tx = e.clientX; ty = e.clientY; if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    const label = $('#cursorLabel');
    document.addEventListener('pointerover', e => {
      if (!fxOn()) return; const t = e.target.closest && e.target.closest('[data-cursor]'), l = e.target.closest && e.target.closest('a, button, input, select, textarea');
      ring.classList.toggle('is-hover', !!t); ring.classList.toggle('is-link', !t && !!l);
      if (label) label.textContent = t ? t.dataset.cursor : '';
    });
    document.addEventListener('mouseleave', () => root.classList.remove('has-cursor'));
    addEffect({ start() {}, stop() { root.classList.remove('has-cursor'); } });
  });

  /* ---------- Speed check: effects switch themselves off on a slow device ---------- */
  safe('speed check', () => {
    if (!fxOn() || root.classList.contains('fx-forced')) return;
    if ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory && navigator.deviceMemory <= 1)) { setFx(false, null); return; }   // very small devices start in smooth mode
    const sample = (ms, done) => {
      const dts = []; let last = performance.now(), start = last;
      const tick = t => {
        if (document.hidden || !fxOn()) return done(null);        // inconclusive: do not judge
        const dt = t - last; last = t; if (t - start > 400) dts.push(dt);
        if (t - start < ms) requestAnimationFrame(tick);
        else done(dts.length ? dts.reduce((a, b) => a + b, 0) / dts.length : 999);   // very few frames in the window means a very slow device
      };
      requestAnimationFrame(tick);
    };
    const judge = avg => {
      if (avg && avg > 38 && fxOn()) { setFx(false, 'auto'); say('Movement is off for this device so the page stays fast. The colours and glow stay. You can turn the effects back on with the Effects button.'); return true; }
      return false;
    };
    const begin = () => sample(1800, avg => { if (!judge(avg)) setTimeout(() => sample(2400, judge), 5000); });
    if (root.classList.contains('loaded')) setTimeout(begin, 500);
    else { const w = setInterval(() => { if (root.classList.contains('loaded')) { clearInterval(w); setTimeout(begin, 600); } }, 150); }
  });
})();
