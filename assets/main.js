/* =========================================================
   MAIN.JS – CLEAN & ERROR-FREE (STRANGER THINGS THEME)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= COUNTDOWN TIMER ================= */
   const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    const eventDate = new Date("2026-02-28T23:59:59").getTime();

    setInterval(() => {
      const now = Date.now();
      const diff = eventDate - now;

      if (diff <= 0) {
        countdownEl.textContent = "EVENT LIVE!";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.textContent =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  window.addEventListener("load", () => {
document.querySelectorAll(
    ".reveal-logo, .reveal-title, .reveal-tagline, .reveal-countdown"
  ).forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 250);
  });
});
  


  /* ================= HERO FADE-IN ================= */
  const title = document.querySelector(".fade-title");
  if (title) {
    title.getBoundingClientRect();
    setTimeout(() => title.classList.add("visible"), 1000);
  }

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

let sporeInterval=setInterval(createSpore, 600);

  /* ================= NETFLIX STYLE ROW SCROLL ================= */
  document.querySelectorAll(".st-row-wrapper").forEach(row => {
    let isScrolling = false;

    row.addEventListener("wheel", (e) => {
      e.preventDefault();

      if (isScrolling) return;
      isScrolling = true;

      row.scrollBy({
        left: e.deltaY * 1.2,
        behavior: "smooth"
      });

      setTimeout(() => isScrolling = false, 200);
    }, { passive: false });
  });
});


/* ================= STRANGER THINGS LIGHTNING ================= */

function randomZigZag() {
  let points = ["50% 0%"];
  let x = 50;

  for (let i = 1; i <= 6; i++) {
    x += (Math.random() * 30 - 15);
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
  bolt.classList.add(Math.random() > 0.5 ? "red" : "blue");

  bolt.style.left = Math.random() * 100 + "vw";
  bolt.style.clipPath = randomZigZag();

  container.appendChild(bolt);

  setTimeout(() => bolt.style.opacity = "1", 20);
  setTimeout(() => bolt.style.opacity = "0", 180);
  setTimeout(() => bolt.remove(), 400);
}

/* 5-second thunder storm burst */
let lightningActive = false;

function thunderStorm() {
  if (lightningActive) return;
  lightningActive = true;

  const storm = setInterval(() => {
    createLightningBolt();
  }, 350);

  setTimeout(() => {
    clearInterval(storm);
    lightningActive = false;
  }, 3000);
}
/* for phone effecf */
setInterval(thunderStorm, 8000);
const isMobile = window.innerWidth < 768;

if (isMobile) {
  clearInterval(sporeInterval);
  sporeInterval=setInterval(createSpore, 1000); // fewer spores
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    document.body.classList.add("effects-paused");
  } else {
    document.body.classList.remove("effects-paused");
  }
});

/* event scroll */
document.querySelectorAll(".event-cache").forEach(p => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  }, { threshold: 0.4 }).observe(p);
});

document.querySelectorAll(".st-row-wrapper").forEach(wrapper => {
  wrapper.addEventListener("wheel", (e) => {
    if (window.innerWidth < 768) return; // disable on mobile

    e.preventDefault();
    wrapper.scrollLeft += e.deltaY;
  }, { passive: false });
});

// ================= UPSIDE DOWN SOUND + ANIMATION =================
const clockSound = new Audio("assets/vecna_s_clock.mp3");
clockSound.volume = 0.4;
clockSound.preload = "auto";

function enterUpsideDown() {

  // Mark that audio should continue
  localStorage.setItem("playClock", "true");

  // Play sound
  clockSound.currentTime = 0;
  clockSound.play().catch(() => {});

  // Animation
  document.body.classList.add("upside-down");

  // Redirect
  setTimeout(() => {
    window.location.href = "events.html";
  }, 1800);
}

window.addEventListener("load", () => {
  const shouldPlay = localStorage.getItem("playClock");

  if (shouldPlay === "true") {
    const clockSound = new Audio("assets/vecna_s_clock.mp3");
    clockSound.volume = 0.4;
    clockSound.loop = true;

    clockSound.play().catch(() => {
      // fallback if browser blocks it
    });

    // Clear flag so it doesn't replay forever
    localStorage.removeItem("playClock");
  }
});
clockSound.volume = 0;
clockSound.play();

