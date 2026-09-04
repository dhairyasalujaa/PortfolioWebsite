let projects = [
  "Weyn",
  "Portfolio",
  "Weather App",
  "This website",
  "Small Websites",
];
for (let i = 0; i < projects.length; i++) {
  console.log(projects[i]);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal, .reveal-group")
  .forEach((el) => observer.observe(el));

/* ===== NAV BACKGROUND =====

  The nav sits over the hero photo with no background of its own, and gains
  one once you have scrolled past the top. 40px is far enough down that a
  phone address bar settling on load does not flip it on its own. */

const nav = document.getElementById("nav");
const SOLID_AFTER = 40;

function syncNav() {
  nav.classList.toggle("scrolled", window.scrollY > SOLID_AFTER);
}

window.addEventListener("scroll", syncNav, { passive: true });

// Run once on load, since a reload can restore a scrolled position.
syncNav();
