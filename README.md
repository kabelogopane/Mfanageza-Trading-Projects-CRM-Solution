# Mfanageza Trading & Projects CRM Solution

## Salesforce Candidate & Learnership Management CRM

**Role:** Salesforce Administrator & Business Analyst  
**Platform:** Salesforce Lightning Experience  
**Project status:** In active development  
**Repository owner:** Kabelo Gopane

---

## Project in simple English

This project is a Salesforce CRM for managing people who apply for training and skills-development programmes.

The system is being built to keep candidate information, applications, programmes and compliance documents in one place.

The main business process is:

**Candidate → Application → Programme → Compliance → Verification → Decision / Enrolment → Reporting**

The immediate goal is simple: **make the core system work from beginning to end before adding advanced features.**

> **Important:** GitHub documents the project. The current Salesforce org is the source of truth for what is actually configured. A feature is only marked complete when it has been confirmed in the current org and tested where testing is required.

---

## Current New-Org Architecture

```text
CONTACT
(Business role: Candidate)
       │
       │ Lookup
       ▼
CANDIDATE APPLICATION
       │
       ├──────────────► PROGRAMME
       │
       └──────────────► COMPLIANCE DOCUMENTS
```

### Important architecture finding

A custom **Candidate** object also exists in the new org. However, the current **Candidate Application → Candidate** field is verified as `Lookup(Contact)`.

Therefore the current technical relationship is:

**Contact (business role: Candidate) → Candidate Application → Programme**

The custom Candidate object has not been deleted, and no duplicate Candidate relationship has been created while the architecture is being reviewed.

---

# Main Objects

## 1. Candidate

The Candidate object is intended to store information about the person applying.

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

## 2. Programme

The Programme object stores information about programmes that candidates can apply for.

Phase 1 fields are:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

The final latest picklist configuration still needs an audit.

## 3. Candidate Application

The Candidate Application object represents the application submitted by a candidate.

Confirmed fields:

| Field | API Name | Type |
|---|---|---|
| Application Date | `Application_Date__c` | Date |
| Application Number | `Application_Number__c` | Auto Number |
| Application Status | `Application_Status__c` | Picklist |
| Candidate | `Candidate__c` | Lookup(Contact) |
| Candidate Application Name | `Name` | Text(80) |
| Created By | `CreatedById` | Lookup(User) |
| Last Modified By | `LastModifiedById` | Lookup(User) |
| Owner | `OwnerId` | Lookup(User, Group) |
| Programme | `Programme__c` | Lookup(Programme) |
| Programme Type | `Programme_Type__c` | Picklist |
| Start Date | `Start_Date__c` | Date |

### Application Status

Current confirmed values:

1. New
2. Under Review
3. Compliance Review
4. Documents Required
5. Approved
6. Enrolled
7. Rejected

### Application Number

`Application_Number__c` is an Auto Number field.

The last confirmed display format was:

```text
APP-{000}
```

The intended format is:

```text
APP-{00000}
```

with Starting Number `1`.

Final save confirmation is still pending.

## 4. Compliance Document

The Compliance Document object tracks documents connected to an application.

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

The Candidate Application relationship is **Master-Detail**.

The full document upload and verification process still needs end-to-end testing.

---

# Core Data Model

```text
Contact
  │
  │ Candidate Application.Candidate__c
  ▼
Candidate Application
  │
  ├── Programme__c ─────────► Programme
  │
  └── Candidate_Application__c
              │
              ▼
      Compliance Document
```

---

# Phase 1 — Minimum Working System

Phase 1 is successful when we can:

1. Create or identify a candidate.
2. Create a programme.
3. Create a candidate application.
4. Connect the application to the candidate.
5. Connect the application to the programme.
6. Add compliance documents.
7. Update document verification status.
8. Update application status.
9. View the connected records.
10. Complete the basic process without errors.

The working approach is:

**Build → Test → Find problems → Fix → Test again → Improve**

