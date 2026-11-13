/* SEGİKA masterpage + kaydırma davranışları.
   <body data-page="home|landing|services|trial|tesvik|thanks|about|duyuru" data-layout="full|lp"> */
(function () {
  const APP = "https://app.segika.com";
  const WA = "https://wa.me/905551427171";
  const PHONE = "+90 555 142 71 71";

  const P = {
    calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h8"/>',
    heart: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>',
    id: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h2M15 12h2M7 16h10"/>',
    brief: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    scale: '<path d="M12 3v18M7 21h10M3 7h18M6 7l-3 8a3 3 0 0 0 6 0ZM18 7l-3 8a3 3 0 0 0 6 0Z"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
    alert: '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
    plug: '<path d="M12 22v-5M9 8V2M15 8V2M18 8v5a6 6 0 0 1-12 0V8Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    sim: '<path d="M3 12h4l3-9 4 18 3-9h4"/>',
    refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M3 21v-5h5"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    tup: '<path d="M7 10v11M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 18.4 21H7V10l4-8a3 3 0 0 1 4 3.9Z"/>',
    tdown: '<path d="M17 14V3M9 18.1 10 14H4.2a2 2 0 0 1-2-2.3l1.4-7A2 2 0 0 1 5.6 3H17v11l-4 8a3 3 0 0 1-4-3.9Z"/>',
    flow: '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="3" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M6 16v-4h12v2"/><path d="m18 15 1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4Z"/>',
    up: '<path d="M7 17 17 7M7 7h10v10"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  };
  const icon = (n, s = 20, cls = "") => `<svg class="${cls}" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  // Rozet (kalkan): üst şerit + Segika karesi + büyük rakam + renkli V şeridi
  let bdgN = 0;
  const badgeSvg = (big, small, band, id = "bc" + (++bdgN)) => `<svg viewBox="0 0 200 236" role="img" aria-label="Her ay ${big} ${small}" class="bdg-svg">
    <defs><clipPath id="${id}"><path d="M12 8H188V176L100 226L12 176Z"/></clipPath></defs>
    <path d="M12 8H188V176L100 226L12 176Z" fill="#fff"/>
    <g clip-path="url(#${id})"><path d="M0 158L100 208L200 158V178L100 228L0 178Z" fill="${band}"/></g>
    <path d="M12 8H188V176L100 226L12 176Z" fill="none" stroke="#141216" stroke-width="7" stroke-linejoin="miter"/>
    <path d="M12 62H188M140 8V62" stroke="#141216" stroke-width="7"/>
    <rect x="143.5" y="11.5" width="41" height="47" fill="#f53a55"/>
    <text x="164" y="44" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="26" fill="#fff">S</text><circle cx="176" cy="42" r="3.6" fill="#fff"/>
    <text x="76" y="31" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="600" font-size="15" letter-spacing="2.4" fill="#141216">SEGİKA</text>
    <text x="76" y="52" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="600" font-size="15" letter-spacing="2.4" fill="#141216">HER AY</text>
    <text x="100" y="118" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="31" letter-spacing="-1" fill="#141216" ${big.length > 7 ? 'textLength="150" lengthAdjust="spacingAndGlyphs"' : ""}>${big}</text>
    <text x="100" y="150" text-anchor="middle" font-family="Figtree, sans-serif" font-weight="800" font-size="27" fill="#141216">${small}</text>
  </svg>`;
  const logo = (light) => `<a class="logo${light ? " light" : ""}" href="index.html" aria-label="Segika ana sayfa">Segika<i></i></a>`;

  const products = [
    ["calc", "SGK Teşvik Programı", "Dakikalar içinde eksiksiz ve hatasız teşvik", "hizmetler.html#tesvik"],
    ["heart", "SGK Vizite", "Sağlık raporları SMS onayı beklemeden onaylanır", "hizmetler.html#vizite"],
    ["id", "Kimlik Bildirimi", "Emniyet ve Jandarma bildirimi otomatik", "hizmetler.html#kimlik"],
    ["brief", "İŞKUR Bildirimi", "İşgücü çizelgesi SGK verisinden otomatik", "hizmetler.html#iskur"],
    ["chart", "SGK Araçları ve Raporlar", "Hizmet listesi, tahakkuk, giriş-çıkış", "hizmetler.html#araclar"],
    ["users", "İK Araçları ve MYK", "Tazminat, maaş, deneme süresi, MYK", "hizmetler.html#ik"],
  ];
  // Üst koyu şeritte sırayla dönen duyuru / kampanya mesajları (gerçek içerik, bağlantılı)
  const TICKER = [
    ["Sağlık raporları SMS onayı beklemeden otomatik onaylanır", "landing.html", "Ücretsiz kayıt", "heart"],
    ["Emniyet ve Jandarma bildirimi otomatik", "hizmetler.html#kimlik", "Otomasyon", "id"],
    ["Paketler aylık 1.600 TL'den başlar", "hizmetler.html#fiyatlandirma", "Fiyatlar", "zap"],
  ];
  const consulting = [["İş ve Sosyal Güvenlik Hukuku", "hizmetler.html#hukuk"], ["İnsan Kaynakları Yönetimi", "hizmetler.html#ik-danismanlik"], ["Personel Bulma ve İşe Alım", "hizmetler.html#ise-alim"]];

  function header(page, layout) {
    const cur = (p) => (page === p ? ' aria-current="page"' : "");
    // "Ücretsiz kayıt olun" düğmeleri Bilgi Al sayfasındaki kayıt formuna gider (form e-posta taslağı hazırlar)
    const TRY = page === "landing" ? "#kayit" : "landing.html";
    // Landing / kampanya sayfaları (data-layout="lp"): aynı header tasarımında yalnız logo.
    // Sayfanın tek eylemi açılış alanında durur; header'da tekrarlanmaz. Menü, şerit, mobil menü yok; footer tam kalır.
    if (layout === "lp") {
      return `<a class="skip" href="#main">İçeriğe geç</a>
    <header class="hdr hdr-lp" id="hdr">
      <div class="hdr-main"><div class="container">
        ${logo()}
      </div></div>
    </header>`;
    }
    return `<a class="skip" href="#main">İçeriğe geç</a>
    <header class="hdr" id="hdr">
      <div class="hdr-util"><div class="container">
        <div class="tk" role="region" aria-label="Duyuru ve kampanyalar"><ul class="tk-list">${TICKER.map(([t, h, tag, ic], i) => `<li class="tk-it${i ? "" : " is-on"}"${i ? ' aria-hidden="true" inert' : ""}><a href="${h}"${i ? ' tabindex="-1"' : ""}${h === page + ".html" || (page === "duyuru" && h === "duyuru.html") ? ' aria-current="page"' : ""}><span class="tk-tag">${icon(ic, 13)}${tag}</span><span class="tk-txt">${t}</span><span class="tk-go" aria-hidden="true">${icon("right", 14)}</span></a></li>`).join("")}</ul></div>
        <nav aria-label="Hesap ve destek"><a href="${APP}/login">${icon("lock", 14)}Üye Girişi</a></nav></div></div>
      <div class="hdr-main"><div class="container">
        ${logo()}
        <nav aria-label="Ana menü" style="flex:1"><ul class="menu">
          <li><a href="index.html"${cur("home")}>Ana Sayfa</a></li>
          <li><button type="button" aria-expanded="false" aria-controls="mg1"${page === "services" ? ' style="color:var(--o1)"' : ""}>Hizmetler ${icon("chev", 14, "chev")}</button>
            <div class="mega" id="mg1"><div><h5>Program modülleri</h5><ul>${products.map(([i, t, d, h]) => `<li><a href="${h}"><span class="mi">${icon(i, 18)}</span><span><strong>${t}</strong><span>${d}</span></span></a></li>`).join("")}</ul>
              <a class="link" href="hizmetler.html" style="margin:14px 10px 0">Tüm hizmetleri ve fiyatları inceleyin ${icon("up", 14)}</a></div>
              <div style="display:grid;gap:18px;align-content:start"><div><h5>Danışmanlık</h5><ul>${consulting.map(([t, h]) => `<li><a href="${h}"><strong>${t}</strong></a></li>`).join("")}</ul></div>
              <div class="mega-promo"><h4>SGK işlerinizi otomasyona bırakın</h4><p>Sağlık raporu onayı, kimlik bildirimi, İŞKUR çizelgesi ve teşvik hesaplama tek panelde.</p><a class="btn btn-o" href="${TRY}" style="align-self:flex-start">Ücretsiz kayıt olun ${icon("up", 14)}</a></div></div></div></li>
          <li><a href="hizmetler.html#fiyatlandirma">Fiyatlandırma</a></li>
          <li><a href="hakkimizda.html"${cur("about")}>Hakkımızda</a></li>
          <li><a href="landing.html"${cur("landing")}>Bilgi Al</a></li>
        </ul></nav>
        <div class="hdr-cta"><a class="btn hdr-login" href="${APP}/login"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>Giriş Yap</a><a class="btn btn-o" href="${TRY}">Ücretsiz kayıt olun ${icon("up", 16)}</a></div>
        <button class="tema-btn" type="button" aria-pressed="false" aria-label="Açık moda geç" title="Açık / koyu mod"><svg class="tm-ay" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><svg class="tm-gunes" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
        <button class="burger" type="button" aria-expanded="false" aria-controls="mnav" aria-label="Menüyü aç"><span class="bl" aria-hidden="true"></span><span class="bl" aria-hidden="true"></span></button>
      </div></div>
      <div class="mnav" id="mnav"><div class="container">
        <a href="index.html"${cur("home")}>Ana Sayfa</a><details><summary>Hizmetler ${icon("chev", 18)}</summary><a href="hizmetler.html">Tüm hizmetler</a>${products.map(([, t, , h]) => `<a href="${h}">${t}</a>`).join("")}${consulting.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}</details><a href="hizmetler.html#fiyatlandirma">Fiyatlandırma</a><a href="hakkimizda.html"${cur("about")}>Hakkımızda</a><a href="landing.html"${cur("landing")}>Bilgi Al</a>
        <div class="row"><a class="btn btn-w" href="${APP}/login">Üye Girişi</a><a class="btn btn-o" href="${TRY}">Ücretsiz kayıt olun</a></div>
      </div></div>
    </header>`;
  }

  function footer(layout) {
    const soc = `<div class="soc"><a href="https://www.linkedin.com/company/sgktesvik/" aria-label="LinkedIn" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.1ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM7.1 20.4H3.5V9h3.6v11.4Z"/></svg></a><a href="https://www.instagram.com/sgktesvikcom/" aria-label="Instagram" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/></svg></a><a href="https://www.facebook.com/sgktesvikcom" aria-label="Facebook" rel="noopener"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V5h-3c-2.8 0-4 1.8-4 4.3V11H7v4h3v7h4v-7h3l1-4h-4V9.6c0-.4.3-.6.6-.6Z"/></svg></a><a href="${WA}" aria-label="WhatsApp" rel="noopener">${icon("phone", 16)}</a></div>`;
    const bot = `<div class="container ftr-bot">${soc}<nav aria-label="Yasal"><a href="https://www.segika.com/kurallar/gizlilik-politikasi/" data-modal="gizlilik">Gizlilik ve KVKK</a><a href="https://www.segika.com/kurallar/kullanim-kosullari/" data-modal="kosullar">Kullanım Koşulları</a><a href="https://www.segika.com/kurallar/cerez-ayarlari/" data-modal="cerez">Çerez Politikası</a><a href="#cerez-ayarlari" data-cc="show-preferencesModal">Çerez Ayarları</a></nav><span>© 2026 Segika · Bir TÜRKSAB çözümü</span></div>`;
    const col = (t, items) => `<div><h4>${t}</h4><ul>${items.map(([a, h]) => `<li><a href="${h}">${a}</a></li>`).join("")}</ul></div>`;
    return `<footer class="ftr"><div class="container">
      <div class="ftr-top ftr-top-1"><div class="nl"><h3 class="nl-t">Bilgi alın, sizi arayalım</h3><p>E-postanızı bırakın, Segika ekibi sizinle iletişime geçsin.</p>
          <form class="nl-form" novalidate><label class="sr-only" for="nlm">E-posta adresiniz</label><input id="nlm" type="email" required placeholder="E-posta adresiniz" autocomplete="email"><button class="btn btn-o" type="submit">Bilgi al</button></form>
          <p class="nl-msg" role="status" aria-live="polite"></p>
          <small>Bilgileriniz yalnızca size dönüş yapmak için kullanılır. Ayrıntılar <a href="https://www.segika.com/kurallar/gizlilik-politikasi/" data-modal="gizlilik" style="text-decoration:underline">Gizlilik Politikası</a>'nda.</small></div></div>
      <div class="ftr-cols">
        ${col("Hizmetler", products.map(([, t, , h]) => [t, h]))}
        ${col("Segika", [["Ana Sayfa", "index.html"], ["Hakkımızda", "hakkimizda.html"], ["Hizmetler", "hizmetler.html"], ["SGK Teşvik Hesaplama", "tesvik.html"], ["Fiyatlandırma", "hizmetler.html#fiyatlandirma"], ["Duyuru", "duyuru.html"], ["Bilgi Al / Ücretsiz Kayıt", "landing.html"], ["SGK Otomasyon", "ucretsiz-deneme.html"], ["Üye Girişi", APP + "/login"]])}
      </div>
      <div class="ftr-mark" aria-hidden="true" data-plasma-area><span class="mark-ic plasma-ball" aria-hidden="true"></span><span class="logo mark-word">Segika<i></i></span></div>
      </div>${bot}</footer>`;
  }

  function init() {
    const b = document.body;
    const page = b.dataset.page || "home";
    const layout = b.dataset.layout || "full";
    document.getElementById("header-slot").outerHTML = header(page, layout);
    document.getElementById("footer-slot").outerHTML = footer(layout);
    document.querySelectorAll("[data-badge]").forEach((el) => { const [big, small, band] = el.dataset.badge.split("|"); el.innerHTML = badgeSvg(big, small, band); });
    document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 22)));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;


    // Header: kaydırınca küçül, altındaki bölümün rengine uy
    const hdr = document.getElementById("hdr");
    const isDark = (el) => !document.documentElement.classList.contains("theme-light") && !!(el && el.closest(".hero, .phero, .dark, .close-cta, .ftr, .sv-hero, .sv-cons, .sv-price, .sv-close, .splash"));
    const onScroll = () => {
      const y = scrollY;
      hdr.classList.toggle("scrolled", y > 40);
      const probe = document.elementFromPoint(innerWidth / 2, hdr.offsetHeight + 2);
      const dark = isDark(probe);
      hdr.classList.toggle("light", y > 40 && !dark);
      hdr.classList.toggle("darkbg", y > 40 && dark);
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    // Açık / koyu mod düğmesi (Bordo)
    const temaBtn = document.querySelector(".tema-btn");
    const temaYaz = () => {
      const acik = document.documentElement.classList.contains("theme-light");
      if (temaBtn) { temaBtn.setAttribute("aria-pressed", String(acik)); temaBtn.setAttribute("aria-label", acik ? "Koyu moda geç" : "Açık moda geç"); }
      const mc = document.querySelector('meta[name="theme-color"]'); if (mc) mc.content = acik ? "#efebe4" : "#18181b";
    };
    temaYaz();
    if (temaBtn) temaBtn.addEventListener("click", () => {
      const acik = document.documentElement.classList.toggle("theme-light");
      try { localStorage.setItem("segika-tema", acik ? "acik" : "koyu"); } catch (e) {}
      temaYaz(); onScroll();
      if (window.SegikaPlasma && window.SegikaPlasma.yenile) window.SegikaPlasma.yenile();
    });


    // Plazma küre (footer ve Hizmetler veri akışı): bağımlılıksız canvas betiği gerektiğinde yüklenir
    if (document.querySelector(".plasma-ball")) {
      const me = document.querySelector('script[src*="layout.js"]');
      const sc = document.createElement("script");
      sc.type = "module"; sc.src = (me ? me.src.replace(/layout\.js.*$/, "") : "assets/") + "plasma.js?v=6-m1";
      document.head.appendChild(sc);
    }

    // Footer dev logosu: kapsayıcı genişliğini tam doldursun
    const mark = document.querySelector(".ftr-mark");
    if (mark) {
      const rate = (r) => mark.querySelector(".mark-ic")?.getAnimations({ subtree: true }).forEach((a) => a.updatePlaybackRate(r));
      mark.addEventListener("mouseenter", () => matchMedia("(hover:hover)").matches && rate(3));
      mark.addEventListener("mouseleave", () => rate(1));
      const word = mark.querySelector(".mark-word"), ic = mark.querySelector(".mark-ic");
      const fit = () => {
        word.style.fontSize = "100px";
        const gap = parseFloat(getComputedStyle(mark).columnGap) || 0;
        const avail = (mark.clientWidth - ic.getBoundingClientRect().width - gap) * 0.82;
        word.style.fontSize = Math.max(32, (100 * avail) / word.scrollWidth) + "px";
      };
      fit(); addEventListener("resize", fit);
      if (document.fonts) document.fonts.ready.then(fit);
    }

    // Yasal metin penceresi: Gizlilik/KVKK, Kullanım Koşulları, Çerez Politikası (metinler ilk açılışta yüklenir)
    const DOCS = {
      gizlilik: { title: "Gizlilik Politikası ve KVKK Aydınlatma Metni", file: "assets/gizlilik.js?v=20261110", key: "SEGIKA_GIZLILIK" },
      kosullar: { title: "Kullanım Koşulları", file: "assets/kosullar.js?v=20261110", key: "SEGIKA_KOSULLAR" },
      cerez: { title: "Çerez Politikası", file: "assets/cerez.js?v=20261110", key: "SEGIKA_CEREZ" },
    };
    const dlg = document.createElement("dialog");
    dlg.className = "pmodal"; dlg.setAttribute("aria-labelledby", "pm-title");
    dlg.innerHTML = `<div class="pm-head"><h2 id="pm-title"></h2><button type="button" class="pm-x" aria-label="Kapat">${icon("close", 20)}</button></div><div class="pm-body" tabindex="0"><p>Yükleniyor…</p></div><div class="pm-foot"><button type="button" class="btn btn-o pm-ok">Okudum, anladım</button></div>`;
    b.appendChild(dlg);
    const body = dlg.querySelector(".pm-body"), ttl = dlg.querySelector("#pm-title");
    let opener = null, cur = null;
    const fill = (d) => { body.innerHTML = window[d.key]; body.scrollTop = 0; };
    const openDoc = (e) => {
      const d = DOCS[e.currentTarget.dataset.modal];
      if (!d || typeof dlg.showModal !== "function") return; // eski tarayıcı: bağlantı normal açılsın
      e.preventDefault(); opener = e.currentTarget; cur = e.currentTarget.dataset.modal;
      ttl.textContent = d.title; body.innerHTML = "<p>Yükleniyor…</p>";
      if (window[d.key]) fill(d);
      else { const sc = document.createElement("script"); sc.src = d.file; sc.onload = () => fill(d); sc.onerror = () => { body.innerHTML = '<p>Metin yüklenemedi. <a href="' + opener.href + '">segika.com üzerinden okuyun</a>.</p>'; }; document.head.appendChild(sc); }
      if (dlg.open) return;
      dlg.showModal(); b.style.overflow = "hidden";
    };
    const closeP = () => dlg.close();
    dlg.addEventListener("close", () => { b.style.overflow = ""; if (opener && document.contains(opener)) opener.focus(); });
    dlg.querySelector(".pm-x").addEventListener("click", closeP);
    dlg.querySelector(".pm-ok").addEventListener("click", () => {
      closeP();
      const cb = cur === "gizlilik" && opener && opener.closest(".cons") && opener.closest(".cons").querySelector("input[type=checkbox]");
      if (cb) { cb.checked = true; cb.dispatchEvent(new Event("change", { bubbles: true })); }
    });
    dlg.addEventListener("click", (e) => { if (e.target === dlg) closeP(); });
    document.addEventListener("click", (e) => { const a = e.target.closest("[data-modal]"); if (a && DOCS[a.dataset.modal]) openDoc({ currentTarget: a, preventDefault: () => e.preventDefault() }); });

    // Çerez izni (vanilla-cookieconsent 3.1.0, MIT, assets/vendor). İlk ziyarette bant çıkar; tercih 182 gün saklanır.
    // Footer'daki "Çerez Ayarları" (data-cc="show-preferencesModal") tercih penceresini açar.
    (() => {
      const V = "assets/vendor/cookieconsent/";
      const css = document.createElement("link"); css.rel = "stylesheet"; css.href = V + "cookieconsent.css?v=3.1.0"; document.head.appendChild(css);
      const js = document.createElement("script"); js.src = V + "cookieconsent.umd.js?v=3.1.0"; js.defer = true;
      js.onload = () => window.CookieConsent && window.CookieConsent.run({
        hideFromBots: false, // otomasyonla açılan tarayıcılarda da bant ve "Çerez Ayarları" çalışsın
        guiOptions: { consentModal: { layout: "box", position: "bottom right", equalWeightButtons: false }, preferencesModal: { layout: "box", equalWeightButtons: false } },
        categories: { necessary: { enabled: true, readOnly: true }, functionality: {}, analytics: {}, marketing: {} },
        language: { default: "tr", translations: { tr: {
          consentModal: {
            title: '<span class="cc-ic" aria-hidden="true"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="8.5" cy="11" r="1.2" fill="currentColor"/><circle cx="12.5" cy="15.5" r="1.2" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/></svg></span>Çerez tercihiniz',
            description: "Zorunlu çerezler sitenin çalışması içindir. İzin verirseniz deneyiminizi geliştiren ek çerezler de kullanırız; seçiminizi sayfa altındaki “Çerez Ayarları”ndan değiştirebilirsiniz.",
            acceptAllBtn: "Kabul et", acceptNecessaryBtn: "Yalnızca zorunlu", showPreferencesBtn: "Tercihleri yönet",
            footer: '<a href="https://www.segika.com/kurallar/cerez-ayarlari/" data-modal="cerez">Çerez Politikası</a><a href="https://www.segika.com/kurallar/gizlilik-politikasi/" data-modal="gizlilik">Gizlilik ve KVKK</a>',
          },
          preferencesModal: {
            title: "Çerez tercihleri", acceptAllBtn: "Tümünü kabul et", acceptNecessaryBtn: "Tümünü reddet", savePreferencesBtn: "Seçimimi kaydet", closeIconLabel: "Kapat",
            sections: [
              { title: "Çerezleri nasıl kullanıyoruz?", description: "Çerezleri, tarayıcınızda bilgi saklamak veya tarayıcınızdan bilgi toplamak amacıyla kullanıyoruz. Bu bilgiler çoğunlukla sitenin istediğiniz şekilde çalışmasını sağlar. Ayrıntılar için <a href=\"https://www.segika.com/kurallar/cerez-ayarlari/\" data-modal=\"cerez\">Çerez Politikası</a>’nı okuyabilirsiniz." },
              { title: "Zorunlu çerezler <span class=\"pm__badge\">Her zaman açık</span>", description: "Web sitesinin çalışması için gereklidir ve devre dışı bırakılamaz. Gizlilik tercihlerinizi belirlemek, oturum açmak veya form doldurmak gibi işlemleriniz doğrultusunda ayarlanır.", linkedCategory: "necessary" },
              { title: "İşlevsel çerezler", description: "Sitenin gelişmiş işlevsellik ve kişiselleştirme sunmasını sağlar. İzin vermezseniz bu hizmetlerin bazıları doğru çalışmayabilir.", linkedCategory: "functionality" },
              { title: "Performans çerezleri", description: "Ziyaret sayısını ve etkinlikleri ölçerek sitenin performansını iyileştirmemize yardımcı olur. İzin vermezseniz sitenin performansını izleyemeyiz.", linkedCategory: "analytics" },
              { title: "Reklam amaçlı çerezler", description: "Reklam iş ortaklarımız tarafından ilgi alanlarınıza uygun reklamlar göstermek için kullanılabilir. İzin vermezseniz daha az hedefli reklam görürsünüz.", linkedCategory: "marketing" },
              { title: "Sorularınız için", description: "Çerez politikamız ve tercihleriniz hakkında <a href=\"mailto:sgk@turksab.com\">sgk@turksab.com</a> adresine yazabilirsiniz." },
            ],
          },
        } } },
      });
      document.head.appendChild(js);
      // "Çerez Ayarları": kütüphanenin data-cc bağlamasına güvenmeden tercih penceresini aç
      let wantPrefs = false;
      js.addEventListener("load", () => { if (wantPrefs && window.CookieConsent) window.CookieConsent.showPreferences(); });
      document.addEventListener("click", (e) => {
        const a = e.target.closest('[data-cc="show-preferencesModal"]'); if (!a) return;
        e.preventDefault(); e.stopPropagation();
        if (window.CookieConsent && window.CookieConsent.getConfig && window.CookieConsent.getConfig("language")) window.CookieConsent.showPreferences(); else wantPrefs = true;
      }, true);
    })();

    // Aynı #hash'e yeniden tıklanınca hashchange tetiklenmez; seçimi yine çalıştır
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest('a[href*="#"]');
      if (a && a.hash && a.hash === location.hash && a.pathname === location.pathname) setTimeout(() => dispatchEvent(new HashChangeEvent("hashchange")), 0);
    });
    // Mega menü
    document.querySelectorAll(".menu > li > button").forEach((btn) => {
      const li = btn.parentElement, mg = li.querySelector(".mega");
      const set = (o) => { btn.setAttribute("aria-expanded", String(o)); mg.classList.toggle("open", o); };
      let hideT, byHover = false;
      // Fareyle açılmış menüde başlığa ilk tıklama menüyü kapatmaz
      btn.addEventListener("click", () => { if (byHover) { byHover = false; set(true); return; } set(btn.getAttribute("aria-expanded") !== "true"); });
      li.addEventListener("mouseenter", () => { if (!matchMedia("(hover:hover)").matches) return; clearTimeout(hideT); if (btn.getAttribute("aria-expanded") !== "true") byHover = true; set(true); });
      li.addEventListener("mouseleave", () => { if (!matchMedia("(hover:hover)").matches) return; clearTimeout(hideT); hideT = setTimeout(() => { byHover = false; set(false); }, 220); });
      mg.addEventListener("click", (e) => { if (e.target.closest("a[href]")) { byHover = false; set(false); } });
      addEventListener("keydown", (e) => e.key === "Escape" && set(false));
      document.addEventListener("click", (e) => !li.contains(e.target) && set(false));
    });
    const burger = hdr.querySelector(".burger");
    // Mobil menü: açılış yumuşak + linkler sırayla; kapanış daha kısa (Emil: çıkış girişten hızlı)
    let closeT;
    const setMenu = (o) => {
      clearTimeout(closeT);
      burger.setAttribute("aria-expanded", String(o));
      burger.setAttribute("aria-label", o ? "Menüyü kapat" : "Menüyü aç");
      if (o) { hdr.classList.remove("closing"); hdr.classList.add("open"); b.classList.add("menu-open"); return; }
      if (!hdr.classList.contains("open")) return;
      const fast = matchMedia("(prefers-reduced-motion: reduce)").matches;
      hdr.classList.add("closing");
      closeT = setTimeout(() => { hdr.classList.remove("open", "closing"); b.classList.remove("menu-open"); }, fast ? 0 : 160);
    };
    if (burger) {
      burger.addEventListener("click", () => setMenu(!hdr.classList.contains("open")));
      hdr.querySelectorAll(".mnav a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
      addEventListener("keydown", (e) => e.key === "Escape" && hdr.classList.contains("open") && setMenu(false));
      matchMedia("(min-width: 1061px)").addEventListener("change", (m) => m.matches && setMenu(false));
    }

    // fadeInUp-scroll
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      document.querySelectorAll(".fu").forEach((el) => io.observe(el));
    } else document.querySelectorAll(".fu").forEach((el) => el.classList.add("in"));

    // Sekme + kart şeridi senkronu (Tek platform bölümü)
    document.querySelectorAll("[data-rail-tabs]").forEach((tabs) => {
      const rail = document.getElementById(tabs.dataset.railTabs);
      const btns = [...tabs.querySelectorAll("[role=tab]")];
      const cards = [...rail.children];
      btns.forEach((b, j) => { const c = cards[j]; if (!c) return; if (!b.id) b.id = rail.id + "-t" + j; if (!c.id) c.id = rail.id + "-p" + j; b.setAttribute("aria-controls", c.id); c.setAttribute("role", "tabpanel"); c.setAttribute("aria-labelledby", b.id); });
      const activate = (i, scroll) => {
        btns.forEach((x, j) => { x.setAttribute("aria-selected", String(i === j)); x.tabIndex = i === j ? 0 : -1; });
        cards.forEach((c, j) => c.classList.toggle("active", i === j));
        // Mobilde sekmeler yatay kayar: seçili sekmeyi yalnız yatayda görünür alana getir (sayfa dikeyde oynamaz)
        if (tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: btns[i].offsetLeft - (tabs.clientWidth - btns[i].offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
        if (scroll) rail.scrollTo({ left: cards[i].offsetLeft - (rail.clientWidth - cards[i].clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
      };
      btns.forEach((x, i) => {
        x.addEventListener("click", () => activate(i, true));
        x.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { const n = (i + d + btns.length) % btns.length; activate(n, true); btns[n].focus(); } });
      });
      cards.forEach((c, i) => c.addEventListener("click", () => activate(i, true)));
      let t; rail.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(() => {
        const mid = rail.scrollLeft + rail.clientWidth / 2;
        let best = 0, bd = 1e9; cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
        activate(best, false);
      }, 120); }, { passive: true });
      requestAnimationFrame(() => activate(Number(tabs.dataset.start || 0), true));
    });

    // Scroll stepper: kaydırdıkça sol madde aktif, sağdaki yapışkan görsel değişir
    document.querySelectorAll(".stepper:not([data-auto])").forEach((st) => {
      const items = [...st.querySelectorAll(".st-item")];
      const panels = [...st.querySelectorAll(".st-panel")];
      const set = (i) => { items.forEach((x, j) => x.classList.toggle("active", i === j)); panels.forEach((x, j) => x.classList.toggle("active", i === j)); };
      set(0);
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && set(items.indexOf(e.target))), { rootMargin: "-45% 0px -45% 0px" });
        items.forEach((x) => io.observe(x));
      }
    });

    // Otomatik geçen adımlar: 7 sn'de bir sıradaki madde,
    // sol çizgi dolar; aktif maddenin üzerindeyken durur, tıklayınca o maddeye geçer.
    // Bölüm görünür değilken bekler; 900 px altında ve hareket azaltmada otomatik geçiş yok.
    document.querySelectorAll(".stepper[data-auto]").forEach((st) => {
      const items = [...st.querySelectorAll(".st-item")], panels = [...st.querySelectorAll(".st-panel")];
      st.style.setProperty("--st-dur", (Number(st.dataset.auto) || 7000) + "ms");
      items.forEach((it) => { if (!it.querySelector(".st-bar")) it.insertAdjacentHTML("afterbegin", '<span class="st-bar" aria-hidden="true"><i></i></span>'); });
      let cur = 0, first = true;
      const set = (i) => {
        const prev = cur;
        cur = (i + items.length) % items.length;
        items.forEach((x, j) => { x.classList.toggle("active", j === cur); x.classList.toggle("done", j < cur); x.setAttribute("aria-current", j === cur ? "step" : "false"); });
        // Yalnız eski ve yeni panel hareket eder; aradakiler geçişsiz yerine oturur.
        // Eski panel yukarı çıkar, yeni panel hep alttan girer (başa dönüşte de).
        panels.forEach((x, j) => {
          const moving = !first && (j === cur || j === prev);
          if (!moving) x.classList.add("jump");
          x.classList.toggle("active", j === cur);
          x.classList.toggle("before", j === prev && j !== cur ? true : (!moving && j < cur));
        });
        if (!first && panels[cur]) { const n = panels[cur]; n.classList.add("jump"); n.classList.remove("active", "before"); void n.offsetWidth; n.classList.remove("jump"); n.classList.add("active"); }
        requestAnimationFrame(() => panels.forEach((x) => x.classList.remove("jump")));
        first = false;
        const bar = items[cur].querySelector(".st-bar i"); bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
      };
      items.forEach((it, i) => {
        it.tabIndex = 0;
        // Mobil akordeon: üstteki madde kapanırken dokunulan madde ekranda yerinde kalsın
        const pick = () => { const mob = !st.closest(".sv-sticky") && matchMedia("(max-width:900px)").matches, top0 = it.getBoundingClientRect().top; set(i); if (mob && !reduce) { const t0 = performance.now(); const keep = (t) => { scrollBy(0, it.getBoundingClientRect().top - top0); if (t - t0 < 360) requestAnimationFrame(keep); }; requestAnimationFrame(keep); } };
        it.addEventListener("click", (e) => { if (!e.target.closest("a") && i !== cur) pick(); });
        it.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === it) { e.preventDefault(); set(i); } });
        it.querySelector(".st-bar i").addEventListener("animationend", () => { if (i === cur && !st.contains(document.activeElement)) set(cur + 1); });
        it.addEventListener("focusin", (e) => { st.classList.add("focus-hold"); if (e.target !== it && i !== cur) set(i); });
        it.addEventListener("focusout", (e) => { if (!st.contains(e.relatedTarget)) st.classList.remove("focus-hold"); });
      });
      set(0);
      st._set = set;
      // Hizmetler (sv-sticky) ≤1023 px: tüm maddeler açık ve tıklanmaz; maddeler Tab sırasına girmesin
      if (st.closest(".sv-sticky")) { const smq = matchMedia("(max-width: 1023px)"); const tab = () => items.forEach((it) => (it.tabIndex = smq.matches ? -1 : 0)); tab(); smq.addEventListener("change", tab); }
      // Liste yüksekliği sabit: tüm maddeler kapalıyken boy + en uzun açıklamanın açık hali
      const list = st.querySelector(".st-list");
      const fixH = () => {
        if (!matchMedia("(min-width: 901px)").matches) { list.style.minHeight = ""; return; }
        let base = 0, extra = 0;
        items.forEach((it) => {
          const cs = getComputedStyle(it), sm = it.querySelector("small"), h = it.querySelector("h3"), pp = it.querySelector(":scope > p"), ln = it.querySelector(":scope > .link");
          base += parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + (sm ? sm.offsetHeight + 8 : 0) + (h ? h.offsetHeight : 0);
          extra = Math.max(extra, (pp ? pp.scrollHeight + 16 : 0) + (ln ? 48 : 0));
        });
        list.style.minHeight = Math.ceil(base + extra) + "px";
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(fixH);
      addEventListener("resize", fixH);
      // Menüden #vizite gibi bir maddeye gelinirse o madde açılsın
      const byHash = () => { const i = items.findIndex((x) => x.id && "#" + x.id === location.hash); if (i > -1) set(i); };
      byHash(); addEventListener("hashchange", byHash);
      st.classList.add("paused");
      if ("IntersectionObserver" in window) new IntersectionObserver(([e]) => st.classList.toggle("paused", !e.isIntersecting), { threshold: 0.5 }).observe(st);
      else st.classList.remove("paused");
    });

    // Kanal kartları: sütunda üzerine gelinen / odaklanan kart açılır,
    // aynı sütundaki diğerleri kapanır. Fare ayrılınca son açılan açık kalır.
    document.querySelectorAll(".chn-col").forEach((col) => {
      const cs = [...col.querySelectorAll(".cx")];
      const open = (c) => cs.forEach((x) => x.classList.toggle("active", x === c));
      let hoverT;
      cs.forEach((c) => { c.addEventListener("mouseenter", () => { if (!matchMedia("(hover:hover) and (pointer:fine)").matches) return; clearTimeout(hoverT); hoverT = setTimeout(() => open(c), 140); }); c.addEventListener("mouseleave", () => clearTimeout(hoverT)); c.addEventListener("click", () => { clearTimeout(hoverT); if (matchMedia("(min-width: 901px)").matches) open(c); }); /* mobilde akordeonu m-b.js yönetir */ c.addEventListener("focusin", () => { if (matchMedia("(min-width: 901px)").matches) open(c); }); });
    });

    // Danışmanlık: solda alan sekmeleri (dikey), sağda seçili alanın başlıkları iki sütunda
    document.querySelectorAll(".cn").forEach((cn) => {
      const tabs = [...cn.querySelectorAll(".cn-tab")];
      const strip = cn.querySelector(".cn-tabs"), horiz = matchMedia("(max-width: 1023px)");
      const orient = () => strip && strip.setAttribute("aria-orientation", horiz.matches ? "horizontal" : "vertical");
      orient(); horiz.addEventListener("change", orient);
      const sel = (t, focus) => { tabs.forEach((x) => { const on = x === t; x.classList.toggle("on", on); x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); if (focus) t.focus({ preventScroll: true }); if (strip && strip.scrollWidth > strip.clientWidth) strip.scrollTo({ left: Math.max(0, t.offsetLeft - strip.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2), behavior: reduce ? "auto" : "smooth" }); };
      tabs.forEach((t, i) => {
        t.addEventListener("click", () => sel(t));
        t.addEventListener("keydown", (e) => { const d = ["ArrowDown", "ArrowRight"].includes(e.key) ? 1 : ["ArrowUp", "ArrowLeft"].includes(e.key) ? -1 : 0; if (d) { e.preventDefault(); sel(tabs[(i + d + tabs.length) % tabs.length], true); } });
      });
      const byHash = () => { const t = tabs.find((x) => "#" + x.id === location.hash); if (t) sel(t); };
      byHash(); addEventListener("hashchange", byHash);
    });

    // Modül haritası: kaynak/çıktı kartlarını merkeze kavisli çizgilerle bağla (masaüstü)
    document.querySelectorAll(".sv-map-panel.mf").forEach((pn) => {
      const svg = pn.querySelector(".mf-lines"), core = pn.querySelector(".mf-core"), NS = "http://www.w3.org/2000/svg";
      const draw = () => {
        svg.querySelectorAll("path").forEach((p) => p.remove());
        if (!matchMedia("(min-width: 901px)").matches) return;
        const P = pn.getBoundingClientRect(), C = core.getBoundingClientRect();
        svg.setAttribute("viewBox", `0 0 ${P.width} ${P.height}`);
        pn.querySelectorAll(".mf-n").forEach((n, i) => {
          const r = n.getBoundingClientRect(), left = n.dataset.side === "l";
          const x1 = (left ? r.right : r.left) - P.left, y1 = r.top + r.height / 2 - P.top;
          const x2 = (left ? C.left + 6 : C.right - 6) - P.left, y2 = C.top + C.height / 2 - P.top;
          const mx = (x1 + x2) / 2, d = `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
          const base = document.createElementNS(NS, "path"); base.setAttribute("d", d); base.setAttribute("class", "mf-path");
          const flow = document.createElementNS(NS, "path"); flow.setAttribute("d", d); flow.setAttribute("class", "mf-flow" + (left ? "" : " out")); flow.style.animationDelay = (-i * 0.35) + "s";
          svg.append(base, flow);
        });
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw); addEventListener("resize", draw); draw();
    });

    // WCAG 2.2.2: kendiliğinden hareket eden içerik için duraklat / oynat düğmesi
    const PAUSE_I = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
    const PLAY_I = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M7 5l12 7-12 7z" fill="currentColor"/></svg>';
    const motionBtn = (host, label, onToggle) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "motion-btn";
      const set = (paused) => { b.setAttribute("aria-pressed", String(paused)); b.setAttribute("aria-label", (paused ? "Oynat: " : "Duraklat: ") + label); b.innerHTML = paused ? PLAY_I : PAUSE_I; b.title = paused ? "Oynat" : "Duraklat"; };
      set(false); b.addEventListener("click", () => { const p = b.getAttribute("aria-pressed") !== "true"; set(p); onToggle(p); });
      host.appendChild(b); return b;
    };
    document.querySelectorAll(".trust-row, .irows").forEach((el) => { el.classList.add("has-motion"); motionBtn(el, el.classList.contains("irows") ? "entegrasyon bandı" : "logo ve rakam bantları", (p) => el.classList.toggle("is-paused", p)); });
    document.querySelectorAll(".stepper[data-auto]").forEach((st) => { st.classList.add("has-motion"); motionBtn(st, "otomatik geçiş", (p) => st.classList.toggle("user-paused", p)); });

    // Üst şerit duyuru döngüsü: ~5 sn'de bir dikey geçiş. Fare üstündeyken, klavye odağı içerideyken,
    // sekme gizliyken ve Duraklat'a basılınca durur; hareket azaltmada otomatik dönmez (ilk mesaj sabit).
    // Gizli mesajlar inert + aria-hidden + tabindex -1; aria-live kullanılmaz.
    document.querySelectorAll(".tk").forEach((tk) => {
      const its = [...tk.querySelectorAll(".tk-it")];
      if (its.length < 2) return;
      const rmq = matchMedia("(prefers-reduced-motion: reduce)");
      let cur = 0, userPaused = false, hover = false, focus = false;
      const show = (n) => {
        const prev = cur; cur = n;
        its.forEach((it, j) => {
          const on = j === cur;
          it.classList.toggle("is-on", on);
          it.classList.toggle("is-out", j === prev && !on);
          it.inert = !on;
          if (on) it.removeAttribute("aria-hidden"); else it.setAttribute("aria-hidden", "true");
          const a = it.querySelector("a"); if (on) a.removeAttribute("tabindex"); else a.tabIndex = -1;
        });
      };
      const btn = motionBtn(tk, "duyuru ve kampanya mesajları", (p) => { userPaused = p; tk.classList.toggle("is-paused", p); });
      btn.classList.add("tk-btn");
      const setRm = () => { btn.hidden = rmq.matches; if (rmq.matches && cur !== 0) show(0); };
      setRm(); rmq.addEventListener("change", setRm);
      tk.addEventListener("mouseenter", () => (hover = true));
      tk.addEventListener("mouseleave", () => (hover = false));
      tk.addEventListener("focusin", () => (focus = true));
      tk.addEventListener("focusout", (e) => { if (!tk.contains(e.relatedTarget)) focus = false; });
      setInterval(() => { if (!userPaused && !hover && !focus && !rmq.matches && !document.hidden && !hdr.classList.contains("scrolled")) show((cur + 1) % its.length); }, 5000);
    });

    // Sabit WhatsApp düğmesi (tüm kök sayfalar)
    b.insertAdjacentHTML("beforeend", `<div class="waw" data-waw><div class="waw-panel" id="waw-panel" role="dialog" aria-labelledby="waw-t" hidden><div class="waw-head"><span class="waw-av" aria-hidden="true"><svg class="" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 5.83 2.42 8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"/></svg></span><div class="waw-hd"><p class="waw-t" id="waw-t">Segika ile iletişim</p><p class="waw-s">SGK teşvik, otomasyon ve danışmanlık</p></div><button class="waw-x" type="button" aria-label="Kapat"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div><div class="waw-body"><p class="waw-bubble">Merhaba! Sorunuzu WhatsApp’tan yazın ya da bizi arayın; ekibimiz size yardımcı olsun.</p></div><div class="waw-acts"><a class="waw-go" href="https://wa.me/905551427171?text=Merhaba%2C%20Segika%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." rel="noopener"><svg class="" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 5.83 2.42 8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"/></svg><span><b>WhatsApp’tan yazın</b><small>(0555) 142 71 71 · Satış</small></span></a><a class="waw-tel" href="tel:+902129099941"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg><span><b>Telefonla arayın</b><small>(0212) 909 99 41 · Müşteri desteği</small></span></a></div></div><button class="wa-fab" type="button" aria-expanded="false" aria-controls="waw-panel" aria-label="WhatsApp ve telefon ile iletişim"><svg class="waw-ic-wa" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 5.83 2.42 8.17 8.17 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"/></svg><svg class="waw-ic-x" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button></div>`);

    // Vaka akordeonu (hover / tık / klavye)
    document.querySelectorAll(".cases").forEach((wrap) => {
      const cs = [...wrap.querySelectorAll(".case")];
      const set = (c) => cs.forEach((x) => { x.classList.toggle("active", x === c); x.setAttribute("aria-expanded", String(x === c)); });
      let hoverT; // Fareyle kartların üstünden geçerken her karta açılmasın: kısa niyet gecikmesi
      cs.forEach((c) => { c.addEventListener("click", () => { clearTimeout(hoverT); if (c.classList.contains("active")) return; const mob = matchMedia("(max-width:900px)").matches, top0 = c.getBoundingClientRect().top; set(c); if (mob) { const t0 = performance.now(); const keep = (t) => { scrollBy(0, c.getBoundingClientRect().top - top0); if (t - t0 < 560) requestAnimationFrame(keep); }; requestAnimationFrame(keep); } }); c.addEventListener("mouseenter", () => { if (!matchMedia("(hover:hover) and (min-width:901px)").matches) return; clearTimeout(hoverT); hoverT = setTimeout(() => set(c), 140); }); c.addEventListener("mouseleave", () => clearTimeout(hoverT)); c.addEventListener("focus", () => set(c)); });
    });

    // Filtre sekmeleri (rakamlar bölümü)
    document.querySelectorAll(".ftabs").forEach((ft) => {
      const bs = [...ft.querySelectorAll("button")];
      bs.forEach((x) => x.addEventListener("click", () => {
        bs.forEach((y) => y.setAttribute("aria-selected", String(y === x)));
        const g = x.dataset.g;
        document.querySelectorAll(ft.dataset.target + " > [data-g]").forEach((p) => (p.hidden = g !== "all" && p.dataset.g !== g));
      }));
    });

    // Kaynak şeridi okları
    document.querySelectorAll("[data-arrows]").forEach((a) => {
      const rail = document.getElementById(a.dataset.arrows);
      const [prev, next] = a.querySelectorAll("button");
      const step = () => (rail.firstElementChild ? rail.firstElementChild.clientWidth + 24 : 300);
      prev.addEventListener("click", () => rail.scrollBy({ left: -step(), behavior: "smooth" }));
      next.addEventListener("click", () => rail.scrollBy({ left: step(), behavior: "smooth" }));
    });

    // ===== Hizmetler sayfası bileşenleri =====
    // Mobilde: yapışkan görseldeki maket her maddenin altına kopyalanır
    document.querySelectorAll(".sv-sticky .stepper").forEach((st) => {
      const panels = st.querySelectorAll(".st-panel");
      st.querySelectorAll(".st-item").forEach((it, i) => { const m = it.querySelector(".mob"); if (m && panels[i] && !m.children.length) m.innerHTML = panels[i].innerHTML; });
    });
    // Sekmeli kartlar (WAI-ARIA tabs)
    // Sekme çubuğu: çerçeve + dönen kenar ışığı dış kapta sabit kalsın, sekmeler iç katmanda kaysın
    document.querySelectorAll(".sv-tabbar[role=tablist]").forEach((bar) => {
      if (bar.querySelector(":scope > .tb-in")) return;
      const inner = document.createElement("div"); inner.className = "tb-in";
      ["role", "aria-label", "aria-labelledby"].forEach((a) => { if (bar.hasAttribute(a)) { inner.setAttribute(a, bar.getAttribute(a)); bar.removeAttribute(a); } });
      while (bar.firstChild) inner.appendChild(bar.firstChild);
      bar.appendChild(inner); bar.classList.add("tbw");
      const fade = () => { inner.classList.toggle("has-more", inner.scrollLeft + inner.clientWidth < inner.scrollWidth - 2); inner.classList.toggle("has-prev", inner.scrollLeft > 2); };
      inner.addEventListener("scroll", fade, { passive: true }); addEventListener("resize", fade); requestAnimationFrame(fade);
    });
    document.querySelectorAll(".sv-tabbar").forEach((bar) => {
      const tabs = [...bar.querySelectorAll("[role=tab]")];
      const sel = (t, focus) => { tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); if (focus) t.focus(); t.scrollIntoView({ block: "nearest", inline: "center", behavior: reduce ? "auto" : "smooth" }); };
      tabs.forEach((t, i) => { t.addEventListener("click", () => sel(t)); t.addEventListener("keydown", (e) => { const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0; if (d) { e.preventDefault(); sel(tabs[(i + d + tabs.length) % tabs.length], true); } }); });
    });
    // İlerleme çubuklu akordeon: 10 sn'de bir sıradaki madde, tıklayınca o madde
    document.querySelectorAll("[data-pacc]").forEach((box) => {
      const its = [...box.querySelectorAll(".pacc-it")], sl = [...box.querySelectorAll(".pacc-slide")];
      const DUR = 10000; let cur = -1, timer = null, started = false, userPaused = false;
      const go = (i) => {
        if (cur >= 0) { its[cur].classList.remove("active"); its[cur].setAttribute("aria-expanded", "false"); sl[cur].classList.remove("active"); sl[cur].classList.add("prev"); const old = sl[cur]; setTimeout(() => old.classList.remove("prev"), 620); }
        cur = i; const bi = its[i].querySelector(".pacc-bar i"); if (bi) { bi.style.animation = "none"; void bi.offsetWidth; bi.style.animation = ""; } its[i].classList.add("active"); its[i].setAttribute("aria-expanded", "true"); sl[i].classList.remove("prev"); sl[i].classList.add("active");
      };
      box.style.setProperty("--pacc-dur", DUR / 1000 + "s");
      box.classList.add("has-motion");
      motionBtn(box, "otomatik geçiş", (p) => { userPaused = p; box.classList.toggle("user-paused", p); });
      its.forEach((it, i) => it.querySelector(".pacc-bar i")?.addEventListener("animationend", () => { if (i === cur && started) go((cur + 1) % its.length); }));
      its.forEach((it, i) => it.addEventListener("click", () => go(i)));
      box.classList.add("idle"); go(0);
      if ("IntersectionObserver" in window && !reduce) new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; box.classList.remove("idle"); const b = its[cur].querySelector(".pacc-bar i"); if (b) { b.style.animation = "none"; void b.offsetWidth; b.style.animation = ""; } } }, { threshold: 0.2 }).observe(box);
    });
    // Teşvik kodları: Yürürlükte / Geçmiş dönem sekmeleri (ok tuşlarıyla da gezilir)
    document.querySelectorAll("[data-tt]").forEach((box) => {
      const tabs = [...box.querySelectorAll('[role="tab"]')];
      const sel = (t, focus) => { tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; }); if (focus) t.focus(); };
      tabs.forEach((t, i) => { t.addEventListener("click", () => sel(t)); t.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); sel(tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length], true); } }); });
    });
    // Fiyat odometresi: iStoc sepetindeki number-flow animasyonu; sekme değişince yalnız değişen basamaklar döner
    const priceOf = (el) => { if (!el) return null; const n = Number((el.dataset.price || el.textContent).replace(/[^0-9]/g, "")); return n > 0 ? n : null; };
    const rollPrice = (el, from, suffix) => {
      const to = priceOf(el);
      if (!el || to == null || !customElements.get("number-flow")) return;
      el.dataset.price = String(to);
      let nf = el.querySelector("number-flow");
      if (!nf) {
        nf = document.createElement("number-flow");
        nf.locales = "tr-TR"; nf.format = { useGrouping: true, maximumFractionDigits: 0 }; nf.numberSuffix = suffix;
        nf.transformTiming = { duration: 500, easing: "cubic-bezier(.23, 1, .32, 1)" }; nf.opacityTiming = { duration: 280, easing: "ease-out" };
        el.setAttribute("aria-label", el.textContent.trim()); el.textContent = ""; el.appendChild(nf);
      }
      nf.animated = false; nf.update(from == null ? to : from);
      requestAnimationFrame(() => { nf.animated = !reduce; nf.update(to); el.setAttribute("aria-label", to.toLocaleString("tr-TR") + suffix); });
    };
    // Rakam kartları: ekrana girince 0'dan sayarak gelsin (number-flow; yüklü değilse metin olduğu gibi kalır)
    const counters = document.querySelectorAll("[data-count]");
    if (counters.length && "IntersectionObserver" in window) {
      const io = new IntersectionObserver((ents) => ents.forEach((en) => {
        if (!en.isIntersecting) return; io.unobserve(en.target);
        const el = en.target, to = Number(el.dataset.count), dec = Number(el.dataset.dec || 0);
        if (reduce || !customElements.get("number-flow") || !Number.isFinite(to)) return;
        const nf = document.createElement("number-flow");
        nf.locales = "tr-TR"; nf.format = { minimumFractionDigits: dec, maximumFractionDigits: dec }; nf.numberSuffix = el.dataset.suffix || "";
        nf.transformTiming = { duration: 900, easing: "cubic-bezier(.23, 1, .32, 1)" }; nf.spinTiming = { duration: 900, easing: "cubic-bezier(.23, 1, .32, 1)" };
        el.setAttribute("aria-label", el.textContent.trim()); el.textContent = ""; el.appendChild(nf);
        nf.animated = false; nf.update(0);
        requestAnimationFrame(() => setTimeout(() => { nf.animated = true; nf.update(to); }, 120));
      }), { threshold: 0.6 });
      customElements.whenDefined?.("number-flow").then(() => counters.forEach((c) => io.observe(c)));
    }
    // Paket karşılaştırma: mobilde paket seçici (yalnız seçilen paketin sütunu görünür)
    document.querySelectorAll(".pk").forEach((pk) => {
      const bs = [...pk.querySelectorAll(".pk-seg button")];
      bs.forEach((b) => b.addEventListener("click", () => { const from = priceOf(pk.querySelector(".pk-tbl thead .pk-" + pk.dataset.sel + " .pk-price b")); bs.forEach((x) => x.setAttribute("aria-pressed", String(x === b))); pk.dataset.sel = b.dataset.pk; rollPrice(pk.querySelector(".pk-tbl thead .pk-" + b.dataset.pk + " .pk-price b"), from, ""); }));
    });
    // Fiyatlandırma, mobil: paket sekmeleri (tek kart görünür)
    document.querySelectorAll(".pr-seg").forEach((seg) => {
      const grid = (seg.closest(".pr-segw") || seg).nextElementSibling, bs = [...seg.querySelectorAll("button")];
      const reveal = (b, smooth) => { const l = b.offsetLeft - (seg.clientWidth - b.offsetWidth) / 2; seg.scrollTo({ left: Math.max(0, l), behavior: smooth && !reduce ? "smooth" : "auto" }); };
      const fade = () => seg.classList.toggle("has-more", seg.scrollLeft + seg.clientWidth < seg.scrollWidth - 2);
      seg.addEventListener("scroll", fade, { passive: true });
      requestAnimationFrame(() => { const a = bs.find((x) => x.getAttribute("aria-pressed") === "true"); if (a) reveal(a, false); fade(); });
      bs.forEach((b) => b.addEventListener("click", () => reveal(b, true)));
      bs.forEach((b) => b.addEventListener("click", () => { const cur = grid.children[Number(grid.dataset.sel)]; const pvOf = (c) => c && (c.querySelector(".sv-pv [data-tier]") || c.querySelector(".sv-pv")); const from = priceOf(pvOf(cur)); bs.forEach((x) => x.setAttribute("aria-pressed", String(x === b))); grid.dataset.sel = b.dataset.i; const el = grid.children[Number(b.dataset.i)]; const pv = pvOf(el); rollPrice(pv, from, pv && pv.hasAttribute("data-tier") ? "" : " TL"); }));
    });
    // Paket filtresi
    document.querySelectorAll(".sv-filter").forEach((f) => {
      const tbl = f.parentElement.querySelector(".sv-tbl");
      f.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { f.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); tbl.dataset.plan = b.dataset.plan; }));
    });
    // Hero logo değişimi (5 sn, 100 ms kademeli)
    document.querySelectorAll(".sv-logos").forEach((row) => {
      const rmq = matchMedia("(prefers-reduced-motion: reduce)");
      if (rmq.matches) return;
      // segika.com'daki entegrasyonlar (gerçek logolar); 5'erli gruplar halinde döner
      const all = ["luca.png", "logo.svg", "mikro.svg", "eta.png", "zirve.svg", "orca.png", "sap.svg", "canias.svg"]; let off = 0;
      all.forEach((f) => { const im = new Image(); im.src = "assets/int/" + f; });
      const spans = [...row.children];
      let timer = null, pending = [], userPaused = false;
      const tick = () => {
        off = (off + spans.length) % all.length;
        spans.forEach((sp, i) => { pending.push(setTimeout(() => { sp.classList.add("out"); pending.push(setTimeout(() => { const im = sp.querySelector("img"); if (im) im.src = "assets/int/" + all[(off + i) % all.length]; sp.classList.remove("out"); }, 350)); }, i * 100)); });
      };
      const stop = () => { clearInterval(timer); timer = null; pending.forEach(clearTimeout); pending = []; spans.forEach((sp) => sp.classList.remove("out")); };
      const start = () => { if (!timer && !userPaused && !rmq.matches) timer = setInterval(tick, 5000); };
      rmq.addEventListener("change", () => (rmq.matches ? stop() : start()));
      // Düğme role=img kapsayıcısının dışında, kardeş öğe olarak durur
      const wrap = document.createElement("div"); wrap.className = "sv-logos-w"; row.before(wrap); wrap.appendChild(row);
      motionBtn(wrap, "entegrasyon logoları", (p) => { userPaused = p; p ? stop() : start(); });
      start();
    });

    // Footer "Bilgi al" formu
    document.querySelectorAll(".nl-form").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault();
      const em = f.querySelector('input[type="email"]'), msg = f.parentElement.querySelector(".nl-msg");
      const ok = em.checkValidity() && em.value.trim() !== "";
      em.setAttribute("aria-invalid", String(!ok));
      if (!ok) { msg.className = "nl-msg bad"; msg.textContent = "Geçerli bir e-posta adresi girin."; em.focus(); return; }
      // Backend yok: dürüst akış, e-posta taslağı açılır; gönderimi kullanıcı tamamlar
      const href = "mailto:sgk@turksab.com?subject=" + encodeURIComponent("Segika bilgi talebi") + "&body=" + encodeURIComponent("Merhaba,\r\n\r\nSegika hakkında bilgi almak istiyorum.\r\n\r\nE-posta: " + em.value.replace(/[\r\n]+/g, " ").trim());
      msg.className = "nl-msg ok"; msg.textContent = "E-posta taslağınız açılıyor; gönderdiğinizde talebiniz bize ulaşır.";
      if (f.dispatchEvent(new CustomEvent("segika:maildraft", { detail: href, cancelable: true }))) location.href = href;
    }));

    // Açılır liste: asıl <select> formda gizli kalır (değer, required, doğrulama),
    // üstüne WAI-ARIA "select-only combobox" deseninde düğme + liste kurulur.
    document.querySelectorAll("select").forEach((sel, n) => {
      if (sel.closest(".dd")) return;
      const id = "dd" + n, ph = [...sel.options].find((o) => o.value === ""), opts = [...sel.options].filter((o) => o.value !== "");
      const wrap = document.createElement("div"); wrap.className = "dd";
      sel.parentNode.insertBefore(wrap, sel); wrap.appendChild(sel);
      sel.classList.add("dd-native"); sel.tabIndex = -1; sel.setAttribute("aria-hidden", "true");
      const btn = document.createElement("button"); btn.type = "button"; btn.className = "dd-btn"; btn.id = id + "b";
      btn.setAttribute("role", "combobox"); btn.setAttribute("aria-haspopup", "listbox"); btn.setAttribute("aria-expanded", "false"); btn.setAttribute("aria-controls", id + "l");
      if (sel.required) btn.setAttribute("aria-required", "true");
      btn.innerHTML = '<span class="dd-v"></span><svg class="dd-chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      const lab = sel.id && document.querySelector('label[for="' + sel.id + '"]');
      if (lab) { lab.id = lab.id || id + "lab"; btn.setAttribute("aria-labelledby", lab.id); lab.htmlFor = btn.id; }
      const list = document.createElement("ul"); list.className = "dd-list"; list.id = id + "l"; list.setAttribute("role", "listbox"); list.tabIndex = -1; list.hidden = true;
      if (lab) list.setAttribute("aria-labelledby", lab.id);
      opts.forEach((o, i) => { const li = document.createElement("li"); li.id = id + "o" + i; li.setAttribute("role", "option"); li.textContent = o.text; li.dataset.v = o.value; list.appendChild(li); });
      wrap.append(btn, list);
      const lis = [...list.children], v = btn.querySelector(".dd-v");
      let act = -1, typed = "", typedT;
      const sync = () => { const i = opts.findIndex((o) => o.value === sel.value && sel.value !== ""); v.textContent = i > -1 ? opts[i].text : (ph ? ph.text : ""); btn.classList.toggle("ph", i < 0); lis.forEach((li, j) => li.setAttribute("aria-selected", String(j === i))); return i; };
      const mark = (i) => { act = Math.max(0, Math.min(lis.length - 1, i)); lis.forEach((li, j) => li.classList.toggle("on", j === act)); btn.setAttribute("aria-activedescendant", lis[act].id); lis[act].scrollIntoView({ block: "nearest" }); };
      const open = () => { if (!list.hidden) return; list.hidden = false; wrap.classList.add("open"); btn.setAttribute("aria-expanded", "true"); const i = sync(); mark(i > -1 ? i : 0); };
      const close = () => { if (list.hidden) return; list.hidden = true; wrap.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.removeAttribute("aria-activedescendant"); };
      const pick = (i) => { sel.value = opts[i].value; sync(); sel.dispatchEvent(new Event("input", { bubbles: true })); sel.dispatchEvent(new Event("change", { bubbles: true })); const fl = sel.closest(".fld"); if (fl) fl.classList.remove("bad"); sel.setAttribute("aria-invalid", "false"); close(); btn.focus(); };
      btn.addEventListener("click", () => (list.hidden ? open() : close()));
      btn.addEventListener("keydown", (e) => {
        const k = e.key, isOpen = !list.hidden;
        if (["ArrowDown", "ArrowUp", "Home", "End", "Enter", " "].includes(k)) e.preventDefault();
        if (!isOpen) { if (["ArrowDown", "ArrowUp", "Enter", " ", "Home", "End"].includes(k)) { open(); if (k === "ArrowUp" || k === "End") mark(lis.length - 1); if (k === "Home") mark(0); } return; }
        if (k === "ArrowDown") mark(act + 1); else if (k === "ArrowUp") mark(act - 1); else if (k === "Home") mark(0); else if (k === "End") mark(lis.length - 1);
        else if (k === "Enter" || k === " ") pick(act); else if (k === "Escape") { e.preventDefault(); close(); } else if (k === "Tab") { pick(act); }
        else if (k.length === 1) { clearTimeout(typedT); typed += k.toLocaleLowerCase("tr"); typedT = setTimeout(() => (typed = ""), 600); const j = opts.findIndex((o) => o.text.toLocaleLowerCase("tr").startsWith(typed)); if (j > -1) mark(j); }
      });
      lis.forEach((li, i) => { li.addEventListener("mouseenter", () => mark(i)); li.addEventListener("mousedown", (e) => e.preventDefault()); li.addEventListener("click", () => pick(i)); });
      document.addEventListener("pointerdown", (e) => { if (!wrap.contains(e.target)) close(); });
      btn.addEventListener("blur", () => setTimeout(() => { if (!wrap.contains(document.activeElement)) close(); }, 0));
      sel.addEventListener("focus", () => btn.focus());
      new MutationObserver(() => { const inv = sel.getAttribute("aria-invalid"); if (inv) btn.setAttribute("aria-invalid", inv); }).observe(sel, { attributes: true, attributeFilter: ["aria-invalid"] });
      if (sel.form) sel.form.addEventListener("reset", () => setTimeout(sync, 0));
      sync();
    });

    // Lead formu
    // Telefon: rakam, boşluk, +, -, ( ) kabul; en az 10 rakam
    const leadOk = (inp) => inp.type === "checkbox" ? inp.checked : inp.type === "tel" ? /^[0-9 +()\-]+$/.test(inp.value.trim()) && inp.value.replace(/\D/g, "").length >= 10 : inp.checkValidity() && inp.value.trim() !== "";
    document.querySelectorAll("form[data-lead]").forEach((f) => ["input", "change"].forEach((ev) => f.addEventListener(ev, (e) => {
      const inp = e.target; if (!inp.matches || !inp.matches("[required]") || inp.getAttribute("aria-invalid") !== "true" || !leadOk(inp)) return;
      const fl = inp.closest(".fld, .cons"); if (fl) fl.classList.remove("bad"); inp.setAttribute("aria-invalid", "false");
    })));
    document.querySelectorAll("form[data-lead]").forEach((f) => f.addEventListener("submit", (e) => {
      e.preventDefault(); let first = null;
      f.querySelectorAll("[required]").forEach((inp) => {
        const ok = leadOk(inp);
        const fl = inp.closest(".fld, .cons"); if (fl) fl.classList.toggle("bad", !ok);
        inp.setAttribute("aria-invalid", String(!ok)); if (!ok && !first) first = inp;
      });
      if (first) return first.focus();
      // Backend yok: alanlar sgk@turksab.com'a e-posta taslağı olarak kodlanır, gönderimi kullanıcı tamamlar.
      // Testler iptal edilebilir "segika:maildraft" olayıyla gerçek e-posta uygulamasını açmadan doğrular.
      const val = (sel) => { const el = f.querySelector(sel); return el ? String(el.value).replace(/[\r\n]+/g, " ").trim() : ""; };
      const lab = (el) => { const fl = el.closest(".fld"), l = (el.id && f.querySelector('label[for="' + el.id + '"]')) || (fl && fl.querySelector("label")); return l ? l.textContent.replace(/\s*\(.*\)$/, "").trim() : el.id; };
      const lines = ["Merhaba,", "", (document.getElementById("kayit") ? "Segika için ücretsiz kayıt ve bilgi talep ediyorum." : "Segika hakkında bilgi ve demo talep ediyorum."), ""];
      f.querySelectorAll("input:not([type=checkbox]), select, textarea").forEach((el) => { const v = val("#" + CSS.escape(el.id)); if (el.id && v) lines.push(lab(el) + ": " + v); });
      lines.push("", "KVKK aydınlatma metnini okudum.");
      const href = "mailto:sgk@turksab.com?subject=" + encodeURIComponent(document.getElementById("kayit") ? "Segika ücretsiz kayıt ve bilgi talebi" : "Segika bilgi ve demo talebi") + "&body=" + encodeURIComponent(lines.join("\r\n"));
      const card = f.closest(".fcard"), ok = card && card.querySelector(".okbox");
      if (card && ok) { const again = ok.querySelector("[data-mail-again]"); if (again) again.href = href; card.classList.add("done"); ok.focus(); }
      if (f.dispatchEvent(new CustomEvent("segika:maildraft", { detail: href, cancelable: true }))) {
        try { sessionStorage.setItem("segika:draft", href); } catch (err) {}
        location.href = href;
        setTimeout(() => { location.assign(f.dataset.next || "tesekkurler.html"); }, 1200);
      }
    }));

    // Landing yapışkan CTA
    const sticky = document.querySelector(".sticky"), anchor = document.getElementById("kayit");
    if (sticky && anchor && "IntersectionObserver" in window) {
      b.classList.add("has-sticky");
      new IntersectionObserver(([e]) => sticky.classList.toggle("show", !e.isIntersecting)).observe(anchor);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
