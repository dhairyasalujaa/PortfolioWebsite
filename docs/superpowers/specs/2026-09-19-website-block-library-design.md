# Website block library design

## Goal

Create a reusable library of 36 polished website sections for a developer who
is comfortable with HTML and CSS and has basic JavaScript knowledge. Every
block must be understandable, independently copyable, responsive, accessible,
and free of framework or build-tool dependencies.

## Scope and isolation

The library will live entirely in `website-blocks/`. It will not modify or
depend on the root portfolio, `portfolio-redesign/`, `.claude/`, or `v2/`.

```text
website-blocks/
  index.html
  catalog.css
  catalog.js
  README.md
  tests/
    blocks.test.js
    server.js
  blocks/
    01-studio-navigation/
      index.html
      style.css
      script.js          # only when interaction is required
      README.md
    ...
    36-editorial-contact-form/
      index.html
      style.css
      README.md
  demos/
    studio.html
    brutal.html
    product.html
    editorial.html
```

Every block folder is self-contained. Copying that folder into another static
site is enough to run it. Blocks will not import a shared stylesheet, package,
font, image, icon library, or remote script.

Every block also includes a concise `README.md`. It explains what the block is
for, which files to copy, the first content and theme values to edit, whether
JavaScript is required, how to add or remove repeated items, and any important
accessibility behavior. The instructions must be usable by someone with basic
HTML and CSS knowledge and must never assume a package manager or terminal
workflow.

## Research direction

The organization follows the strengths of established component libraries:
clear categories, live previews, independently copyable examples, responsive
defaults, and framework-free code. The visual designs will be original rather
than copied from a specific reference.

## Collection structure

### Core style packs: 28 blocks

Each style pack contains the same seven practical sections so a developer can
combine them into a coherent site or mix them with blocks from another pack.

#### Minimal studio

Cool neutrals, precise spacing, strong typography, square corners, and fine
rules. Suitable for portfolios, studios, architects, and professional services.

1. `01-studio-navigation`
2. `02-studio-hero`
3. `03-studio-projects`
4. `04-studio-features`
5. `05-studio-social-proof`
6. `06-studio-contact-cta`
7. `07-studio-footer`

#### Bold brutalist

Black, white, and signal red; heavy borders, oversized type, offset elements,
and direct copy. Suitable for creative portfolios, events, music, and youth
brands.

8. `08-brutal-navigation`
9. `09-brutal-hero`
10. `10-brutal-projects`
11. `11-brutal-features`
12. `12-brutal-social-proof`
13. `13-brutal-contact-cta`
14. `14-brutal-footer`

#### Soft product

Quiet lavender, mint, ink, and white; gentle radii, comfortable spacing, and
friendly product-focused copy. Suitable for apps, tools, small SaaS products,
and community sites.

15. `15-product-navigation`
16. `16-product-hero`
17. `17-product-projects`
18. `18-product-features`
19. `19-product-social-proof`
20. `20-product-contact-cta`
21. `21-product-footer`

#### Dark editorial

Charcoal, ivory, and burgundy; serif/sans contrast, asymmetric composition,
large imagery placeholders, and restrained motion. Suitable for magazines,
photographers, fashion, films, and premium portfolios.

22. `22-editorial-navigation`
23. `23-editorial-hero`
24. `24-editorial-projects`
25. `25-editorial-features`
26. `26-editorial-social-proof`
27. `27-editorial-contact-cta`
28. `28-editorial-footer`

### Specialty blocks: 8 blocks

29. `29-studio-pricing` — clear three-tier comparison
30. `30-editorial-pricing` — premium two-offer presentation
31. `31-product-faq` — soft accordion with JavaScript
32. `32-brutal-faq` — high-contrast native disclosure list
33. `33-studio-team` — compact team grid
34. `34-brutal-stats` — oversized statistics band
35. `35-product-newsletter` — email signup presentation
36. `36-editorial-contact-form` — atmospheric contact form

## Block anatomy

Each `index.html` will include:

- a complete HTML document so it can be opened directly;
- semantic landmarks and heading order;
- the block inside a clearly named root class such as `.studio-hero`;
- `<!-- EDIT: ... -->` comments around the text, links, and repeated items most
  likely to be changed;
- explicit labels for form fields and accessible names for icon-only controls;
- no fake testimonials attributed to real people and no invented performance
  claims;
- a relative link to the block's own stylesheet and optional script only.

Each `style.css` will include:

- a short theme token section at the top marked `/* EDIT: theme */`;
- locally scoped selectors beneath the block root class;
- fluid type and spacing with `clamp()` where useful;
- a mobile breakpoint at 720px;
- visible keyboard focus and sufficient contrast;
- reduced-motion handling whenever the block animates;
- no selectors that depend on the catalogue.

Interactive blocks may use an optional `script.js`. JavaScript will only power
mobile menus and the product FAQ accordion. Content must remain readable when
JavaScript is unavailable.

## Placeholder media

