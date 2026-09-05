# Mfanageza Trading & Projects CRM Solution

## Salesforce Candidate & Learnership Management CRM

**Role:** Salesforce Administrator & Business Analyst  
**Platform:** Salesforce Lightning Experience  
**Project status:** In active development  
**Repository owner:** Kabelo Gopane

---

## 1. Project Overview

The **Mfanageza Trading & Projects CRM Solution** is a Salesforce portfolio project designed around a South African training, recruitment and skills-development environment.

The project started as a practical Salesforce learning exercise: instead of only completing Trailhead exercises, I wanted to build a system that could solve a realistic business problem. The solution has grown from manually creating and testing Salesforce records into a structured CRM with a candidate, application, programme and compliance data model.

The main goal is to digitise and improve the candidate journey:

**Candidate → Application → Programme → Compliance → Verification → Communication → Reporting**

The CRM is being designed to reduce manual administration, improve data quality, make candidate information easier to manage, and give administrators better visibility of the application process.

> **Portfolio note:** Features are marked as **Implemented**, **In Progress**, or **Planned** so the repository reflects the actual development stage rather than claiming unfinished functionality as complete.

---

## 2. How the Project Started

The project began before there was a dedicated Salesforce Lightning App. I initially worked directly inside Salesforce, creating records and learning how the platform's objects, fields and relationships worked.

The early work focused on understanding the business process and testing how candidate information could be organised.

The project then developed into a more complete CRM design with:

- Candidate management
- Candidate Applications
- Programme management
- Compliance Documents
- Relationships between records
- Data validation
- Salesforce navigation
- Automation planning
- Reporting and dashboards
- A future candidate-facing experience

Creating the Salesforce App became an important milestone because it made the CRM easier for an administrator to navigate instead of working across disconnected objects.

---

## 3. Business Problem

A training and recruitment organisation can receive many candidate applications and supporting documents. Managing this information manually can create problems such as:

- Candidate information being entered repeatedly
- Difficulty tracking application status
- Difficulty knowing which documents have been submitted
- Missing or rejected documents delaying processing
- Manual follow-ups with candidates
- Poor visibility for management
- Time-consuming reporting
- Data-quality errors

The CRM is intended to provide one structured Salesforce environment for managing this process.

---

## 4. Current Salesforce Data Model

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
            PROGRAMME   COMPLIANCE   APPLICATION
             LOOKUP     DOCUMENTS       DATA
                 │          │
                 ▼          ▼
          IT Systems     ID / CV /
          Development    Matric /
                         Residence
```

### Candidate / Contact

I use Salesforce's standard **Contact** object to represent a candidate rather than creating a separate Candidate object unnecessarily.

Candidate information can include:

- First Name
- Last Name
- Email
- Mobile Number
- South African ID Number
- Province
- Programme-related information

### Candidate Application

The **Candidate Application** custom object represents an individual application submitted by a candidate.

Important fields configured during the project include:

- Application Number — Auto Number
- Application Date — Date
- Application Status — Picklist
- Candidate — Lookup to Contact
- Employment Status — Picklist
- Province — Picklist
- SETA — Picklist
- SETA Registration Status — Picklist
- Start Date — Date
- Programme Type — Picklist
- Programme Lookup — Lookup to Programme

Example test record:

```text
Application Number: APP-00001
Candidate: Mpho Lesiba
Application Status: New
Programme Type: Learnership
Programme: IT Systems Development
Application Date: 2026/08/28
Start Date: 2026/10/05
Province: Gauteng
Employment Status: Unemployed
SETA: MICT SETA
SETA Registration Status: Submitted
```

### Programme

A separate **Programme** custom object was created because a programme is a business entity of its own.

Configured fields include:

- Programme Type
- SETA
- NQF Level
- Start Date
- End Date
- Capacity
- Status

Example programmes used for testing include:

- IT Systems Development
- IT Technical Support
- Cybersecurity
- Data Analytics

A key data-modelling improvement was separating **Programme Type** from the actual **Programme** record.

For example:

```text
Programme Type = Learnership
Programme = IT Systems Development
```

This is more accurate than storing "Learnership" as the programme itself.

### Compliance Documents

The **Compliance Document** custom object is used to track documents associated with an application/candidate.

The document process is designed around records such as:

- Certified ID Copy
- CV
- Matric Certificate
- Proof of Residence

Document information can include:

- Document Type
- Verification Status
- Rejection Reason
- Upload Date
- Verification Date
- Verified By
- Candidate/Application relationship

The working test application, **APP-00001**, has been used to demonstrate the related-document relationship and has had four compliance document records associated with it.

---

## 5. Salesforce Navigation / App Development

A major stage of the project was moving from working directly with individual Salesforce objects to creating a dedicated Lightning App experience.

The navigation is intended to make the administrator's work easier:

```text
Mfanageza CRM
│
├── Home
├── Contacts
├── Candidate Applications
├── Programmes
├── Reports
└── Dashboards
```

### Problem solved: Candidate Applications was not visible

The Candidate Application object existed, but it was not immediately available in the application navigation.

The issue was investigated and resolved by creating/configuring the required **Custom Object Tab** and adding **Candidate Applications** to the Lightning App navigation.

This demonstrated an important Salesforce administration concept:

**Custom Object → Custom Object Tab → Lightning App Navigation**

### Problem solved: Programme field conflict

Candidate Application initially had a field called **Programme** as a Picklist. Later, a Lookup relationship to the Programme object was required.

Salesforce prevented a duplicate field name.

The solution was to distinguish between:

- **Programme Type** — Picklist, for values such as Learnership
- **Programme Lookup** — Lookup relationship to an actual Programme record

A duplicate lookup was also encountered and removed after identifying that it was being used on the Lightning Record Page.

This was an important troubleshooting and Salesforce configuration lesson.

---

## 6. Data Quality and Validation Rules

Three validation rules were created during the project.

### 1. Application Date Cannot Be in the Future

```text
Application_Date__c > TODAY()
```

Purpose: prevent an application date later than the current date.

### 2. Submitted Application Requires a Programme

```text
AND(
    ISPICKVAL(Application_Status__c, "Submitted"),
    ISBLANK(Programme_Lookup__c)
)
```

Purpose: prevent an application from being marked Submitted without a programme.

### 3. Start Date Cannot Be Before Application Date

```text
Start_Date__c < Application_Date__c
```

Purpose: prevent an invalid date sequence.

These rules demonstrate how Salesforce can enforce business rules rather than simply store data.

---

## 7. Automation

### Status Automation — In Progress

A Record-Triggered Flow was started for the Candidate Application process.

The intended business logic is:

```text
SETA Registration Status = Submitted
                 +
         Programme selected
                 +
       Application Status = New
                 ↓
       Application Status = Submitted
