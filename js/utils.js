(function(){
  // Small utilities exposed globally to help refactor work incrementally
  function safeSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch(e){ console.warn('safeSet failed', e); return false; }
  }
  function safeGet(key) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch(e){ console.warn('safeGet failed', e); return null; }
  }
  function debounce(fn, wait){ let t; return function(...args){ clearTimeout(t); t = setTimeout(()=>fn.apply(this,args), wait); }; }

  // requestAnimationFrame scheduler
  let __needsRender = false;
  function scheduleRender(cb){ if (cb) {
      // one-off scheduled render
      requestAnimationFrame(()=>{ try{ cb(); }catch(e){console.error(e);} });
      return;
    }
    if (__needsRender) return; __needsRender = true;
    requestAnimationFrame(()=>{ __needsRender = false; if (window.renderCanvas) try{ window.renderCanvas(); } catch(e){ console.error(e); } });
  }

  // Basic SVG sanitizer using DOMPurify when available, otherwise a conservative fallback
  function sanitizeSvg(svgText){
    if (typeof DOMPurify !== 'undefined') {
      return DOMPurify.sanitize(svgText, {USE_PROFILES: {svg: true}, FORBID_TAGS: ['script','iframe','object'], FORBID_ATTR: ['onload','onerror']});
    }
    // fallback: remove script tags and on* attributes (best effort)
    return svgText.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '').replace(/\son[a-z]+=\"[^\"]*\"/gi,'');
  }

  // Expose helpers
  window.safeSet = safeSet;
  window.safeGet = safeGet;
  window.debounce = debounce;
  window.scheduleRender = scheduleRender;
  window.sanitizeSvg = sanitizeSvg;

  // Small initializer to wire file inputs for sanitization (non-destructive)
  document.addEventListener('DOMContentLoaded', ()=>{
    const single = document.getElementById('svgFileSingle');
    if (single) single.addEventListener('change', (e)=>{
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        const clean = sanitizeSvg(text);
        const ta = document.getElementById('svgInput');
        if (ta) ta.value = clean;
        // attempt to trigger existing processing if defined
        if (typeof window.onSvgInputChanged === 'function') window.onSvgInputChanged(clean);
      };
      reader.readAsText(f);
    });

    // Auto-run saved theme loader if present
    if (typeof window.loadSavedCustomThemesFromStorage === 'function') {
      try { window.loadSavedCustomThemesFromStorage(); } catch(e){ console.warn(e); }
    }
  });
})();