---

# Project Status

## Confirmed

- New Salesforce org is being audited from the actual configuration.
- Candidate custom object exists.
- Candidate Application exists.
- Programme exists.
- Compliance Document exists.
- Candidate Application → Contact lookup exists.
- Candidate Application → Programme lookup exists.
- Compliance Document → Candidate Application Master-Detail exists.
- Application Number Auto Number exists.
- Application Status picklist exists with seven active values.

## In Progress / Pending Verification

- Final Application Number format save confirmation.
- Candidate navigation and record-entry architecture.
- Programme configuration audit.
- Compliance Document configuration audit.
- End-to-end application creation test.
- End-to-end compliance document test.
- Validation rules.
- Automation/flows.
- Reports and dashboard.
- Final end-to-end demonstration.

## Planned

- Candidate-facing portal integration.
- Salesforce Experience Cloud configuration.
- Candidate-specific application access.
- Document upload through the candidate experience.
- Operational reporting and management dashboard.
- Final portfolio screenshots and case study.

---

# Development Phases

### Phase 1 — CRM Foundation

- Candidate management
- Candidate Application
- Programme
- Compliance Document
- Custom fields
- Lookup relationships
- Custom tabs/navigation

### Phase 2 — Data Quality

- Validation rules
- Date checks
- Programme requirement checks
- Better required-field design

### Phase 3 — Automation

- Application status automation
- Compliance automation
- Appropriate notifications

### Phase 4 — Candidate Portal

- Candidate-facing website
- Salesforce Experience Cloud
- Application submission
- Candidate-specific application status
- Document upload
- Permissions and sharing

### Phase 5 — Data Management

- Sample data
- CSV preparation
- Salesforce import
- Field mapping
- Relationship testing

### Phase 6 — Reporting

- Operational reports
- Management dashboard
- Dashboard testing

### Phase 7 — Portfolio Documentation

- Screenshots
- Configuration decisions
- Problems and solutions
- Testing evidence
- Final case study

---

# Documentation

The project is documented in simple English in the following files:

- [`documentation/project-overview.md`](documentation/project-overview.md) — complete project overview.
- [`documentation/new-org-baseline.md`](documentation/new-org-baseline.md) — verified new-org baseline.
- [`documentation/data-model.md`](documentation/data-model.md) — objects, fields and relationships.
- [`documentation/configuration-notes.md`](documentation/configuration-notes.md) — configuration decisions and audit notes.
- [`documentation/requirements.md`](documentation/requirements.md) — business and system requirements.
- [`testing/test-plan.md`](testing/test-plan.md) — test cases and expected results.
- [`DEVELOPMENT_LOG.md`](DEVELOPMENT_LOG.md) — chronological development history.

The repository separates **Confirmed**, **Tested**, **In Progress**, **Pending Verification**, and **Planned** work.

---

# Candidate Portal

A responsive public-facing candidate portal website is also part of the repository.

The intended architecture is:

```text
Candidate
   ↓
Candidate Portal Website
   ↓
Salesforce Experience Cloud
   ↓
Salesforce CRM
```

The website front end exists, but the live Salesforce connection is **not claimed as complete** until Experience Cloud, permissions, application submission, document upload and record access are tested.

---

# Security and Privacy

The system may contain personal information such as names, email addresses, phone numbers and South African ID numbers.

Security, privacy and access control therefore need to be considered before production use.

The project context also includes POPIA and PAIA requirements. This repository does not claim legal compliance; a proper legal and security review would be required before production deployment.

---

# Business Value

The intended solution should help reduce manual administration, improve candidate data quality, make compliance tracking easier, improve application visibility and provide a foundation for automation and reporting.

---

# Author

**Kabelo Gopane**  
Salesforce Administrator | Business Analyst | CRM Enthusiast

This is a portfolio project demonstrating practical Salesforce administration, CRM design, business analysis, data management, testing, automation planning, reporting and problem-solving.
