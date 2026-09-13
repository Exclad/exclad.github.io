# Vijay Kumar — portfolio

Static HTML, CSS, and JavaScript portfolio for GitHub Pages. No build dependencies.

## Preview and validation

Run `python -m http.server 4173`, then open `http://localhost:4173`.
Run `node --check site.js`, `node --check dashboards.js`, `node --check theme.js`, and `git diff --check` after changes.
Check desktop/mobile layouts, project filters, internal anchors, and the three external dashboard embeds in a browser.

## Content and maintenance

- `index.html`: introduction, selected work, experience, education, and certifications.
- `projects.html`: Looker Studio used-car report, Netflix and Amazon Tableau dashboards, curated GitHub projects, and academic work.
- `site.js`: project filters, Netflix scaling, and one-time scroll reveals. Reduced-motion preferences are respected.
- `certifications.html`: professional credentials first, then platform badges, specializations, expandable coursework, and historical credentials. Credential IDs without verified URLs are displayed as text; do not invent verification links.
- Repository descriptions were checked against https://github.com/Exclad in September 2026. Project cards are curated static content, so visitors do not depend on GitHub API availability or rate limits. Update both pages when changing featured projects.
- The three featured credentials link to individual badges verified through https://www.credly.com/users/vijay-kumar.f2eb2537. Official badge artwork loads from Credly.
- Career details and course IDs were updated from the user’s resume and LinkedIn text supplied in September 2026. SPH title: Senior Data Analyst (BI Lead & Data Engineer). The 30% savings are annual infrastructure costs, not monthly. The 10% pipeline improvement is described as reduced manual processing time, matching the supplied LinkedIn text.
- The Google report uses a click-to-load embed with a clear full-report link and timeout message. Its iframe load event only indicates document loading, not that its charts are ready.
- `dashboards.js` uses Tableau Embedding API v3 with HTTPS sources. The legacy `viz_v1.js` loader generated HTTP iframe URLs in local previews. Views initialize near the viewport; their inner iframe uses eager loading to avoid a second lazy-load gate. Static previews stay visible until `FirstInteractive`; failures or a 20-second delay leave a usable preview and direct link. Netflix stays at 1920 × 1527 with its desktop layout, scaled by ResizeObserver.
- The in-app preview did not complete embedded Tableau or Google report loading during testing, although Netflix loaded directly. Do not equate an iframe load event or a rendered static preview with a working interactive dashboard.
- Dashboard content, fonts, and badge images are hosted externally. Full-report links remain available if embeds fail to load.

- `theme.js` restores only an explicitly saved light preference before paint; new visitors default to dark. `site.js` handles the accessible theme button and persists its choice in localStorage, with a safe fallback when storage is unavailable. Theme changes do not recolor third-party dashboards.
- Credential verification URLs supplied by the user are preserved exactly, including Databricks fragments and Coursera certificate/verify path variants. Issuer logos are local assets; sources are listed in `assets/issuers/README.md`.
