document.addEventListener('DOMContentLoaded', () => {
  const T = window.SITE_TEXT || {};
  if (!T) return;

  if (T.title) document.title = T.title;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && T.metaDescription) meta.setAttribute('content', T.metaDescription);

  const brand = document.querySelector('.brand'); if (brand && T.brand) brand.textContent = T.brand;

  const navLinks = document.querySelectorAll('.nav a');
  (T.nav || []).forEach((text, i) => { if (navLinks[i]) navLinks[i].textContent = text; });

  const navCta = document.querySelector('.nav-cta'); if (navCta && T.navCta) navCta.textContent = T.navCta;

  // Hero
  const heroEyebrow = document.querySelector('.hero .eyebrow'); if (heroEyebrow && T.hero && T.hero.eyebrow) heroEyebrow.textContent = T.hero.eyebrow;
  const heroKicker = document.querySelector('.hero-kicker'); if (heroKicker && T.hero && T.hero.kicker) heroKicker.textContent = T.hero.kicker;
  const heroTitle = document.querySelector('.hero-title'); if (heroTitle && T.hero && T.hero.title) heroTitle.innerHTML = T.hero.title.replace(/\n/g, '<br>');
  const heroText = document.querySelector('.hero-text'); if (heroText && T.hero && T.hero.text) heroText.innerHTML = T.hero.text.replace(/\n/g, '<br>');

  const heroBtns = document.querySelectorAll('.hero-actions .btn');
  if (heroBtns[0] && T.hero && T.hero.actions && T.hero.actions.explore) heroBtns[0].textContent = T.hero.actions.explore;
  if (heroBtns[1] && T.hero && T.hero.actions && T.hero.actions.github) heroBtns[1].textContent = T.hero.actions.github;

  const heroBadges = document.querySelectorAll('.hero-badges span');
  (T.hero && T.hero.badges || []).forEach((b,i) => { if (heroBadges[i]) heroBadges[i].textContent = b; });

  const panelLabel = document.querySelector('.hero-panel .panel-label'); if (panelLabel && T.hero && T.hero.panel && T.hero.panel.label) panelLabel.textContent = T.hero.panel.label;
  const panelH2 = document.querySelector('.hero-panel h2'); if (panelH2 && T.hero && T.hero.panel && T.hero.panel.h2) panelH2.textContent = T.hero.panel.h2;
  const panelP = document.querySelector('.hero-panel p'); if (panelP && T.hero && T.hero.panel && T.hero.panel.p) panelP.textContent = T.hero.panel.p;

  const marqueeSpans = document.querySelectorAll('.marquee-track span');
  // Marquee: render from data (prefer dynamic rendering so content.js is authoritative)
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack && T.hero && Array.isArray(T.hero.marquee)) {
    marqueeTrack.innerHTML = T.hero.marquee.map(m => `<span>${m}</span>`).join('');
  } else {
    (T.hero && T.hero.marquee || []).forEach((m,i) => { if (marqueeSpans[i]) marqueeSpans[i].textContent = m; });
  }

  // Section intro / Work
  const secEyebrow = document.querySelector('#work .section-intro .eyebrow'); if (secEyebrow && T.sectionWork && T.sectionWork.eyebrow) secEyebrow.textContent = T.sectionWork.eyebrow;
  const secH2 = document.querySelector('#work .section-intro h2'); if (secH2 && T.sectionWork && T.sectionWork.h2) secH2.textContent = T.sectionWork.h2;

  // Projects: render from content data so editing `content.js` updates the grid
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid && Array.isArray(T.projects)) {
    projectGrid.innerHTML = T.projects.map(p => {
      const metas = (p.meta || []).map(m => `<span>${m}</span>`).join('');
      return `\n        <article class="project-card reveal visible">\n          <div class="project-number">${p.number || ''}</div>\n          <h3>${p.title || ''}</h3>\n          <p>${p.desc || ''}</p>\n          <div class="project-meta">${metas}</div>\n          <a href="#" class="text-link">${p.linkText || ''}</a>\n        </article>\n      `;
    }).join('');
  }

  // About
  const aboutEyebrow = document.querySelector('#about .about-left .eyebrow'); if (aboutEyebrow && T.about && T.about.eyebrow) aboutEyebrow.textContent = T.about.eyebrow;
  const aboutH2 = document.querySelector('#about .about-left h2'); if (aboutH2 && T.about && T.about.h2) aboutH2.textContent = T.about.h2;
  const aboutPs = document.querySelectorAll('#about .about-right p'); (T.about && T.about.paragraphs || []).forEach((text,i) => { if (aboutPs[i]) aboutPs[i].textContent = text; });

  // Profile band
  const profileEyebrow = document.querySelector('.profile-copy .eyebrow'); if (profileEyebrow && T.profileBand && T.profileBand.eyebrow) profileEyebrow.textContent = T.profileBand.eyebrow;
  const profileH2 = document.querySelector('.profile-copy h2'); if (profileH2 && T.profileBand && T.profileBand.h2) profileH2.textContent = T.profileBand.h2;
  const bulletItems = document.querySelectorAll('.bullet-grid .bullet-item');
  if (T.profileBand && bulletItems.length) {
    const keys = ['education','coreStack','workingStyle','aimingFor'];
    bulletItems.forEach((item,i) => {
      const title = item.querySelector('.bullet-title');
      const p = item.querySelector('p');
      if (title && p && T.profileBand.bullets) {
        // leave existing title text, replace paragraph
        if (T.profileBand.bullets[keys[i]]) p.textContent = T.profileBand.bullets[keys[i]];
      }
    });
  }

  // Feature sections (project details)
  const setFeature = (id, data) => {
    const section = document.querySelector(id);
    if (!section || !data) return;
    const eyebrow = section.querySelector('.feature-copy .eyebrow'); if (eyebrow && data.eyebrow) eyebrow.textContent = data.eyebrow;
    const h2 = section.querySelector('.feature-copy h2'); if (h2 && data.h2) h2.textContent = data.h2;
    const p = section.querySelector('.feature-copy p'); if (p && data.p) p.textContent = data.p;
    const lis = section.querySelectorAll('.feature-list li'); (data.list || []).forEach((it,i)=>{ if (lis[i]) lis[i].textContent = it; });
    const action = section.querySelector('.feature-actions .btn'); if (action && data.action && data.action.text) action.textContent = data.action.text;
    if (action && data.action && data.action.href) action.setAttribute('href', data.action.href);
  };
  setFeature('#project-structural-regression', T.features && T.features.structuralRegression);
  setFeature('#project-lunara', T.features && T.features.lunara);
  setFeature('#project-chick-counting', T.features && T.features.chickCounting);
  setFeature('#project-oyster-detection', T.features && T.features.oysterDetection);
  setFeature('#project-knowyouruni', T.features && T.features.knowYourUni);
  setFeature('#project-ai-life-hub', T.features && T.features.aiLifeHub);

  // Highlights
  const highlightsEyebrow = document.querySelector('#highlights .section-intro .eyebrow'); if (highlightsEyebrow && T.highlights && T.highlights.eyebrow) highlightsEyebrow.textContent = T.highlights.eyebrow;
  const highlightsH2 = document.querySelector('#highlights .section-intro h2'); if (highlightsH2 && T.highlights && T.highlights.h2) highlightsH2.textContent = T.highlights.h2;
  // Render metric cards from content data. Build cards dynamically so the DOM
  // always matches `T.highlights.metrics` (prevents stale/hard-coded cards).
  // METRICS RENDERING: authoritative rendering + watchdog
  let metricsGrid = document.querySelector('#highlights .metrics-grid');
  const ensureMetricsGrid = () => {
    if (!metricsGrid) {
      const highlightsSection = document.querySelector('#highlights');
      if (highlightsSection) {
        metricsGrid = document.createElement('div');
        metricsGrid.className = 'metrics-grid';
        const timelineEl = highlightsSection.querySelector('.timeline');
        if (timelineEl) highlightsSection.insertBefore(metricsGrid, timelineEl);
        else highlightsSection.appendChild(metricsGrid);
      }
    }
  };

  let rendering = false;
  const renderMetrics = () => {
    ensureMetricsGrid();
    if (!metricsGrid || !T.highlights || !Array.isArray(T.highlights.metrics)) return;
    rendering = true;
    console.info('populate.js: rendering metrics from content.js', T.highlights.metrics);
    metricsGrid.innerHTML = '';
    T.highlights.metrics.forEach(m => {
      const card = document.createElement('div');
      card.className = 'metric-card reveal';
      const val = document.createElement('span');
      val.className = 'metric-value';
      val.textContent = m.value || '';
      const lbl = document.createElement('span');
      lbl.className = 'metric-label';
      lbl.textContent = m.label || '';
      card.appendChild(val);
      card.appendChild(lbl);
      // Make injected reveal elements visible immediately to avoid timing issues
      card.classList.add('visible');
      metricsGrid.appendChild(card);
    });
    // mark as authoritative so mutation observer can ignore our changes
    metricsGrid.dataset.populatedBy = 'populate.js';
    // small debounce to clear rendering flag
    setTimeout(() => { rendering = false; }, 50);
  };

  // initial render
  renderMetrics();

  // Defensive reapply in case something else modifies the DOM later (e.g., cache, extensions, other scripts)
  // Reapply after short delays
  setTimeout(renderMetrics, 100);
  setTimeout(renderMetrics, 500);

  // Watch for external mutations and reapply if needed
  try {
    const highlightsEl = document.querySelector('#highlights');
    if (highlightsEl) {
      const mo = new MutationObserver((mutations) => {
        if (rendering) return; // ignore mutations we caused
        for (const m of mutations) {
          if (m.type === 'childList' || m.type === 'subtree') {
            // if metric nodes were changed externally, re-render
            if (m.target && m.target.closest && m.target.closest('#highlights')) {
              console.warn('populate.js: external mutation detected, re-rendering metrics', m);
              renderMetrics();
              break;
            }
          }
        }
      });
      mo.observe(highlightsEl, { childList: true, subtree: true });
    }
  } catch (e) {
    console.error('populate.js: mutation observer failed', e);
  }

  // Timeline: render from data to avoid stale static HTML
  const timeline = document.querySelector('#highlights .timeline');
  if (timeline && T.highlights && Array.isArray(T.highlights.timeline)) {
    timeline.innerHTML = T.highlights.timeline.map(t => `\n      <div class="timeline-item">\n        <span class="timeline-year">${t.year || ''}</span>\n        <p>${t.text || ''}</p>\n      </div>\n    `).join('');
  }

  // Statement
  const stmtEyebrow = document.querySelector('.statement-panel .eyebrow'); if (stmtEyebrow && T.statement && T.statement.eyebrow) stmtEyebrow.textContent = T.statement.eyebrow;
  const stmtH2 = document.querySelector('.statement-panel h2'); if (stmtH2 && T.statement && T.statement.h2) stmtH2.textContent = T.statement.h2.replace(/\n/g,'<br>');

  // Contact
  const contactEyebrow = document.querySelector('#contact .contact-copy .eyebrow'); if (contactEyebrow && T.contact && T.contact.eyebrow) contactEyebrow.textContent = T.contact.eyebrow;
  const contactH2 = document.querySelector('#contact .contact-copy h2'); if (contactH2 && T.contact && T.contact.h2) contactH2.textContent = T.contact.h2;
  const contactP = document.querySelector('#contact .contact-copy p'); if (contactP && T.contact && T.contact.p) contactP.textContent = T.contact.p;
  const panel = document.querySelector('#contact .contact-panel .panel'); if (panel && T.contact && T.contact.panel) {
    const nodes = panel.children;
    // Email
    const emailAnchor = panel.querySelector('a[href^="mailto:"]');
    if (emailAnchor && T.contact.panel.email) {
      emailAnchor.setAttribute('href', 'mailto:' + T.contact.panel.email);
      emailAnchor.textContent = T.contact.panel.email;
    }
    // GitHub
    const anchors = panel.querySelectorAll('a');
    anchors.forEach(a => {
      if (a.href && a.href.includes('github.com')) {
        if (T.contact.panel.github) { a.setAttribute('href', T.contact.panel.github); a.textContent = T.contact.panel.github.replace(/^https?:\/\//, ''); }
      }
    });
    // LinkedIn & Resume (keep existing if placeholder)
    const linkTexts = panel.querySelectorAll('a');
    if (linkTexts[2] && T.contact.panel.linkedin) linkTexts[2].setAttribute('href', T.contact.panel.linkedin);
    if (linkTexts[3] && T.contact.panel.resume) linkTexts[3].setAttribute('href', T.contact.panel.resume);
  }

  // Footer
  const footerP = document.querySelector('.site-footer p'); if (footerP && T.footer && T.footer.text) footerP.textContent = T.footer.text;
  const footerA = document.querySelector('.site-footer a'); if (footerA && T.footer && T.footer.backToTop) footerA.textContent = T.footer.backToTop;

});
