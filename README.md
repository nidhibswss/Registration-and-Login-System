# Member Registration & Authentication System

A web-based registration and login module for the Springfield Public Library Digital Library Management System.  
Built using **React.js** and **Firebase Firestore** as part of CPS 714 (Software project Management)– Assignment 1 and 2

---

## Project Overview

This system digitizes the library’s traditional paper-based registration process by enabling users to:

- Register online and receive a unique library card number
- Log in using card number + PIN authentication
- View their account dashboard after login
- Securely store and retrieve data using Firebase Firestore

The project was developed under a simulated budget of **$160,000** as part of an academic software engineering assignment.

---

## Tech Stack

- React.js
- Firebase Firestore
- JavaScript
- HTML / CSS
- Firebase Hosting

---

##  Features

###  Registration
- Online form with full validation
- Collects: name, email, phone, DOB, PIN
- Generates a unique **8-digit library card number**
- Stores user data in Firestore

###  Authentication
- Login using card number + PIN
- Firestore-based credential verification
- Session handling using localStorage

### User Dashboard
- Displays user profile after login
- Logout functionality clears session
- Navigation to additional modules

###  Backend (Firebase)
- Firestore database integration
- Members collection with structured schema:
  - name, email, phone, DOB
  - PIN, card number, status

---

## Project Structure

```
/pages
  register.js
  login.js
  home.js
  index.js

/firebase
  config.js
  members.js

/styles
/public
```

---

## Testing & QA

Conducted by QA and Security teams:

- Registration & login flow testing
- Firestore read/write validation
- Input validation edge cases
- Duplicate card number checks
- Security rule verification
- Page load performance testing (< 5 seconds)

---

##  Project Timeline

### Week 1 (Oct 2–5)
- Project planning and initiation
- Business case and charter approval
- Role assignments and scope definition

### Week 1–2 (Oct 5–16)
- Requirements gathering
- System design and Firestore schema
- Firebase project setup
- GitHub repository setup

### Weeks 2–6 (Oct 16–Nov 5)
- Development of registration module
- Authentication system implementation
- Dashboard and session handling
- Firebase integration

### Weeks 7–7.5 (Nov 5–17)
- QA testing and debugging
- Security validation
- Performance testing

### Week 8 (Nov 20–22)
- Deployment to Firebase Hosting
- Final documentation and submission
- Project closure

---

## Deployment

Deployed using Firebase Hosting.

---

##  Notes

- This project was developed by a group of five members for CPS 714 : Software Project Management
- Focus was on software project management, system design, authentication flow, and database integration using Firebase.
- All sensitive data handling follows basic security best practices.

---

## 📄 License

This project is for academic purposes only.
