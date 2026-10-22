# Development Log

## 2026-10-22 — New Salesforce Org Foundation Audit

### Objective

Establish a clean, evidence-based baseline for the new Salesforce org before adding automation, validation rules, reports or further upgrades.

### Confirmed work

- Confirmed a custom **Candidate** object exists.
- Audited **Candidate Application** Fields & Relationships.
- Confirmed 11 application fields are present:
  - Application Date
  - Application Number
  - Application Status
  - Candidate
  - Candidate Application Name
  - Created By
  - Last Modified By
  - Owner
  - Programme
  - Programme Type
  - Start Date
- Confirmed `Candidate__c` is **Lookup(Contact)**.
- Confirmed `Programme__c` is **Lookup(Programme)**.
- Confirmed `Application_Number__c` is **Auto Number**.
- Confirmed `Application_Status__c` is a restricted picklist.
- Confirmed Application Status values:
  - New
  - Under Review
  - Compliance Review
  - Documents Required
  - Approved
  - Enrolled
  - Rejected
- Confirmed Application Status has no default value and is not required.
- Confirmed the Application Status field has no dependencies or validation rules.
- Confirmed the existing Application Number display format was `APP-{000}` before the planned change.
- Identified the Auto Number edit settings for Display Format and Starting Number.
- Planned the format `APP-{00000}` with Starting Number `1`.
- Left **Generate Auto Number for existing records** unchecked.

### Important architecture finding

The business model calls the applicant a Candidate, but the current Candidate Application relationship points to the standard Salesforce **Contact** object. The custom Candidate object also exists. No duplicate relationship was created and no object was deleted.

### Pending verification

- Confirm that the Application Number format change was saved successfully.
- Confirm whether Candidate Application records already exist.
- Verify Candidate tab/navigation and the actual record-entry object used by the working app.
- Audit Programme fields and picklist values.
- Audit Compliance Document picklist values and end-to-end file handling.
- Verify validation rules and flows in the new org rather than assuming older-org configuration exists.
- Test application creation end to end.
- Build/test reports and dashboard.

### Documentation created

- `documentation/new-org-baseline.md`
- `documentation/data-model.md`
- `documentation/configuration-notes.md`
- `documentation/requirements.md`
- `testing/test-plan.md`

### Repository update rule

Whenever the user says **"update github"**, use the latest confirmed Salesforce work to update this repository and development log. Do not claim unfinished or unverified configuration as complete.
