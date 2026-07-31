#Mfanageza Trading & Projects CRM Solution 
-

Project Overview
-

The Mfanageza Trading & Projects CRM Solution is a Salesforce-based system designed to digitize candidate onboarding, document compliance, and reporting for a South African training and recruitment environment.


The solution replaces manual, paper-based processes with an automated CRM that improves data quality, compliance, and operational efficiency.

System Architecture

                🌐 Web Layer
                
      Web-to-Lead Candidate Form
      
                     │
                     ▼
                     
            📂 Data Model Layer
            
        Contact ←→ Compliance Document
        
                     │
                     ▼
                     
        🛡️ Data Integrity Layer
        
      SA ID Validation & Duplicate Prevention
      
                     │
                     ▼
                     
      ⚙️ Automation & Email Layer
      
   Record-Triggered Flow & Email Notifications
   
                     │
                     ▼
                     
     📊 Reporting & Dashboard Layer
     
    Compliance Reports & Executive Dashboard
    
                     │
                     ▼
                     
      🔐 Security & Access Layer
      
     Profiles • Roles • Page Layouts
     
1. 🌐 Web Layer

Public Candidate Registration
-

The solution begins with a Web-to-Lead HTML form that allows prospective learners to submit:


First Name

Last Name

Email

Phone Number

South African ID Number

The submitted information is automatically created as a Lead in Salesforce.

Lead Conversion
-

After reviewing the application, administrators convert qualified Leads into Contact records, creating official candidate profiles.

Data Model Layer
-

Contact (Candidate)
-

The Contact object stores candidate information including:

Personal Details

Contact Information

SA ID Number

Programme

Province

Compliance Document (Custom Object)

Each candidate can have multiple compliance documents.

Main Fields
Field	Purpose
Document Number	Auto Number (DOC-{0000})
Candidate	Lookup to Contact
Document Type	Type of submitted document
Verification Status	Current approval status
Rejection Reason	Reason for rejection
Upload Date	Date submitted
Verified By	Reviewing administrator
Verification Date	Approval date
Relationship
One Contact
      │
      │ Lookup
      ▼
Many Compliance Documents

This relationship allows one candidate to own multiple compliance documents.

3. 🛡️ Data Integrity Layer
Validation Rule

SA_ID_Number_13_Digits

Business Rules:

Must contain exactly 13 digits
Numeric values only
Unique across all candidates
Benefits
Prevents duplicate candidates
Improves data quality
Supports SETA compliance
Reduces manual corrections
4. ⚙️ Automation Layer
Record-Triggered Flow

Compliance Document Rejection Flow

Trigger

Runs automatically when:

Verification Status = Rejected
Automated Process

The system automatically:

Detects rejected documents
Retrieves candidate information
Sends an email notification
Includes rejection reason
Advises the candidate on the next steps
Email Automation

Dynamic merge fields include:

Candidate Name
Document Type
Rejection Reason

This improves communication and reduces manual administrative work.

5. 📊 Reporting & Dashboard Layer
Reports
Candidate Audit Report

Displays:

Candidate information
Programme
Compliance status
Outstanding documents
Compliance Report

Tracks:

Approved documents
Rejected documents
Pending verification
Executive Dashboard

Management can monitor:

Candidate registrations
Compliance progress
Document verification rates
Pending approvals
Overall onboarding performance

Visualizations include:

Donut Charts
Bar Charts
KPI Metrics
6. 🔐 Security Layer

Security is managed using Salesforce standard features.

Profiles

Control user permissions.

Roles

Restrict document verification responsibilities.

Page Layouts

Provide different interfaces based on user responsibilities while displaying related compliance documents directly from the Contact record.

Business Value

This CRM solution delivers measurable business benefits by:

Digitizing candidate onboarding
Improving data quality through validation
Automating compliance communication
Reducing manual administrative work
Providing real-time reporting and dashboards
Supporting SETA audit readiness
Enhancing operational efficiency and decision-making
Technologies Used
Salesforce CRM
Custom Objects
Lookup Relationships
Validation Rules
Record-Triggered Flows
Web-to-Lead
Email Alerts
Reports & Dashboards
Page Layouts
User Profiles & Roles
Portfolio Value

This project demonstrates practical experience in designing and implementing an end-to-end Salesforce CRM solution. It showcases data modeling, business process automation, data validation, reporting, security configuration, and workflow optimization using a realistic South African business scenario. The project highlights both technical Salesforce administration skills and the ability to solve real business challenges, making it a strong portfolio piece for Salesforce Administrator, CRM Administrator, and Business Analyst roles.
