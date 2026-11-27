document.addEventListener('DOMContentLoaded', () => {
  const theme = document.createElement('link');
  theme.rel = 'stylesheet';
  theme.href = 'academy.css';
  document.head.appendChild(theme);

  // Keep the Salesforce hand-off in one place. The public site never stores
  // Salesforce credentials or writes directly to the CRM from the browser.
  const portalUrl = typeof SALESFORCE_PORTAL_URL === 'string'
    ? SALESFORCE_PORTAL_URL.trim()
    : '';
  const configured = portalUrl.startsWith('https://') &&
    !portalUrl.includes('YOUR-SALESFORCE-EXPERIENCE-DOMAIN');

  document.querySelectorAll('[data-salesforce-link]').forEach(link => {
    if (configured) {
      link.href = portalUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.removeAttribute('aria-disabled');
    } else {
      link.href = '#apply';
      link.addEventListener('click', event => {
        event.preventDefault();
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
        const message = document.getElementById('portalMessage');
        if (message) {
          message.textContent = 'The Salesforce application portal is not connected yet. Once the Experience Cloud site is published and tested, add its public URL in config.js.';
        }
      });
    }
  });

  // Until the real portal is configured, this is an explanatory hand-off only.
  // Do not imply that a reference has been checked against Salesforce.
  const form = document.getElementById('statusForm');
  const message = document.getElementById('statusMessage');

  form?.addEventListener('submit', event => {
    event.preventDefault();
    const reference = document.getElementById('reference')?.value.trim().toUpperCase();
    if (!reference) return;

    if (configured) {
      const destination = new URL(portalUrl);
      destination.searchParams.set('reference', reference);
      window.open(destination.toString(), '_blank', 'noopener,noreferrer');
      if (message) message.textContent = 'Opening the candidate portal. Sign in there to view your application.';
    } else if (message) {
      message.textContent = 'Application tracking will be available after the Salesforce candidate portal is connected. No application record has been checked yet.';
    }
  });

  const menu = document.getElementById('menuButton');
  const nav = document.getElementById('mainNav');

  menu?.addEventListener('click', () => {
    const isOpen = nav.dataset.open === 'true';
    nav.dataset.open = String(!isOpen);
    nav.style.display = isOpen ? '' : 'flex';
    nav.style.position = isOpen ? '' : 'absolute';
    nav.style.top = isOpen ? '' : '70px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.padding = isOpen ? '' : '18px';
    nav.style.background = isOpen ? '' : '#07111f';
    nav.style.flexDirection = isOpen ? '' : 'column';
    nav.style.alignItems = isOpen ? '' : 'stretch';
    menu.setAttribute('aria-expanded', String(!isOpen));
  });

  nav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 950) {
        nav.dataset.open = 'false';
        nav.style.display = '';
        menu?.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
