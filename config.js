/*
 * Mfanageza Candidate Application — integration settings
 *
 * GitHub Pages hosts the public website only. Salesforce remains the system
 * of record for candidate and application data.
 *
 * FUTURE CONNECTION:
 * 1. Create and publish the candidate-facing Salesforce Experience Cloud site.
 * 2. Set SALESFORCE_PORTAL_URL to that site's public HTTPS URL.
 * 3. Configure object/field access and sharing in Salesforce.
 * 4. Test candidate creation, application submission, document handling and
 *    application-status access before announcing the portal as live.
 *
 * Never put Salesforce usernames, passwords, client secrets, access tokens,
 * refresh tokens, or private API credentials in this file or in GitHub.
 *
 * Intended Salesforce record mapping (confirm API names in the live org):
 * - Candidate identity: Contact (current Candidate__c lookup target)
 * - Application: Candidate Application
 * - Programme: Programme
 * - Supporting files/verification: Compliance Document
 *
 * Example:
 * const SALESFORCE_PORTAL_URL = 'https://your-domain.my.site.com/candidate';
 */
const SALESFORCE_PORTAL_URL = 'https://YOUR-SALESFORCE-EXPERIENCE-DOMAIN.example.com';
