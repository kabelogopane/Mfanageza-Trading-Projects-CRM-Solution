# Mfanageza Candidate Portal

## Purpose

The repository now contains a public-facing candidate website designed to be the entry point for the Mfanageza Salesforce CRM.

The portal is intentionally separate from Salesforce administration screens. Candidates should interact with a simple web experience, while authorised staff continue to work inside Salesforce.

## Architecture

```text
Candidate
   |
   v
GitHub Pages Candidate Website
   |
   v
Salesforce Experience Cloud Candidate Portal
   |
   v
Salesforce CRM
   |
   +--> Contact (Candidate)
   +--> Candidate Application
   +--> Programme
   +--> Compliance Documents
   +--> Automation
   +--> Reports / Dashboards
```

## Important security decision

The GitHub Pages site is static and public. It must **not** contain Salesforce passwords, client secrets, access tokens, refresh tokens, or other private credentials.

The current website therefore uses a configurable Salesforce Experience Cloud URL as the secure hand-off point.

## Configuration

Edit `config.js`:

```js
const SALESFORCE_PORTAL_URL = 'https://YOUR-SALESFORCE-EXPERIENCE-DOMAIN.example.com';
```

Replace the placeholder with the public URL of the Salesforce Experience Cloud candidate site after it has been created and tested.

## Current website features

- Responsive candidate landing page
- Programme cards based on the current CRM programme design
- Candidate journey explanation
- Application call-to-action
- Candidate login link
- Application-reference tracking hand-off
- Salesforce integration architecture explanation
- Mobile navigation

## What is not connected yet

The GitHub website does not directly create or update Salesforce records yet. The live CRM connection requires the Salesforce candidate-facing layer to be configured.

Recommended implementation order:

1. Finish and test the internal Candidate Application Flow.
2. Create a Salesforce Experience Cloud site.
3. Configure candidate registration/login.
4. Build the application form against the Candidate Application and Contact model.
5. Configure secure document upload and compliance tracking.
6. Configure candidate access so users only see their own records.
7. Test permissions and sharing with a non-admin test user.
8. Put the Experience Cloud URL into `config.js`.
9. Test the GitHub Pages → Salesforce portal journey.
10. Document screenshots and test results in this repository.

## Portfolio status

**Website front end:** Implemented

**Salesforce portal connection:** Waiting for Experience Cloud configuration

**Direct Salesforce API connection from GitHub Pages:** Not recommended because a static public website cannot safely store private Salesforce credentials.
