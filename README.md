# Mfanageza Trading & Projects CRM Solution

## Salesforce Candidate & Learnership Management CRM

**Role:** Salesforce Administrator & Business Analyst  
**Platform:** Salesforce Lightning Experience  
**Project status:** In active development  
**Repository owner:** Kabelo Gopane

---

## Candidate Portal Website

A responsive public-facing **Candidate Portal website** has now been added to this repository.

The website is designed to become the candidate entry point for the Salesforce CRM:

```text
Candidate
   ↓
GitHub Pages Website
   ↓
Salesforce Experience Cloud
   ↓
Salesforce CRM
   ↓
Contact + Candidate Application + Programme + Compliance Documents
```

The portal includes:

- Candidate landing page
- Programme listings
- Application call-to-action
- Candidate login entry point
- Application-reference tracking hand-off
- Candidate journey explanation
- Mobile responsive design
- Salesforce integration configuration

### Important architecture decision

GitHub Pages is a public/static website, so Salesforce passwords, API secrets, access tokens and refresh tokens must **never** be placed in the website code.

The current implementation uses `config.js` to point the website to a Salesforce **Experience Cloud** candidate portal. The live Salesforce URL will be configured after the Experience Cloud site is created and tested.

See **[`docs/CANDIDATE-PORTAL.md`](docs/CANDIDATE-PORTAL.md)** for the architecture and implementation plan.

> **Portfolio note:** The website front end is implemented. The live Salesforce candidate connection is not claimed as complete until Experience Cloud, candidate permissions, application submission, document upload and record access are tested.

---

## Project Overview

The **Mfanageza Trading & Projects CRM Solution** is a Salesforce portfolio project designed around a South African training, recruitment and skills-development environment.

The project started as a practical Salesforce learning exercise: instead of only completing Trailhead exercises, I wanted to build a system that could solve a realistic business problem. The solution has grown from manually creating and testing Salesforce records into a structured CRM with a candidate, application, programme and compliance data model.

The main goal is to digitise and improve the candidate journey:

**Candidate → Application → Programme → Compliance → Verification → Communication → Reporting**

The CRM is being designed to reduce manual administration, improve data quality, make candidate information easier to manage, and give administrators better visibility of the application process.

> **Portfolio note:** Features are marked as **Implemented**, **In Progress**, or **Planned** so the repository reflects the actual development stage rather than claiming unfinished functionality as complete.

---

## Current Salesforce Data Model

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

Salesforce's standard **Contact** object is used to represent a candidate.

### Candidate Application

The **Candidate Application** custom object represents an individual application.

Configured fields include Application Number, Application Date, Application Status, Candidate, Employment Status, Province, SETA, SETA Registration Status, Start Date, Programme Type and Programme Lookup.

### Programme

The **Programme** custom object stores programme information such as Programme Type, SETA, NQF Level, dates, Capacity and Status.

Test programmes include IT Systems Development, IT Technical Support, Cybersecurity and Data Analytics.

### Compliance Documents

The **Compliance Document** custom object tracks documents associated with an application, including document type, verification status, rejection reason, upload date, verification date and verifier information.

---

## Data Quality

Three validation rules have been created:

1. Application date cannot be in the future.
2. A submitted application requires a programme.
3. Start date cannot be before application date.

---

## Automation Status

The Candidate Application status Record-Triggered Flow is **In Progress**. The intended logic is:

```text
SETA Registration Status = Submitted
                 +
         Programme selected
                 +
       Application Status = New
                 ↓
       Application Status = Submitted
```

Compliance rejection notification automation remains planned/to be verified until it is fully tested.

---

## Administrator Experience

The internal Salesforce app is designed for authorised staff to manage:

- Candidates
- Applications
- Programmes
- Compliance documents
- Data quality
- Automation
- Reports
- Dashboards

The candidate-facing website is intentionally separate from Salesforce Setup and administration screens.

---

## Candidate Experience Roadmap

The planned candidate experience is:

```text
Candidate
   ↓
Registration / Login
   ↓
Application
   ↓
Application Reference
   ↓
Document Upload
   ↓
Application Review
   ↓
Approved / Rejected
   ↓
Track Progress
```

The GitHub website provides the public entry point. Salesforce Experience Cloud is planned as the secure candidate-facing layer that connects the user experience to CRM records.

---

## Development Roadmap

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

### Phase 3 — Automation 🔄
- Finish Candidate Application status Flow
- Build and test compliance automation
- Configure candidate notifications

### Phase 4 — Candidate Portal 🔄
- Public candidate website **implemented**
- Configure Salesforce Experience Cloud
- Connect application submission
- Connect candidate-specific application status
- Connect document upload
- Test user permissions and sharing

### Phase 5 — Data Management ⏳
- Prepare sample Excel dataset
- Export to CSV
- Import into Salesforce
- Map fields
- Test data quality and relationships

### Phase 6 — Reporting ⏳
- Build operational reports
- Build management dashboard
- Test dashboard data

### Phase 7 — Portfolio Documentation 📸
- Capture screenshots for each major feature
- Record configuration decisions
- Record problems and solutions
- Record testing evidence
- Publish final case study

---

## Business Value

The intended solution is designed to reduce manual administration, improve candidate data quality, improve compliance tracking, make application progress easier to monitor, reduce repetitive communication work, improve management visibility and provide a scalable foundation for future candidate services.

---

## Author

**Kabelo Gopane**  
Salesforce Administrator | Business Analyst | CRM Enthusiast

This is a portfolio project developed to demonstrate hands-on Salesforce administration, CRM design, business analysis, data management, automation and problem-solving skills.