Blocks will not depend on stock-photo websites. Image-led sections will use
inline SVG placeholder artwork or CSS-only compositions with visible
`Replace this artwork` comments. A user can swap the SVG for an `<img>` without
changing the surrounding layout.

## Catalogue

`website-blocks/index.html` will be a polished visual product rather than a
plain file index or code editor. Its design direction is a crisp, dark-neutral
workspace with bright color used only to identify the four style families. It
will use strong typography, deliberate spacing, compact filtering controls,
and preview compositions that make the library enjoyable to browse without
competing with the blocks themselves.

It will contain:

- a focused opening statement and a clear `36 blocks` library count;
- a sticky filter bar for All, Studio, Brutal, Product, Editorial, and
  Specialty, plus text search by block name or purpose;
- four style-family introductions with palette swatches and links to complete
  assembled demo pages;
- 36 deliberately composed preview cards containing a CSS-rendered miniature,
  block name, purpose, style, required files, and a direct `Open preview` link;
- a short explanation of how to copy and customize a block;
- a visible result count and friendly empty-search state;
- keyboard-operable filters, clear active states, and mobile navigation;
- no embedded iframes, syntax highlighter, package dependency, or copy-to-
  clipboard feature.

The catalogue has its own visual system so it does not favor one block style.
Its CSS miniature previews will represent each layout honestly without loading
36 full pages at once. The catalogue will be browser-reviewed at the same
desktop and mobile sizes as the components.

## Quality bar

The blocks must feel designed, not merely complete. Each one must have a clear
visual idea, useful hierarchy, credible real-world sample copy, and a reason for
every border, color, and interaction. Variants must differ in composition and
behavior as well as palette; changing only colors does not count as a distinct
style.

Quality checks include:

- avoid generic repeated-card layouts when another structure communicates the
  content better;
- keep body copy readable and avoid decorative labels that add no meaning;
- use one memorable visual gesture per block and keep the remaining details
  restrained;
- verify hover, focus, active, empty, and expanded states wherever they apply;
- ensure placeholder content is believable but clearly replaceable;
- keep CSS selectors understandable and prevent specificity conflicts;
- ensure each block looks intentional at desktop, tablet, and phone widths;
- critique every block against the style definition before accepting it.

The seven core blocks in each style pack will also be assembled into a complete
demo page under `demos/`. These four pages prove that navigation, spacing,
colors, heading scale, and section transitions work together as a real website.
They are verification artifacts and examples, not additional blocks in the
36-block count.

## Editing workflow

The README will teach the intended workflow:

1. Open the catalogue and select a block.
2. Copy the entire block folder into a project.
3. Replace text and links between the `EDIT` comments.
4. Change theme variables at the top of `style.css`.
5. Copy repeated HTML items to add more projects, features, or people.
6. Keep the optional script beside the HTML when using a mobile menu or FAQ.

The guide will include one concrete customization example using the studio hero
without introducing build tools.

Each block-level README will use the same short structure:

1. `Use it for` — the appropriate website and content type.
2. `Files` — required HTML, CSS, and optional JavaScript.
3. `Edit first` — exact comments, CSS variables, and repeated elements.
4. `Behavior` — mobile or accordion interaction, when present.
5. `Accessibility` — labels, heading level, alternative text, and focus notes.

## Responsive and accessibility requirements

- Layouts support 320px phones through wide desktop screens.
- No horizontal page overflow at 320px, 390px, 768px, or 1440px.
- Interactive targets are at least 44px in their smallest dimension.
- Menus expose `aria-expanded`; accordions use buttons and controlled panels.
- Forms use associated labels, useful autocomplete attributes, and clear focus
  states.
- Motion is optional, purposeful, and disabled under
  `prefers-reduced-motion: reduce`.
- All blocks remain readable when JavaScript is disabled.

## Verification

Automated checks will verify:

- exactly 36 numbered block directories exist;
- every directory contains non-empty `index.html`, `style.css`, and `README.md`
  files;
- every HTML file has a viewport meta tag, an appropriate semantic root
  landmark, a root block class, an `EDIT` marker, and no parent-folder or remote
  runtime dependency;
- every stylesheet has theme variables, focus styling, a 720px breakpoint,
  and selectors scoped to its block root;
- optional JavaScript files pass `node --check`;
- all 36 catalogue links resolve to successful HTTP responses;
- catalogue filters and search update the visible result count and empty state;
- all four assembled demo pages resolve successfully and contain exactly seven
  core sections from their corresponding style pack.

Browser verification will cover the full catalogue, all four assembled demo
pages, and every block at either desktop or mobile size. Representative blocks
from each style will be checked at all three target sizes: 1440 × 1000,
390 × 844, and 320 × 800. Interactive menus, the FAQ, keyboard focus order,
reduced motion, console output, missing assets, section compatibility, and
overflow will be checked directly.

## Out of scope

- React, Vue, Tailwind, Bootstrap, npm packages, or a build process.
- A drag-and-drop page builder or in-browser code editor.
- Backend form submission, authentication, payments, or database logic.
- Copying proprietary source code or duplicating a referenced design.
- Changes outside `website-blocks/` and this design documentation.
