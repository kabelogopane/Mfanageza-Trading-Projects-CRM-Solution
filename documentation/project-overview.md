# Mfanageza Candidate Application — Project Overview

## 1. Project name

**Mfanageza Trading & Projects CRM Solution — Salesforce Candidate Application**

## 2. Project purpose

This project is a Salesforce CRM for managing people who apply for training and skills-development programmes.

The system is designed to keep candidate information, applications, programmes and compliance documents in one place.

The first goal is simple: build a small working system and prove that the main process works from beginning to end.

## 3. Main business process

```text
Candidate
   ↓
Candidate Application
   ↓
Programme
   ↓
Compliance Documents
   ↓
Verification
   ↓
Application Decision / Enrolment
   ↓
Reporting
```

## 4. Main users

### Candidate

The Candidate is the person who fills in and submits an application.

### Organisation / Salesforce user

The organisation uses Salesforce to manage candidates, applications, programmes, documents and application status.

## 5. Main Salesforce objects

The project uses four main custom objects:

1. Candidate
2. Programme
3. Candidate Application
4. Compliance Document

### Important architecture note

The custom Candidate object exists in the new Salesforce org. However, the current Candidate Application `Candidate__c` field is confirmed as a **Lookup(Contact)**.

This means the current technical relationship is:

```text
Contact (business role: Candidate)
        ↓
Candidate Application
        ↓
Programme
```

The custom Candidate object has not been deleted and no second Candidate relationship has been created while the architecture is being reviewed.

## 6. Candidate

The Candidate object stores information about the person applying.

Known fields from the project work include:

- Candidate Name
- Email
- Phone
- SA ID Number
- Province
- Employment Status
- Created By
- Last Modified By
- Owner

## 7. Programme

The Programme object stores information about programmes that candidates can apply for.

The planned Phase 1 fields are:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

The exact latest Programme configuration still needs a final Salesforce audit before it is marked complete.

## 8. Candidate Application

The Candidate Application object represents an application submitted by a candidate.

The confirmed fields are:

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

The current confirmed values are:

1. New
2. Under Review
3. Compliance Review
4. Documents Required
5. Approved
6. Enrolled
7. Rejected

### Application Number

The field is an Auto Number field.

The last confirmed format before the planned change was:

```text
APP-{000}
```

The planned format is:

```text
APP-{00000}
```

with starting number `1`.

The final save of this change still needs confirmation in Salesforce.

## 9. Compliance Document

The Compliance Document object tracks documents linked to an application.

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

The Candidate Application relationship is a **Master-Detail** relationship.

The complete upload and verification process still needs end-to-end testing.

## 10. Relationships

```text
Contact
  │
  │ Candidate Application.Candidate__c
  ▼
Candidate Application
  │
  ├── Programme__c ─────────► Programme
  │
  └── Compliance Documents
          │
          └── Candidate_Application__c
```

## 11. What Phase 1 must prove

Phase 1 is successful when the following can be completed:

1. Create or identify a candidate.
2. Create a programme.
3. Create a candidate application.
4. Connect the application to the candidate.
5. Connect the application to the programme.
6. Add compliance documents.
7. Update document verification status.
8. Update application status.
9. View the connected records.
10. Confirm the basic process works without errors.

## 12. Later phases

### Phase 2 — Data quality

Add validation rules and improve field requirements.

### Phase 3 — Automation

Add Salesforce Flow and useful notifications or status automation.

### Phase 4 — Candidate Portal

Connect a candidate-facing experience to Salesforce.

### Phase 5 — Data management

Prepare sample data, CSV files, imports and field mapping.

### Phase 6 — Reporting

Create operational reports and management dashboards.

### Phase 7 — Portfolio presentation

Add screenshots, testing evidence, decisions, problems solved and a final case study.

## 13. Security and privacy

The system may contain personal information such as names, email addresses, phone numbers and South African ID numbers.

Security, privacy and access control must therefore be considered before the system is treated as production-ready.

The project context also includes the POPIA and PAIA requirements discussed during the project. This documentation does not claim legal compliance; a proper legal and security review would be needed for production use.

## 14. Testing approach

Do not mark a feature as complete only because it exists in Salesforce Setup.

A feature should be marked **Confirmed** only when the current org configuration has been checked and, where appropriate, the feature has been tested.

Use these labels throughout the project:

- **Confirmed** — checked in the current org.
- **Tested** — checked and successfully used in a test.
- **In Progress** — currently being configured.
- **Pending Verification** — expected or planned but not yet confirmed.
- **Planned** — future work.

## 15. Current goal

The immediate goal is not to build every advanced feature.

The immediate goal is to prove that the core CRM works.

```text
Build → Test → Find problems → Fix → Test again → Improve
```

## 16. Portfolio value

This project demonstrates practical Salesforce skills including:

- business analysis;
- data modelling;
- custom objects;
- custom fields;
- relationships;
- picklists;
- Auto Number fields;
- page layouts;
- data quality;
- testing;
- automation planning;
- reporting planning;
- security and privacy awareness;
- project documentation.

## 17. Source of truth

The current Salesforce org is the source of truth for configuration status.

GitHub is the source of truth for the project documentation, decisions, development history, testing records and portfolio evidence.
