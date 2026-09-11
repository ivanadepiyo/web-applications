/* =====================================================
   SIBERMU CONNECT
   Main JavaScript
   Fitur:
   1. Tahun footer otomatis
   2. Header berubah saat scroll
   3. Menu mobile
   4. Navigasi aktif
   5. Animasi reveal
   6. Counter statistik
   7. Filter kegiatan
   8. Modal detail
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     1. ELEMENT REFERENCES
  ========================== */
  const siteHeader = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealElements = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll("[data-counter]");
  const filterButtons = document.querySelectorAll(".filter-button");
  const activityCards = document.querySelectorAll(".activity-card");

  const detailModal = document.getElementById("detailModal");
  const modalClose = document.getElementById("modalClose");
  const modalAction = document.getElementById("modalAction");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const detailButtons = document.querySelectorAll(".detail-button");

  /* =========================
     2. FOOTER YEAR
  ========================== */
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  /* =========================
     3. HEADER ON SCROLL
  ========================== */
  const updateHeader = () => {
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", updateHeader);
  updateHeader();

  /* =========================
     4. MOBILE MENU
  ========================== */
  const closeMobileMenu = () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  /* =========================
     5. ACTIVE NAVIGATION
  ========================== */
  const updateActiveNav = () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  /* =========================
     6. REVEAL ANIMATION
  ========================== */
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));

  /* =========================
     7. STAT COUNTERS
  ========================== */
  let countersStarted = false;

  const animateCounters = () => {
    if (countersStarted) return;
    countersStarted = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.counter);
      let current = 0;
      const duration = 1000;
      const stepTime = Math.max(Math.floor(duration / target), 40);

      const timer = setInterval(() => {
        current += 1;
        counter.textContent = current;

        if (current >= target) {
          clearInterval(timer);
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector(".stats-grid");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    },
    { threshold: 0.4 }
  );

  if (statsSection) counterObserver.observe(statsSection);

  /* =========================
     8. FILTER KEGIATAN
  ========================== */
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      activityCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  /* =========================
     9. MODAL DETAIL
  ========================== */
  const openModal = (title, content) => {
    modalTitle.textContent = title;
    modalContent.textContent = content;
    detailModal.classList.add("show");
    detailModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    detailModal.classList.remove("show");
    detailModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.title, button.dataset.content);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalAction.addEventListener("click", closeModal);

  detailModal.addEventListener("click", (event) => {
    if (event.target === detailModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});
