/* ============================================================
   scripts.js - one job: fade things in as they scroll into view.
   ============================================================ */

// 1. Grab every element in the page that has class="reveal".
//    querySelectorAll gives back a list you can loop over.
const revealItems = document.querySelectorAll(".reveal");

// 2. Does this person prefer less motion? If so, skip the animation
//    and just show everything straight away.
const prefersLessMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersLessMotion) {
  revealItems.forEach(function (item) {
    item.classList.add("is-visible");
  });
} else {
  // 3. An IntersectionObserver tells us when an element enters the
  //    screen. It is much cheaper than checking on every scroll event.
  const watcher = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // Reveal once, then stop watching that element.
          watcher.unobserve(entry.target);
        }
      });
    },
    {
      // Fire slightly before the element reaches the bottom edge,
      // so it is already fading in by the time you see it.
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    }
  );

  revealItems.forEach(function (item) {
    watcher.observe(item);
  });
}
