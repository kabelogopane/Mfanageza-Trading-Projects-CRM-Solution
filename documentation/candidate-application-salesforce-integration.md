# Candidate Application — Salesforce Integration Plan

## Purpose

Prepare the Mfanageza Candidate Application website so it can hand candidates to the Mfanageza CRM in Salesforce without rebuilding the website later.

## Current status

- The public website is hosted on GitHub Pages.
- The website has a central Salesforce portal setting in `config.js`.
- The website's application links use the `data-salesforce-link` attribute.
- The website is **not yet connected to Salesforce** because a live Experience Cloud URL and its access configuration have not been supplied and tested.
- The application-reference area is not yet reading records from Salesforce.

## Recommended connection

Use a Salesforce Experience Cloud site as the candidate-facing application portal.

```text
Mfanageza Candidate Application website
                |
                | Candidate selects Apply
                v
Salesforce Experience Cloud
                |
                v
Mfanageza Salesforce CRM
                |
       +--------+---------+
       |        |         |
    Contact  Candidate  Programme
             Application
                |
        Compliance Document
```

The Experience Cloud site is the preferred hand-off because it can provide applicant-facing pages while Salesforce controls record access and the CRM data. Do not expose Salesforce credentials or API secrets in the GitHub Pages website.

## Existing Salesforce data model to respect

The current CRM documentation records these relationships:

- `Candidate Application.Candidate__c` is a Lookup to **Contact**.
- `Candidate Application.Programme__c` is a Lookup to **Programme**.
- **Compliance Document** has a Master-Detail relationship to Candidate Application.
- A separate custom Candidate object exists, but it is not currently the target of the Candidate Application lookup.

Do not create duplicate candidate records or change these relationships until the actual Salesforce org has been checked and the Contact-versus-Candidate decision has been made.

## Connection setting

When the Experience Cloud site has been created, published and tested, update this line in `config.js`:

```js
const SALESFORCE_PORTAL_URL = 'https://YOUR-SALESFORCE-EXPERIENCE-DOMAIN.example.com';
```

Replace the placeholder with the actual public HTTPS URL of the candidate site.

All website links marked with `data-salesforce-link` will then use that configured URL. This is a navigation hand-off only; it does not create or update CRM records by itself.

## Suggested application field mapping

Confirm every API name and required field in the live Salesforce org before building the submission form.

| Candidate form information | Salesforce destination |
|---|---|
| First name / last name | Contact name fields |
| Email | Contact.Email |
| Mobile number | Contact.Phone or the agreed mobile field |
| Province | Confirmed Contact or Candidate field |
| Employment status | Confirmed Contact or Candidate field |
| Selected programme | Candidate Application.Programme__c |
| Application date | Candidate Application.Application_Date__c |
| Application status | Candidate Application.Application_Status__c |
| Supporting documents | Compliance Document / Salesforce Files, as designed |

Do not collect a South African ID number or supporting personal documents on the static website before the secure Salesforce form, access rules, privacy notice and storage process have been implemented and tested.

## Implementation checklist

1. Confirm the Salesforce org and the current object/field API names.
2. Review the Contact-versus-Candidate relationship.
3. Create and configure the Experience Cloud candidate site.
4. Set up the minimum required access, sharing and guest-user permissions.
5. Build the candidate application form in the Salesforce-backed experience.
6. Map form fields to Contact, Candidate Application and Programme.
7. Configure document upload and access separately.
8. Publish the Experience Cloud site.
9. Add the public site URL to `config.js`.
10. Test a complete sample application from the website through to the Salesforce records.
11. Test that a candidate can only view their own application.
12. Only then describe the connection as live.

## Security rules

- Never store Salesforce usernames, passwords, access tokens, refresh tokens or client secrets in this repository.
- Do not connect the browser directly to Salesforce using a secret.
- Apply least-privilege access and test record-level sharing.
- Use sample records during development.
- Do not publish real candidate personal information in GitHub, screenshots or test evidence.

## Definition of done

The integration is complete only when a test candidate can submit an application through the published candidate experience, the expected Salesforce records and relationships are created correctly, supporting documents are handled securely, and candidate-specific access has been verified.


## Standalone application page and South African safeguards

The public website now links to a separate page at `apply.html`. It contains a candidate information form with contact details, province/town, self-reported education background, programme choice and employment status.

The form is currently a **front-end preview only**. Its Submit button performs browser validation and displays a clear message that no application has been transmitted or saved. It must not be represented as a live application service.

The form design uses South African context and POPIA-oriented data-minimisation and transparency principles:
- No South African identity number, identity-document upload, race, disability or banking details are requested in this first version.
- Education level is self-reported; it is not a SAQA qualification verification.
- Programme qualification titles, NQF levels, SAQA IDs, provider status and SETA details must be verified against official records and the relevant quality council/SETA before being advertised as accredited or registered.
- The privacy notice identifies the intended purpose, categories of information, intended authorised access, retention principle and data-subject rights.
- Before live launch, complete the organisation's legal/responsible-party identity, address, Information Officer/privacy contact, complaint contact details, retention schedule, privacy policy/PAIA information where applicable, and any required operator arrangements.
- If applicants under 18 may apply, implement the required child-information safeguards and competent-person consent process before collecting their personal information.

### Go-live requirements

1. Confirm the exact programme titles, delivery type, NQF levels and SAQA IDs using the official SAQA register and the relevant Quality Council/SETA records. SAQA registration of a qualification is not, by itself, proof that a particular provider is accredited to offer it.
2. Confirm the legal entity acting as the responsible party and approve the final privacy notice.
3. Configure Salesforce Experience Cloud or another secure server-side submission route. Do not send candidate information directly from GitHub Pages to Salesforce using credentials or secrets in browser code.
4. Map fields to the verified Salesforce Contact and Candidate Application schema; do not assume the separate Candidate custom object is the current lookup target.
5. Configure candidate-specific sharing, access controls, retention, audit trail and secure document upload.
6. Test valid and invalid submissions, duplicate handling, confirmation/reference generation, access isolation and data-subject request handling.
7. Only then enable the live Submit action and remove preview-mode warnings.

### Official reference points

- [Protection of Personal Information Act 4 of 2013](https://www.treasury.gov.za/POPIA/POPI%20Act%204%20of%202013.pdf)
- [Information Regulator — POPIA guidance](https://inforegulator.org.za/popia/)
- [SAQA — Registration of Qualifications and Part-Qualifications](https://saqa.org.za/services/registration-of-qualifications/)
- [SAQA — Frequently Asked Questions](https://saqa.org.za/frequently-asked-questions/)

This implementation is a design and development baseline, not legal advice or a certification of POPIA compliance, SAQA registration or provider accreditation.
