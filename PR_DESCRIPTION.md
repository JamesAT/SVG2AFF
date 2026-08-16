# Refactor: extract CSS/JS, sanitize SVGs, accessibility & performance

This pull request begins an incremental refactor of index.html into separate CSS and JS files. It also adds a sanitization step for user-provided SVG input (uses DOMPurify when present) and improves maintainability by replacing some inline logic with modular JS.

What changed in this branch:
- Extracted CSS variables and minimal rules into styles.css
- Added js/utils.js with safe localStorage helpers, debounce, scheduleRender, and sanitizeSvg wrapper
- Added js/main.js as a lightweight bootstrapper and showToast
- Added js/app.js which ports most of the inline app wiring gradually and safely
- Updated index.html to load extracted scripts and DOMPurify
- docs/UPGRADE.md with notes and testing checklist

Testing checklist:
- Load the app in a modern browser and verify the UI renders.
- Use the Import SVG File button to select an SVG and ensure the textarea is populated with sanitized SVG text.
- Adjust sliders and verify the placeholder canvas redraws.
- Check console for feature-detection warnings and sanitization activity.

Notes:
- This is intentionally additive and incremental to avoid breaking behavior. The app remains functional while code is moved to modules.
- The PR keeps commits separate to allow easier code review.
