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
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
