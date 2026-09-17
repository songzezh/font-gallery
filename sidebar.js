for (const category of document.querySelectorAll('[data-font-category]')) {
  const fonts = window.fontCatalog?.[category.dataset.fontCategory];
  const placeholder = category.querySelector('.category-empty');
  if (!Array.isArray(fonts)) {
    placeholder.textContent = 'Font list unavailable. Please reload.';
    continue;
  }
  if (fonts.length === 0) continue;

  const list = document.createElement('ul');
  list.className = 'category-fonts';
  list.setAttribute('aria-label', `${category.querySelector('summary').textContent} fonts`);
  for (const font of fonts) {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'font-choice';
    button.textContent = font.name;
    button.addEventListener('click', () => showFontPreview(font, button));
    item.append(button);
    item.dataset.fontPath = font.path;
    list.append(item);
  }
  placeholder.replaceWith(list);
}
