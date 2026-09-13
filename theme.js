// Run before styles paint to preserve the visitor's explicit preference.
// A new visitor always starts in dark mode, regardless of OS settings.
(() => {
  let theme = 'dark';
  try {
    if (localStorage.getItem('portfolio-theme') === 'light') theme = 'light';
  } catch { /* Storage may be unavailable in private or restricted browsers. */ }
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f5f6ef' : '#10120f';
})();
