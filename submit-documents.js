document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('documentSubmissionForm');
  const filesInput = document.getElementById('certifiedDocuments');
  const fileList = document.getElementById('selectedDocumentList');
  const message = document.getElementById('documentSubmissionMessage');
  const maxFiles = 5;
  const maxBytes = 5 * 1024 * 1024;

  function validateFiles() {
    const files = Array.from(filesInput.files || []);
    const invalidType = files.filter(file =>
      !file.name.toLowerCase().endsWith('.pdf') ||
      (file.type && file.type !== 'application/pdf')
    );
    const oversized = files.filter(file => file.size > maxBytes);
    let error = '';
    if (!files.length) error = 'Please select at least one certified PDF document.';
    else if (files.length > maxFiles) error = 'You can select a maximum of 5 PDF files.';
    else if (invalidType.length) error = 'PDF files only. Remove: ' + invalidType.map(file => file.name).join(', ');
    else if (oversized.length) error = 'Each PDF must be 5 MB or smaller. Check: ' + oversized.map(file => file.name).join(', ');

    filesInput.setCustomValidity(error);
    if (error) {
      fileList.textContent = error;
      return false;
    }
    fileList.textContent = files.length
      ? files.map(file => file.name + ' (' + (file.size / (1024 * 1024)).toFixed(2) + ' MB)').join(' · ')
      : 'No files selected. Maximum 5 PDF files.';
    return true;
  }

  filesInput.addEventListener('change', () => {
    validateFiles();
    message.textContent = 'File selection checked in this browser only. Nothing has been uploaded.';
    message.classList.remove('form-message-warning');
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity() || !validateFiles()) {
      message.textContent = 'Please complete the required fields and select valid PDF files.';
      message.classList.add('form-message-warning');
      return;
    }
    message.textContent = 'Your details and PDF file checks passed, but your documents have NOT been submitted or saved. The secure Salesforce upload service is not connected yet. Certification has not been independently verified. This is not a submission receipt.';
    message.classList.add('form-message-warning');
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});