Mfanageza Trading & Projects CRM Solution
-

Project Overview
-

The Mfanageza Trading & Projects CRM Solution is a Salesforce CRM system built to help a training and recruitment company manage candidate applications, compliance documents, and reporting.

Before this system, the company relied on manual paperwork, making it difficult to track documents, communicate with candidates, and prepare for compliance audits.

This CRM solution digitizes the entire process, improves data quality, automates repetitive tasks, and provides real-time reports for management.

How the System Works
-

The system works in six main stages.

Candidate Registration (Web Layer)
-
   

The process starts with a Web-to-Lead form.

Candidates visit the company website and complete an online application form by entering:


-First Name

-Last Name

-Email Address

-Phone Number

-South African ID Number


When the candidate submits the form, Salesforce automatically creates a Lead record.

The administrator reviews the Lead and converts it into a Contact, which becomes the official candidate profile.

Candidate Information (Data Model Layer)
-

After the Lead is converted, Salesforce stores the candidate's information in the Contact object.

The Contact record contains:

-First Name

-Last Name

-Email

-Mobile Number

-South African ID Number

-Programme

-Province


Each Contact represents one candidate.

3. Compliance Documents
-

-Every candidate must submit supporting documents.

-To manage these documents, I created a custom object called Compliance Document.

-Each document is linked to one candidate using a Lookup Relationship.

-A candidate can have many documents.


Examples include:


-Certified ID Copy

-Matric Certificate

-Proof of Residence

-Learner Affidavit


Each document also stores:


-Document Number

-Verification Status

-Upload Date

-Verification Date

-Verified By

-Rejection Reason


This makes it easy to track every document submitted by a candidate.

Data Validation
-

-To improve data quality, I created a Validation Rule.

-The rule checks the South African ID Number.


It only allows:
-

-Exactly 13 digits

-Numbers only


The field is also Unique, which prevents duplicate candidate records.

This helps keep the database clean and supports compliance requirements.

Business Automation
-

I created a Record-Triggered Flow to automate part of the business process.

When a document's Verification Status changes to Rejected, Salesforce automatically:


-Detects the rejected document.

-Finds the candidate's email address.

-Sends an email explaining why the document was rejected.

-Includes the rejection reason.

-Tells the candidate what needs to be corrected.

-This removes manual work and improves communication with candidates.

Reports and Dashboards
-

Managers need to know what is happening in the system.

I created reports that show:


-Approved documents

-Rejected documents

-Documents waiting for verification

-Candidate progress

-Outstanding compliance documents


I also created dashboards with charts and KPIs that give management a quick overview of the onboarding process.

These dashboards help managers make better decisions.

Security
-

Different users have different responsibilities.

I used Salesforce security features such as:


-Profiles

-Roles

-Page Layouts


These features control:


-Who can view information

-Who can verify documents

-Who can edit records


This helps protect sensitive information.

System Architecture
-

Candidate

     │
     ▼
     
Web-to-Lead Form

     │
     ▼
     
    Lead
    
     │
Convert Lead
     
     ▼
     
Contact (Candidate)
     
     │
     ▼
     
Compliance Documents
     
     │
     ▼
     
Validation Rules
     
     │
     ▼
     
Automation (Flow)
     
     │
     ▼
     
Email Notification
     
     │
     ▼
     
Reports & Dashboards
     
     │
     ▼
     
Management

Salesforce Features Used
-

During this project, I used the following Salesforce features:


-Custom Objects

-Custom Fields

-Lookup Relationships

-Validation Rules

-Record-Triggered Flows

-Web-to-Lead

-Email Automation

-Reports

-Dashboards

-Profiles

-Roles

-Page Layouts

Business Benefits
-

This solution helps the company by:

-Reducing paperwork.

-Improving data quality.

-Preventing duplicate records.

-Automating candidate communication.

-Saving staff time.

-Improving compliance management.

-Providing real-time reports.

-Helping managers make better decisions.

-What I Learned

Through this project, I learned how to:
-

-Design a Salesforce data model.

-Create custom objects and relationships.

-Improve data quality using validation rules.

-Automate business processes with Flows.

-Build reports and dashboards.

-Configure user security.

Solve a real business problem using Salesforce.
