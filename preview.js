const fontLoads = new Map();
let fontFamilyId = 0;
let previewRequest = 0;

async function loadPreviewFont(font) {
  if (fontLoads.has(font.path)) return fontLoads.get(font.path);
  const family = `GalleryFont${fontFamilyId++}`;
  const request = (async () => {
    if (!font.variants?.length) throw new Error('No font files');
    const faces = await Promise.all(font.variants.map(variant => {
      const url = `${font.path}/${variant.filename}`.split('/').map(encodeURIComponent).join('/');
      return new FontFace(family, `url("./${url}")`, {
        style: variant.style,
        weight: font.weightRange ? font.weightRange.join(' ') : String(variant.weight),
      }).load();
    }));
    faces.forEach(face => document.fonts.add(face));
    return family;
  })();
  fontLoads.set(font.path, request);
  try { return await request; }
  catch (error) { fontLoads.delete(font.path); throw error; }
}

async function showFontPreview(font, button) {
  const request = ++previewRequest;
  document.querySelectorAll('.font-choice').forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'true');
  const main = document.querySelector('#main-content');
  const adjustments = document.querySelector('#font-adjustments');
  adjustments.hidden = false;
  adjustments.innerHTML = `
    <h2 class="adjustments-title">Font settings</h2>
    <p class="adjustments-status" role="status">Loading font…</p>
    <fieldset class="preview-controls" disabled aria-label="Preview settings">
      <label>Size <span><input id="specimen-size" type="range" min="16" max="120" value="64"><output for="specimen-size">64 px</output></span></label>
      <label>Style <select id="specimen-style"></select></label>
      <label>Weight <select id="specimen-weight"></select></label>
    </fieldset>`;
  main.innerHTML = `
    <section class="font-preview" aria-labelledby="preview-title">
      <h1 id="preview-title" class="visually-hidden" tabindex="-1"></h1>
      <div class="preview-content" hidden>
        <label class="visually-hidden" for="specimen-text">Try your own text</label>
        <textarea id="specimen-text" class="font-sample" spellcheck="false">The quick brown fox jumps over the lazy dog.</textarea>
        <div class="specimen-row"><p class="font-sample glyph-sample">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>abcdefghijklmnopqrstuvwxyz<br>0123456789 &amp; @ # ! ?</p></div>
        <div class="specimen-row"><p class="font-sample reading-sample">Good typography brings words to life. A quiet rhythm, an open curve, a little room to breathe. Every letter shapes the way a story feels.</p></div>
      </div>
    </section>`;
  main.querySelector('h1').textContent = font.name;
  main.querySelector('h1').focus({ preventScroll: true });
  main.scrollIntoView({ block: 'start', behavior: 'instant' });
  const status = adjustments.querySelector('[role="status"]');
  try {
    const family = await loadPreviewFont(font);
    if (request !== previewRequest) return;
    const content = main.querySelector('.preview-content');
    content.style.setProperty('--specimen-family', family);
    const style = adjustments.querySelector('#specimen-style');
    const weight = adjustments.querySelector('#specimen-weight');
    for (const value of new Set(font.variants.map(variant => variant.style))) {
      style.add(new Option(value === 'italic' ? 'Italic' : 'Regular', value));
    }
    const updateWeight = () => content.style.setProperty('--specimen-weight', weight.value);
    const updateStyle = () => {
      const previous = Number(weight.value) || 400;
      const weights = font.weightRange
        ? [...new Set([font.weightRange[0], ...Array.from({ length: 9 }, (_, i) => (i + 1) * 100).filter(value => value >= font.weightRange[0] && value <= font.weightRange[1]), font.weightRange[1]])]
        : [...new Set(font.variants.filter(variant => variant.style === style.value).map(variant => variant.weight))].sort((a, b) => a - b);
      weight.replaceChildren(...weights.map(value => new Option(String(value), String(value))));
      weight.value = String(weights.includes(previous) ? previous : weights[0]);
      content.style.setProperty('--specimen-style', style.value);
      updateWeight();
    };
    style.addEventListener('change', updateStyle);
    weight.addEventListener('change', updateWeight);
    updateStyle();
    adjustments.querySelector('#specimen-size').addEventListener('input', event => {
      main.querySelector('#specimen-text').style.fontSize = `${event.target.value}px`;
      adjustments.querySelector('output').value = `${event.target.value} px`;
    });
    status.textContent = '';
    adjustments.querySelector('fieldset').disabled = false;
    content.hidden = false;
  } catch {
    if (request === previewRequest) status.textContent = 'Unable to load this font. Check the font files and open the site through a local web server. Click the font name to retry.';
  }
}
