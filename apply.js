document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('candidateApplicationForm');
  const message = document.getElementById('applicationFormMessage');
  const phone = document.getElementById('phone');
  const year = document.getElementById('educationYear');
  const documents = document.getElementById('supportingDocuments');
  const documentStatus = document.getElementById('documentUploadStatus');

  documents?.addEventListener('change', () => {
    const files = Array.from(documents.files || []);
    if (!files.length) {
      documentStatus.textContent = 'No documents selected.';
      return;
    }
    const invalid = files.filter(file => !file.name.toLowerCase().endsWith('.pdf') || (file.type && file.type !== 'application/pdf'));
    documentStatus.textContent = invalid.length
      ? 'Please select PDF files only. Remove: ' + invalid.map(file => file.name).join(', ')
      : files.length + ' PDF file(s) selected. File contents will be checked when you submit.';
  });

  // Accept common South African mobile/landline input styles. Final verification
  // should still take place through the secure application service.
  phone?.addEventListener('input', () => {
    phone.setCustomValidity('');
  });

  form?.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) {
      message.textContent = 'Please complete the required fields and correct any highlighted information.';
      message.classList.add('form-message-warning');
      return;
    }

    const phoneValue = phone?.value.replace(/[\s()-]/g, '') || '';
    const southAfricanPhone = /^(0[1-9][0-9]{8}|\+27[1-9][0-9]{8}|27[1-9][0-9]{8})$/.test(phoneValue);
    if (!southAfricanPhone) {
      phone.setCustomValidity('Enter a valid South African number, for example 082 123 4567 or +27 82 123 4567.');
      phone.reportValidity();
      message.textContent = 'Please check the cellphone number format.';
      message.classList.add('form-message-warning');
      return;
    }

    if (year?.value) {
      const yearNumber = Number(year.value);
      const currentYear = new Date().getFullYear();
      if (!Number.isInteger(yearNumber) || yearNumber < 1950 || yearNumber > currentYear) {
        year.setCustomValidity('Enter a year between 1950 and ' + currentYear + '.');
        year.reportValidity();
        message.textContent = 'Please check the education completion year.';
        message.classList.add('form-message-warning');
        return;
      }
    }

    message.textContent = 'Your entries and PDF file checks passed, but your application and documents have NOT been submitted or saved. The secure Salesforce submission service is not connected yet. Please do not treat this as an application receipt.';
    message.classList.add('form-message-warning');
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
