/* Plain JavaScript. The page content remains usable without this file. */
(() => {
  'use strict';
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const canvas = document.getElementById('background');
  const context = canvas.getContext('2d');
  let paused = motionPreference.matches;
  let animationFrame = 0;
  let width = 0;
  let height = 0;
  let elapsed = 0;
  let lastFrame = 0;

  function drawBackground() {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    // A morphing interference field: curved filaments with travelling light.
    const time = elapsed * .00009;
    context.lineWidth = .7;
    for (let family = 0; family < 2; family++) {
      for (let line = -10; line < 40; line++) {
        const phase = line * .095 + family * 2.1;
        const points = [];
        context.beginPath();
        for (let step = 0; step <= 80; step++) {
          const t = step / 80;
          const y = t * (height + 100) - 50;
          const envelope = Math.sin(t * Math.PI);
          const x = line * width / 29
            + Math.sin(t * 5.5 + time + phase) * width * .16
            + Math.cos(t * 9 - time * .55 + phase * .7) * width * .055 * envelope
            + (family ? Math.sin(t * 4 + time * .35) * width * .12 : 0);
          points.push([x, y]);
          if (!step) context.moveTo(x, y); else context.lineTo(x, y);
        }
        context.strokeStyle = `rgba(255,255,255,${family ? .075 : .16})`;
        context.stroke();
        // A few moving highlights make the geometry legible without flashing.
        if (line % 4 === 0) {
          const travel = ((elapsed * .000025 + line * .137 + family * .3) % 1 + 1) % 1;
          const index = Math.floor(travel * 79);
          const fraction = travel * 79 - index;
          const x = points[index][0] + (points[index + 1][0] - points[index][0]) * fraction;
          const y = points[index][1] + (points[index + 1][1] - points[index][1]) * fraction;
          const alpha = Math.sin(travel * Math.PI) * .65;
          context.fillStyle = `rgba(255,255,255,${alpha})`;
          context.beginPath();context.arc(x,y,1.3,0,Math.PI*2);context.fill();
        }
      }
    }
  }

  function frame(timestamp) {
    animationFrame = 0;
    if (paused || document.hidden) return;
    // Cap at 30fps: ample for ambient motion, with less battery use.
    if (timestamp - lastFrame >= 32) {
      elapsed += Math.min(timestamp - lastFrame, 64);
      lastFrame = timestamp;
      drawBackground();
    }
    animationFrame = requestAnimationFrame(frame);
  }

  function updateAnimation() {
    cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    drawBackground();
    if (context && !paused && !document.hidden) animationFrame = requestAnimationFrame(frame);
  }

  function resizeBackground() {
    width = innerWidth;
    height = innerHeight;
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    if (context) context.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawBackground();
  }

  if (context) {
    resizeBackground();
    updateAnimation();
    addEventListener('resize', resizeBackground, { passive: true });
    motionPreference.addEventListener('change', event => { paused = event.matches; updateAnimation(); });
    document.addEventListener('visibilitychange', updateAnimation);
  }

  function validateActivity(payload) {
    if (!Array.isArray(payload.contributions) || !payload.contributions.length) throw new Error('Missing activity');
    const days = payload.contributions.map(day => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) throw new Error('Invalid activity');
      return { date: day.date, count: day.count, level: day.level };
    }).sort((a, b) => a.date.localeCompare(b.date));
    days.forEach((day, index) => {
      const date = Date.parse(`${day.date}T00:00:00Z`);
      if (!Number.isFinite(date) || new Date(date).toISOString().slice(0, 10) !== day.date) throw new Error('Invalid date');
      if (index && date - Date.parse(`${days[index - 1].date}T00:00:00Z`) !== 86400000) throw new Error('Non-consecutive activity');
    });
    return days.slice(-366);
  }

  function renderActivity(days, snapshot) {
    const leading = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const weeks = Math.ceil((days.length + leading) / 7);
    const calendar = document.createElement('div');
    calendar.className = 'calendar';
    calendar.style.setProperty('--weeks', weeks);
    const months = document.createElement('div');
    months.className = 'calendar-months';
    months.setAttribute('aria-hidden', 'true');
    const main = document.createElement('div');
    main.className = 'calendar-main';
    const labels = document.createElement('div');
    labels.className = 'calendar-days';
    labels.setAttribute('aria-hidden', 'true');
    ['', 'Mon', '', 'Wed', '', 'Fri', ''].forEach(text => {
      const label = document.createElement('span');
      label.textContent = text;
      labels.append(label);
    });
    const grid = document.createElement('div');
    grid.className = 'calendar-grid';
    grid.setAttribute('role', 'list');
    grid.setAttribute('aria-label', 'Daily GitHub contributions');
    for (let i = 0; i < leading; i++) {
      const blank = document.createElement('span');
      blank.className = 'contribution empty';
      blank.setAttribute('aria-hidden', 'true');
      grid.append(blank);
    }
    let lastMonth = -1;
    let lastLabelColumn = -4;
    let total = 0;
    days.forEach((day, index) => {
      total += day.count;
      const date = new Date(`${day.date}T00:00:00Z`);
      const column = Math.floor((index + leading) / 7) + 1;
      if (date.getUTCMonth() !== lastMonth) {
        if (column - lastLabelColumn >= 3) {
          const label = document.createElement('span');
          label.textContent = date.toLocaleDateString('en', { month: 'short', timeZone: 'UTC' });
          label.style.gridColumn = `${column} / span ${Math.min(3, weeks - column + 1)}`;
          months.append(label);
          lastLabelColumn = column;
        }
        lastMonth = date.getUTCMonth();
      }
      const cell = document.createElement('span');
      cell.className = 'contribution';
      cell.dataset.level = day.level;
      const description = `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${date.toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}`;
      cell.title = description;
      cell.setAttribute('role', 'listitem');
      cell.setAttribute('aria-label', description);
      grid.append(cell);
    });
    main.append(labels, grid);
    calendar.append(months, main);
    document.getElementById('contribution-calendar').replaceChildren(calendar);
    const scrollRegion = document.querySelector('.activity-scroll');
    scrollRegion.scrollLeft = scrollRegion.scrollWidth;
    let hint = document.querySelector('.calendar-hint');
    if (!hint) {
      hint = document.createElement('p');
      hint.className = 'calendar-hint';
      hint.textContent = 'Scroll to explore the year';
      scrollRegion.after(hint);
    }
    const strong = document.createElement('strong');
    strong.textContent = total.toLocaleString('en');
    document.getElementById('activity-summary').replaceChildren(strong, document.createTextNode(` contributions ${snapshot ? 'in the saved period' : days.length >= 365 ? 'in the last year' : 'in this period'}`));
    document.getElementById('activity-source').textContent = snapshot ? 'SAVED SNAPSHOT' : 'GITHUB ACTIVITY';
    const range = `${days[0].date} — ${days[days.length - 1].date}`;
    document.getElementById('activity-note').textContent = snapshot ? `Saved through ${days[days.length - 1].date}. Live activity is unavailable.` : `${range} · via GitHub Contributions API`;
    calendar.setAttribute('aria-label', `GitHub activity, ${range}`);
  }

  async function fetchActivity(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`Activity request: ${response.status}`);
      return validateActivity(await response.json());
    } finally { clearTimeout(timeout); }
  }

  async function loadActivity() {
    try {
      renderActivity(await fetchActivity('https://github-contributions-api.jogruber.de/v4/dhairyasalujaa?y=last'), false);
    } catch {
      try { renderActivity(await fetchActivity('assets/github-activity.json'), true); }
      catch {
        document.getElementById('activity-source').textContent = 'UNAVAILABLE';
        document.getElementById('activity-note').textContent = 'Couldn’t load the calendar. You can still view my activity on GitHub.';
      }
    }
  }
  loadActivity();
})();
