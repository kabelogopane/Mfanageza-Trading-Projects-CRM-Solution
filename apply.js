document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('candidateApplicationForm');
  const message = document.getElementById('applicationFormMessage');
  const phone = document.getElementById('phone');
  const year = document.getElementById('educationYear');
  const documents = document.getElementById('supportingDocuments');
  const documentStatus = document.getElementById('documentUploadStatus');

  documents?.addEventListener('change', () => {
    const files = Array.from(documents.files || []);
    const maxFiles = 2;
    const invalid = files.filter(file =>
      !file.name.toLowerCase().endsWith('.pdf') ||
      (file.type && file.type !== 'application/pdf')
    );

    if (files.length > maxFiles || invalid.length) {
      documents.setCustomValidity(
        files.length > maxFiles
          ? 'You can upload a maximum of 2 PDF files.'
          : 'PDF files only. Please remove: ' + invalid.map(file => file.name).join(', ')
      );
      documentStatus.textContent = files.length > maxFiles
        ? 'Too many files selected. Choose no more than 2 PDF files.'
        : 'PDF files only. Please remove: ' + invalid.map(file => file.name).join(', ');
      return;
    }

    documents.setCustomValidity('');
    documentStatus.textContent = files.length
      ? files.length + ' of 2 PDF file(s) selected. Certification will need to be checked by the application team.'
      : 'No documents selected. Maximum: 2 PDF files.';
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

    const selectedDocuments = Array.from(documents?.files || []);
    const invalidDocuments = selectedDocuments.filter(file =>
      !file.name.toLowerCase().endsWith('.pdf') ||
      (file.type && file.type !== 'application/pdf')
    );
    if (selectedDocuments.length < 1 || selectedDocuments.length > 2 || invalidDocuments.length) {
      documents?.setCustomValidity(
        selectedDocuments.length < 1
          ? 'Please attach at least 1 certified PDF document.'
          : selectedDocuments.length > 2
            ? 'You can upload a maximum of 2 PDF files.'
            : 'PDF files only. Please select valid PDF documents.'
      );
      documents?.reportValidity();
      message.textContent = 'Attach 1 or 2 PDF files only. Documents must be certified copies.';
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

    message.textContent = 'Your entries and PDF file checks passed, but your application and documents have NOT been submitted or saved. Certification has not been verified. The secure Salesforce submission service is not connected yet. Please do not treat this as an application receipt.';
    message.classList.add('form-message-warning');
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
