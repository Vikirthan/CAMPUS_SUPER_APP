# Nexus – Campus Super App (IIT Ropar)


Video Explanation- https://drive.google.com/drive/folders/18y6TNM3oQoT8QghGI-qlhmZPXxIc9Jw9

## Project Overview

**Nexus – Campus Super App** is a fully interactive, AI-powered, full-stack web platform designed as a unified digital ecosystem for IIT Ropar students, faculty, and administrators. The platform strictly adheres to the **AI Fusion Hackathon – Project Nexus Problem Statement**, integrating AI, verification workflows, and modular campus services into a single, scalable system.

This documentation is written as an **AI-independent project document** (no AI tool dependency for understanding), with **clear placeholders** for screenshots, links, and future enhancements, following hackathon documentation guidelines.

---

## Objectives

* Centralize campus utilities into one interactive platform
* Enable verified, safe, and moderated student interaction
* Leverage AI for summarization, academic assistance, and content moderation
* Provide admins with full control and verification authority
* Demonstrate practical, ethical, and effective use of AI

---

## System Architecture Overview

**Frontend:**

* React-style component-based architecture
* Animated UI with responsive design
* Role-based routing (Student / Admin)

**Backend:**

* Node.js + Express
* REST APIs for posts, verification, uploads, and enquiries

**External Services:**

* Google Drive → File storage
* Gmail → Enquiry notifications
* Google AI API → Intelligence layer

📌 *Placeholder: System Architecture Diagram*

---

## Authentication & User Roles

### Login Method

* Username + Password only (No email / OTP)
* Dummy authentication handled at backend level

### Student Login

* **Username:** Student01
* **Password:** 123456
* Redirects to Student Dashboard
* Permissions:

  * Create posts (Unverified)
  * View verified content
  * Send enquiries

### Admin Login

* **Username:** Admin01
* **Password:** 123456
* Redirects to Admin Portal
* Permissions:

  * Approve / Reject all posts
  * Moderate content
  * View analytics

📌 *Placeholder: Login Screen Screenshot*

---

## Global Post Verification Workflow

1. Student creates content
2. Post is stored as **Unverified**
3. Status badge displayed
4. Admin reviews in Admin Portal
5. Admin Approves → Post becomes **Verified** and visible
6. Admin Rejects → Post remains hidden

This workflow applies to:

* Lost & Found
* Marketplace
* Cab Pool
* Skills
* Clubs & Community
* Food Listings

📌 *Placeholder: Verification Flow Diagram*

---

## File Storage & Data Handling

All uploads are handled via backend and stored in Google Drive:




### File Categories

* Assignments
* Lost & Found
* Marketplace
* Food Listings
* Clubs & Community
* Others

Each upload returns:

* Success message
* Stored file reference

📌 *Placeholder: File Upload UI Screenshot*

---

## Email & Enquiry Handling

All enquiry forms send structured emails to:
📧 **[vikirthan06@gmail.com](mailto:vikirthan06@gmail.com)**

### Included Fields

* Name
* Registration Number
* Mobile Number
* Email ID
* Message / Details
* Timestamp
* Source Module

📌 *Placeholder: Sample Enquiry Email Screenshot*

---

## Core Pillar 1: The Daily Pulse

### Live Mess Menu

* Tabs: Breakfast | Lunch | Snacks | Dinner
* Veg / Non-veg filters
* Nutrition placeholders
* Ratings & popularity badges

### AI Mail Summarizer

* Paste institute emails
* AI generates concise summaries
* Categories: Academic | Events | Urgent

### Campus Feed

* Announcements
* Event countdown timers
* Weather widget
* Emergency alerts

📌 *Placeholder: Daily Pulse UI*

---

## Core Pillar 2: The Student Exchange

### Lost & Found

* Post LOST / FOUND items
* Image + description + location
* Admin verification required

### Buy / Sell Marketplace

* Product upload with image & price
* Buyer interest via email
* Interaction after verification

### Travel Sharing (Cab Pool)

* Route, date, time, seats
* Join via enquiry form

### Skill Exchange

* Skills offered / wanted
* AI moderation + admin approval

📌 *Placeholder: Student Exchange Screens*

---

## Core Pillar 3: The Explorer’s Guide

### Nearby Hub

* Cafes, shops, hangouts
* Real images
* Ratings, distance, vibe tags

### Navigate Smarter

* Google Maps API
* Campus map with landmarks

📌 *Placeholder: Explorer Module UI*

---

## Food Search & Discovery Module

* Search food items (Momos, Tea, etc.)
* Display shops, prices, ratings, distance
* Enquiry via email
* Admin verification mandatory

📌 *Placeholder: Food Search Results UI*

---

## Core Pillar 4: The Academic Cockpit

### Live Timetable

* Add / edit / delete classes
* Day & week views

### LMS Lite

* Assignment upload
* Google Drive storage
* Submission confirmation

### Academic Intelligence

* Study Planner
* AI Study Assistant (DSA, OS, Math, Core Engg.)

📌 *Placeholder: Academic Dashboard UI*

---

## Clubs & Community Module

* Club listings
* Individual club pages
* Join forms via email
* Admin verification required

📌 *Placeholder: Club Page UI*

---

## AI / ML Intelligence Layer

**Google AI API Key Used**

* AI Mail Summarizer
* AI Study Assistant
* AI Content Moderation

### Content Moderation Rules

* Detect abusive or inappropriate language
* Block submission with alert message

📌 *Placeholder: AI Moderation Alert*

---

## Admin Portal Features

* Secure admin dashboard
* Pending / Approved / Rejected counters
* Post moderation controls
* Content analytics

📌 *Placeholder: Admin Dashboard Screenshot*

---

## UI / UX Design Principles

* Highly interactive UI
* Smooth animations
* Color-coded pillars:

  * Blue → Academics
  * Orange → Exchange
  * Green → Campus Life

Fully responsive design

---

## Deliverables

* Full frontend & backend system
* Admin portal
* Google Drive integration
* Gmail-based enquiries
* AI-powered features
* GitHub repository
* This documentation

---

## Conclusion

**Nexus – Campus Super App** demonstrates an innovative, AI-powered, verified campus ecosystem aligned with AI Fusion Hackathon objectives. It balances usability, moderation, intelligence, and scalability while solving real campus problems.

📌 *Placeholder: Final Deployed App Link*


**Images for Verification**


<img width="1855" height="870" alt="image" src="https://github.com/user-attachments/assets/ec37f557-5258-4a1d-9434-1458bdb5f142" />

<img width="1887" height="902" alt="image" src="https://github.com/user-attachments/assets/76c93e75-3024-4502-9f7f-a3002f3f8d0a" />


<img width="1919" height="890" alt="image" src="https://github.com/user-attachments/assets/a90cc310-3e85-46f4-a012-91d40d672677" />


