// Without JavaScript the map links to three fully visible theme sections.
(() => {
  const orbit = document.querySelector('.h2-orbit');
  if (!orbit) return;

  const tabs = Array.from(orbit.querySelectorAll('.h2-theme-node'));
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  if (!tabs.length || panels.some(panel => !panel)) return;

  const select = (index, moveFocus = false) => {
    tabs.forEach((tab, i) => {
      const selected = i === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[i].hidden = !selected;
    });
    if (moveFocus) tabs[index].focus();
  };

  orbit.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;

    tab.addEventListener('click', event => {
      // Preserve opening a theme's direct link in another tab/window.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      select(index);
    });

    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else if (event.key === ' ') next = index;
      else return;
      event.preventDefault();
      select(next, true);
    });
  });

  const selectFromHash = () => {
    const index = panels.findIndex(panel => '#' + panel.id === window.location.hash);
    if (index !== -1) select(index);
  };
  select(0);
  selectFromHash();
  window.addEventListener('hashchange', selectFromHash);
})();
