/* Sağ alt WhatsApp butonu (.wa-fab): ilk ekranın bir kısmı kaydırılınca görünür; açılıştaki CTA'ları örtmez. */
(function () {
  "use strict";
  /* Sağ alt WhatsApp butonu: ilk ekranın yarısı kaydırılınca görünür (açılış CTA'larını örtmesin) */
  var root = document.documentElement;
  function wa() { root.classList.toggle("wa-on", window.scrollY > Math.min(320, window.innerHeight * 0.4)); }
  wa(); window.addEventListener("scroll", wa, { passive: true });
})();
/* WhatsApp / iletişim açılır kutusu (iki tasarımda aynı betik; kök site işaretlemeyi layout.js ile ekler, V2 HTML'de durur).
   Düğme: aria-expanded + aria-controls; panel role="dialog" (modal değil). Açılınca odak panelin ilk eylemine geçer,
   Escape ya da dışarı tıklama kapatır, kapanınca odak düğmeye döner. Olay devri (document) kullanılır; işaretleme
   sonradan eklense de çalışır. Sağlanan iki kanal gerçek: WhatsApp (Satış) ve telefon (Müşteri desteği). */
(function () {
  "use strict";
  function parts() {
    var w = document.querySelector("[data-waw]");
    return w ? { w: w, btn: w.querySelector(".wa-fab"), panel: w.querySelector(".waw-panel") } : null;
  }
  function setOpen(on, focusBack) {
    var p = parts(); if (!p) return;
    p.panel.hidden = !on;
    p.w.classList.toggle("is-open", on);
    p.btn.setAttribute("aria-expanded", String(on));
    p.btn.setAttribute("aria-label", on ? "İletişim seçeneklerini kapatın" : "WhatsApp ve telefon ile iletişim");
    if (on) { var first = p.panel.querySelector(".waw-go"); if (first) first.focus(); }
    else if (focusBack) p.btn.focus();
  }
  document.addEventListener("click", function (e) {
    var p = parts(); if (!p) return;
    if (e.target.closest(".wa-fab")) { setOpen(p.panel.hidden, false); return; }
    if (e.target.closest(".waw-x")) { setOpen(false, true); return; }
    if (!p.panel.hidden && !e.target.closest("[data-waw]")) setOpen(false, false);
  });
  /* Panel içinde odaklanan öğe sticky başlığın altında kalırsa görünür alana getir (scroll-padding yedeği) */
  document.addEventListener("focusin", function (e) {
    var p = parts(); if (!p || p.panel.hidden || !p.panel.contains(e.target) || e.target.closest(".waw-head")) return;
    var head = p.panel.querySelector(".waw-head"), pr = p.panel.getBoundingClientRect(), tr = e.target.getBoundingClientRect();
    var top = pr.top + (head ? head.offsetHeight : 0) + 8;
    if (tr.top < top) p.panel.scrollTop -= top - tr.top;
    else if (tr.bottom > pr.bottom - 8) p.panel.scrollTop += tr.bottom - pr.bottom + 8;
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var p = parts(); if (!p || p.panel.hidden) return;
    setOpen(false, true);
  });
})();
