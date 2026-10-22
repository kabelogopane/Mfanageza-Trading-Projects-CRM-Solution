# Salesforce Configuration Notes — New Org

## Configuration principle

This file records configuration that has been directly observed in the new Salesforce org. Older org configuration is not automatically carried forward.

## Candidate Application

### Candidate relationship

- Field label: Candidate
- API name: `Candidate__c`
- Type: Lookup(Contact)
- Indexed: Yes
- Status: Confirmed

### Programme relationship

- Field label: Programme
- API name: `Programme__c`
- Type: Lookup(Programme)
- Indexed: Yes
- Status: Confirmed

### Application status

- Field label: Application Status
- API name: `Application_Status__c`
- Type: Picklist
- Restricted picklist: Yes
- Required: No
- Default: None
- Active values: New, Under Review, Compliance Review, Documents Required, Approved, Enrolled, Rejected

### Application number

- Field label: Application Number
- API name: `Application_Number__c`
- Type: Auto Number
- Previously observed display format: `APP-{000}`
- Intended display format: `APP-{00000}`
- Intended starting number: `1`
- Generate Auto Number for existing records: unchecked
- Save confirmation for the intended format change: pending

## Compliance Document

- Candidate Application: Master-Detail to Candidate Application
- Document Type: Picklist
- Verification Status: Picklist
- Rejection Reason: Text Area(255)
- Upload Date: Date
- Verification Date: Date

## Change-control rule

Do not create a new field merely because a previous project document says one should exist. First inspect Object Manager → Fields & Relationships in the current org and compare against this baseline.

Do not delete the custom Candidate object or change the Candidate Application lookup until the candidate navigation and record-entry architecture has been explicitly audited.
