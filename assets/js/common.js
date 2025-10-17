function initCommonJS() {
  // =========================
  // 1️⃣ Highlight Active Nav Link
  // =========================
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("text-primary");
    } else {
      link.classList.remove("text-primary");
    }
  });

  // =========================
  // 2️⃣ Sticky Header Shadow on Scroll
  // =========================
  const header = document.getElementById("siteHeader");
  if (header) {
    const toggleHeaderShadow = () => {
      if (window.scrollY > 4) header.classList.add("elevate");
      else header.classList.remove("elevate");
    };
    toggleHeaderShadow();
    window.addEventListener("scroll", toggleHeaderShadow);
  }

  // =========================
  // 3️⃣ Mobile Menu Toggle
  // =========================
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  if (mobileBtn && mobileMenu) {
    // Remove previous listener (if any)
    mobileBtn.replaceWith(mobileBtn.cloneNode(true));
    const newBtn = document.getElementById("mobileMenuBtn");

    newBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("hidden") === false;
      newBtn.setAttribute("aria-expanded", open ? "true" : "false");
      document.documentElement.classList.toggle("no-scroll", open);
    });
  }

  // =========================
  // 4️⃣ Hero Slider (Homepage Only)
  // =========================
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const bars = Array.from(document.querySelectorAll(".bar .progress-bar"));

  if (slides.length && bars.length) {
    let current = 0;
    const DURATION = 5000; // 5 seconds per slide
    let timer;

    // Keep all bars visible always
    bars.forEach((bar) => {
      bar.style.width = "100%";
      bar.style.opacity = "1";
      bar.style.backgroundColor = "rgba(255,255,255,0.4)";
    });

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
        slide.style.zIndex = i === index ? "1" : "0";
      });
      bars.forEach((bar, i) => {
        bar.style.backgroundColor =
          i === index ? "#F33FA2" : "rgba(255,255,255,0.4)";
      });
    }

    function nextSlide() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    function startSlider() {
      clearInterval(timer);
      showSlide(current);
      timer = setInterval(nextSlide, DURATION);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) clearInterval(timer);
      else startSlider();
    });

    startSlider();
  }
}

// ✅ Initialize immediately if DOM is already loaded
document.addEventListener("DOMContentLoaded", initCommonJS);
