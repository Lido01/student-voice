# StudentVoice 🎓
**Modernizing Academic Evaluations With Real-Time Connectivity**

A modern, cross-platform mobile application built with **React Native** designed to streamline student feedback and academic evaluations. **StudentVoice** bridges the gap between students and educators, providing a transparent and efficient way to improve the learning experience.

---

## 📥 Download & Install (Android)

Get the latest version of the app directly to your device.

| Platform | Download Link | Version | Build Status |
| :--- | :--- | :--- | :--- |
| **Android** | [**Download StudentVoice APK**](https://expo.dev/artifacts/eas/iS3meWC59ffWs8c8X3jqqr.apk) | `v1.0.0-preview` | ![Live](https://img.shields.io/badge/Status-Live-success) |

> **Installation Tip:** As this is a direct APK, you may need to enable **"Install from Unknown Sources"** in your device's security settings.

---

## 📱 Core Features

*   **Real-time Evaluations:** Instantly submit feedback on courses and instructors.
*   **Biometric Integrity:** Integrated face-detection logic for secure attendance and verification.
*   **Anonymous Reporting:** End-to-end privacy ensures honest student input without fear of reprisal.
*   **Intuitive Dashboards:** Beautiful, dark-mode optimized data visualizations for faculty.
*   **Push Notifications:** Stay updated with real-time academic alerts and survey reminders.

### 👨‍🎓 Student

* Register and login
* Submit feedback with categories
* Track their status
* Get a help
* Restriction: limited feedback submission

### 👨‍🎓 Department/Student_Affairs

* Login dashboard
* View all feedback
* Filter by course
* Give feedback responses
* Manage courses, changes the status

### 👨‍💼 Admin

* Login dashboard
* View all feedback
* Filter by course or instructor
* View average ratings
* Manage users, courses, and instructors
* View Analytics and Reports

---

## 📂 Folder Structure

```text
mobile/
 ┣ App.js
 ┣ src/
 ┃ ┣ api/         # HTTP helpers and backend client
 ┃ ┣ components/  # Shared UI wrappers
 ┃ ┣ navigation/  # Navigator setup
 ┃ ┗ screens/     # Feature screens
backend/
 ┣ apps/          # Django apps for auth, feedback, notifications, departments
 ┗ config/        # Project settings and URL routing
```

## 🚀 Tech Stack

### Mobile Frontend
*   **Framework:** React Native
*   **Styling:** CSS inline styling.
*   **State Management:** Redux Toolkit & Context API.

### AI Agent Backend
*   **Core:** Django & Django REST Framework (DRF).
*   **Real-time Logic:** WebSockets via Django Channels.
*   **AI Engine:** InsightFace & ONNX Runtime for biometric processing.
*   **Database:** PostgreSQL (Deployed on Render).
*   **Server:** Gunicorn with WhiteNoise for static file management.

---

## 🛠️ Developer Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/Lido01/eval-campus](https://github.com/Lido01/eval-campus)
cd eval-campus

<!-- collaboration sync 1/30: 2026-05-09 20:27:59 +03:00 -->
<!-- collaboration sync 2/30: 2026-05-09 20:28:05 +03:00 -->
<!-- collaboration sync 3/30: 2026-05-09 20:28:13 +03:00 -->
<!-- collaboration sync 4/30: 2026-05-09 20:28:29 +03:00 -->
<!-- collaboration sync 5/30: 2026-05-09 20:28:39 +03:00 -->
<!-- collaboration sync 6/30: 2026-05-09 20:28:46 +03:00 -->
<!-- collaboration sync 7/30: 2026-05-09 20:28:55 +03:00 -->
<!-- collaboration sync 8/30: 2026-05-09 20:29:01 +03:00 -->
<!-- collaboration sync 9/30: 2026-05-09 20:29:07 +03:00 -->
<!-- collaboration sync 10/30: 2026-05-09 20:29:15 +03:00 -->
<!-- collaboration sync 11/30: 2026-05-09 20:29:22 +03:00 -->
<!-- collaboration sync 12/30: 2026-05-09 20:29:28 +03:00 -->
<!-- collaboration sync 13/30: 2026-05-09 20:29:34 +03:00 -->
<!-- collaboration sync 14/30: 2026-05-09 20:29:39 +03:00 -->
<!-- collaboration sync 15/30: 2026-05-09 20:29:44 +03:00 -->
<!-- collaboration sync 16/30: 2026-05-09 20:29:50 +03:00 -->
<!-- collaboration sync 17/30: 2026-05-09 20:29:59 +03:00 -->
<!-- collaboration sync 18/30: 2026-05-09 20:30:08 +03:00 -->
<!-- collaboration sync 19/30: 2026-05-09 20:30:16 +03:00 -->
<!-- collaboration sync 20/30: 2026-05-09 20:30:24 +03:00 -->
<!-- collaboration sync 21/30: 2026-05-09 20:30:31 +03:00 -->
<!-- collaboration sync 22/30: 2026-05-09 20:30:37 +03:00 -->
<!-- collaboration sync 23/30: 2026-05-09 20:30:43 +03:00 -->
<!-- collaboration sync 24/30: 2026-05-09 20:30:50 +03:00 -->
<!-- collaboration sync 25/30: 2026-05-09 20:30:56 +03:00 -->
<!-- collaboration sync 26/30: 2026-05-09 20:31:02 +03:00 -->
<!-- collaboration sync 27/30: 2026-05-09 20:31:08 +03:00 -->
