const liveControls = typeof document === "undefined" ? null : {
  toggle: document.querySelector(".studio-nav__toggle"),
  nav: document.querySelector(".studio-nav__links"),
};

function setStudioMenu(open, controls = liveControls) {
  if (!controls?.toggle || !controls?.nav) return;
  controls.toggle.setAttribute("aria-expanded", String(open));
  controls.nav.setAttribute("aria-hidden", String(!open));
  controls.nav.classList.toggle("is-open", open);
}

if (typeof document !== "undefined" && liveControls.toggle && liveControls.nav) {
  liveControls.toggle.addEventListener("click", () => {
    setStudioMenu(liveControls.toggle.getAttribute("aria-expanded") !== "true");
  });
}

if (typeof module !== "undefined") module.exports = { setStudioMenu };
