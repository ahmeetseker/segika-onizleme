/* Segika küresi: React Bits "Crystalized Ball" (plasma ön ayarı), koyu Segika turuncusu.
   Noktalar Segika'nın "S" harfini oluşturur, üzerine gelince dağılır, çekilince noktalar tek tek S'ye toplanır (S dönmez); küre küçüldükçe nokta sayısı azalır.
   Bileşen assets/vendor/crystalized-ball/ altında (MIT + Commons Clause, telif notu dosyada). */
import { mountCrystalizedBall } from "./vendor/crystalized-ball/crystalized-ball.js?v=5";

// Nokta sayısı küre alanıyla orantılı: 600 px'te 15.000, küçükte en az 900
const COUNT = (px) => Math.max(900, Math.min(15000, Math.round(15000 * Math.pow(px / 600, 2))));

const OPTS = {
  preset: "plasma", color: "#C62638", size: 0.7, crackle: 0.6, fill: 0.5,
  interactive: true, hoverStrength: 0.6, strands: 6, flares: 0.4, glow: 0.5, sparks: 0.35,
  particleCount: COUNT, motion: "drift", particleShape: "square", depth: 0.4, sway: 0.25,
  twinkle: 0.4, haze: 0.45, dustSpeed: 1, speed: 1, intro: true, paused: false,
  letter: "S", letterFont: "Poppins, sans-serif", letterScale: 0.95, rimWhite: 0.3, returnSpeed: 1.5, formSeconds: 2, scatterSeconds: 0.7,
};

const kurulu = new Map();
const mount = () => document.querySelectorAll(".plasma-ball:not([data-pb])").forEach((el) => {
  el.dataset.pb = "1";
  const theme = document.documentElement.classList.contains("theme-light") ? "light" : "dark";
  try { kurulu.set(el, mountCrystalizedBall(el, { ...OPTS, theme })); } catch (e) { /* WebGL2 yoksa CSS yedeği görünür */ }
});
// Mod değişince küreleri yeni temayla yeniden kur
window.SegikaPlasma = { yenile() {
  kurulu.forEach((temizle, el) => { try { temizle && temizle(); } catch (e) {} delete el.dataset.pb; });
  kurulu.clear(); mount();
} };

// Harf maskesi Poppins ile çizildiği için yazı tipi yüklenince başlat
(document.fonts ? document.fonts.load('700 100px "Poppins"').catch(() => {}) : Promise.resolve()).then(mount);
