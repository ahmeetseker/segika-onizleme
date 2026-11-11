/* Segika v2 — yalnız Hizmetler sayfası. <script src="assets/hizmetler.js" defer>.
   Her modül kendi öğesini arar; yoksa çıkar. JS yoksa: tüm sekme panelleri alt alta,
   akordeonlar yerel <details> olarak çalışır, sayfa içi menü düz bağlantıdır. */
(function () {
  "use strict";
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Sekmeler [data-tabs]: role=tablist/tab/tabpanel, ok tuşları, Home/End ---------- */
  $$("[data-tabs]").forEach(function (box) {
    var list = box.querySelector(".tab-list");
    var tabs = list ? $$(".tab", list) : [];
    if (!tabs.length) return;
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute("aria-controls")); });
    if (panels.some(function (p) { return !p; })) return;
    list.setAttribute("role", "tablist");
    tabs.forEach(function (t, i) {
      t.setAttribute("role", "tab");
      panels[i].setAttribute("role", "tabpanel");
      panels[i].setAttribute("tabindex", "0");
      panels[i].setAttribute("aria-labelledby", t.id);
    });
    function select(n, focus) {
      tabs.forEach(function (t, i) {
        var on = i === n;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
      });
      if (focus) tabs[n].focus();
    }
    list.addEventListener("click", function (e) {
      var t = e.target.closest(".tab"); if (!t) return;
      select(tabs.indexOf(t), false);
    });
    list.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement); if (i < 0) return;
      var n = null, last = tabs.length - 1;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") n = i === last ? 0 : i + 1;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = i === 0 ? last : i - 1;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = last;
      if (n === null) return;
      e.preventDefault();
      select(n, true);
    });
    select(0, false);
    box.classList.add("tabs-on");
  });

  /* ---------- Çapa bir <details> ise (ör. #hukuk) aç ---------- */
  (function () {
    if (!document.querySelector("details[id]")) return;
    function openHash() {
      var id = location.hash.slice(1); if (!id) return;
      var el; try { el = document.getElementById(decodeURIComponent(id)); } catch (err) { return; }
      if (el && el.tagName === "DETAILS") el.open = true;
    }
    window.addEventListener("hashchange", openHash);
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]'); if (!a) return;
      var el = document.getElementById(a.getAttribute("href").slice(1));
      if (el && el.tagName === "DETAILS") el.open = true;
    });
    openHash();
  })();

})();
