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
// Original Wein campaign films, loaded only when a visitor chooses to play one.
document.addEventListener('click',event=>{
 const choice=event.target.closest('[data-omega-video]');if(!choice)return;
 const id=choice.dataset.omegaVideo;if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
 const player=document.querySelector('[data-omega-player]');if(!player)return;
 const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1';frame.title='OMEGA ARIS — '+choice.dataset.videoTitle;frame.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';player.replaceChildren(frame);
 document.querySelectorAll('.w-omega-filmstrip [data-omega-video]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.omegaVideo===id)));
});
