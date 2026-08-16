# SVG to .aff Converter

## About Me

This is a lightweight, single-file web utility designed to convert SVG vector paths and shape files into Arcaea chart format (`.aff`) in real time. It features an interactive visual canvas preview, a built-in shape library, text-to-path generation, and a multi-layer workspace mode designed to separate and organize SVG elements quickly without exporting SVGs individually.

---

## Prominent Features 

* **Real-Time Visual Canvas:** See your shapes mapped instantly onto an Arcaea playfield grid[^1] with click-and-drag scaling, positioning, and panning.
* **Photoshop-Style Layers Mode:** Import several SVG files or make blank layers to handle vectors separately, with choices to export just the active layer or merge all visible layers together.
* **Drag-and-Drop SVG Import:** Drop single or multiple `.svg` files right onto the workspace window to load path data automatically.
* **Text-to-Path & Shape Library:** Type custom text strings to instantly vectorize them using `opentype.js`, or pick from a library of built-in geometric shapes and arrows.
* **3D Perspective & Transforms:** Fine-tune your arcs using scaling, 3D pitch/yaw tilt controls, axis flipping, center-snapping, and point-reduction simplification to keep line counts optimized.
* **History & Persistence:** Full undo/redo (`Ctrl+Z` / `Ctrl+Y`) support paired with local storage autosaving so you never lose your progress.
* **Customizable Themes:** Switch between multiple dark/light themes, high-contrast colorblind modes, or custom accent pickers.

<small>(Images will come later)</small>

---

## Open Source Guideline & Usage

Since this project is contained within a single standalone HTML file, sharing or contributing to it is straightforward:

1. **Repository Setup:** Create a new public repository on GitHub and upload the HTML file as `index.html`.
2. **GitHub Pages:** Go to your repository **Settings > Pages**, set the source branch to `main` (or `master`), and save. GitHub will automatically host your tool live as a web app.
3. **Contributing / Editing:** Because there is no complex build step, bundler, or node module installation required, anyone can download the file, edit it in any text editor, and run it locally by double-clicking the file in a web browser.

---

## Disclaimer & AI Assistance Note

* **AI Assistance:** Portions of the code structure, layout layout logic, and feature enhancements for this project were developed with the assistance of AI tools. However, the code has been thoroughly tested, reviewed, and refined to ensure stability, proper layout constraints, and a bug-free user experience.
* **Trademark Notice:** This tool is an independent fan-made project and has no affiliation with, endorsement from, or association with Arcaea or lowiro limited. Arcaea is a registered trademark of lowiro limited.

## Acknowledgments & Credits

* **Target Chart Editor:** Designed for workflow integration with [ArcCreate](https://github.com/Arcthesia/ArcCreate) by Arcthesia.
* **Core Libraries & Tools:**
  * **Text-to-Path Engine:** Powered by [opentype.js](https://opentype.js.org/) for font parsing.
  * **Path Design Reference:** Uses concepts compatible with the [SVG Path Editor](https://yqnn.github.io/svg-path-editor/).
  * **Path Sampling:** Built on the standard W3C SVG 1.1 Specification (`SVGPathElement.getPointAtLength()`).
  * **Rendering & Parsing:** HTML5 Canvas 2D Context API and W3C DOMParser.

 [^1]: The playfield grid does not match the real game grid perfectly, so you may need to adjust it. An update fixing this might come later.
