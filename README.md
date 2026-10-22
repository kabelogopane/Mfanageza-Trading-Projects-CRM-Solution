# Mfanageza Trading & Projects CRM Solution

## Salesforce Candidate & Learnership Management CRM

**Role:** Salesforce Administrator & Business Analyst  
**Platform:** Salesforce Lightning Experience  
**Project status:** In active development  
**Repository owner:** Kabelo Gopane

---

## Project Overview

The **Mfanageza Trading & Projects CRM Solution** is a Salesforce portfolio project designed around a South African training, recruitment and skills-development environment.

The goal is to build a practical CRM that manages candidates, applications, programmes and compliance documentation while demonstrating hands-on Salesforce administration, data modelling, business analysis, data quality, automation, reporting and problem-solving.

The main business journey is:

**Candidate → Application → Programme → Compliance → Verification → Decision / Enrolment → Reporting**

> **Important:** This repository separates the current **new Salesforce org** from older project work. A feature is only marked complete when it has been confirmed in the current org and, where appropriate, tested.

---

## Current New-Org Architecture

```text
                         CONTACT
                       (Candidate)
                            │
                            │ Lookup
                            ▼
                 CANDIDATE APPLICATION
                            │
                 ┌──────────┼──────────┐
                 │          │          │
                 ▼          ▼          ▼
            PROGRAMME   APPLICATION   COMPLIANCE
             LOOKUP        DATA       DOCUMENTS
                 │
                 ▼
          Programme Details
```

### Important architecture finding

A custom **Candidate** object also exists in the new org. However, the current **Candidate Application → Candidate** field is verified as `Lookup(Contact)`.

Therefore the current technical relationship is:

**Contact (business role: Candidate) → Candidate Application → Programme**

The custom Candidate object has not been deleted, and no duplicate Candidate relationship has been created while the architecture is being audited.

---

## New Salesforce Org — Confirmed Foundation

### Candidate

A custom **Candidate** object exists.

Previously confirmed fields include:

- Candidate Name
- Email
- Employment Status
- Phone
- Province
- SA ID Number
- Created By
- Last Modified By
- Owner

Additional candidate fields are not marked complete until they appear in the latest Fields & Relationships audit.

### Candidate Application

The custom application object currently has these 11 fields:

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

The current active values are:

1. New
2. Under Review
3. Compliance Review
4. Documents Required
5. Approved
6. Enrolled
7. Rejected

The field is a restricted picklist, is not required, has no default value, has no dependencies and currently has no validation rules defined on the field itself.

### Application Number

`Application_Number__c` is an Auto Number field.

The last confirmed existing display format was:

```text
APP-{000}
```

The intended format being configured is:

```text
APP-{00000}
```

with Starting Number `1` and **Generate Auto Number for existing records** left unchecked.

**Save confirmation remains pending until verified in Salesforce.**

### Programme

The custom Programme object exists and includes fields for programme name, capacity, NQF level, SETA, start date, end date and status. Programme Type has also been part of the current implementation, but the exact latest picklist configuration still requires an audit before it is treated as final.

### Compliance Document

The custom Compliance Document object exists with:

- Candidate Application — Master-Detail relationship
- Compliance Document Name
- Document Type
- Rejection Reason
- Upload Date
- Verification Date
- Verification Status
- Created By
- Last Modified By

The end-to-end document upload and verification journey remains to be tested in the new org.

---

## Confirmed Relationships

```text
Candidate Application.Candidate__c
        ↓
Contact
```

```text
Candidate Application.Programme__c
        ↓
Programme
```

```text
Compliance Document.Candidate_Application__c
        ↓
Candidate Application
```

---

## Current Development State

### Confirmed

- New Salesforce org is being audited from the actual configuration.
- Candidate custom object exists.
- Candidate Application custom object exists.
- Programme custom object exists.
- Compliance Document custom object exists.
- Candidate Application → Contact lookup exists.
- Candidate Application → Programme lookup exists.
- Compliance Document → Candidate Application Master-Detail exists.
- Application Number Auto Number exists.
- Application Status picklist exists with seven active values.

### In Progress / Pending Verification

- Final Application Number format save confirmation.
- Candidate navigation and record-entry architecture.
- Programme configuration audit.
- Compliance Document configuration audit.
- End-to-end application creation test.
- End-to-end compliance document test.
- Validation rules in the new org.
- Automation/flows in the new org.
- Reports and dashboard.
- Final end-to-end demonstration.

### Planned

- Candidate-facing portal integration.
- Salesforce Experience Cloud configuration.
- Candidate-specific application access.
- Document upload through the candidate experience.
- Operational reporting and management dashboard.
- Final portfolio screenshots and case study.

---

## Candidate Portal Website

A responsive public-facing **Candidate Portal website** has been added to this repository.

The intended architecture is:

```text
Candidate
   ↓
GitHub Pages Website
   ↓
Salesforce Experience Cloud
   ↓
Salesforce CRM
```

The website front end is implemented, but the live Salesforce connection is **not claimed as complete** until Experience Cloud, permissions, application submission, document upload and record access are tested.

See `docs/CANDIDATE-PORTAL.md` for the portal architecture and implementation plan where available.

---

## Development Documentation

The project documentation is being maintained alongside the Salesforce implementation:

- `documentation/new-org-baseline.md` — verified new-org baseline
- `documentation/data-model.md` — objects, fields and relationships
- `documentation/configuration-notes.md` — configuration decisions and audit notes
- `documentation/requirements.md` — business and system requirements
- `testing/test-plan.md` — test cases and expected results
- `DEVELOPMENT_LOG.md` — chronological development record

The repository should always distinguish **Confirmed**, **In Progress**, **Pending Verification**, and **Planned** work.

---

## Development Roadmap

### Phase 1 — CRM Foundation

- Candidate management
- Candidate Application
- Programme
- Compliance Document
- Custom fields
- Lookup relationships
- Custom tabs/navigation

### Phase 2 — Data Quality

- Application date validation
- Programme requirement validation
- Start/application date validation

### Phase 3 — Automation

- Candidate Application status automation
- Compliance automation
- Appropriate candidate notifications

### Phase 4 — Candidate Portal

- Public candidate website
- Salesforce Experience Cloud
- Application submission
- Candidate-specific application status
- Document upload
- User permissions and sharing

### Phase 5 — Data Management

- Sample Excel dataset
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

## Business Value

The intended solution is designed to reduce manual administration, improve candidate data quality, make compliance tracking easier, improve application visibility, reduce repetitive communication work and provide a scalable CRM foundation for future candidate services.

---

## Author

**Kabelo Gopane**  
Salesforce Administrator | Business Analyst | CRM Enthusiast

This is a portfolio project demonstrating hands-on Salesforce administration, CRM design, business analysis, data management, automation, reporting and problem-solving.
