# Playwright-TypeScript-Authentication-Flow-Code

# Playwright Authentication Flow Automation Framework

## Overview

This project is an end-to-end UI Automation Framework built using **Playwright + TypeScript** following the **Page Object Model (POM)** design pattern.

The framework automates the Authentication Flow, Role-Based Access Control, Password Management, and Profile Switching functionality of the Tiara Jewelry application.

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* Page Object Model (POM)
* HTML Reporting
* Git & GitHub

---

## Framework Architecture

```text
Playwright Authentication Flow
│
├── pages
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── ForgotPasswordPage.ts
│   └── ProfilePage.ts
│
├── tests
│   ├── loginLogout.spec.ts
│   ├── forgotPassword.spec.ts
│   ├── roleBased.spec.ts
│   └── profileSwitch.spec.ts
│
├── fixtures
│   └── testdata.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## Features Implemented

### Authentication Testing

* Login Validation
* Logout Validation
* Invalid Credential Validation
* Session Persistence Validation
* Direct URL Access Validation

### Password Management

* Forgot Password Flow
* Empty Email Validation
* Password Mismatch Validation
* Weak Password Validation

### Role-Based Access Testing

* Admin Access Validation
* Owner Access Validation
* Store Manager Access Validation
* Restricted Feature Validation

### Profile Switching

* Profile Visibility Validation
* Profile Change Validation
* Dashboard Data Validation
* Profile Persistence Validation

---

# Automated Test Cases

## Login & Logout Module

### TC01 - Valid Login

**Objective:** Verify user can login with valid credentials.

**Expected Result:**

* User is redirected to dashboard.
* Dashboard loads successfully.

---

### TC02 - Invalid Password

**Objective:** Verify login fails with incorrect password.

**Expected Result:**

* Error message displayed.
* User remains on login page.

---

### TC03 - Invalid Email

**Objective:** Verify login fails with invalid email.

**Expected Result:**

* Error message displayed.
* User remains on login page.

---

### TC04 - Empty Login

**Objective:** Verify validation for empty login submission.

**Expected Result:**

* Required field validation appears.

---

### TC05 - Logout

**Objective:** Verify user logout functionality.

**Expected Result:**

* Session terminated.
* User redirected to login page.

---

### TC06 - Direct URL Access After Logout

**Objective:** Verify secured pages cannot be accessed after logout.

**Expected Result:**

* Redirected to login page.

---

### TC07 - Refresh While Logged In

**Objective:** Verify session remains active after refresh.

**Expected Result:**

* User remains logged in.
* Dashboard reloads successfully.

---

# Forgot Password Module

### TC08 - Forgot Password Link

**Expected Result:**

* Forgot Password page opens.

---

### TC09 - Empty Email Validation

**Expected Result:**

* Validation message displayed.

---

### TC10 - Registered Email Submission

**Expected Result:**

* Password reset request accepted.
* Success confirmation displayed.

---

### TC11 - Password Mismatch Validation

**Input:**

* Current Password
* New Password
* Different Confirm Password

**Expected Result:**

* Validation error displayed.
* Password not updated.

---

### TC12 - Weak Password Validation

**Input:**

* Password below required complexity.

**Expected Result:**

* Weak password validation displayed.

---

# Role-Based Access Module

### TC13 - Admin Login

**Expected Result:**

* Admin dashboard loads.
* User Management visible.

---

### TC14 - Owner Login

**Expected Result:**

* Owner dashboard loads.
* User Management not visible.

---

### TC15 - Store Manager Login

**Expected Result:**

* Store Manager dashboard loads.
* Tag Mapping visible.

---

### TC16 - User Management Visibility

**Expected Result:**

* Admin can access User Management.

---

### TC17 - Restricted URL Access

**Expected Result:**

* Unauthorized users redirected or blocked.

---

### TC18 - Role Permission Validation

**Expected Result:**

* Features displayed according to assigned role.

---

### TC19 - Login Using Different Roles

**Flow:**

* Login as Admin
* Logout
* Login as Owner

**Expected Result:**

* Correct dashboard loaded for each role.

---

# Profile Switching Module

### TC20 - Profile Switcher Visibility

**Expected Result:**

* Profile switcher displayed in header.

---

### TC21 - Current Profile Displayed

**Expected Result:**

* Current profile shown as QA.

---

### TC22 - Switch QA → QA2

**Expected Result:**

* Profile changes to QA2.
* Dashboard data refreshes.
* QA2 activity visible.

---

### TC23 - Profile Label Updates

**Expected Result:**

* Profile label updated after switch.

---

### TC24 - Dashboard Data Changes

**Expected Result:**

* Dashboard reflects QA2 data after switch.

---

### TC25 - Switch QA2 → QA

**Expected Result:**

* Profile changes back to QA.
* Original dashboard data restored.

---

### TC26 - Refresh Keeps Active Profile

**Expected Result:**

* QA2 remains active after page refresh.
* Profile does not revert automatically.

---

# Design Patterns Used

## Page Object Model (POM)

Benefits:

* Reusable Locators
* Reusable Methods
* Easy Maintenance
* Better Scalability

---

# Reporting

Playwright HTML Report is generated after execution.

Generate Report:

```bash
npx playwright show-report
```

---

# Execution

Install Dependencies

```bash
npm install
```

Run All Tests

```bash
npm run regression
```

Run Individual Suites

```bash
npm run login
npm run forgot
npm run role
npm run profile
```

---

# Key Learnings

* Playwright Automation
* TypeScript Framework Development
* Page Object Model Implementation
* Role-Based Access Testing
* Profile Switching Validation
* Session Management Testing
* Reporting and Debugging
* GitHub Project Management

---

# Author

Kunal Bhavasar

QA Automation Engineer

Playwright | Selenium | Java | TypeScript | TestNG | API Testing | CI/CD
