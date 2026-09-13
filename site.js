const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeToggle.setAttribute('aria-pressed', String(light));
    themeToggle.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    themeToggle.title = light ? 'Switch to dark mode' : 'Switch to light mode';
  };
  updateThemeButton();
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#f5f6ef' : '#10120f';
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* Toggle still works without storage. */ }
    updateThemeButton();
  });
}

document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let count = 0;
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  });
});

// Keep the original Netflix composition while fitting its surrounding column.
const netflixFrame = document.getElementById('netflix-viz');
if (netflixFrame) {
  const wrapper = document.getElementById('netflix-wrapper');
  const container = document.getElementById('netflix-container');
  const scaleNetflix = () => {
    const scale = Math.min(wrapper.clientWidth / 1920, 1);
    netflixFrame.style.transform = `scale(${scale})`;
    container.style.height = `${1527 * scale}px`;
  };
  scaleNetflix();
  new ResizeObserver(scaleNetflix).observe(wrapper);
}

// Content stays visible without JavaScript and for reduced-motion visitors.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const reveals = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveals.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .repo-card, .capabilities article, .experience, .cert-card, .credential-group').forEach(element => {
    element.classList.add('reveal');
    reveals.observe(element);
  });
}

const loadLooker = document.getElementById('load-looker');
if (loadLooker) {
  loadLooker.hidden = false;
  loadLooker.addEventListener('click', () => {
    const frame = document.getElementById('looker-report');
    const status = document.getElementById('looker-status');
    loadLooker.disabled = true;
    status.textContent = 'Opening the embedded report…';
    frame.hidden = false;
    const timer = setTimeout(() => {
      status.textContent = 'The embed is taking longer to load. Use Open Full Report below to view it directly.';
      loadLooker.disabled = false;
      loadLooker.textContent = 'Retry embedded report ↗';
    }, 20000);
    frame.onload = () => {
      clearTimeout(timer);
      frame.closest('.looker-stage').classList.add('is-loaded');
      document.querySelector('.looker-cover').hidden = true;
      frame.tabIndex = 0;
      frame.focus();
    };
    frame.src = frame.dataset.src;
  });
}
