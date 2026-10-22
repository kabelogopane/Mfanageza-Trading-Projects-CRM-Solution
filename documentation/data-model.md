# Salesforce Data Model — New Org

## Current verified model

```text
Contact
  │
  │ Candidate Application.Candidate__c
  ▼
Candidate Application
  │
  ├── Programme__c ─────────► Programme
  ├── Application_Number__c
  ├── Application_Status__c
  ├── Application_Date__c
  ├── Programme_Type__c
  └── Start_Date__c

Candidate Application
  │
  └── Candidate_Application__c
              ▼
      Compliance Document
```

## Important naming note

A custom **Candidate** object also exists in the new org. However, the current Candidate Application `Candidate__c` field is verified as `Lookup(Contact)`. Therefore the current technical application relationship uses **Contact**, while the business role is called **Candidate**.

This distinction is intentional in the documentation so future configuration does not accidentally create duplicate candidate relationships.

## Candidate Application fields

| Label | API Name | Type |
|---|---|---|
| Application Date | `Application_Date__c` | Date |
| Application Number | `Application_Number__c` | Auto Number |
| Application Status | `Application_Status__c` | Picklist |
| Candidate | `Candidate__c` | Lookup(Contact) |
| Candidate Application Name | `Name` | Text(80) |
| Programme | `Programme__c` | Lookup(Programme) |
| Programme Type | `Programme_Type__c` | Picklist |
| Start Date | `Start_Date__c` | Date |

System fields (Created By, Last Modified By, Owner) are also present.

## Application status values

- New
- Under Review
- Compliance Review
- Documents Required
- Approved
- Enrolled
- Rejected

## Programme

The Programme object is intended to hold programme-level information including:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

The exact current picklist values must be audited before they are treated as the final configuration.

## Compliance Document

The Compliance Document object is a child of Candidate Application through a Master-Detail relationship.

Current fields confirmed:

- Candidate Application
- Compliance Document Name
- Document Type
- Rejection Reason
- Upload Date
- Verification Date
- Verification Status

The file-upload mechanism and final verification process remain subject to testing.
