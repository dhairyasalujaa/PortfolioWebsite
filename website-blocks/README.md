# Website blocks

Thirty-six responsive, framework-free website sections in four visual styles.

## Browse

Open `index.html`, or run the local preview server:

```powershell
node website-blocks/tests/server.js
```

Then visit `http://127.0.0.1:4174/`.

## Use a block

1. Open a block from the catalogue.
2. Copy its whole folder into your project.
3. Replace content beside the `EDIT` comments in `index.html`.
4. Change colors and spacing under `/* EDIT: theme */` in `style.css`.
5. Duplicate repeated project, feature, or person elements when you need more.
6. Keep `script.js` beside the HTML when the block includes one.

Each block folder contains its own short README with specific editing and
accessibility notes. No package installation or build command is required.

## Check the library

```powershell
node website-blocks/tests/blocks.test.js
```
