# Mfanageza Trading & Projects CRM — Development Log

## 23 September 2026

### Today's work

Today I reviewed my current Mfanageza Trading & Projects CRM against the larger process I want to support for a small IT academy.

The main purpose of the review was to understand exactly what I have completed, what still needs to be built, and what should remain a future enhancement.

### What I have already built

The Salesforce foundation is in place:

- Candidate management using Contact
- Candidate Application custom object
- Programme custom object
- Compliance Document custom object
- Lookup relationships
- Lightning App navigation
- Three validation rules for application and date data quality

### What is still in progress

The Candidate Application status Flow is not finished yet.

The intended automation is:

```text
SETA Registration Status = Submitted
        +
Programme selected
        +
Application Status = New
        ↓
Application Status = Submitted
```

I still need to finish the Assignment, activate the Flow and test it.

### Remaining Salesforce work

My next development stages are:

- Finish and test the Candidate Application Flow
- Complete the Compliance Document verification process
- Build and test compliance automation
- Review important candidate data requirements
- Implement appropriate ID validation
- Test Excel/CSV data import
- Build operational reports
- Build a management dashboard
- Complete end-to-end testing
- Capture screenshots and document the final results

### Candidate portal

The public Mfanageza Digital Skills Academy website has already been added to the GitHub repository.

It is designed to act as the public entry point for candidates.

The Salesforce Experience Cloud connection is still planned. I have not yet connected the live candidate application, document upload and candidate-specific record access.

### SETA preparation

I want Salesforce to help the academy prepare candidate information for SETA administration.

I have not yet implemented a final SETA export. Before building it, I need to confirm the actual fields and template requirements for the relevant SETA process.

### LMS integration

I also reviewed the idea of connecting Salesforce to an LMS such as Moodle.

For now, I am keeping this as a future enhancement instead of making it part of the current core project. I want to finish and test the Salesforce CRM first.

### Project direction

My current development path is:

```text
CRM Foundation
      ↓
Data Quality
      ↓
Automation
      ↓
Compliance
      ↓
Data Import
      ↓
Reports
      ↓
Dashboard
      ↓
Candidate Portal
      ↓
End-to-End Testing
      ↓
Final Documentation
```

### My main takeaway

I am trying to build this project honestly.

I do not want to claim that a feature is complete just because I have planned it or designed how it should work. I want to be able to demonstrate the configuration, test it, show the result and explain the business value.

My immediate next step is to finish the Candidate Application Flow and continue building from there.
