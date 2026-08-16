# SVG to .aff Converter

## About Me

This is a lightweight, single-file web utility designed to convert SVG vector paths and shape files into Arcaea chart format (`.aff`) in real time. It features an interactive visual canvas preview, a built-in shape library, text-to-path generation, and a multi-layer workspace mode designed to separate and organize SVG elements quickly without exporting SVGs individually.

---

## Prominent Features 

* **Real-Time Visual Canvas:** See your shapes mapped instantly onto an Arcaea playfield grid[^1] with click-and-drag scaling, positioning, and panning.
* **Photoshop-Style Layers Mode:** Import several SVG files or make blank layers to handle vectors separately, with choices to export just the active layer or merge all visible layers together.
* **Text Vectorization & Shape Library:** Type custom text to turn fonts into arc paths automatically, or choose from a library of basic geometric shapes, arrows, and symbols.
* **Path Optimization:** Control sampling density and apply Ramer–Douglas–Peucker (RDP) simplification to eliminate extra control points, keeping chart line counts optimized.
* **Workflow Utilities:** Drag-and-drop file imports, keyboard nudging, full undo/redo history (`Ctrl+Z` / `Ctrl+Y`), autosaving to local storage, customizable UI themes, and colorblind mode support.

<small>(Images will come later)</small>

## How to Use it

1. Open the [SVG2AFF](https://jamesat.github.io/SVG2AFF)
2. Import an SVG, generate text paths, or pick a built-in shape preset.
3. Fine-tune scale, tilt, complexity, and offset using the visual canvas.
4. Click **Copy Output** to grab the generated `.aff` arc lines.
5. Paste the output into the raw text editing tab (< >) in ArcCreate or directly into your `.aff` chart file.

---

## Open Source Guideline & Usage

Since this project is contained within a single standalone HTML file, sharing or contributing to it is straightforward:

1. **Repository Setup:** Create a new public repository on GitHub and upload the HTML file as `index.html`.
2. **GitHub Pages:** Go to your repository **Settings > Pages**, set the source branch to `main` (or `master`), and save. GitHub will automatically host your tool live as a web app.
3. **Contributing / Editing:** Because there is no complex build step, bundler, or node module installation required, anyone can download the file, edit it in any text editor, and run it locally by double-clicking the file in a web browser.

---

## Disclaimer & AI Assistance Note

* **AI Assistance:** Portions of the code structure, layout layout logic, and feature enhancements for this project were developed with the assistance of AI tools. However, the code has been thoroughly tested, reviewed, and refined to ensure stability, proper layout constraints, and a bug-free user experience.
* **Trademark Notice:** This tool is an independent fan-made project and has no affiliation with, endorsement from, or association with **Arcaea** or **lowiro limited**. *Arcaea* is a registered trademark of lowiro limited.

## Credits & Acknowledgments

* **Target Chart Editor:** Designed for workflow integration with [ArcCreate](https://github.com/Arcthesia/ArcCreate) by Arcthesia.
* **Text-to-Path Engine:** Powered by [opentype.js](https://opentype.js.org/) by Frederik De Bleser.
* **Default Font:** Uses [Roboto Regular](https://fonts.google.com/specimen/Roboto) by Christian Robertson (Google Fonts).
* **Path Optimization:** Implements the [Ramer–Douglas–Peucker (RDP) Algorithm](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm) for line reduction.
* **Path Design Reference:** Integrated workflow compatibility with [SVG Path Editor](https://yqnn.github.io/svg-path-editor/) by yqnn.
* **Standards & Web APIs:** HTML5 Canvas 2D API, W3C DOMParser, and W3C SVG 1.1 Specification (`SVGPathElement.getPointAtLength()`).
  

 [^1]: The playfield grid does not match the real game grid perfectly, so you may need to adjust it. An update fixing this might come later.
