/* =========================================================
   MAIN.JS – PRODUCTION SAFE (GITHUB PAGES READY)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= COUNTDOWN ================= */
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const eventDate = new Date("2026-02-28T23:59:59").getTime();

    setInterval(() => {
      const diff = eventDate - Date.now();

      if (diff <= 0) {
        countdownEl.textContent = "EVENT LIVE!";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  }

  /* ================= REVEAL ANIMATIONS ================= */
  document.querySelectorAll(
    ".reveal-logo, .reveal-title, .reveal-tagline, .reveal-countdown"
  ).forEach((el, i) => {
    setTimeout(() => el.classList.add("visible"), i * 250);
  });

  /* ================= UPSIDE DOWN SPORES ================= */
  const MAX_SPORES = 35;
  let activeSpores = 0;

  function createSpore() {
    if (activeSpores >= MAX_SPORES) return;

    activeSpores++;
    const spore = document.createElement("div");
    spore.className = "spore";
    spore.style.left = Math.random() * 100 + "vw";
    spore.style.animationDuration = 10 + Math.random() * 10 + "s";
    spore.style.opacity = 0.3 + Math.random() * 0.5;

    document.body.appendChild(spore);

    setTimeout(() => {
      spore.remove();
      activeSpores--;
    }, 22000);
  }

  let sporeInterval = setInterval(createSpore, 600);

  if (window.innerWidth < 768) {
    clearInterval(sporeInterval);
    sporeInterval = setInterval(createSpore, 1000);
  }

  /* ================= LIGHTNING ================= */
  function randomZigZag() {
    let points = ["50% 0%"];
    let x = 50;

    for (let i = 1; i <= 6; i++) {
      x += Math.random() * 30 - 15;
      x = Math.max(10, Math.min(90, x));
      points.push(`${x}% ${i * 15}%`);
    }

    points.push("50% 100%");
    return `polygon(${points.join(",")})`;
  }

  function createLightningBolt() {
    const container = document.getElementById("lightning-container");
    if (!container) return;

    const bolt = document.createElement("div");
    bolt.className = "lightning";
    bolt.style.left = Math.random() * 100 + "vw";
    bolt.style.clipPath = randomZigZag();

    container.appendChild(bolt);

    setTimeout(() => bolt.remove(), 400);
  }

  setInterval(createLightningBolt, 8000);

});

/* ================= UPSIDE DOWN ENTRY ================= */
const clockSound = new Audio("assets/vecna_s_clock.mp3");
clockSound.volume = 0.4;

function enterUpsideDown() {
  clockSound.currentTime = 0;
  clockSound.play().catch(() => {});
  document.body.classList.add("upside-down");

  setTimeout(() => {
    window.location.href = "events.html";
  }, 1500);
}
