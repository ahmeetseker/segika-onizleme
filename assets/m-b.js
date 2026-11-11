/* m-b: kanal kartları (.chn / .cx) mobil akordeonu (10 Kasım 2026)
   <=900 px: tek kart açık; başlık (h3) düğme rolünde, aria-expanded taşır; Enter/Boşluk ile açılıp kapanır.
   Açık/kapalı durumu layout.js ile aynı .active sınıfıdır; masaüstü davranışına dokunulmaz. */
(() => {
  const chns = document.querySelectorAll(".chn");
  if (!chns.length) return;
  const mq = matchMedia("(max-width: 900px)");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");
  let uid = 0;

  chns.forEach((chn) => {
    const cards = [...chn.querySelectorAll(".cx")];
    if (!cards.length) return;
    let syncing = false;
    let down = null;

    const head = (c) => c.querySelector("h3");
    const sync = () => cards.forEach((c) => {
      const h = head(c);
      if (h && mq.matches) h.setAttribute("aria-expanded", String(c.classList.contains("active")));
    });
    const setOnly = (card) => {
      syncing = true;
      cards.forEach((c) => c.classList.toggle("active", c === card));
      syncing = false;
      sync();
    };
    // Dokunulan kartın ekrandaki yeri geçiş boyunca sabit kalsın (üstteki kart kapanınca sayfa zıplamasın)
    const keepPlace = (card, top0) => {
      if (reduce.matches) { window.scrollBy(0, card.getBoundingClientRect().top - top0); return; }
      const t0 = performance.now();
      const step = (t) => {
        const d = card.getBoundingClientRect().top - top0;
        if (Math.abs(d) > .5) window.scrollBy(0, d);
        if (t - t0 < 380) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const toggle = (card, wasActive) => {
      const top0 = card.getBoundingClientRect().top;
      if (wasActive) { syncing = true; card.classList.remove("active"); syncing = false; sync(); }
      else setOnly(card);
      keepPlace(card, top0);
    };

    const enable = () => {
      cards.forEach((c) => {
        const h = head(c);
        if (!h) return;
        if (c.hasAttribute("tabindex")) { c.dataset.mbTab = c.getAttribute("tabindex"); c.removeAttribute("tabindex"); }
        const ids = [];
        [...c.children].forEach((el) => {
          if (el.matches("p, .cx-media")) { if (!el.id) el.id = "mb-cx-" + (++uid); ids.push(el.id); }
        });
        h.setAttribute("role", "button");
        h.setAttribute("tabindex", "0");
        if (ids.length) h.setAttribute("aria-controls", ids.join(" "));
      });
      const first = cards.find((c) => c.classList.contains("active")) || cards[0];
      setOnly(first);
    };
    const disable = () => {
      cards.forEach((c) => {
        const h = head(c);
        if (h) ["role", "tabindex", "aria-controls", "aria-expanded"].forEach((a) => h.removeAttribute(a));
        if (c.dataset.mbTab != null) { c.setAttribute("tabindex", c.dataset.mbTab); delete c.dataset.mbTab; }
      });
      // Masaüstü: her sütunda bir kart açık olsun
      chn.querySelectorAll(".chn-col").forEach((col) => {
        const cs = [...col.querySelectorAll(".cx")];
        if (cs.length && !cs.some((c) => c.classList.contains("active"))) cs[0].classList.add("active");
      });
    };

    // layout.js bir kartı açarsa (tıklama/odak) mobilde diğerlerini kapat
    new MutationObserver((list) => {
      if (syncing || !mq.matches) return;
      const opened = list.map((m) => m.target).find((c) => c.classList.contains("cx") && c.classList.contains("active"));
      if (opened) setOnly(opened); else sync();
    }).observe(chn, { subtree: true, attributes: true, attributeFilter: ["class"] });

    // Dokunmadan önceki durumu kaydet (odak/tıklama layout.js'te kartı hemen açar)
    chn.addEventListener("pointerdown", (e) => {
      const c = e.target.closest(".cx");
      down = c ? { card: c, was: c.classList.contains("active") } : null;
    }, true);
    chn.addEventListener("click", (e) => {
      if (!mq.matches) return;
      const c = e.target.closest(".cx");
      if (!c || e.target.closest("a")) return;
      if (!e.target.closest("h3, .i3d")) return; // açık kartın gövdesine dokunmak bir şey değiştirmez
      const was = down && down.card === c ? down.was : false;
      down = null;
      toggle(c, was);
    });
    chn.addEventListener("keydown", (e) => {
      if (!mq.matches || (e.key !== "Enter" && e.key !== " ")) return;
      const h = e.target.closest("h3[role='button']");
      if (!h) return;
      e.preventDefault();
      const c = h.closest(".cx");
      toggle(c, c.classList.contains("active"));
    });

    const apply = () => (mq.matches ? enable() : disable());
    mq.addEventListener("change", apply);
    apply();
  });
})();
