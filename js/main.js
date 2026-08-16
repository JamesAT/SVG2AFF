// Lightweight main entry for incremental refactor. Does NOT replace existing inline logic yet — provides bootstrapping.
(function(){
  // Feature detection
  const supportsPathSampling = typeof SVGPathElement !== 'undefined' && typeof SVGPathElement.prototype.getPointAtLength === 'function';
  if (!supportsPathSampling) {
    console.warn('SVGPathElement.getPointAtLength is not available in this browser. Some features may not work.');
  }

  // Ensure opentype is available
  function checkOpenType(){
    if (typeof opentype === 'undefined') console.warn('opentype.js not loaded — text-to-path disabled.');
  }

  // Provide a safe global function to show simple toasts (copy feedback placeholder)
  function showToast(msg, timeout=2000){
    let t = document.getElementById('svg2aff_toast');
    if (!t){ t = document.createElement('div'); t.id='svg2aff_toast'; t.style.position='fixed'; t.style.bottom='16px'; t.style.left='50%'; t.style.transform='translateX(-50%)'; t.style.background='rgba(0,0,0,0.6)'; t.style.color='white'; t.style.padding='8px 12px'; t.style.borderRadius='6px'; t.style.zIndex='3000'; document.body.appendChild(t);}    
    t.textContent = msg; t.style.opacity='1'; setTimeout(()=>{ t.style.opacity='0'; }, timeout);
  }

  window.showToast = showToast;

  document.addEventListener('DOMContentLoaded', ()=>{
    checkOpenType();
    // wire copyAff if it exists as inline function previously — provide a fallback
    const copyBtn = Array.from(document.querySelectorAll('button')).find(b => b.dataset && b.dataset.tooltip && b.textContent && b.textContent.includes('Copy generated'));
    // not reliable; instead ensure there is a button with onclick copyAff present in DOM; leave as-is

    // call any legacy init function if provided
    if (typeof window.initApp === 'function') {
      try{ window.initApp(); } catch(e){ console.error(e);}    
    }
  });
})();