let v = 0;
const fade = setInterval(() => {
  v += 0.05;
  clockSound.volume = Math.min(v, 0.4);
  if (v >= 0.4) clearInterval(fade);
}, 100);

/* ================= MAX 3 EVENT CHECKBOX LIMIT ================= */
const MAX_EVENTS = 3;
  const eventCheckboxes = document.querySelectorAll('input[name="events"]');
  const eventCountSpan = document.getElementById("eventCount");

  function updateEventCount() {
    const checked = document.querySelectorAll('input[name="events"]:checked').length;
    eventCountSpan.textContent = checked;

    if (checked >= MAX_EVENTS) {
      eventCheckboxes.forEach(cb => { if (!cb.checked) cb.disabled = true; });
    } else {
      eventCheckboxes.forEach(cb => cb.disabled = false);
    }
  }

  eventCheckboxes.forEach(cb =>
    cb.addEventListener("change", updateEventCount)
  );

  /* ================= TEAM EVENTS ================= */
  document.querySelectorAll('input[data-team="true"]').forEach(cb => {

    const container = cb.closest("label").nextElementSibling;
    const min = Number(cb.dataset.min);
    const max = Number(cb.dataset.max);

    cb.addEventListener("change", () => {
      updateEventCount();

      if (!cb.checked) {
        container.style.display = "none";
        container.innerHTML = "";
        return;
      }

      container.style.display = "block";
      container.innerHTML = `
        <input type="text" placeholder="Team Name" required>

        <select class="team-size" required>
          <option value="" disabled selected>Select Team Size (${min}-${max})</option>
        </select>

        <h4 style="color:#ff1b1b;margin:8px 0;">Team Head Details</h4>
        <input type="text" placeholder="Team Head Name" required>
        <input type="email" placeholder="Email" required>
        <input type="tel" placeholder="Mobile" required>

        <div class="team-members"></div>
      `;

      const sizeSelect = container.querySelector(".team-size");
      const membersDiv = container.querySelector(".team-members");

      for (let i = min; i <= max; i++) {
        sizeSelect.innerHTML += `<option value="${i}">${i}</option>`;
      }

      sizeSelect.addEventListener("change", () => {
        membersDiv.innerHTML = "";
        const total = Number(sizeSelect.value);

        for (let i = 2; i <= total; i++) {
          membersDiv.innerHTML += `
            <input type="email" placeholder="Member ${i} Email" required>
            <input type="tel" placeholder="Member ${i} Mobile" required>
          `;
        }
      });
    });
  });

  /* ================= PAYMENT LOGIC ================= */
  const surprise = document.getElementById("surpriseEvent");
  const amountSpan = document.getElementById("payAmount");
  const paymentProof = document.getElementById("paymentProof");
  const form = document.querySelector("form");

  function updateAmount() {
    amountSpan.textContent = surprise && surprise.checked ? "₹200" : "₹150";
  }

  if (surprise) {
    surprise.addEventListener("change", updateAmount);
  }

  updateAmount();

  /* ================= FINAL FORM VALIDATION ================= */
  form.addEventListener("submit", (e) => {

    // Event selected?
    if (document.querySelectorAll('input[name="events"]:checked').length === 0) {
      e.preventDefault();
      alert("⚠️ Please select at least one event.");
      return;
    }

    // Team validation
    document.querySelectorAll('input[data-team="true"]:checked').forEach(cb => {
      const block = cb.closest("label").nextElementSibling;
      block.querySelectorAll("input, select").forEach(input => {
        if (!input.value) {
          e.preventDefault();
          alert("⚠️ Please complete all team details.");
          return;
        }
      });
    });

    // Payment proof
    if (!paymentProof.files || paymentProof.files.length === 0) {
      e.preventDefault();
      alert("⚠️ Please upload the payment screenshot.");
    }
  });



