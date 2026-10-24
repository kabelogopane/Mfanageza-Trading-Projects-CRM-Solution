# Salesforce Data Model — New Org

## 1. Purpose

This document explains how the main Salesforce objects are connected in the current new org.

## 2. Current model

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

## 3. Important architecture note

A custom **Candidate** object also exists in the new org.

However, the current Candidate Application `Candidate__c` field is verified as **Lookup(Contact)**.

Therefore:

- the business role is called **Candidate**;
- the current technical application relationship uses **Contact**;
- the custom Candidate object still exists;
- no duplicate Candidate relationship has been created;
- the architecture should be reviewed before changing this relationship.

## 4. Candidate object

The Candidate object is intended to store candidate information.

Known Phase 1 fields:

| Field | Purpose |
|---|---|
| Candidate Name | Candidate name |
| Email | Candidate email |
| Phone | Candidate phone number |
| SA ID Number | South African ID number |
| Province | Candidate province |
| Employment Status | Candidate employment status |

Standard Salesforce fields such as Created By, Last Modified By and Owner are also present.

## 5. Candidate Application object

The Candidate Application represents an application submitted by a candidate.

| Label | API Name | Type |
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

## 6. Application Status

The current confirmed values are:

- New
- Under Review
- Compliance Review
- Documents Required
- Approved
- Enrolled
- Rejected

The field is a restricted picklist.

## 7. Application Number

`Application_Number__c` is an Auto Number field.

The previously confirmed display format was:

```text
APP-{000}
```

The intended new format is:

```text
APP-{00000}
```

with starting number `1`.

The final save still needs to be confirmed in Salesforce.

## 8. Programme object

The Programme object stores programme-level information.

Phase 1 requirements are:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

The exact current picklist configuration still needs to be audited before it is marked final.

## 9. Compliance Document object

Compliance Document is a child of Candidate Application.

The current relationship is:

**Compliance Document → Candidate Application = Master-Detail**

Known fields:

- Compliance Document Name
- Candidate Application
- Document Type
- Verification Status
- Upload Date
- Verification Date
- Rejection Reason
- Created By
- Last Modified By

The complete document upload and verification process remains subject to testing.

## 10. Why the relationships matter

The relationships allow the system to answer simple business questions:

- Who submitted this application?
- Which programme did the candidate apply for?
- Which documents belong to this application?
- Which documents are still waiting for verification?
- What is the current application status?

## 11. Data-model rule

Do not add another Candidate relationship until the Contact-versus-Candidate architecture has been deliberately decided.

The goal is one clear source of truth for the applicant.
