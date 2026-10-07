// Small, progressive navigation enhancement. Commerce remains with Shopify/Dawn.
document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('[data-wein-menu][open]').forEach((menu) => {
    menu.removeAttribute('open');
    menu.querySelector('summary').focus();
  });
});
document.addEventListener('click', (event) => {
  document.querySelectorAll('[data-wein-menu][open]').forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});
document.querySelectorAll('[data-wein-compare]').forEach((chooser) => {
  chooser.addEventListener('change', (event) => {
    const checked = [...chooser.querySelectorAll('input:checked')];
    const status = chooser.querySelector('[data-compare-status]');
    if (checked.length > 3) {
      event.target.checked = false;
      status.textContent = 'Choose up to three products. Deselect one to compare another.';
      return;
    }
    if (checked.length === 0) {
      event.target.checked = true;
      status.textContent = 'Keep at least one product selected.';
      return;
    }
    const selected = new Set(checked.map((input) => input.value));
    document.querySelectorAll('[data-compare-column]').forEach((cell) => {
      cell.hidden = !selected.has(cell.dataset.compareColumn);
    });
    status.textContent = `${selected.size} ${selected.size === 1 ? 'product' : 'products'} selected.`;
  });
});
