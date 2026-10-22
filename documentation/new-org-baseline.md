# New Salesforce Org — Baseline and Implementation Record

**Project:** Mfanageza Trading & Projects CRM Solution  
**Org:** New Salesforce Developer Edition org used for the current implementation  
**Owner:** Kabelo Gopane  
**Baseline date:** 22 October 2026  
**Status:** Foundation audit and configuration in progress

## Purpose

This document records what has actually been confirmed in the new Salesforce org. It is deliberately separate from older Salesforce work so that unfinished or different configuration from previous orgs is not presented as completed in the new org.

## Core architecture currently confirmed

```text
Candidate
(custom Candidate object exists)
        │
        │  IMPORTANT: Candidate Application currently looks up to Contact
        ▼
Candidate Application
        │
        ├── Programme (Lookup → Programme)
        ├── Application Number (Auto Number)
        ├── Application Status (Picklist)
        ├── Application Date
        ├── Programme Type
        └── Start Date

Compliance Documents
        └── planned/confirmed as part of the application architecture; relationship and upload workflow still require end-to-end verification in this new org.
```

### Architecture decision to preserve

The intended business model treats a person applying for a programme as a **Candidate**. In the current new org, the custom **Candidate** object exists, but the **Candidate Application → Candidate** field is confirmed to be `Lookup(Contact)`, not `Lookup(Candidate)`.

Therefore, the current technical relationship is:

```text
Contact → Candidate Application → Programme
```

Do **not** create another Candidate lookup or delete the existing custom Candidate object until the navigation and record-entry design has been fully audited.

## Confirmed new-org objects

### 1. Candidate

A custom Candidate object exists.

Previously confirmed fields include:

- Candidate Name — Text(80)
- Email — Email
- Employment Status — Picklist
- Phone — Phone
- Province — Picklist
- SA ID Number — Text(13)
- Created By
- Last Modified By
- Owner

Additional qualification/privacy fields were discussed but are **not treated as confirmed** until they appear in the current Fields & Relationships list.

### 2. Candidate Application / Application

The custom application object exists and currently has 11 fields in Fields & Relationships:

| Field Label | API Name | Data Type | Status |
|---|---|---|---|
| Application Date | `Application_Date__c` | Date | Confirmed |
| Application Number | `Application_Number__c` | Auto Number | Confirmed |
| Application Status | `Application_Status__c` | Picklist | Confirmed |
| Candidate | `Candidate__c` | Lookup(Contact) | Confirmed |
| Candidate Application Name | `Name` | Text(80) | Confirmed |
| Created By | `CreatedById` | Lookup(User) | Confirmed |
| Last Modified By | `LastModifiedById` | Lookup(User) | Confirmed |
| Owner | `OwnerId` | Lookup(User, Group) | Confirmed |
| Programme | `Programme__c` | Lookup(Programme) | Confirmed |
| Programme Type | `Programme_Type__c` | Picklist | Confirmed |
| Start Date | `Start_Date__c` | Date | Confirmed |

### 3. Programme

The custom Programme object exists.

Confirmed fields from the current new-org audit include:

- Programme Name — Text(80)
- Capacity — Number(4,0)
- NQF Level — Number(5,0)
- SETA — Picklist
- Start Date — Date
- End Date — Date
- Status — Picklist
- Programme Type — discussed/created in the current implementation and must remain subject to the latest field-list audit if its exact current state is needed.

### 4. Compliance Document

The custom Compliance Document object exists.

Confirmed fields:

- Candidate Application — Master-Detail(Candidate Application)
- Compliance Document Name — Text(80)
- Document Type — Picklist
- Rejection Reason — Text Area(255)
- Upload Date — Date
- Verification Date — Date
- Verification Status — Picklist
- Created By
- Last Modified By

The object relationship exists at the data-model level, but the complete file-upload and verification journey still needs end-to-end testing in the new org.

## Candidate Application — Application Status

The current Application Status picklist contains exactly these seven active values:

1. New
2. Under Review
3. Compliance Review
4. Documents Required
5. Approved
6. Enrolled
7. Rejected

Field settings confirmed:

- Required: No
- Default value: None
- Restricted picklist: Yes
- Field dependencies: None
- Validation rules on the field: None

These are the current values in the new org. Older project notes may contain different status lists; those older lists must not overwrite this baseline without an explicit configuration change.

## Application Number

The field `Application_Number__c` is an Auto Number field.

### Last confirmed existing configuration

- Display Format: `APP-{000}`
- External ID: unchecked
- Field label: Application Number
- API name: `Application_Number__c`

### Intended configuration being applied

- Display Format: `APP-{00000}`
- Starting Number: `1`
- Generate Auto Number for existing records: unchecked

**Important:** The edit screen exposed Starting Number and the checkbox. The change to `APP-{00000}` and Starting Number `1` must be considered **pending until the Save action is confirmed** in the Salesforce org. Do not document it as fully saved without that confirmation.

## Confirmed relationships

| From | Field | To | Relationship |
|---|---|---|---|
| Candidate Application | `Candidate__c` | Contact | Lookup |
| Candidate Application | `Programme__c` | Programme | Lookup |
| Compliance Document | `Candidate_Application__c` | Candidate Application | Master-Detail |

## Not yet confirmed in the new org

The following must not be marked as completed until directly verified:

- Candidate tab/navigation points to the intended object
- Candidate record-entry form used by the working app
- Candidate qualification fields
- Candidate citizenship/residency field
- Candidate disability field
- POPIA consent field
- Exact Programme Type picklist values
- Exact Programme Status picklist values
- Exact SETA picklist values
- Compliance Document picklist values
- End-to-end file upload
- Candidate Application sample records
- End-to-end application creation
- Validation rules
- Record-triggered flows
- Email notifications
- Reports
- Dashboards
- Candidate portal/Experience Cloud connection
- Final end-to-end demo

## Working rule for future updates

When the user says **"update github"**, update this repository using the latest confirmed Salesforce work. Do not invent completion. Maintain clear labels such as **Confirmed**, **In Progress**, **Pending Verification**, and **Planned**.

Also update the relevant documentation and development log rather than only changing the README.
