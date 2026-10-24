# Development Log

## 2026-10-24 — Full Project Documentation Baseline

### Objective

Document the full Mfanageza Candidate Application project in simple English and keep GitHub aligned with the current Salesforce work.

### Project documented

The project is a Salesforce CRM for managing candidates who apply for training and skills-development programmes.

The main business journey is:

```text
Candidate → Candidate Application → Programme → Compliance Documents → Verification → Decision / Enrolment → Reporting
```

### Main Salesforce objects

- Candidate
- Programme
- Candidate Application
- Compliance Document

### Candidate

The Candidate object exists in the new org.

Known fields include:

- Candidate Name
- Email
- Phone
- SA ID Number
- Province
- Employment Status
- Created By
- Last Modified By
- Owner

### Candidate Application

The current object contains 11 confirmed fields:

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

Confirmed relationships:

- `Candidate__c` → Lookup(Contact)
- `Programme__c` → Lookup(Programme)

Confirmed configuration:

- `Application_Number__c` → Auto Number
- `Application_Status__c` → restricted Picklist

Current Application Status values:

1. New
2. Under Review
3. Compliance Review
4. Documents Required
5. Approved
6. Enrolled
7. Rejected

### Programme

The Programme object exists.

The Phase 1 business fields are:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

The final current picklist configuration still needs an audit.

### Compliance Document

The Compliance Document object exists.

Known fields include:

- Compliance Document Name
- Candidate Application
- Document Type
- Verification Status
- Upload Date
- Verification Date
- Rejection Reason
- Created By
- Last Modified By

The Candidate Application relationship is Master-Detail.

The end-to-end document process is not yet marked as tested.

### Important architecture decision

The business role is called Candidate, but the current application lookup points to the standard Salesforce Contact object.

A custom Candidate object also exists.

No duplicate Candidate relationship was created and the custom Candidate object was not deleted while the architecture is being reviewed.

This is important because the project must not accidentally create two competing ways to identify a candidate.

### Phase 1 goal

The first working version must prove this process:

1. Create or identify a candidate.
2. Create a programme.
3. Create a candidate application.
4. Connect the application to the candidate.
5. Connect the application to the programme.
6. Add compliance documents.
7. Verify or update documents.
8. Update application status.
9. View connected records.
10. Confirm the process works.

### Current status

**Confirmed:**

- New Salesforce org is being used as the configuration source of truth.
- Candidate custom object exists.
- Candidate Application exists.
- Programme exists.
- Compliance Document exists.
- Candidate Application → Contact lookup exists.
- Candidate Application → Programme lookup exists.
- Compliance Document → Candidate Application Master-Detail exists.
- Application Number Auto Number exists.
- Application Status picklist exists with seven active values.

**Pending verification:**

- Final Application Number format save.
- Final Candidate navigation and record-entry architecture.
- Final Programme field and picklist configuration.
- Final Compliance Document configuration.
- End-to-end application creation.
- End-to-end document upload/verification.
- Validation rules.
- Flows/automation.
- Reports and dashboard.
- Final demonstration.

### Documentation added or maintained

- `documentation/project-overview.md` — complete project overview in simple English.
- `documentation/new-org-baseline.md` — verified new-org baseline.
- `documentation/data-model.md` — objects, fields and relationships.
- `documentation/configuration-notes.md` — configuration decisions and audit notes.
- `documentation/requirements.md` — business and system requirements.
- `testing/test-plan.md` — test cases and expected results.
- `DEVELOPMENT_LOG.md` — chronological project history.

### Documentation rule

GitHub must distinguish between work that is **Confirmed**, **Tested**, **In Progress**, **Pending Verification**, and **Planned**.

A feature must not be called complete only because it was discussed or planned. It should be confirmed in the current Salesforce org and tested when testing is required.

### Repository update rule

Whenever the user says **"update github"**, use the latest confirmed Salesforce work to update this repository and development log. Do not claim unfinished or unverified configuration as complete.
