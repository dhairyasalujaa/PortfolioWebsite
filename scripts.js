/* =============================================================================
   Dhairya Saluja — portfolio

   Three small behaviours, all of them optional: smooth scroll, scroll reveals,
   and a nav that gets out of the way. Nothing here is required to read the
   page — if this file fails to load, the CSS still renders everything visible.
   ========================================================================== */

// Anyone who has asked their OS to reduce motion gets none of this.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =============================================================================
   SMOOTH SCROLL
   Lenis comes from a CDN, so guard against it being blocked or offline —
   without it the browser falls back to `scroll-behavior: smooth` in the CSS.
   ========================================================================== */

if (!prefersReducedMotion && typeof Lenis === "function") {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/* =============================================================================
   SCROLL REVEAL
   Elements marked .reveal fade, unblur and lift into place once a fifth of
   them is on screen. Each one is unobserved after it fires so scrolling back
   up does not replay the animation — the page should settle after one read.
   ========================================================================== */

const revealTargets = document.querySelectorAll(".reveal");

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  // No observer support: show everything rather than leave it at opacity 0.
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

/* =============================================================================
   NAV HIDE ON SCROLL
   Hides on the way down, returns on the way up. The 80px offset stops it from
   flickering during the tiny scrolls that happen while the page is settling.
   ========================================================================== */

const nav = document.getElementById("nav");
const HIDE_AFTER = 80;
let lastScrollY = window.scrollY;

window.addEventListener(
  "scroll",
  () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    nav.classList.toggle("nav--hidden", scrollingDown && currentScrollY > HIDE_AFTER);
    lastScrollY = currentScrollY;
  },
  { passive: true },
);
