/*
================================================================
 SIBERMU — JAVASCRIPT
 FILE     : script.js
 FUNGSI   : Interaksi, navigasi, animasi ringan
================================================================

 PANDUAN EDIT CEPAT
 ----------------------------------------------------------------
 01. ACTIVE NAVIGATION
 02. SMOOTH SCROLL
 03. SCROLL REVEAL
 04. CARD INTERACTION
 05. HERO DEVICE ANIMATION
 06. CURRENT YEAR
 07. SCROLL TO TOP
 08. HERO PARALLAX
 09. ACCESSIBILITY
 10. CONSOLE INFO

 CATATAN:
 - Website tetap berjalan tanpa framework.
 - Jika ingin menambah modal, slider, filter, atau menu mobile,
   tambahkan sebagai blok baru di bagian paling bawah.
 - Setiap fitur dibuat terpisah agar mudah dirawat.
================================================================
*/

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =========================================================
     01. ACTIVE NAVIGATION
     Menandai menu sesuai section yang sedang terlihat.
     --------------------------------------------------------- */
  const navLinks = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${id}`
      );
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveNav(visible.target.id);
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.05, 0.15, 0.3]
      }
    );

    sections.forEach(section => navObserver.observe(section));
  }

  /* =========================================================
     02. SMOOTH SCROLL
     Digunakan untuk tombol CTA dan seluruh anchor internal.
     --------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const navbar = document.querySelector(".navbar");
      const offset = navbar ? navbar.offsetHeight + 8 : 0;
      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      // Update URL tanpa reload halaman.
      history.replaceState(null, "", targetId);
    });
  });

  /* =========================================================
     03. SCROLL REVEAL
     Section/card muncul secara halus ketika masuk viewport.
     --------------------------------------------------------- */
  const revealItems = document.querySelectorAll(
    ".section-heading, .intro-card, .info-card, " +
    ".activity-list article, .aik-items > div, " +
    ".information-grid article, .about-final-card, " +
    ".highlight-card"
  );

  revealItems.forEach((item, index) => {
    item.classList.add("js-reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 35, 280)}ms`);
  });

  // CSS tambahan dibuat melalui JS agar tidak perlu mengubah style.css.
  const revealStyle = document.createElement("style");
  revealStyle.textContent = `
    .js-reveal {
      opacity: 0;
      transform: translateY(22px);
      transition:
        opacity .65s ease var(--reveal-delay, 0ms),
        transform .65s ease var(--reveal-delay, 0ms);
    }

    .js-reveal.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .js-reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  `;
  document.head.appendChild(revealStyle);

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  /* =========================================================
     04. CARD INTERACTION
     Kartu informasi dapat difokuskan dengan keyboard.
     --------------------------------------------------------- */
  const interactiveCards = document.querySelectorAll(
    ".intro-card, .info-card, .information-grid article"
  );

  interactiveCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });

  /* =========================================================
     05. HERO DEVICE MICRO ANIMATION
     Gerakan sangat ringan agar mockup terasa hidup.
     Tidak berjalan jika user memilih reduced motion.
     --------------------------------------------------------- */
  const device = document.querySelector(".device");
  const heroVisual = document.querySelector(".hero-visual");

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (device && heroVisual && !reduceMotion) {
    heroVisual.addEventListener("mousemove", (event) => {
      // Hanya aktif pada pointer yang benar-benar presisi.
      if (event.pointerType && event.pointerType !== "mouse") return;

      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      const rotateY = x * 5;
      const rotateX = y * -3;

      device.style.transform =
        `perspective(700px) rotateY(${-8 + rotateY}deg) rotateX(${3 + rotateX}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      device.style.transform =
        "perspective(700px) rotateY(-8deg) rotateX(3deg)";
    });
  }

  /* =========================================================
     06. CURRENT YEAR
     Menjaga footer otomatis mengikuti tahun.
     Brief lomba sendiri menggunakan tahun 2026, sehingga
     teks 2026 tetap dipertahankan bila sudah tertulis.
     --------------------------------------------------------- */
  const footerYear = document.querySelector(".footer-copy span");
  if (footerYear && footerYear.textContent.includes("2026")) {
    footerYear.textContent = "© 2026 SiberMu";
  }

  /* =========================================================
     07. SCROLL TO TOP
     Tombol dibuat otomatis dan baru muncul setelah scroll.
     --------------------------------------------------------- */
  const topButton = document.createElement("button");
  topButton.type = "button";
  topButton.className = "scroll-top";
  topButton.setAttribute("aria-label", "Kembali ke atas");
  topButton.innerHTML = "↑";

  const topStyle = document.createElement("style");
  topStyle.textContent = `
    .scroll-top {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 120;
      width: 40px;
      height: 40px;
      border: 1px solid #dbe7f3;
      border-radius: 12px;
      background: #fff;
      color: #1766d9;
      font: 800 16px/1 Inter, Arial, sans-serif;
      box-shadow: 0 12px 28px rgba(18, 59, 99, .14);
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transform: translateY(10px);
      transition: .25s ease;
    }

    .scroll-top.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .scroll-top:hover {
      transform: translateY(-3px);
      background: #1766d9;
      color: #fff;
    }

    @media (max-width: 560px) {
      .scroll-top {
        right: 16px;
        bottom: 16px;
        width: 38px;
        height: 38px;
      }
    }
  `;
  document.head.appendChild(topStyle);
  document.body.appendChild(topButton);

  const toggleTopButton = () => {
    topButton.classList.toggle("show", window.scrollY > 500);
  };

  window.addEventListener("scroll", toggleTopButton, { passive: true });
  toggleTopButton();

  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    history.replaceState(null, "", "#beranda");
    setActiveNav("beranda");
  });

  /* =========================================================
     08. SIMPLE PARALLAX UNTUK ELEMEN HERO
     --------------------------------------------------------- */
  const circles = document.querySelectorAll(".circle");
  const glow = document.querySelector(".glow");

  if (!reduceMotion) {
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, 500);

      circles.forEach((circle, index) => {
        const amount = index === 0 ? y * 0.025 : y * -0.018;
        circle.style.marginTop = `${amount}px`;
      });

      if (glow) {
        glow.style.transform = `translateY(${y * 0.04}px)`;
      }
    }, { passive: true });
  }

  /* =========================================================
     09. ACCESSIBILITY
     Tombol/link yang menggunakan fokus keyboard diberi
     penanda visual.
     --------------------------------------------------------- */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  const accessibilityStyle = document.createElement("style");
  accessibilityStyle.textContent = `
    .keyboard-navigation a:focus-visible,
    .keyboard-navigation button:focus-visible {
      outline: 3px solid rgba(23, 102, 217, .35);
      outline-offset: 3px;
      border-radius: 8px;
    }
  `;
  document.head.appendChild(accessibilityStyle);

  /* =========================================================
     10. CONSOLE INFO
     --------------------------------------------------------- */
  console.log(
    "%cSIBERMU%c — Kemahasiswaan & AIK",
    "font-weight:900;color:#1766d9;",
    "font-weight:700;color:#173655;"
  );
});