```

The Flow configuration reached the Assignment stage, where the record field needs to be updated correctly.

**Status: In Progress — not presented as complete yet.**

### Compliance Rejection Automation — Planned / To Be Verified

The intended compliance process is:

```text
Document submitted
       ↓
Compliance Review
       ↓
Approved OR Rejected
       ↓
If Rejected → notify candidate
       ↓
Candidate corrects document
       ↓
Document reviewed again
```

The exact final implementation will be documented after it is tested successfully in Salesforce.

---

## 8. Administrator Experience

The Salesforce Administrator is the main internal user of the CRM.

The administrator can be responsible for:

- Managing candidates
- Managing applications
- Managing programmes
- Reviewing compliance documents
- Maintaining data quality
- Importing data
- Monitoring application status
- Running reports
- Viewing dashboards
- Maintaining Salesforce configuration
- Managing automation

The administrator experience is being designed around one central application rather than requiring users to navigate through Salesforce Setup for normal business work.

---

## 9. Candidate Experience — Future Stage

A future candidate-facing experience is planned so that candidates can interact with the system without accessing Salesforce administration screens.

The proposed journey is:

```text
Candidate
   ↓
Registration / Application
   ↓
Application Reference
   ↓
Upload Required Documents
   ↓
Application Under Review
   ↓
Approved / Rejected
   ↓
Correct Documents if Required
   ↓
Application Progress
```

A candidate-facing portal or Experience Cloud implementation can be considered after the internal Salesforce process is stable and tested.

---

## 10. Excel / CSV Data Import

Another important part of the project is handling existing business data.

If candidate information already exists in Excel, the administrator can prepare the data and export it as CSV before importing it into Salesforce.

Typical process:

```text
Excel
  ↓
CSV
  ↓
Salesforce Import Tool
  ↓
Field Mapping
  ↓
Validation / Data Quality Checks
  ↓
