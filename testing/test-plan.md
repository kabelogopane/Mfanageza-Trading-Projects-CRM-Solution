# New Org Test Plan

## Rule

A configuration is not marked complete merely because a field or object exists. The feature must be tested in the Salesforce user interface and the result recorded.

## Foundation tests

| Test | Expected result | Status |
|---|---|---|
| Open Candidate object | Candidate object is available | Confirmed object exists |
| Open Candidate Application | Application object is available | Confirmed object exists |
| Create/open application candidate lookup | Candidate field points to Contact | Confirmed |
| Select Programme | Programme lookup is available | Confirmed field exists; end-to-end selection pending |
| Application status | Seven expected status values appear | Confirmed |
| Application number | Auto Number field exists | Confirmed |
| Application number format | New records receive intended `APP-{00000}` format | Pending save/test confirmation |
| Compliance Document relationship | Document relates to Candidate Application | Confirmed relationship; end-to-end UI test pending |

## Application creation test

1. Create or select a test Contact to represent a candidate.
2. Create a Candidate Application.
3. Select the candidate.
4. Select a Programme.
5. Enter Application Date.
6. Select Application Status = New.
7. Enter Start Date where required.
8. Save.
9. Verify the generated Application Number.
10. Open the saved application and verify the relationships.

## Compliance test

1. Open a Candidate Application.
2. Open the Compliance Documents related list.
3. Create a Compliance Document.
4. Select Document Type.
5. Set Verification Status.
6. Enter relevant dates/rejection reason.
7. Save.
8. Confirm the document remains related to the correct application.

## Automation and validation tests

Not yet marked complete in the new org. Each future rule/flow must have a positive and negative test case and an observed result recorded here.

## Evidence to capture

For each major completed feature, capture a screenshot showing:

- Salesforce object/field configuration where appropriate
- User-facing record page
- Successful test result
- Error/validation result when applicable

Screenshots should not contain unnecessary personal or sensitive candidate information.
