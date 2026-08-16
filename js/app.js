// Main app logic (incremental port of inline script). This file provides minimal but functional implementations
// of the global functions referenced by the UI while we continue the refactor.

/* eslint-disable no-unused-vars */
(function(){
  // Load saved themes from localStorage if present (utils exposes safeGet)
  window.loadSavedCustomThemesFromStorage = function(){
    try {
      const raw = window.safeGet ? window.safeGet('svgToAff_saved_themes_v1') : (localStorage.getItem('svgToAff_saved_themes_v1') ? JSON.parse(localStorage.getItem('svgToAff_saved_themes_v1')) : {});
      if (raw) window.savedCustomThemes = raw; else window.savedCustomThemes = {};
    } catch(e){ window.savedCustomThemes = {}; }
    // render dropdown if present
    if (typeof renderSavedThemesDropdown === 'function') renderSavedThemesDropdown();
  };

  window.saveCustomThemesToStorage = function(){
    try { if (window.safeSet) window.safeSet('svgToAff_saved_themes_v1', window.savedCustomThemes); else localStorage.setItem('svgToAff_saved_themes_v1', JSON.stringify(window.savedCustomThemes)); } catch(e){}
    if (typeof renderSavedThemesDropdown === 'function') renderSavedThemesDropdown();
  };

  window.renderSavedThemesDropdown = function(){
    const group = document.getElementById('savedCustomThemesGroup');
    if (!group) return;
    group.innerHTML = '';
    const keys = Object.keys(window.savedCustomThemes || {});
    if (keys.length === 0) {
      const opt = document.createElement('option'); opt.disabled = true; opt.innerText = '(No saved custom themes)'; group.appendChild(opt); return;
    }
    keys.forEach(id => { const opt = document.createElement('option'); opt.value = 'saved_' + id; opt.innerText = window.savedCustomThemes[id].name || id; group.appendChild(opt); });
  };

  window.changeTheme = function(themeKey){
    const picker = document.getElementById('customThemePicker');
    if (!picker) return;
    if (themeKey && themeKey.startsWith && themeKey.startsWith('saved_')){
      const id = themeKey.replace('saved_',''); const t = (window.savedCustomThemes||{})[id];
      if (t){ picker.style.display='grid'; document.getElementById('customThemeName').value = t.name||'Custom Theme'; if (document.getElementById('customThemeMode')) document.getElementById('customThemeMode').value = t.mode||'auto'; document.getElementById('customAccent').value = t.accent||'#7654ff'; document.getElementById('customBg').value = t.bg||'#0a0a0c'; document.getElementById('customCard').value = t.card||'#1c1c24'; document.getElementById('customPlayfield').value = t.playfield||'#00ff66'; document.getElementById('customText').value = t.text||'#e1e1e6'; applyCustomTheme(); return; }
    }
    if (themeKey === 'custom') { picker.style.display='grid'; applyCustomTheme(); return; }
    // presetThemes is available on the original inline script; provide a small fallback
    const presetThemes = window.presetThemes || {};
    const theme = presetThemes[themeKey];
    if (theme){ for (let key in theme) document.documentElement.style.setProperty(key, theme[key]); }
    refreshThemeColors(); scheduleRender();
  };

  window.applyCustomTheme = function(){
    const accent = document.getElementById('customAccent') ? document.getElementById('customAccent').value : '#7654ff';
    const bg = document.getElementById('customBg') ? document.getElementById('customBg').value : '#0a0a0c';
    const card = document.getElementById('customCard') ? document.getElementById('customCard').value : '#1c1c24';
    const play = document.getElementById('customPlayfield') ? document.getElementById('customPlayfield').value : '#00ff66';
    const text = document.getElementById('customText') ? document.getElementById('customText').value : '#e1e1e6';
    document.documentElement.style.setProperty('--accent', accent);
    document.documentElement.style.setProperty('--bg', bg);
    document.documentElement.style.setProperty('--card', card);
    document.documentElement.style.setProperty('--playfield', play);
    document.documentElement.style.setProperty('--text-main', text);
    scheduleRender();
  };

  window.saveCurrentCustomTheme = function(){
    try{
      const id = 'custom_' + Date.now();
      window.savedCustomThemes = window.savedCustomThemes || {};
      window.savedCustomThemes[id] = {
        name: document.getElementById('customThemeName')?.value || ('Custom ' + id),
        accent: document.getElementById('customAccent')?.value,
        bg: document.getElementById('customBg')?.value,
        card: document.getElementById('customCard')?.value,
        playfield: document.getElementById('customPlayfield')?.value,
        text: document.getElementById('customText')?.value,
        mode: document.getElementById('customThemeMode')?.value || 'auto'
      };
      if (window.saveCustomThemesToStorage) window.saveCustomThemesToStorage();
      showToast('Saved theme "' + window.savedCustomThemes[id].name + '"');
    }catch(e){ console.error(e); showToast('Failed to save theme'); }
  };

  window.deleteCurrentCustomTheme = function(){
    // Delete selected option
    try{
      const sel = document.getElementById('themeSelect');
      if (!sel) return; const v = sel.value; if (!v.startsWith('saved_')) return showToast('No saved theme selected');
      const id = v.replace('saved_',''); delete window.savedCustomThemes[id]; if (window.saveCustomThemesToStorage) window.saveCustomThemesToStorage(); showToast('Deleted theme');
    }catch(e){ console.error(e); }
  };

  window.exportCustomTheme = function(){
    try{
      const sel = document.getElementById('themeSelect'); if (!sel) return showToast('No theme selected');
      const v = sel.value; if (!v.startsWith('saved_')) return showToast('Select saved theme to export');
      const id = v.replace('saved_',''); const obj = window.savedCustomThemes[id]; if (!obj) return showToast('No theme data');
      const blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
      const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = (obj.name||id)+'.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
      showToast('Exported theme');
    }catch(e){ console.error(e); showToast('Export failed'); }
  };

  window.importCustomTheme = function(e){
    try{
      const f = e?.target?.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ()=>{
        try{ const obj = JSON.parse(r.result); const id = 'import_'+Date.now(); window.savedCustomThemes = window.savedCustomThemes || {}; window.savedCustomThemes[id] = obj; if (window.saveCustomThemesToStorage) window.saveCustomThemesToStorage(); showToast('Imported theme'); }catch(err){ console.error(err); showToast('Import invalid'); }
      }; r.readAsText(f);
    }catch(e){ console.error(e); }
  };

  // Basic UI toggles
  window.setTooltipsEnabled = function(v){ const els = document.querySelectorAll('[data-tooltip]'); els.forEach(el => { if (v) el.setAttribute('aria-describedby','tooltip'); else el.removeAttribute('aria-describedby'); }); };
  window.toggleSettingsModal = function(open){ const modal = document.getElementById('settingsModal'); if (!modal) return; modal.classList.toggle('active', !!open); if (open) modal.setAttribute('aria-hidden','false'); else modal.setAttribute('aria-hidden','true'); };
  window.toggleModal = function(open){ const modal = document.getElementById('instructionModal'); if (!modal) return; modal.classList.toggle('active', !!open); };
  window.toggleAboutModal = function(open){ const modal = document.getElementById('aboutModal'); if (!modal) return; modal.classList.toggle('active', !!open); };

  // Simple undo/redo stubs
  window.undo = function(){ showToast('Undo'); };
  window.redo = function(){ showToast('Redo'); };
  window.factoryReset = function(){ if (!confirm('Reset to factory Defaults?')) return; localStorage.clear(); showToast('Factory reset'); };

  // Transformation helpers (stubs that update display values)
  function updateDisplay(id, val){ const el = document.getElementById(id); if (el) el.textContent = val; }
  window.resetScaleEqual = function(){ document.getElementById('scaleX').value = 0.05; document.getElementById('scaleY').value = 0.05; updateDisplay('v_scaleX','0.050'); updateDisplay('v_scaleY','0.050'); scheduleRender(); };
  window.resetRotation = function(){ document.getElementById('rotation').value = 0; updateDisplay('v_rot','0'); scheduleRender(); };
  window.reset3DTilt = function(){ document.getElementById('tiltPitch').value = 0; document.getElementById('tiltYaw').value = 0; updateDisplay('v_pitch','0'); updateDisplay('v_yaw','0'); scheduleRender(); };

  window.changeWorkspaceMode = function(val){ const layersCard = document.getElementById('layersCard'); if (!layersCard) return; if (val === 'layers') layersCard.style.display = 'block'; else layersCard.style.display = 'none'; };
  window.handleSamplingModeChange = function(v){ /* keep legacy behavior */ };

  window.loadShapePreset = function(name){ const ta = document.getElementById('svgInput'); if (!ta) return; // simple presets
    const presets = { circle: '<svg><path d="M100,20a80,80 0 1,0 0.0001,0"/></svg>' };
    if (presets[name]) ta.value = presets[name]; if (typeof window.onSvgInputChanged === 'function') window.onSvgInputChanged(ta.value); scheduleRender(); };

  window.alignLayers = function(mode){ showToast('Align: ' + mode); };

  window.setExportMode = function(m){ document.getElementById('btnExportActive')?.classList.toggle('active', m==='active'); document.getElementById('btnExportAll')?.classList.toggle('active', m==='all'); };

  window.copyAff = function(){ try{ const out = document.getElementById('affOutput'); if (!out) return showToast('No output'); navigator.clipboard.writeText(out.value || '').then(()=>showToast('Copied to clipboard')).catch(()=>showToast('Copy failed')); }catch(e){ console.error(e); showToast('Copy failed'); } };

  // Basic rendering placeholder
  window.renderCanvas = function(){ const canvas = document.getElementById('canvas'); if (!canvas) return; const ctx = canvas.getContext('2d'); if (!ctx) return; // clear and draw a simple grid
    ctx.clearRect(0,0,canvas.width,canvas.height); ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--viewport-bg') || '#050507'; ctx.fillRect(0,0,canvas.width,canvas.height);
  };

  // Make sure file input wiring uses sanitizeSvg exported from utils
  window.onSvgInputChanged = function(cleanText){ const ta = document.getElementById('svgInput'); if (ta) ta.value = cleanText; // do further processing if required
  };

  // Attach some live UI wiring (debounced)
  document.addEventListener('DOMContentLoaded', ()=>{
    // Range inputs update value displays
    const ranges = ['scaleX','scaleY','rotation','tiltPitch','tiltYaw','offsetX','offsetY','steps','simplify','tooltipOpacityInput','inactiveDimming'];
    ranges.forEach(id => { const el = document.getElementById(id); if (!el) return; el.addEventListener('input', window.debounce ? window.debounce(()=>{ if (id==='scaleX') updateDisplay('v_scaleX', parseFloat(el.value).toFixed(3)); if (id==='scaleY') updateDisplay('v_scaleY', parseFloat(el.value).toFixed(3)); if (id==='rotation') updateDisplay('v_rot', el.value); if (id==='tiltPitch') updateDisplay('v_pitch', el.value); if (id==='tiltYaw') updateDisplay('v_yaw', el.value); if (id==='offsetX') updateDisplay('v_offX', parseFloat(el.value).toFixed(2)); if (id==='offsetY') updateDisplay('v_offY', parseFloat(el.value).toFixed(2)); scheduleRender(); }, 40) : function(){ scheduleRender(); } ); });

    // Wire svgFile input to sanitize
    const svgFile = document.getElementById('svgFile'); if (svgFile){ svgFile.addEventListener('change', (e)=>{ const files = Array.from(e.target.files||[]); files.forEach(f=>{ const r = new FileReader(); r.onload = ()=>{ const clean = window.sanitizeSvg ? window.sanitizeSvg(r.result) : r.result; window.onSvgInputChanged(clean); }; r.readAsText(f); }); }); }

    // Single file handled by utils already but ensure we load saved themes
    if (window.loadSavedCustomThemesFromStorage) window.loadSavedCustomThemesFromStorage();
    // initial render
    scheduleRender();
  });

})();
