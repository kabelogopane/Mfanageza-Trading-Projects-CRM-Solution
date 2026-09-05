# Mfanageza Trading & Projects CRM — Project Journey

This document records the development journey of the Salesforce CRM as a portfolio project. It focuses on what was built, the decisions made, the problems encountered, and the next stage of development.

## Starting Point

The project started before a dedicated Salesforce App existed. I worked directly inside Salesforce while learning how Salesforce objects, fields, relationships and records could represent a real business process.

The goal was to move away from a simple collection of records and build a practical CRM for managing candidates and learnership applications.

## Stage 1 — Understand the Business Process

The core process was defined as:

**Candidate → Candidate Application → Programme → Compliance Documents → Verification → Communication → Reporting**

The design separates the person from the application and separates a programme from the type of programme.

## Stage 2 — Candidate Management

Salesforce **Contact** was selected to represent candidates.

This avoided creating a separate Candidate object when the standard Contact object could represent the person.

Candidate information includes information such as name, email, mobile number, ID number and province.

## Stage 3 — Candidate Application

A custom **Candidate Application** object was created to represent an individual application.

Key configuration included:

- Application Number — Auto Number
- Application Date
- Application Status
- Candidate — Lookup to Contact
- Employment Status
- Province
- SETA
- SETA Registration Status
- Start Date
- Programme Type
- Programme Lookup

The test record **APP-00001** was used during development.

Its documented test data included:

- Candidate: Mpho Lesiba
- Application Date: 2026/08/28
- Start Date: 2026/10/05
- Province: Gauteng
- Employment Status: Unemployed
- SETA: MICT SETA
- SETA Registration Status: Submitted
- Programme Type: Learnership
- Programme: IT Systems Development

## Stage 4 — Programme Management

A custom **Programme** object was created because a programme is a separate business entity.

Fields configured included:

- Programme Type
- SETA
- NQF Level
- Start Date
- End Date
- Capacity
- Status

Test programmes included:

- IT Systems Development
- IT Technical Support
- Cybersecurity
- Data Analytics

A key design improvement was distinguishing:

**Programme Type = Learnership**

from:

**Programme = IT Systems Development**

## Stage 5 — Compliance Documents

A **Compliance Document** custom object was created to track supporting documents.

The test application was linked to multiple documents, demonstrating the relationship between an application and its compliance records.

Documents used during testing included:

- Identity Document
- CV
- Matric Certificate
- Proof of Residence

The document process includes verification information such as status, rejection reason, upload date, verification date and verifier.

## Stage 6 — Salesforce App and Navigation

The project then moved from working directly with individual Salesforce objects to creating an easier administrator experience through a Lightning App.

The navigation was designed around:

- Home
- Contacts
- Candidate Applications
- Programmes
- Reports
- Dashboards

### Navigation problem

Candidate Applications existed but was not visible in the expected application navigation.

The problem was investigated and solved by configuring a Custom Object Tab and adding Candidate Applications to the Lightning App navigation.

### What this taught me

A custom object can exist in Salesforce without automatically appearing where an end user expects it. Salesforce object setup, tabs and app navigation are separate configuration layers.

## Stage 7 — Programme Field and Relationship Troubleshooting

Candidate Application originally had a **Programme** Picklist. A Lookup relationship to the Programme object was later required.

Salesforce prevented a duplicate field name.

The solution was to use:

- **Programme Type** — Picklist
- **Programme Lookup** — Lookup relationship to Programme

A duplicate lookup field was also encountered. Salesforce initially prevented deletion because the field was still referenced on a Lightning Record Page. The dependency was removed before cleanup continued.

### What this taught me

Salesforce configuration components can depend on one another. Before deleting a field, it is necessary to identify where that field is being used.

## Stage 8 — Data Quality

Three validation rules were created.

### Application date

The application date cannot be in the future.

```text
Application_Date__c > TODAY()
```

### Submitted application

A submitted application requires a Programme Lookup.

```text
AND(
    ISPICKVAL(Application_Status__c, "Submitted"),
    ISBLANK(Programme_Lookup__c)
)
```

### Start date

The Start Date cannot be earlier than the Application Date.

```text
Start_Date__c < Application_Date__c
```

### Why this matters

These rules demonstrate that the CRM is designed to enforce business logic and data quality instead of simply storing whatever a user enters.

