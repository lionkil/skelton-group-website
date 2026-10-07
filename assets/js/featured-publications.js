// All papers remain readable when JavaScript is unavailable.
(() => {
  const root = document.querySelector('[data-featured-publications]');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.fp-slide'));
  if (slides.length < 2) return;
  const dots = Array.from(root.querySelectorAll('[data-slide-index]'));
  let current = 0;
  let keyboardFocus = false;
  let timer;

  const schedule = () => {
    window.clearTimeout(timer);
    const readingCaption = slides[current].querySelector('details[open]');
    if (!keyboardFocus && !document.hidden && !readingCaption) {
      timer = window.setTimeout(() => { show(current + 1); schedule(); }, 12000);
    }
  };
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.inert = !active;
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].setAttribute('aria-pressed', String(active));
      if (!active) slide.querySelectorAll('details[open]').forEach(detail => { detail.open = false; });
    });
  };

  root.classList.add('is-enhanced');
  root.setAttribute('aria-roledescription', 'carousel');
  slides.forEach((slide, i) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `${i + 1} of ${slides.length}`);
  });
  root.querySelector('.fp-controls').hidden = false;
  dots.forEach((dot, index) => dot.addEventListener('click', event => {
    if (event.detail > 0) keyboardFocus = false;
    show(index);
    schedule();
  }));
  root.addEventListener('focusin', event => {
    keyboardFocus = !dots.includes(event.target) && event.target.matches(':focus-visible');
    schedule();
  });
  root.addEventListener('focusout', event => {
    keyboardFocus = Boolean(event.relatedTarget && root.contains(event.relatedTarget) && !dots.includes(event.relatedTarget) && event.relatedTarget.matches(':focus-visible'));
    schedule();
  });
  root.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', schedule));
  document.addEventListener('visibilitychange', schedule);
  show(0);
  schedule();
})();
