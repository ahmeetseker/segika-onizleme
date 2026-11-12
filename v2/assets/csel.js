/* Açılır liste (V2): kök sitedeki assets/layout.js açılır listesiyle aynı davranış.
   Asıl <select> formda kalır (değer, required, doğrulama, e-posta taslağı onu okur); görünmez yapılır ve
   üstüne WAI-ARIA "select-only combobox" deseninde düğme + liste kurulur. Tarayıcının kendi menüsü
   açılmaz; liste her tarayıcıda sitenin tasarımıyla görünür.
   Sınıf öneki "cs": V2'de ".dd" üst menü açılır paneline ayrılmış. */
(function () {
  "use strict";
  var CHEV = '<svg class="cs-chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var TICK = '<svg class="cs-tick" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function build(sel, n) {
    if (sel.closest(".cs")) return;
    var id = "cs" + n;
    var all = Array.prototype.slice.call(sel.options);
    var ph = all.filter(function (o) { return o.value === ""; })[0];
    var opts = all.filter(function (o) { return o.value !== ""; });

    var wrap = document.createElement("div"); wrap.className = "cs";
    sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel);
    sel.classList.add("cs-native"); sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");

    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "cs-btn"; btn.id = id + "b";
    btn.setAttribute("role", "combobox"); btn.setAttribute("aria-haspopup", "listbox");
    btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", id + "l");
    if (sel.required) btn.setAttribute("aria-required", "true");
    if (sel.getAttribute("aria-describedby")) btn.setAttribute("aria-describedby", sel.getAttribute("aria-describedby"));
    btn.innerHTML = '<span class="cs-v"></span>' + CHEV;

    var lab = sel.id && document.querySelector('label[for="' + sel.id + '"]');
    if (lab) { lab.id = lab.id || id + "lab"; btn.setAttribute("aria-labelledby", lab.id); lab.htmlFor = btn.id; }

    var list = document.createElement("ul");
    list.className = "cs-list"; list.id = id + "l"; list.setAttribute("role", "listbox"); list.tabIndex = -1; list.hidden = true;
    if (lab) list.setAttribute("aria-labelledby", lab.id);
    opts.forEach(function (o, i) {
      var li = document.createElement("li");
      li.id = id + "o" + i; li.setAttribute("role", "option"); li.dataset.v = o.value;
      li.innerHTML = '<span class="cs-t"></span>' + TICK;
      li.firstChild.textContent = o.text;
      list.appendChild(li);
    });
    wrap.appendChild(btn); wrap.appendChild(list);

    var lis = Array.prototype.slice.call(list.children), v = btn.querySelector(".cs-v");
    var act = -1, typed = "", typedT;

    function sync() {
      var i = -1;
      opts.forEach(function (o, j) { if (o.value === sel.value && sel.value !== "") i = j; });
      v.textContent = i > -1 ? opts[i].text : (ph ? ph.text : "");
      btn.classList.toggle("ph", i < 0);
      lis.forEach(function (li, j) { li.setAttribute("aria-selected", String(j === i)); });
      return i;
    }
    function mark(i) {
      act = Math.max(0, Math.min(lis.length - 1, i));
      lis.forEach(function (li, j) { li.classList.toggle("on", j === act); });
      btn.setAttribute("aria-activedescendant", lis[act].id);
      lis[act].scrollIntoView({ block: "nearest" });
    }
    function open() {
      if (!list.hidden) return;
      list.hidden = false; wrap.classList.add("open"); btn.setAttribute("aria-expanded", "true");
      var i = sync(); mark(i > -1 ? i : 0);
    }
    function close() {
      if (list.hidden) return;
      list.hidden = true; wrap.classList.remove("open"); btn.setAttribute("aria-expanded", "false");
      btn.removeAttribute("aria-activedescendant");
    }
    function pick(i) {
      sel.value = opts[i].value; sync();
      sel.dispatchEvent(new Event("input", { bubbles: true }));
      sel.dispatchEvent(new Event("change", { bubbles: true }));
      close(); btn.focus();
    }

    btn.addEventListener("click", function () { if (list.hidden) open(); else close(); });
    btn.addEventListener("keydown", function (e) {
      var k = e.key, isOpen = !list.hidden;
      if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].indexOf(k) > -1) e.preventDefault();
      if (!isOpen) {
        if (["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"].indexOf(k) > -1) {
          open(); if (k === "ArrowUp" || k === "End") mark(lis.length - 1); if (k === "Home") mark(0);
        }
        return;
      }
      if (k === "ArrowDown") mark(act + 1);
      else if (k === "ArrowUp") mark(act - 1);
      else if (k === "Home") mark(0);
      else if (k === "End") mark(lis.length - 1);
      else if (k === "Enter" || k === " ") pick(act);
      else if (k === "Escape") { e.preventDefault(); close(); }
      else if (k === "Tab") pick(act);
      else if (k.length === 1) {
        clearTimeout(typedT); typed += k.toLocaleLowerCase("tr");
        typedT = setTimeout(function () { typed = ""; }, 600);
        for (var j = 0; j < opts.length; j++) if (opts[j].text.toLocaleLowerCase("tr").indexOf(typed) === 0) { mark(j); break; }
      }
    });
    lis.forEach(function (li, i) {
      li.addEventListener("mouseenter", function () { mark(i); });
      li.addEventListener("mousedown", function (e) { e.preventDefault(); });
      li.addEventListener("click", function () { pick(i); });
    });
    document.addEventListener("pointerdown", function (e) { if (!wrap.contains(e.target)) close(); });
    btn.addEventListener("blur", function () { setTimeout(function () { if (!wrap.contains(document.activeElement)) close(); }, 0); });
    /* Doğrulama ilk geçersiz alana odaklanınca (select.focus) odak düğmeye geçer */
    sel.addEventListener("focus", function () { btn.focus(); });
    /* v2.js select'e aria-invalid yazar; düğme ve hata metni aynı durumu gösterir */
    new MutationObserver(function () {
      var inv = sel.getAttribute("aria-invalid");
      if (inv) btn.setAttribute("aria-invalid", inv); else btn.removeAttribute("aria-invalid");
    }).observe(sel, { attributes: true, attributeFilter: ["aria-invalid"] });
    if (sel.form) sel.form.addEventListener("reset", function () { setTimeout(sync, 0); });
    sync();
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll("form select"), build); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