## Stage 9 — Automation

A Record-Triggered Flow was started for Candidate Application status automation.

The intended logic is:

```text
SETA Registration Status = Submitted
        +
Programme selected
        +
Application Status = New
        ↓
Application Status = Submitted
```

The Flow reached the Assignment stage and still needs to be completed and tested.

The compliance rejection notification process has also been identified as an automation requirement, but it should not be documented as fully implemented until it is built and successfully tested.

## Stage 10 — Data Import

The project also needs to support existing business data stored in Excel.

The planned data process is:

```text
Excel → CSV → Salesforce Import → Field Mapping → Data Quality Checks → Salesforce Records
```

This will provide practical evidence of Salesforce data management and migration skills.

## Stage 11 — SETA, UIF and SARS Requirements

The CRM is being designed around South African training and learnership administration.

SETA information is already represented in the Programme and Candidate Application design.

UIF-related information and supporting documents have been identified as possible future requirements.

A SARS tax-number field has also been identified as a possible candidate/application requirement because tax information may be requested in relevant administrative or employment processes.

These items are requirements under consideration and are not claimed as fully implemented until the relevant Salesforce fields, security, validation and workflows are actually configured and tested.

## Stage 12 — Reports and Dashboards

The next reporting stage is to create operational reports and a management dashboard.

Planned reports:

- Applications by Status
- Applications by Programme
- Applications by Province
- Applications by SETA
- Applications by Employment Status
- Compliance Documents by Status
- Approved Documents
- Rejected Documents
- Documents Awaiting Verification
- Candidates Ready for SETA Registration

Planned dashboard indicators:

- Total Applications
- Application Status
- Programme Distribution
- Province Distribution
- Compliance Progress
- Programme Capacity

## Stage 13 — Administrator Experience

The internal Salesforce administrator should be able to manage the complete process from one Lightning App.

```text
Administrator
     ↓
Candidates
     ↓
Applications
     ↓
Programmes
     ↓
Compliance
     ↓
Automation
     ↓
Reports & Dashboards
```

The objective is to make normal business work possible without requiring the administrator to use Salesforce Setup for every task.

## Stage 14 — Candidate Experience

After the internal CRM process is stable, a candidate-facing experience can be designed.

The proposed journey is:

```text
Candidate
   ↓
Registration / Application
   ↓
Application Reference
   ↓
Document Submission
   ↓
Review
   ↓
Approved / Rejected
   ↓
Correction if required
   ↓
Application Progress
```

A candidate portal or Experience Cloud implementation is a future stage, not a completed feature at the current documentation point.

## Development Lessons

The project has taught me that Salesforce administration is not only about creating objects and fields. It also involves:

- Understanding the business process
- Designing relationships correctly
- Protecting data quality
- Understanding configuration dependencies
- Troubleshooting Salesforce errors
- Designing user navigation
- Planning automation
- Managing data imports
- Testing before calling a feature complete
- Documenting both successful work and problems encountered

## Portfolio Evidence Plan

For each major Salesforce feature, I will capture:

1. Requirement
2. Configuration
3. Screenshot
4. Test data
5. Expected result
6. Actual result
7. Problem encountered, if any
8. Solution
9. Business benefit
10. Final status

## Current Status

| Area | Status |
|---|---|
| Candidate / Contact model | Implemented |
| Candidate Application | Implemented |
| Programme object | Implemented |
| Compliance Document object | Implemented / tested relationship |
| Lookup relationships | Implemented |
| Lightning App navigation | Implemented |
| Validation rules | Implemented |
| Candidate Application status Flow | In Progress |
| Compliance automation | Planned / to be verified |
| Excel / CSV import testing | Planned |
| Reports | Planned |
| Dashboard | Planned |
| Candidate-facing portal | Future stage |
| Full testing | Not yet complete |
| Screenshot documentation | Ongoing |

## Portfolio Goal

The final project should demonstrate a complete story:

**Business problem → Requirements → Data model → Salesforce configuration → Data quality → Automation → Data import → Reporting → User experience → Testing → Documentation**

The purpose is not to present the project as finished before it is finished. The purpose is to show a genuine Salesforce Administrator learning and implementation journey, including decisions, troubleshooting and continuous improvement.
