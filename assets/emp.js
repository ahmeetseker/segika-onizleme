/* Çalışan sayısı seçici: artır/azalt + kademe rayı; fiyatlar number-flow ile döner.
   Kaynak fiyatlar: segika.com/program-ozellikleri/fiyatlandirma (2026-11-12).
   İşaretleme: [data-emp] denetim kutusu, [data-tier="o|t|to"] fiyat sayısı,
   [data-emp-per][data-tpl="{n} …"] dönem yazısı. Aynı sayfadaki tüm denetimler aynı durumu paylaşır. */
(function () {
  "use strict";
  var STEPS = [25, 50, 100, 200, 300, 400, 500];
  var PRICES = {
    o: [1600, 2550, 4150, 6250, 8200, 9200, 10150],    // SGK Otomasyon
    t: [1850, 3000, 4800, 7300, 9600, 10750, 11850],   // SGK Teşvik
    to: [2600, 4250, 6850, 10400, 13650, 15300, 16900] // SGK Teşvik ve Otomasyon
  };
  var NAMES = { o: "SGK Otomasyon", t: "SGK Teşvik", to: "SGK Teşvik ve Otomasyon" };
  var boxes = [].slice.call(document.querySelectorAll("[data-emp]"));
  if (!boxes.length) return;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fmt = function (n) { return n.toLocaleString("tr-TR"); };
  var idx = 0;
  var live = document.createElement("span");
  live.className = "emp-sr"; live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);

  function flowOf(el) {
    if (!el.hasAttribute("data-roll") || !window.customElements || !customElements.get("number-flow")) return null;
    var nf = el.querySelector("number-flow");
    if (!nf) {
      nf = document.createElement("number-flow");
      nf.locales = "tr-TR";
      nf.format = { useGrouping: true, maximumFractionDigits: 0 };
      nf.transformTiming = { duration: 500, easing: "cubic-bezier(.23, 1, .32, 1)" };
      nf.opacityTiming = { duration: 280, easing: "ease-out" };
      nf.spinTiming = { duration: 500, easing: "cubic-bezier(.23, 1, .32, 1)" };
      nf.animated = false;
      nf.update(Number(el.getAttribute("data-val")) || PRICES[el.getAttribute("data-tier")][0]);
      el.textContent = ""; el.appendChild(nf);
    }
    return nf;
  }

  function render(i, announce) {
    idx = i;
    var n = STEPS[i], max = i === STEPS.length - 1;
    document.querySelectorAll("[data-tier]").forEach(function (el) {
      var v = PRICES[el.getAttribute("data-tier")];
      if (!v) return;
      var to = v[i], nf = flowOf(el);
      el.setAttribute("data-val", String(to)); el.setAttribute("data-price", String(to));
      if (nf) { nf.animated = !reduce; nf.update(to); el.setAttribute("aria-label", fmt(to)); }
      else el.textContent = fmt(to);
    });
    document.querySelectorAll("[data-emp-per]").forEach(function (el) {
      el.textContent = (el.getAttribute("data-tpl") || "{n} çalışana kadar · aylık").replace("{n}", String(n));
    });
    /* Mobil karşılaştırma sekmeleri fiyatı metin olarak kopyalar; onları da güncelle */
    var heads = document.querySelectorAll(".cmp-tbl thead .cmp-col-pkg [data-tier]");
    document.querySelectorAll(".cmp-m-tab small").forEach(function (s, j) {
      if (heads[j]) s.textContent = fmt(PRICES[heads[j].getAttribute("data-tier")][i]) + " TL";
    });
    boxes.forEach(function (box) {
      box.style.setProperty("--emp-p", String(i / (STEPS.length - 1)));
      box.classList.toggle("is-max", max);
      box.querySelectorAll("[data-emp-n]").forEach(function (b) {
        var nf = b.querySelector("number-flow");
        if (!nf && window.customElements && customElements.get("number-flow")) {
          nf = document.createElement("number-flow");
          nf.locales = "tr-TR";
          nf.transformTiming = { duration: 450, easing: "cubic-bezier(.23, 1, .32, 1)" };
          nf.spinTiming = { duration: 450, easing: "cubic-bezier(.23, 1, .32, 1)" };
          nf.animated = false; nf.update(Number(b.textContent) || STEPS[0]);
          b.textContent = ""; b.appendChild(nf);
        }
        if (nf) { nf.animated = !reduce; nf.update(n); } else b.textContent = String(n);
      });
      var dec = box.querySelector('[data-emp-step="-1"]'), inc = box.querySelector('[data-emp-step="1"]');
      if (dec) dec.disabled = i === 0;
      if (inc) inc.disabled = max;
      box.querySelectorAll("[data-emp-i]").forEach(function (r) {
        var on = Number(r.getAttribute("data-emp-i")) === i;
        r.setAttribute("aria-checked", on ? "true" : "false");
        r.tabIndex = on ? 0 : -1;
        r.classList.toggle("is-past", Number(r.getAttribute("data-emp-i")) < i);
      });
    });
    if (announce) {
      live.textContent = n + " çalışana kadar aylık: " + Object.keys(NAMES).map(function (k) {
        return NAMES[k] + " " + fmt(PRICES[k][i]) + " TL";
      }).join(", ") + (max ? ". 500'den fazla çalışan için özel teklif alın." : ".");
    }
  }

  boxes.forEach(function (box) {
    var rail = box.querySelector(".emp-rail");
    if (rail && !rail.children.length) {
      STEPS.forEach(function (n, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "emp-stop"; b.setAttribute("role", "radio");
        b.setAttribute("data-emp-i", String(i));
        b.setAttribute("aria-label", n + " çalışana kadar");
        b.innerHTML = '<span class="emp-dot" aria-hidden="true"></span><span class="emp-num" aria-hidden="true">' + n + "</span>";
        rail.appendChild(b);
      });
    }
    box.addEventListener("click", function (e) {
      var s = e.target.closest("[data-emp-step]"), r = e.target.closest("[data-emp-i]");
      if (s && !s.disabled) render(Math.max(0, Math.min(STEPS.length - 1, idx + Number(s.getAttribute("data-emp-step")))), true);
      else if (r) render(Number(r.getAttribute("data-emp-i")), true);
    });
    if (rail) rail.addEventListener("keydown", function (e) {
      var k = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      var j = e.key === "Home" ? 0 : e.key === "End" ? STEPS.length - 1 : k ? idx + k : null;
      if (j == null) return;
      e.preventDefault();
      j = Math.max(0, Math.min(STEPS.length - 1, j));
      render(j, true);
      var t = rail.querySelector('[data-emp-i="' + j + '"]'); if (t) t.focus();
    });
    box.hidden = false;
  });

  render(0, false);
  if (window.customElements && customElements.whenDefined) customElements.whenDefined("number-flow").then(function () { render(idx, false); });
})();
