/* =========================================================
   AURA MAGIC - visitor statistics: the tap counting
   Tells Google Tag Manager (or Google Analytics 4) about every tap on
   "Order on WhatsApp" / "Order on Instagram" (per outfit), which outfits
   people open, shares and collection taps.
   The settings (container ID, allowed web addresses) are in the <head> of index.html.
   The shop works exactly the same if this file is removed or blocked.
   ========================================================= */
(() => {
  'use strict';

  try {
    const GA = window.AURA_GA;
    if (!GA || !GA.active) return;                                     // statistics are off here (no ID, other web address, or Do Not Track)
    const useGtm = GA.mode === 'gtm';
    window.dataLayer = window.dataLayer || [];
    let send;
    if (useGtm) {
      // Tag Manager: plain dataLayer messages ({event: 'order_click', ...}) that the container's triggers can react to
      send = (name, params) => {
        const m = Object.assign({ event: name }, params);
        if (m.items) {                                                 // product lists go in "ecommerce", as Google Analytics expects
          window.dataLayer.push({ ecommerce: null });
          m.ecommerce = { currency: m.currency, value: m.value, items: m.items }; delete m.items;
        }
        window.dataLayer.push(m);
      };
    } else {
      const gtag = function () { window.dataLayer.push(arguments); };  // Google Analytics 4 directly
      send = (name, params) => { gtag('event', name, params); };
    }

    /* ---------- Helpers ---------- */
    const rawSend = send;
    send = (name, params) => { try { rawSend(name, params); } catch (e) { /* never break the shop */ } };
    const products = () => (window.AURA_DATA && window.AURA_DATA.products) || [];
    const find = pid => products().filter(p => p.id === pid)[0] || null;
    const price = p => parseInt(String(p.price || '').replace(/[^\d]/g, ''), 10) || 0;
    const collectionOf = p => { const h = p && p.collection ? document.getElementById('h-' + p.collection) : null; return h ? h.textContent.trim() : ''; };
    const outfit = p => p ? { outfit_id: p.id, outfit_name: p.name, collection: collectionOf(p) } : {};
    const hashId = () => { try { return decodeURIComponent(location.hash.replace(/^#(outfit=)?/, '')); } catch (e) { return ''; } };
    const popupOutfit = () => { const lb = document.getElementById('lb'); return lb && !lb.hidden ? find(hashId()) : null; };   // the pop-up keeps the outfit id in the address
    const where = el => { const s = el.closest('section[id]'); return el.closest('.fab') ? 'floating_button' : el.closest('.site-header') ? 'header' : el.closest('.site-footer') ? 'footer' : s ? s.id : 'page'; };

    let igOutfit = null;                                               // the outfit the Instagram window was opened for

    // an outfit-specific tap is an "order_click"; a general chat button (no outfit) is a "contact_click"
    function order(channel, source, p) {
      if (!p) { send('contact_click', { chat_app: channel, place: source }); return; }
      send('order_click', Object.assign({ chat_app: channel, place: source, currency: 'INR', value: price(p) }, outfit(p)));
    }

    let lastView = '', lastViewAt = 0;
    function viewed(p, source) {
      if (!p) return;
      const now = Date.now(); if (p.id === lastView && now - lastViewAt < 1500) return;   // one count per opening
      lastView = p.id; lastViewAt = now;
      send('view_item', Object.assign({ currency: 'INR', value: price(p), place: source,
        items: [{ item_id: p.id, item_name: p.name, item_category: collectionOf(p), item_variant: p.colour, price: price(p), quantity: 1 }] }, outfit(p)));
    }

    /* ---------- Taps ---------- */
    function onClick(e) {
      const t = e.target; if (!t || !t.closest) return;
      let a;
      if ((a = t.closest('.mini-wa'))) { const c = a.closest('.card'); order('whatsapp', 'card', c ? find(c.id.replace(/^p-/, '')) : null); return; }
      if ((a = t.closest('.mini-ig'))) { igOutfit = find(a.getAttribute('data-ig-order')); order('instagram', 'card', igOutfit); return; }
      if (t.closest('#lbWa')) { order('whatsapp', 'popup', popupOutfit()); return; }
      if (t.closest('#lbIg')) { igOutfit = popupOutfit(); order('instagram', 'popup', igOutfit); return; }
      if (t.closest('#lbMail')) { const p = popupOutfit(); send('order_click', Object.assign({ chat_app: 'email', place: 'popup', currency: 'INR', value: p ? price(p) : 0 }, outfit(p))); return; }
      if (t.closest('#lbShare')) { const p = popupOutfit(); send('share', Object.assign({ method: 'share_button', content_type: 'outfit', item_id: p ? p.id : '' }, outfit(p))); return; }
      if (t.closest('#igdOpen')) { send('instagram_chat_open', Object.assign({ chat_app: 'instagram', place: 'instagram_window' }, outfit(igOutfit))); return; }   // they went on to open Instagram
      if (t.closest('#igdWa')) { order('whatsapp', 'instagram_window', igOutfit); return; }
      if (t.closest('#fIg')) { if (formReady()) { igOutfit = formOutfit(); order('instagram', 'form', igOutfit); } return; }
      if ((a = t.closest('.coll-tile, .chip'))) {
        const cid = (a.getAttribute('href') || '').replace(/^#c-/, ''), h = document.getElementById('h-' + cid);
        send('select_content', { content_type: 'collection', content_id: cid, collection: h ? h.textContent.trim() : cid, place: a.classList.contains('chip') ? 'menu_chip' : 'collection_tile' });
        return;
      }
      if ((a = t.closest('[data-wa]'))) { order('whatsapp', where(a), null); return; }
      if ((a = t.closest('[data-ig]'))) { igOutfit = null; order('instagram', where(a), null); return; }
      if ((a = t.closest('a[href^="mailto:"]'))) { send('contact_click', { chat_app: 'email', place: where(a) }); return; }
    }
    const formOutfit = () => { const s = document.getElementById('fOutfit'); return s ? find(s.value) : null; };
    const formReady = () => { const n = document.getElementById('fName'); return !!(n && n.value.trim()); };   // same rule as the form: a name is needed before anything is sent

    document.addEventListener('click', e => { try { onClick(e); } catch (err) { /* ignore */ } }, true);
    document.addEventListener('submit', e => {
      try { if (e.target && e.target.id === 'enquiry' && formReady()) order('whatsapp', 'form', formOutfit()); } catch (err) { /* ignore */ }
    }, true);

    /* ---------- Outfit views (pop-up opened, or next/previous photo) ---------- */
    const title = document.getElementById('lbTitle');
    if (title && window.MutationObserver) new MutationObserver(() => { try { viewed(popupOutfit(), 'popup'); } catch (e) { /* ignore */ } }).observe(title, { childList: true, characterData: true, subtree: true });
    try { viewed(popupOutfit(), 'shared_link'); } catch (e) { /* ignore */ }   // someone arrived through a shared outfit link

    /* ---------- Honest small print in the footer ---------- */
    const fb = document.querySelector('.foot-bottom');   // (the note stays narrow so the floating chat buttons never cover it)
    if (fb) { const n = document.createElement('p'); n.textContent = useGtm ? 'This site uses Google Tag Manager to count visits and see which outfits are popular.' : 'We count visits with Google Analytics. No personal details are collected.'; n.style.cssText = 'flex-basis:100%;max-width:calc(100% - 84px);margin:0;font-size:.8em;opacity:.7'; fb.appendChild(n); }
  } catch (e) { /* statistics must never break the shop */ }
})();
