document.addEventListener('DOMContentLoaded', () => {
  const configured = typeof SALESFORCE_PORTAL_URL === 'string' &&
    SALESFORCE_PORTAL_URL.startsWith('https://') &&
    !SALESFORCE_PORTAL_URL.includes('YOUR-SALESFORCE-EXPERIENCE-DOMAIN');

  document.querySelectorAll('[data-salesforce-link]').forEach(link => {
    if (configured) {
      link.href = SALESFORCE_PORTAL_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.href = '#apply';
      link.addEventListener('click', (event) => {
        event.preventDefault();
        alert('The Salesforce candidate portal has not been configured yet. Update SALESFORCE_PORTAL_URL in config.js after your Experience Cloud site is ready.');
      });
    }
  });

  const statusForm = document.getElementById('statusForm');
  const statusMessage = document.getElementById('statusMessage');
  if (statusForm) {
    statusForm.addEventListener('submit', event => {
      event.preventDefault();
      const reference = document.getElementById('reference').value.trim().toUpperCase();
      if (!reference) return;
      if (configured) {
        const separator = SALESFORCE_PORTAL_URL.includes('?') ? '&' : '?';
        window.open(`${SALESFORCE_PORTAL_URL}${separator}reference=${encodeURIComponent(reference)}`, '_blank', 'noopener');
        statusMessage.textContent = 'Opening the secure Salesforce candidate portal…';
      } else {
        statusMessage.textContent = `Reference ${reference} is ready. Configure the Salesforce portal URL to enable live tracking.`;
      }
    });
  }

  const menuButton = document.getElementById('menuButton');
  const nav = document.querySelector('nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.dataset.open === 'true';
      nav.dataset.open = String(!open);
      nav.style.display = open ? '' : 'flex';
      nav.style.position = open ? '' : 'absolute';
      nav.style.top = open ? '' : '76px';
      nav.style.left = open ? '' : '0';
      nav.style.right = open ? '' : '0';
      nav.style.padding = open ? '' : '18px';
      nav.style.background = open ? '' : '#fff';
      nav.style.borderBottom = open ? '' : '1px solid #dfe6ee';
      nav.style.flexDirection = open ? '' : 'column';
      nav.style.alignItems = open ? '' : 'stretch';
    });
  }
});
