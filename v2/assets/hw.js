/* Segika v2 — hero el yazısı (yalnız anasayfa).
   Aspekta 500 harf hatları opentype.js ile SVG'ye çevrilir; her kontur ayrı
   yol olduğundan kalem soldan sağa ilerler. Sayfada yalnız
     <script src="assets/hw.js" defer></script>
   bulunur; opentype.js (jsDelivr, 1.3.4 sabit) bu dosya tarafından async yüklenir,
   böylece diğer betikleri bekletmez. Font ya da kütüphane yüklenemezse
   .hw-fallback metni görünür kalır. */
(function () {
  "use strict";
  var root = document.documentElement;
  var hw = document.getElementById("hw");
  if (!hw) { root.classList.remove("hw-wait"); return; }
  var ANIM = root.classList.contains("anim");
  var WORDS = ["teşvikleriniz eksiksiz.", "bildirimleriniz zamanında.", "raporlarınız onaylı."];
  var FONT_URL = hw.getAttribute("data-font") || "fonts/Aspekta-500.otf";
  function giveUp() { root.classList.remove("hw-wait"); hw.classList.remove("is-drawn"); hw.classList.add("hw-off"); }
  var LIB = "https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js";
  if (!window.fetch || !window.Promise) { giveUp(); return; }
  function loadLib() {
    if (window.opentype) return Promise.resolve();
    return new Promise(function (ok, fail) {
      var sc = document.createElement("script");
      sc.src = LIB; sc.async = true; sc.crossOrigin = "anonymous";
      sc.integrity = "sha384-3TaxGqyHrMuRIWY5Z5WHNIzgNRqGIUJE+mk6tm+g1wkm9Ux2kUyOLfy9AsNWXA6u";
      sc.onload = function () { window.opentype ? ok() : fail(new Error("opentype")); };
      sc.onerror = fail;
      document.head.appendChild(sc);
    });
  }
  var fontReq = fetch(FONT_URL).then(function (r) {
    if (!r.ok) throw new Error("font " + r.status);
    return r.arrayBuffer();
  });
  Promise.all([fontReq, loadLib()]).then(function (res) {
    var font = window.opentype.parse(res[0]);
    var NS = "http://www.w3.org/2000/svg", EM = 100;
    var asc = font.ascender / font.unitsPerEm * EM, desc = -font.descender / font.unitsPerEm * EM;
    function draw(word, animate, delay) {
      var path = font.getPath(word, 0, EM, EM), bb = path.getBoundingBox(), pad = EM * .1;
      var full = path.toPathData(2), parts = full.split(/(?=M)/).filter(function (d) { return d.trim().length > 1; });
      var x = bb.x1 - pad, y = EM - asc - pad * .4, w = bb.x2 - bb.x1 + pad * 2, h = asc + desc + pad * .8;
      var svg = document.createElementNS(NS, "svg");
      svg.setAttribute("viewBox", x + " " + y + " " + w + " " + h);
      svg.setAttribute("aria-hidden", "true"); svg.setAttribute("focusable", "false");
      svg.style.width = "calc(" + (w / h).toFixed(4) + " * 1.12em)";
      svg.style.left = (-(bb.x1 - x) / h * 1.12).toFixed(4) + "em";
      var fill = document.createElementNS(NS, "path"); fill.setAttribute("d", full); fill.setAttribute("fill", "currentColor");
      svg.appendChild(fill);
      var strokes = parts.map(function (d) {
        var p = document.createElementNS(NS, "path");
        p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke", "currentColor");
        p.setAttribute("stroke-width", "1.5"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round");
        svg.appendChild(p); return p;
      });
      Array.prototype.forEach.call(hw.querySelectorAll("svg"), function (o) { o.classList.add("out"); setTimeout(function () { o.remove(); }, 450); });
      hw.appendChild(svg);
      if (!animate) return;
      var dur = 1.7, n = Math.max(1, strokes.length), each = dur / n * 2.4;
      fill.style.opacity = "0";
      strokes.forEach(function (p) { var L = p.getTotalLength() || 1; p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
      svg.getBoundingClientRect();
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        strokes.forEach(function (p, k) { p.style.transition = "stroke-dashoffset " + each.toFixed(3) + "s ease-out " + (delay + k / n * dur).toFixed(3) + "s"; p.style.strokeDashoffset = "0"; });
        fill.style.transition = "opacity .5s ease-out " + (delay + dur * .72).toFixed(3) + "s"; fill.style.opacity = "1";
      }); });
    }
    draw(WORDS[0], ANIM, .75);
    hw.classList.add("is-drawn");
    root.classList.remove("hw-wait");
    if (!ANIM) return;
    var idx = 0, timer = setInterval(function () {
      if (!root.classList.contains("anim")) { clearInterval(timer); return; } /* hareket sonradan kapatıldı */
      if (document.hidden) return;
      idx = (idx + 1) % WORDS.length; draw(WORDS[idx], true, .35);
    }, 4200);
    document.addEventListener("segika:motionoff", function () { clearInterval(timer); });
  }).catch(giveUp);
})();
