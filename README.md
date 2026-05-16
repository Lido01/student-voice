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

| Role            | Username                    |    Password         |
| --------------- | --------------------------  |  ----------         |
| student         | lidetu@gmail.com            |  lidetu@123123      |
| Admin           | admin@gail.com              |  admin@123123       |
| Department      | department@astu.edu         |  department@123123  |
| Student_Affairs | studentaffairs@astu.edu     |  affair@123123      |

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

### Backend
*   **Core:** Django & Django REST Framework (DRF).
*   **Real-time Logic:** WebSockets via Django Channels.
*   **Database:** PostgreSQL (Deployed on Render).
*   **Server:** Gunicorn with WhiteNoise for static file management.

---

## 👥 Contributors

| Contributor | Role | GitHub/Contact |
| :--- | :--- | :--- |
| **Lidetu Tesfaye** | Full-Stack Developer (Backend & API) | [@Lido01](https://github.com/Lido01) |
| **Dagimaw Wondewosen** | UI/UX Designer / project coordination and documentation | [@dreykov69](https://github.com/dreykov69) |
| **Amanuel Getachew** | Cyber Enthusist / Tester | [@amanuelgmn](https://github.com/amanuelgmn) |
| **Firomisa Tesfaye** | SRS / Documentation | [@firo-t](https://github.com/firo-t) |
| **Meklit Mengistu** | UI/UX Designer / Project Manager | [@username](https://github.com/username) |
| **Eyuel Muhamud** | QA Tester / Documentation | [@Eyu7768-u](https://github.com/Eyu7768-u) |

## 🛠️ Developer Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/Lido01/eval-campus](https://github.com/Lido01/eval-campus)
cd eval-campus

