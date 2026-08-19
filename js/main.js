// =========================================================
// This file is shared across every page on the site (the
// library homepage and every individual book page).
//
// Each book page sets its own PDF path directly in its HTML,
// e.g. <a href="assets/ebook.pdf" download> — because every
// book has a different PDF. There is no single global PDF_URL
// here on purpose: with more than one book, a shared constant
// would point every download button at the same file.
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.classList.toggle("is-active", isOpen);
    });

    // Close mobile menu after a nav link is tapped
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scroll reveal animation ----
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  // ---- Header shadow on scroll ----
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8 ? "0 4px 20px rgba(15,29,51,0.08)" : "none";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Simple download confirmation (optional, non-blocking UX touch) ----
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener("click", () => {
      link.classList.add("is-downloading");
      window.setTimeout(() => link.classList.remove("is-downloading"), 1200);
    });
  });

});
