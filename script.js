const header = document.querySelector('.site-header');
const revealItems = document.querySelectorAll('.reveal');
const splitSelectors = [
  '.hero-title',
  '.section-intro h2',
  '.about-left h2',
  '.profile-copy h2',
  '.feature-copy h2',
  '.contact-copy h2',
  '.statement-panel h2',
  '.project-card h3',
  '.hero-kicker'
];

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitTextIntoWords(element) {
  if (!element || element.dataset.splitReady === 'true') return;

  const breakToken = '__SPLIT_BREAK__';
  const originalHtml = element.innerHTML.replace(/<br\s*\/?>/gi, ` ${breakToken} `);
  const accessibleText = element.textContent.replace(/\s+/g, ' ').trim();
  const parts = originalHtml.trim().split(/\s+/);

  element.setAttribute('aria-label', accessibleText);
  element.innerHTML = parts
    .map((part, index) => {
      if (part === breakToken) {
        return '<span class="split-break" aria-hidden="true"></span>';
      }

      return `<span class="word-shell" aria-hidden="true"><span class="word" style="--word-delay:${index * 34}ms">${part}</span></span>`;
    })
    .join('');

  element.dataset.splitReady = 'true';
}

function animateSplitWords(scope) {
  scope.querySelectorAll('.word').forEach((word) => word.classList.add('is-visible'));
}

if (!prefersReducedMotion) {
  splitSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => splitTextIntoWords(element));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      if (!prefersReducedMotion) {
        animateSplitWords(entry.target);
      }

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.14,
    rootMargin: '0px 0px -48px 0px'
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 24, 180)}ms`;
  observer.observe(item);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 18) {
    header.style.background = 'rgba(7, 8, 12, 0.74)';
    header.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  } else {
    header.style.background = 'transparent';
    header.style.borderBottom = '1px solid transparent';
  }
});
