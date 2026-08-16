UPGRADE NOTES

This branch begins an incremental refactor to extract styles and utilities from index.html into separate files.

What changed in this commit/branch:
- Added styles.css with the project's CSS variables and a small subset of rules.
- Added js/utils.js containing safeLocalStorage helpers, debounce, scheduleRender, and a sanitizeSvg wrapper (uses DOMPurify if available).
- Added js/main.js as a lightweight bootstrapper that performs feature checks and exposes a showToast helper.

Notes for reviewers and maintainers:
- For safety this first refactor is intentionally additive: the original inline <style> and <script> blocks remain in index.html for now to avoid breaking behavior.
- Next steps (planned in this branch):
  1. Move the large inline <script> into js/app.js step-by-step, replacing inline handlers with addEventListener wiring.
  2. Replace inline <style> by moving the full CSS into styles.css and removing the inline copy once verified.
  3. Add DOMPurify-based sanitization and stricter SVG parsing to avoid unsafe content.
  4. Add accessibility improvements (ARIA, focus trap for modals) and performance (debounce ranges, scheduleRender for canvas).

Testing checklist:
- Open index.html in a browser and verify the UI renders as before.
- Import an SVG via the single file input and ensure the textarea receives sanitized content.
- Inspect console for warnings from feature detection.
