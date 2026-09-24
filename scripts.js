// lenis
const lenis = new Lenis({
  duration: 1,
  easing: (value) => Math.min(1, 1.001 - 2 ** (-10 * value)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  window.requestAnimationFrame(raf);
}

window.requestAnimationFrame(raf);

lenis.on("scroll", () => {
  const scrollIndicator = document.querySelector(".scroll-indicator");

  if (!scrollIndicator) {
    return;
  }

  scrollIndicator.style.transform = `translateX(${(lenis.scroll / lenis.scrollDistance) * 100}%)`;
});

// highlight the nav link for the section currently in view
const navLinks = document.querySelectorAll(".site-header nav a");
const sections = document.querySelectorAll("main > section");

function highlightSection(sectionId) {
  navLinks.forEach(function (link) {
    if (link.hash === "#" + sectionId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        highlightSection(entry.target.id);
      }
    });
  },
  // watch the area below the header, rather than the whole screen
  { rootMargin: "-15% 0px -45% 0px", threshold: 0 },
);

sections.forEach(function (section) {
  sectionObserver.observe(section);
});

// copy email, with a message if the browser blocks it
const copyButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

async function copyEmail() {
  try {
    await navigator.clipboard.writeText("dhairyarsaluja@gmail.com");
    copyStatus.textContent = "Email copied.";
  } catch (error) {
    copyStatus.textContent =
      "Select the email address to copy it, or click it to open your mail app.";
  }
}

copyButton.addEventListener("click", copyEmail);

// no need to change the footer every January
const year = document.getElementById("year");
year.textContent = new Date().getFullYear();
