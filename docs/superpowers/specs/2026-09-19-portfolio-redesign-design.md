# Portfolio redesign design

## Goal

Create a developer-first portfolio for Dhairya Saluja that feels personal,
confident, and visually distinctive while remaining easy to understand and
edit with basic HTML, CSS, and JavaScript knowledge. The current website must
remain unchanged.

## Scope and isolation

The redesign will live entirely inside `portfolio-redesign/`. It will contain
its own HTML, CSS, JavaScript, fonts, and image copies so it has no runtime
dependency on the current website. No existing site file will be edited.

Planned structure:

```text
portfolio-redesign/
  index.html
  projects.html
  style.css
  scripts.js
  README.md
  fonts/
  images/
```

The site will use no framework or build step. It should work by opening
`index.html` directly and when served by a basic static server.

## Creative direction: Developer's Workbench

The portfolio presents Dhairya as a young developer who learns by making.
Development is the primary story; boxing appears later as the personal detail
that makes the portfolio memorable.

The visual language is precise and work-in-progress rather than corporate:
large type, clear project metadata, deliberate alignment, visible structure,
and concise copy. The single memorable gesture is a modular hero composition
that combines a large statement, a portrait, and a small live status panel.
The rest of the page stays calm.

### Color tokens

- `paper` — `#E9EDF2`, a cool light-grey canvas
- `ink` — `#11151C`, primary text and dark surfaces
- `cobalt` — `#244BFF`, primary action and focus color
- `burgundy` — `#7A2938`, restrained boxing accent
- `steel` — `#AAB3C0`, rules and secondary UI
- `white` — `#FDFEFF`, high-contrast text on dark areas

No decorative gradients are planned. Color will communicate section identity,
focus, and interactive state.

### Typography

- Local SF Pro Display for navigation, body copy, metadata, and large display
  type.
- Local Junicode for short reflective lines or pull quotes only.
- Left-aligned content with short line lengths and a fluid type scale.
- Sentence case labels; no repeated all-caps eyebrows or ornamental numbering.

### Layout

Desktop uses an asymmetric 12-column grid. Mobile collapses to a single column
without changing the content order.

```text
+------------------------------------------------------------+
| DS          Work  About  Boxing                    Contact |
+------------------------------------------------------------+
| I build things while        | portrait                    |
| learning how they work.     | + current status            |
| [See my work]               |                             |
+------------------------------------------------------------+
| Selected work                                             |
| Project title       description             status/tools |
| Project title       description             status/tools |
+------------------------------------------------------------+
| Toolkit / learning now / small principles                 |
+------------------------------------------------------------+
| boxing photograph       short personal story              |
+------------------------------------------------------------+
| contact statement                         GitHub / email   |
+------------------------------------------------------------+
```

## Pages and components

### Home page

1. Fixed navigation with an accessible mobile menu.
2. Hero with concise developer-first statement, portrait, location, and current
   learning status.
3. Selected work list containing Weyn, this portfolio, and the TodoList app.
4. Toolkit section grouping familiar tools and skills currently being learned.
5. Boxing feature using an existing photograph and a burgundy color shift.
6. Direct contact section and compact footer.

### Projects page

The projects page expands the same project data into readable project entries.
It will use the same navigation, type system, and footer rather than a separate
visual style. Links will clearly distinguish available work from projects that
are on hold or not publicly deployed.

### JavaScript behavior

JavaScript stays small and readable:

- mobile navigation toggle with `aria-expanded` state;
- current year insertion;
- IntersectionObserver-based reveal for a small number of grouped elements;
- active navigation state based on the visible section;
- progressive enhancement so all content remains usable if JavaScript fails.

Animations will respect `prefers-reduced-motion`. No smooth-scroll dependency,
custom cursor, canvas, or animation library will be used.

## Content approach

Existing facts, links, and project names will be preserved. Copy will be
rewritten for spelling, clarity, and confidence without pretending Dhairya has
professional experience he has not claimed. Age will not be emphasized in the
hero; the story will focus on curiosity, making, and learning in public.

## Accessibility and resilience

- Semantic headings, landmarks, buttons, and lists.
- Visible focus states and sufficient color contrast.
- Descriptive alternative text for meaningful images.
- Navigation remains usable on keyboard and touch.
- Layout works from 320px phones through wide desktops.
- External links opening a new tab include safe `rel` attributes.
- Missing images do not hide essential project information.

## Verification

The finished redesign will be checked by:

1. validating that only the new folder and design documentation were changed;
2. reviewing HTML structure and links;
3. running a local static server and checking for console errors;
4. capturing desktop and mobile screenshots;
5. visually reviewing spacing, hierarchy, overflow, and image cropping;
6. testing keyboard navigation, the mobile menu, reduced motion, and links.

## Out of scope

- Framework migration, package manager, or build tooling.
- CMS, backend, contact form submission, or analytics.
- Invented project metrics, client claims, or fake testimonials.
- Changes to the existing portfolio outside the new redesign folder and this
  specification.
