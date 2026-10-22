# Business Requirements — Mfanageza Candidate Application System

## Business problem

Mfanageza Trading & Projects needs a practical CRM process for managing candidates, programme applications and compliance documentation in a South African training / skills-development environment.

## Core user journey

```text
Candidate
   ↓
Candidate Application
   ↓
Programme selection
   ↓
Application review
   ↓
Compliance documents
   ↓
Verification
   ↓
Decision / enrolment
```

## Core requirements

### Candidate

The system must maintain candidate identity and contact information needed for application processing.

### Application

Each application should support:

- Application Number
- Candidate
- Application Date
- Application Status
- Programme
- Programme Type
- Start Date

### Programme

Each programme should support programme-level information such as:

- Programme Name
- Programme Type
- SETA
- NQF Level
- Capacity
- Start Date
- End Date
- Status

### Compliance

Each application should be able to have related compliance documents with:

- Document Type
- Verification Status
- Upload Date
- Verification Date
- Rejection Reason

## Current application status model

The current new-org status values are:

`New → Under Review → Compliance Review → Documents Required → Approved → Enrolled / Rejected`

These are the values currently configured in Salesforce and are not to be replaced by older status lists without an explicit change.

## Data-quality requirements

The system should eventually prevent or flag invalid application data, including:

- Application dates in the future
- Applications submitted without a programme
- Start dates earlier than application dates

Whether these validation rules currently exist in the new org remains to be verified.

## Automation requirements

Future automation should reduce repetitive administrative work, including status progression, compliance handling and appropriate candidate communication.

Automation is not considered complete until it has been built, tested with sample records, and documented with evidence.

## Reporting requirements

The completed solution should provide operational visibility into:

- Applications by status
- Applications by programme
- Compliance document status
- Candidate/application pipeline
- Programme capacity where applicable

## Candidate-facing requirements

The longer-term candidate journey includes registration/login, application submission, application reference, document upload and progress tracking. Public website and Experience Cloud work must remain clearly separated from the internal Salesforce configuration until the connection is tested.