Salesforce Records
```

Example mapping:

| Excel Column | Salesforce Field |
|---|---|
| First Name | Contact First Name |
| Surname | Contact Last Name |
| Email | Contact Email |
| Province | Province |
| Employment Status | Employment Status |
| Programme | Programme relationship |

This will form part of the project's data-management and migration testing.

---

## 11. SETA, UIF and SARS Requirements

The project is being designed around the type of information that may be relevant to South African skills-development and learnership administration.

### SETA

SETA information is already represented in the CRM through Programme and Candidate Application data.

### UIF

UIF-related information and document requirements have been discussed as a possible extension of the candidate compliance process.

### SARS Tax Number

A tax-number field has also been identified as a potential candidate/application requirement because tax information can be requested during employment, learnership or administrative processes.

**Important:** These are being treated as business requirements to evaluate and design correctly. They are not documented as fully implemented Salesforce functionality until the relevant fields, validation, security and process have been built and tested.

---

## 12. Reports and Dashboards — Next Development Stage

The reporting layer will provide management visibility into the candidate pipeline and compliance process.

Planned reports include:

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

The planned management dashboard will provide a high-level view of:

- Total Applications
- Application Status
- Programme Distribution
- Province Distribution
- Compliance Progress
- Programme Capacity

**Status: Planned / next implementation stage.**

---

## 13. Development Roadmap

### Phase 1 — CRM Foundation ✅

- Candidate management using Contact
- Candidate Application custom object
- Programme custom object
- Compliance Document custom object
- Custom fields
- Lookup relationships
- Custom tabs
- Lightning App navigation

### Phase 2 — Data Quality ✅

- Application date validation
- Programme requirement validation
- Start/application date validation
- Testing with realistic records

### Phase 3 — Automation 🔄

- Finish Candidate Application status Flow
- Build and test compliance automation
- Configure candidate notifications

### Phase 4 — Data Management ⏳

- Prepare sample Excel dataset
- Export to CSV
- Import into Salesforce
- Map fields
- Test data quality and relationships

### Phase 5 — Reporting ⏳

- Build operational reports
- Build management dashboard
- Test dashboard data

### Phase 6 — User Experience ⏳

- Improve administrator Lightning App
- Improve record pages
- Design candidate-facing experience
- Evaluate Experience Cloud

### Phase 7 — Portfolio Documentation 📸

For every major implementation, capture:

1. What was built
2. Why it was built
3. Salesforce feature used
4. Configuration steps
5. Problem encountered
6. How the problem was solved
7. Business benefit
8. Screenshot
9. Testing result

---

## 14. Skills Demonstrated

### Salesforce Administration

- Salesforce Lightning Experience
- Custom Objects
- Custom Fields
- Custom Object Tabs
- Lookup Relationships
- Picklists
- Validation Rules
- Lightning App Navigation
- Lightning Record Pages
- Flow Builder
- Reports and Dashboards
- Data Management

### Business Analysis

- Requirements gathering
- Business process mapping
- Data modelling
- Process improvement
- Candidate lifecycle management
- Compliance process design
- Translating business requirements into Salesforce configuration
- Troubleshooting and problem solving

### Data Management

- Excel / CSV preparation
- Field mapping
- Data quality controls
- Relational data design
- Import planning

---

## 15. Problems Solved During Development

This project has also been a practical troubleshooting exercise.

### Problem: Custom object not visible in the App

**Cause:** Required tab/navigation configuration was missing.  
**Solution:** Created the Custom Object Tab and added it to the Lightning App navigation.

### Problem: Duplicate Programme field name

**Cause:** A Programme Picklist already existed when a Programme Lookup was being created.  
**Solution:** Separated Programme Type from the Programme Lookup relationship.

### Problem: Duplicate Lookup could not be deleted

**Cause:** The field was still referenced by a Lightning Record Page.  
**Solution:** Removed the field from the Lightning Page before continuing with cleanup.

### Problem: Flow Assignment configuration

**Status:** Still being completed.  
**Lesson:** Salesforce Flow requires the record field and assignment value to be configured correctly before the automation can be activated.

These problems are part of the project's learning evidence because they show actual Salesforce administration and troubleshooting rather than only following a tutorial.

---

## 16. Business Value

The intended business value of the solution is to:

- Reduce manual administration
- Improve candidate data quality
- Reduce duplicate or incomplete information
- Improve compliance tracking
- Make application progress easier to monitor
- Reduce repetitive communication work
- Improve management visibility
- Provide a scalable foundation for future candidate services

---

## 17. Project Architecture

```text
                    CANDIDATE
                        │
                        ▼
               Candidate Registration
                        │
                        ▼
                     CONTACT
                  Candidate Profile
                        │
                        ▼
             CANDIDATE APPLICATION
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
         PROGRAMME          COMPLIANCE DOCUMENTS
             │                     │
             ▼                     ▼
       Programme Data        Verification Status
                                   │
                                   ▼
                              Automation
                                   │
                                   ▼
                              Notification
                                   │
                                   ▼
                         Reports & Dashboards
                                   │
                                   ▼
                              MANAGEMENT
```

---

## 18. Portfolio Objective

This project is part of my Salesforce portfolio and is intended to demonstrate practical ability to:

> **Analyse a business process, design a Salesforce data model, configure Salesforce objects and relationships, enforce data quality, build automation, manage data, create reporting, troubleshoot configuration problems, and continuously improve a CRM solution.**

The project is intentionally being documented throughout development so that the final portfolio shows not only the finished system, but also the reasoning, configuration decisions, challenges and lessons learned.

---

## Author

**Kabelo Gopane**  
Salesforce Administrator | Business Analyst | CRM Enthusiast

This is a portfolio project developed to demonstrate hands-on Salesforce administration, CRM design, business analysis, data management, automation and problem-solving skills.
