// Keep a useful preview until Tableau confirms the live view is interactive.
let tableauLibrary;

async function loadDashboard(stage) {
  const name = stage.dataset.tableau;
  const status = document.querySelector(`[data-status="${name}"]`);
  status.textContent = 'Loading the interactive dashboard…';
  let ready = false;
  const fallback = () => {
    if (!ready) status.textContent = 'The live view is unavailable or taking longer to load. The preview and full-report link are still available.';
  };
  const timer = setTimeout(fallback, 20000);

  try {
    tableauLibrary ??= import('https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js');
    const { TableauViz, TableauEventType } = await tableauLibrary;
    const viz = new TableauViz();
    // The outer observer already defers loading; avoid a second lazy-load gate.
    viz.iframeAttributeLoading = 'eager';
    viz.src = stage.dataset.src;
    viz.toolbar = 'bottom';
    viz.width = name === 'netflix' ? '1920px' : '100%';
    viz.height = name === 'netflix' ? '1527px' : '100%';
    if (name === 'netflix') {
      viz.device = 'desktop';
      viz.hideTabs = true;
    }
    viz.addEventListener(TableauEventType.FirstInteractive, () => {
      ready = true;
      clearTimeout(timer);
      stage.classList.add('is-interactive');
      stage.querySelector('.viz-live').inert = false;
      stage.querySelector('.viz-preview').hidden = true;
      status.textContent = 'Live dashboard · Select marks and filters to explore.';
    }, { once: true });
    viz.addEventListener(TableauEventType.VizLoadError, () => {
      clearTimeout(timer);
      fallback();
    });
    stage.querySelector('.viz-live').append(viz);
  } catch {
    clearTimeout(timer);
    fallback();
  }
}

const stages = document.querySelectorAll('[data-tableau]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        loadDashboard(entry.target);
      }
    });
  }, { rootMargin: '300px' });
  stages.forEach(stage => observer.observe(stage));
} else {
  stages.forEach(loadDashboard);
}
