const liveControls=typeof document==="undefined"?null:{toggle:document.querySelector(".brutal-nav__toggle"),nav:document.querySelector(".brutal-nav__links")};
function setBrutalMenu(open,controls=liveControls){if(!controls?.toggle||!controls?.nav)return;controls.toggle.setAttribute("aria-expanded",String(open));controls.nav.setAttribute("aria-hidden",String(!open));controls.nav.classList.toggle("is-open",open)}
if(typeof document!=="undefined"&&liveControls.toggle){liveControls.toggle.addEventListener("click",()=>setBrutalMenu(liveControls.toggle.getAttribute("aria-expanded")!=="true"))}
if(typeof module!=="undefined")module.exports={setBrutalMenu};

