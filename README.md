# Nexus – Campus Super App (IIT Ropar)


Video Explanation- https://drive.google.com/drive/folders/18y6TNM3oQoT8QghGI-qlhmZPXxIc9Jw9 with files


Link- https://campussuperapp.lovable.app/login

## Project Overview

**Nexus – Campus Super App** is a fully interactive, AI-powered, full-stack web platform designed as a unified digital ecosystem for IIT Ropar students, faculty, and administrators. The platform strictly adheres to the **AI Fusion Hackathon – Project Nexus Problem Statement**, integrating AI, verification workflows, and modular campus services into a single, scalable system.

This documentation is written as an **AI-independent project document** (no AI tool dependency for understanding), with **clear placeholders** for screenshots, links, and future enhancements, following hackathon documentation guidelines.

<img width="1916" height="838" alt="image" src="https://github.com/user-attachments/assets/f9e9eafe-7576-47b4-b585-393c4417fe4e" />
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

<img width="1913" height="890" alt="image" src="https://github.com/user-attachments/assets/3640ea93-6994-4f50-b5bb-54e2ddc9bf79" />


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

<img width="1916" height="838" alt="image" src="https://github.com/user-attachments/assets/bd8ff91a-dd86-45b7-9f27-6a3fec9462d7" />


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

📌<img width="1919" height="904" alt="image" src="https://github.com/user-attachments/assets/585ff9b3-ea5f-402c-b7f7-5a7f79311cb2" />

<img width="1919" height="888" alt="image" src="https://github.com/user-attachments/assets/f0950e69-513f-4f98-8d4a-48d096721316" />

<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/1c51ed93-e3a5-468b-8b9e-24102fb5eac8" />


---

## Core Pillar 3: The Explorer’s Guide

### Nearby Hub

* Cafes, shops, hangouts
* Real images
* Ratings, distance, vibe tags

### Navigate Smarter

* Google Maps API
* Campus map with landmarks

<img width="1894" height="849" alt="image" src="https://github.com/user-attachments/assets/97579343-e342-4462-8687-c9847b7a8426" />

<img width="1919" height="922" alt="image" src="https://github.com/user-attachments/assets/817e52e6-a615-4f54-9496-413ae8984ef3" />



---

## Food Search & Discovery Module

* Search food items (Momos, Tea, etc.)
* Display shops, prices, ratings, distance
* Enquiry via email
* Admin verification mandatory


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

<img width="1913" height="800" alt="image" src="https://github.com/user-attachments/assets/112f3f6c-3f33-41b4-9b39-122e402b5d1d" />

<img width="1919" height="853" alt="image" src="https://github.com/user-attachments/assets/2beb6699-9d9a-4b61-9038-15b95fb638f9" />


---

## Clubs & Community Module

* Club listings
* Individual club pages
* Join forms via email
* Admin verification required

📌<img width="1912" height="862" alt="image" src="https://github.com/user-attachments/assets/7e23b556-fd74-4e55-b63f-e6ddd8c0bf57" />


---

## AI / ML Intelligence Layer

**Google AI API Key Used**

* AI Mail Summarizer
* AI Study Assistant
* AI Content Moderation

### Content Moderation Rules

* Detect abusive or inappropriate language
* Block submission with alert message

<img width="1911" height="847" alt="image" src="https://github.com/user-attachments/assets/10c1614a-8dd8-403b-a324-fe0de075cdcb" />

<img width="1914" height="867" alt="image" src="https://github.com/user-attachments/assets/2acc9912-9161-4ad0-9585-e9e3989db8c6" />


---

## Admin Portal Features

* Secure admin dashboard
* Pending / Approved / Rejected counters
* Post moderation controls
* Content analytics

<img width="1919" height="897" alt="image" src="https://github.com/user-attachments/assets/b52cf524-b183-4b21-bbfa-719ed0b127df" />


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

Link: https://campussuperapp.lovable.app/


**Images for Verification**


<img width="1855" height="870" alt="image" src="https://github.com/user-attachments/assets/ec37f557-5258-4a1d-9434-1458bdb5f142" />

<img width="1887" height="902" alt="image" src="https://github.com/user-attachments/assets/76c93e75-3024-4502-9f7f-a3002f3f8d0a" />


<img width="1919" height="890" alt="image" src="https://github.com/user-attachments/assets/a90cc310-3e85-46f4-a012-91d40d672677" />


