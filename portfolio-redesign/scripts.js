const liveMenuControls =
  typeof document === "undefined"
    ? null
    : {
        toggle: document.querySelector(".nav-toggle"),
        nav: document.querySelector(".site-nav"),
      };

function setMenu(open, controls = liveMenuControls) {
  if (!controls?.toggle || !controls?.nav) return;

  controls.toggle.setAttribute("aria-expanded", String(open));
  controls.nav.setAttribute("aria-hidden", String(!open));
  controls.nav.classList.toggle("is-open", open);
}

function setCurrentYear(nodes, year = new Date().getFullYear()) {
  nodes.forEach((node) => {
    node.textContent = String(year);
  });
}

if (typeof document !== "undefined") {
  document.documentElement.classList.add("has-js");

  const toggle = liveMenuControls.toggle;
  const nav = liveMenuControls.nav;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  setCurrentYear(document.querySelectorAll("[data-year]"));

  if (toggle && nav) {
    if (window.innerWidth <= 760) {
      setMenu(false);
    } else {
      nav.setAttribute("aria-hidden", "false");
    }

    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a") && window.innerWidth <= 760) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        nav.classList.remove("is-open");
        nav.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "false");
      } else if (toggle.getAttribute("aria-expanded") !== "true") {
        nav.setAttribute("aria-hidden", "true");
      }
    });
  }

  const revealItems = document.querySelectorAll("[data-reveal]");

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.12 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sections = document.querySelectorAll("[data-section]");
  const sectionLinks = document.querySelectorAll("[data-nav-link]");

  if (sections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.navLink === visible.target.id);
        });
      },
      { rootMargin: "-28% 0px -55%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }
}

if (typeof module !== "undefined") {
  module.exports = { setMenu, setCurrentYear };
}
