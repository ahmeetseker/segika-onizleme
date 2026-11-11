/* Segika v2 — ortak davranışlar. <script src="assets/v2.js" defer> ile yüklenir.
   Her modül kendi öğesini arar; öğe yoksa sessizce çıkar. Hareket yalnız
   <html class="anim"> varken çalışır (bkz. head betiği ve v2.css başı). */
(function () {
  "use strict";
  var root = document.documentElement;
  var ANIM = root.classList.contains("anim");
  /* Head betiği 2,5 sn içinde anim-ready görmezse .anim'i kaldırır (JS çalışmadı
     yedeği). Bu dosya çalıştıysa hareket sistemi hazırdır. */
  if (ANIM) root.classList.add("anim-ready");
  /* Kullanıcı sonradan "hareketi azalt"ı açarsa: hareketi kapat, döngüleri durdur */
  (function () {
    var rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    function onRm(e) {
      if (!e.matches || !ANIM) return;
      ANIM = false; root.classList.remove("anim");
      Array.prototype.forEach.call(document.querySelectorAll(".rv, .usp"), function (el) { el.classList.add("in"); });
      Array.prototype.forEach.call(document.querySelectorAll(".reveal .wd"), function (w) { w.classList.add("on"); });
      document.dispatchEvent(new CustomEvent("segika:motionoff"));
    }
    if (rm.addEventListener) rm.addEventListener("change", onRm); else if (rm.addListener) rm.addListener(onRm);
  })();
  var DESKTOP = window.matchMedia("(min-width: 1024px)");
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  /* ---------- Header: kaydırınca "scrolled" ---------- */
  (function () {
    var hdr = document.getElementById("hdr");
    if (!hdr) return;
    /* Footer ekranın üstüne gelince header yukarı kayıp gizlenir: footer'ın kendi menüsü ve
       çağrısı var, sabit header koyu zemindeki büyük yazının üstüne binmesin. */
    var ftr = document.querySelector(".ftr");
    function onScroll() {
      hdr.classList.toggle("scrolled", window.scrollY > 40);
      if (!ftr) return;
      var away = ftr.getBoundingClientRect().top < hdr.getBoundingClientRect().bottom + 24 && !document.documentElement.classList.contains("menu-lock");
      if (away !== hdr.classList.contains("hdr-away")) {
        hdr.classList.toggle("hdr-away", away);
        if (away) { hdr.setAttribute("inert", ""); var b = hdr.querySelector('[data-menu][aria-expanded="true"]'); if (b) b.click(); }
        else hdr.removeAttribute("inert");
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* ---------- Hizmetler mega menüsü (masaüstü): tık, üzerine gelme, Esc, dışarı tık, ↓ ile panele geçiş ---------- */
  (function () {
    var btns = $$("[data-menu]");
    if (!btns.length) return;
    var hoverable = window.matchMedia("(hover: hover) and (min-width: 1024px)");
    var openId = null, timer = null;
    function panel(id) { return document.getElementById(id); }
    function set(id, on) {
      var p = panel(id); if (!p) return;
      btns.forEach(function (b) { if (b.getAttribute("data-menu") === id) b.setAttribute("aria-expanded", String(on)); });
      if (on) { p.hidden = false; requestAnimationFrame(function () { p.classList.add("is-open"); }); openId = id; }
      else { p.classList.toggle("is-open", false); p.hidden = true; if (openId === id) openId = null; }
    }
    function open(id) { clearTimeout(timer); if (openId && openId !== id) set(openId, false); if (openId !== id) set(id, true); }
    function shut() { clearTimeout(timer); if (openId) set(openId, false); }
    function shutSoon() { clearTimeout(timer); timer = setTimeout(shut, 200); }
    btns.forEach(function (b) {
      var id = b.getAttribute("data-menu");
      b.addEventListener("click", function () { if (openId === id) shut(); else open(id); });
      b.addEventListener("mouseenter", function () { if (hoverable.matches) open(id); });
      b.addEventListener("mouseleave", function () { if (hoverable.matches) shutSoon(); });
      b.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown") { e.preventDefault(); open(id); var f = panel(id).querySelector("a"); if (f) f.focus(); }
      });
      var p = panel(id); if (!p) return;
      p.addEventListener("mouseenter", function () { clearTimeout(timer); });
      p.addEventListener("mouseleave", function () { if (hoverable.matches) shutSoon(); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openId) { var b = document.querySelector('[data-menu="' + openId + '"]'); shut(); if (b) b.focus(); }
    });
    document.addEventListener("click", function (e) { if (openId && !e.target.closest(".dd, [data-menu]")) shut(); });
    document.addEventListener("focusin", function (e) { if (openId && !e.target.closest(".dd, [data-menu]")) shut(); });
    var mq = window.matchMedia("(min-width: 1024px)");
    function onBp() { if (!mq.matches) shut(); }
    if (mq.addEventListener) mq.addEventListener("change", onBp); else if (mq.addListener) mq.addListener(onBp);
  })();

  /* ---------- Mobil menü: erişilebilir dialog ---------- */
  (function () {
    var burger = document.getElementById("burger"), pop = document.getElementById("drawer"), hdr = document.getElementById("hdr");
    if (!burger || !pop) return;
    var outside = $$("body > *").filter(function (el) { return el !== pop && el !== hdr && el.tagName !== "SCRIPT"; });
    var hdrOther = hdr ? $$(".hdr-logo, .hdr-cta, .hdr-menu", hdr) : [];
    var lastFocus = null;
    pop.setAttribute("inert", "");
    function focusables() {
      return [burger].concat($$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', pop));
    }
    function isOpen() { return pop.classList.contains("is-open"); }
    function setPop(on, restore) {
      if (on === isOpen()) return;
      pop.classList.toggle("is-open", on);
      if (hdr) hdr.classList.toggle("menu-open", on);
      root.classList.toggle("menu-lock", on);
      burger.setAttribute("aria-expanded", String(on));
      burger.setAttribute("aria-label", on ? "Menüyü kapat" : "Menüyü aç");
      if (on) {
        lastFocus = document.activeElement;
        pop.removeAttribute("inert");
        outside.concat(hdrOther).forEach(function (el) { el.setAttribute("inert", ""); });
        var first = pop.querySelector("a[href]");
        if (first) first.focus({ preventScroll: true });
      } else {
        pop.setAttribute("inert", "");
        outside.concat(hdrOther).forEach(function (el) { el.removeAttribute("inert"); });
        if (restore !== false) (lastFocus && lastFocus !== document.body ? lastFocus : burger).focus({ preventScroll: true });
      }
    }
    burger.addEventListener("click", function () { setPop(!isOpen()); });
    pop.addEventListener("click", function (e) { if (e.target.closest("a")) setPop(false, false); });
    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); setPop(false); burger.focus({ preventScroll: true }); return; }
      if (e.key !== "Tab") return;
      var f = focusables(), i = f.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && (i === f.length - 1 || i < 0)) { e.preventDefault(); f[0].focus(); }
    });
    function onBp() { if (DESKTOP.matches && isOpen()) setPop(false, false); }
    if (DESKTOP.addEventListener) DESKTOP.addEventListener("change", onBp); else if (DESKTOP.addListener) DESKTOP.addListener(onBp);
  })();

  /* ---------- Satır satır açılış (data-split) + kabarcık harf (data-bubble) ----------
     Görünen satırlar aria-hidden; ekran okuyucu için metnin tek parça kopyası .sr-only içinde. */
  (function () {
    var els = $$("[data-split]");
    if (!els.length) return;
    function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
    function bindBubble(el) {
      var list = $$(".ch", el);
      el.onmouseover = function (e) {
        var i = list.indexOf(e.target); if (i < 0) return;
        list.forEach(function (c, j) { var d = Math.abs(j - i); c.classList.toggle("b0", d === 0); c.classList.toggle("b1", d === 1); c.classList.toggle("b2", d === 2); });
      };
      el.onmouseleave = function () { list.forEach(function (c) { c.classList.remove("b0", "b1", "b2"); }); };
    }
    function split(el) {
      var text = el.getAttribute("data-text") || el.textContent.trim().replace(/\s+/g, " ");
      el.setAttribute("data-text", text);
      var words = text.split(" ");
      el.innerHTML = words.map(function (w) { return '<span class="w" style="display:inline-block">' + esc(w) + "</span>"; }).join(" ");
      var lines = [], top = null;
      $$(".w", el).forEach(function (w) {
        if (top === null || Math.abs(w.offsetTop - top) > 2) { lines.push([]); top = w.offsetTop; }
        lines[lines.length - 1].push(w.textContent);
      });
      var bubble = el.hasAttribute("data-bubble");
      function chars(w) { return bubble ? '<span class="wd" style="display:inline-block;white-space:nowrap">' + Array.from(w).map(function (c) { return '<span class="ch">' + esc(c) + "</span>"; }).join("") + "</span>" : esc(w); }
      el.innerHTML = '<span class="sr-only">' + esc(text) + "</span>" + lines.map(function (l, n) {
        return '<span class="line-mask" aria-hidden="true"><span class="line" style="--i:' + n + '">' + l.map(chars).join(bubble ? '<span class="ch">&nbsp;</span>' : " ") + "</span></span>";
      }).join("");
      el.classList.add("is-split");
      if (bubble) bindBubble(el);
    }
    if (!ANIM) { els.forEach(function (el) { el.classList.add("is-split"); }); return; }
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(function () { els.forEach(split); });
    var rs, lastW = window.innerWidth;
    window.addEventListener("resize", function () {
      clearTimeout(rs);
      rs = setTimeout(function () {
        if (window.innerWidth === lastW) return; lastW = window.innerWidth;
        els.forEach(split);
        els.forEach(function (el) { $$(".line", el).forEach(function (l) { l.style.animation = "none"; }); });
      }, 200);
    });
  })();

  /* ---------- ib-btn şekil dönüşümü: köşe "/" ↔ "\" 0,6 sn ---------- */
  (function () {
    var btns = $$(".ib-btn, .ib-link");
    if (!btns.length) return;
    var CORNER = [[5.63, 13.438, 0, 19.166, 7.337, 17.272, 14.91, 11.182, 39.269, 10.004, 43.98, 5.8, 48, 0, 48],
                  [0, 5.29, 0, 9.9, 3.6, 11.183, 8.731, 17.273, 33.09, 19.165, 40.663, 13.437, 48, 5.63, 48]];
    var ICON = [[6.728, 9.09, 8.064, 3.746, 12.86, 0, 18.369, 0, 12.37, 48, 4.561, 48, -1.167, 40.663, 0.727, 33.09],
                [0.728, 14.91, -1.166, 7.338, 4.562, 0, 12.369, 0, 18.37, 48, 12.86, 48, 8.065, 44.254, 6.729, 38.91]];
    function f(n) { return n.toFixed(3); }
    function dCorner(v) { return "M0 0L" + f(v[0]) + " 0C" + f(v[1]) + " " + f(v[2]) + " " + f(v[3]) + " " + f(v[4]) + " " + f(v[5]) + " " + f(v[6]) + "L" + f(v[7]) + " " + f(v[8]) + "C" + f(v[9]) + " " + f(v[10]) + " " + f(v[11]) + " " + f(v[12]) + " " + f(v[13]) + " " + f(v[14]) + "L0 48Z"; }
    function dIcon(v) { return "M" + f(v[0]) + " " + f(v[1]) + "C" + f(v[2]) + " " + f(v[3]) + " " + f(v[4]) + " " + f(v[5]) + " " + f(v[6]) + " " + f(v[7]) + "L39 0C45.627 0 51 5.373 51 12L51 36C51 42.627 45.627 48 39 48L" + f(v[8]) + " " + f(v[9]) + "C" + f(v[10]) + " " + f(v[11]) + " " + f(v[12]) + " " + f(v[13]) + " " + f(v[14]) + " " + f(v[15]) + "Z"; }
    function mix(a, b, t) { return a.map(function (x, i) { return x + (b[i] - x) * t; }); }
    function ease(x) { return 1 - Math.pow(1 - x, 4); }
    var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    btns.forEach(function (btn) {
      var cp = btn.querySelector(".ib-corner path"), ip = btn.querySelector(".ib-icon path");
      var t = 0, from = 0, to = 0, start = 0, raf = 0;
      function paint() { if (cp) cp.setAttribute("d", dCorner(mix(CORNER[0], CORNER[1], t))); if (ip) ip.setAttribute("d", dIcon(mix(ICON[0], ICON[1], t))); }
      function step(now) { var k = Math.min(1, (now - start) / 600); t = from + (to - from) * ease(k); paint(); if (k < 1) raf = requestAnimationFrame(step); }
      function go(target) { if (!ANIM) { t = target; paint(); return; } cancelAnimationFrame(raf); from = t; to = target; start = performance.now(); raf = requestAnimationFrame(step); }
      paint();
      if (!canHover) return;
      btn.addEventListener("pointerenter", function () { go(1); });
      btn.addEventListener("pointerleave", function () { go(0); });
      btn.addEventListener("focus", function () { go(1); });
      btn.addEventListener("blur", function () { go(0); });
    });
  })();

  /* ---------- Görünür olunca açılma (.rv, .usp) ---------- */
  (function () {
    var els = $$(".rv, .usp");
    if (!els.length) return;
    if (!ANIM || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var left = els.slice();
    function show(el) { el.classList.add("in"); io.unobserve(el); left.splice(left.indexOf(el), 1); }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) show(x.target); });
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach(function (e) { io.observe(e); });
    /* Hızlı kaydırma / çapa atlaması öğeyi tek karede geçerse IO tetiklenmez:
       görünüm altını geçmiş olanları da aç. */
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick || !left.length) return; tick = true;
      requestAnimationFrame(function () {
        tick = false;
        var lim = innerHeight * 0.88;
        left.slice().forEach(function (el) { if (el.getBoundingClientRect().top < lim) show(el); });
      });
    }, { passive: true });
  })();

  /* ---------- Kaydırdıkça kelime kelime koyulaşan başlık (.reveal) + kayan yazı paralaksı (#mq) ---------- */
  (function () {
    var heads = $$(".reveal"), mq = document.getElementById("mq");
    if (!heads.length && !mq) return;
    heads.forEach(function (h) {
      (function wrap(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (c) {
          if (c.nodeType === 3) {
            var frag = document.createDocumentFragment();
            c.textContent.split(/(\s+)/).forEach(function (p) {
              if (!p) return;
              if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(p));
              else { var s = document.createElement("span"); s.className = "wd"; s.textContent = p; frag.appendChild(s); }
            });
            node.replaceChild(frag, c);
          } else if (c.nodeType === 1 && !c.classList.contains("sr-only")) wrap(c);
        });
      })(h);
      h._w = $$(".wd", h);
    });
    if (!ANIM) { heads.forEach(function (h) { h._w.forEach(function (w) { w.classList.add("on"); }); }); return; }
    var ticking = false;
    function update() {
      ticking = false;
      if (!ANIM) { heads.forEach(function (h) { h._w.forEach(function (w) { w.classList.add("on"); }); }); if (mq) mq.style.transform = ""; return; }
      var vh = window.innerHeight;
      heads.forEach(function (h) {
        var r = h.getBoundingClientRect();
        var p = Math.min(1, Math.max(0, (vh * .92 - r.top) / (vh * .5)));
        var n = Math.round(p * h._w.length);
        h._w.forEach(function (w, i) { w.classList.toggle("on", i < n); });
      });
      if (mq) { var m = mq.getBoundingClientRect(); var q = (m.top + m.height / 2) / vh - .5; mq.style.transform = "translateX(" + (q * 18).toFixed(2) + "vw)"; }
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", req, { passive: true });
    window.addEventListener("resize", req);
    update();
  })();

  /* ---------- Silk: WebGL ile kıvrılan ipek yüzey (hero ve footer) ----------
     Ekran dışındayken ya da sekme gizliyken rAF tamamen durur. */
  function silk(cv) {
    if (!cv) return;
    var gl = cv.getContext("webgl", { antialias: false, premultipliedAlpha: false }) || cv.getContext("experimental-webgl");
    if (!gl) return;
    var vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    var fs = [
      "precision highp float;",
      "uniform vec2 R;uniform float T;uniform vec2 M;",
      "float H(vec2 p){",
      "  vec2 q=p;",
      "  q+=.28*vec2(sin(q.y*1.7+T*.11+M.y*.6),cos(q.x*1.3-T*.09+M.x*.6));",
      "  q+=.14*vec2(sin(q.y*3.1-T*.07),cos(q.x*2.7+T*.08));",
      "  float h=sin(q.x*1.25+q.y*.65+T*.06)*.6;",
      "  h+=sin(length(q-vec2(.55+M.x*.15,-.25+M.y*.1))*2.6-T*.13)*.45;",
      "  h+=sin(q.y*2.1-q.x*.4+T*.05)*.22;",
      "  return h;}",
      "void main(){",
      "  vec2 uv=gl_FragCoord.xy/R;vec2 p=(gl_FragCoord.xy-.5*R)/R.y*1.6;",
      "  float e=.0025;float h=H(p);",
      "  vec2 g=vec2(H(p+vec2(e,0.))-h,H(p+vec2(0.,e))-h)/e;",
      "  float k=h*2.35;float band=sin(k);",
      "  float side=smoothstep(-.18,.18,band);",
      "  vec3 n=normalize(vec3(-g*.22,1.));",
      "  vec3 L=normalize(vec3(-.45,.55,.75));",
      "  float dif=clamp(dot(n,L),0.,1.);",
      "  float spec=pow(clamp(dot(reflect(-L,n),vec3(0.,0.,1.)),0.,1.),22.);",
      "  float edge=exp(-abs(band)*26.)*(.55+.45*side);",
      "  float rim=exp(-abs(cos(k))*9.)*.35;",
      "  vec3 deep=vec3(.020,.090,.045);vec3 forest=vec3(.050,.215,.115);vec3 seg=vec3(.173,.737,.388);",
      "  vec3 sage=vec3(.50,.66,.56);vec3 mist=vec3(.80,.87,.82);vec3 warm=vec3(.42,.33,.22);",
      "  vec3 a=mix(deep,forest,dif);",
      "  vec3 b=mix(forest,sage,dif*.9);b=mix(b,seg,.22*(1.-dif));",
      "  vec3 c=mix(a,b,side);",
      "  c=mix(c,warm,rim*(1.-side)*.55);",
      "  c+=spec*mist*.55+edge*mist*.75;",
      "  float glow=smoothstep(.9,.0,length(p-vec2(.3,-.35)))*.18;c+=glow*vec3(.6,.8,.68)*side;",
      "  c*=mix(.72,1.,smoothstep(1.25,.25,length(uv-vec2(.55,.45))));",
      "  gl_FragColor=vec4(c,1.);}"
    ].join("\n");
    function sh(type, src) { var o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; }
    var v = sh(gl.VERTEX_SHADER, vs), fr = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !fr) return;
    var pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, fr); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var uR = gl.getUniformLocation(pr, "R"), uT = gl.getUniformLocation(pr, "T"), uM = gl.getUniformLocation(pr, "M");
    var mx = 0, my = 0, tx = 0, ty = 0, visible = true, raf = 0, t0 = performance.now();
    function draw(now) {
      mx += (tx - mx) * .04; my += (ty - my) * .04;
      gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, 40 + (now - t0) / 1000); gl.uniform2f(uM, mx, my);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function size() {
      var d = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
      cv.width = Math.max(1, Math.round(cv.clientWidth * d)); cv.height = Math.max(1, Math.round(cv.clientHeight * d));
      gl.viewport(0, 0, cv.width, cv.height);
      if (!raf) draw(performance.now());
    }
    function loop(now) { raf = 0; draw(now); start(); }
    function start() { if (ANIM && visible && !document.hidden && !raf) raf = requestAnimationFrame(loop); }
    function stop() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    size();
    window.addEventListener("resize", size);
    cv.parentElement.addEventListener("pointermove", function (e) { var r = cv.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - .5; ty = .5 - (e.clientY - r.top) / r.height; });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[en.length - 1].isIntersecting; if (visible) start(); else stop(); }).observe(cv);
    }
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
    document.addEventListener("segika:motionoff", stop);
    draw(t0);
    start();
  }
  $$(".hero-gl, .ftr-gl, .silk-gl").forEach(silk);
  /* ---------- Talep formu (.f-form): istemci doğrulaması + başarı kutusu (backend yok) ---------- */
  (function () {
    var form = document.querySelector(".f-form"), done = document.getElementById("f-done");
    if (!form || !done) return;
    form.noValidate = true;
    var fields = Array.prototype.filter.call(form.elements, function (f) { return f.willValidate; });
    /* Boşluktan ibaret ad ve 10'dan az rakamlı telefon geçmesin (desen tek başına yetmez) */
    function extra(f) {
      if (f.type === "checkbox" || f.tagName === "SELECT") return "";
      var v = f.value.trim();
      if (f.required && !v) return "bos";
      if (f.type === "tel" && v.replace(/\D/g, "").length < 10) return "tel";
      return "";
    }
    function mark(f) {
      f.setCustomValidity(extra(f) ? (f.validationMessage || "Geçersiz") : "");
      if (f.checkValidity()) f.removeAttribute("aria-invalid"); else f.setAttribute("aria-invalid", "true");
    }
    form.addEventListener("input", function (e) { if (form.classList.contains("f-tried") && e.target.willValidate) mark(e.target); });
    form.addEventListener("change", function (e) { if (form.classList.contains("f-tried") && e.target.willValidate) mark(e.target); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.classList.add("f-tried");
      fields.forEach(mark);
      var bad = fields.filter(function (f) { return !f.checkValidity(); });
      if (bad.length) { bad[0].focus(); return; }
      form.hidden = true; done.hidden = false; done.focus();
    });
  })();

  /* ---------- Fiyatlar: mobilde karşılaştırma tablosu paket sekmeleriyle ---------- */
  (function () {
    var tbl = document.querySelector(".cmp-tbl");
    if (!tbl || !window.matchMedia) return;
    var wrap = tbl.closest(".wrap"), heads = [].slice.call(tbl.querySelectorAll("thead .cmp-col-pkg"));
    if (!wrap || !heads.length) return;
    var tabs = document.createElement("div");
    tabs.className = "cmp-m-tabs"; tabs.setAttribute("role", "tablist"); tabs.setAttribute("aria-label", "Paket seçin");
    var card = document.createElement("div");
    card.className = "cmp-m-card"; card.setAttribute("aria-live", "polite");
    var btns = heads.map(function (th, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "cmp-m-tab"; b.setAttribute("role", "tab");
      b.innerHTML = "<b></b><small></small>";
      b.firstChild.textContent = th.querySelector(".cmp-name").textContent;
      b.lastChild.textContent = th.querySelector(".cmp-price").textContent;
      b.addEventListener("click", function () { pick(i, true); });
      b.addEventListener("keydown", function (e) {
        var k = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!k) return; e.preventDefault();
        var n = (i + k + heads.length) % heads.length; pick(n, true); btns[n].focus();
      });
      tabs.appendChild(b); return b;
    });
    var scroller = tbl.closest(".cmp-scroll");
    wrap.insertBefore(tabs, scroller); wrap.insertBefore(card, scroller);
    function pick(i, anim) {
      btns.forEach(function (b, j) { b.setAttribute("aria-selected", j === i ? "true" : "false"); b.tabIndex = j === i ? 0 : -1; });
      tbl.setAttribute("data-sel", String(i + 1));
      card.innerHTML = heads[i].innerHTML;
      card.classList.toggle("is-feat", heads[i].classList.contains("is-feat"));
      if (anim) { card.classList.remove("is-in"); void card.offsetWidth; card.classList.add("is-in"); }
    }
    var featIdx = heads.findIndex(function (th) { return th.classList.contains("is-feat"); });
    pick(featIdx < 0 ? 0 : featIdx, false);
    var mq = matchMedia("(max-width: 767px)");
    function sync() { wrap.classList.toggle("cmp-m", mq.matches); }
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync); else mq.addListener(sync);
  })();
})();
