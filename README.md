# StudentVoice 🎓
**Modernizing Academic Evaluations With Real-Time Connectivity**

A modern, cross-platform mobile application built with **React Native** designed to streamline student feedback and academic evaluations. **StudentVoice** bridges the gap between students and educators by providing a transparent, secure, and efficient channel to improve the overall learning experience — in real time.

---

## 📥 Download & Install (Android)

Get the latest version of the app directly to your device.

| Platform | Download Link | Version | Build Status |
| :--- | :--- | :--- | :--- |
| **Android** | [**Download StudentVoice APK**](https://expo.dev/artifacts/eas/iS3meWC59ffWs8c8X3jqqr.apk) | `v1.0.0-preview` | ![Live](https://img.shields.io/badge/Status-Live-success) |

> **Installation Tip:** Since this is a direct APK distribution outside the Play Store, you may need to enable **"Install from Unknown Sources"** (or **"Install Unknown Apps"**) in your device's security or app settings before proceeding with the installation.

---

## 📱 Core Features

*   **Real-Time Evaluations:** Students can instantly submit structured feedback on courses and instructors, with responses reflected immediately across relevant dashboards.
*   **Biometric Integrity:** Integrated face-detection logic powered by InsightFace and ONNX Runtime ensures secure identity verification for attendance and submission authenticity.
*   **Anonymous Reporting:** End-to-end privacy mechanisms guarantee that student input remains confidential, fostering honest and unbiased feedback without fear of reprisal.
*   **Intuitive Dashboards:** Dark-mode optimized data visualizations give faculty and administrators a clear, real-time overview of feedback trends and academic performance metrics.
*   **Push Notifications:** Users receive timely alerts for new surveys, feedback status updates, and important academic announcements delivered via real-time push notifications.

### 👨‍🎓 Student

* Register a new account and log in securely
* Submit categorized feedback for courses and instructors
* Track the status of previously submitted feedback
* Access in-app help and support resources
* Subject to submission limits to maintain feedback integrity

### 🏫 Department / Student Affairs

* Access a dedicated login dashboard
* View and manage all incoming student feedback
* Filter feedback entries by course, date, or status
* Post official responses to student submissions
* Manage course listings and update feedback statuses

### 👨‍💼 Admin

* Access a full-featured administrative dashboard
* View and manage all feedback across the institution
* Filter submissions by course, instructor, or department
* Monitor aggregated ratings and performance metrics
* Manage user accounts, course records, and instructor profiles
* Access detailed analytics reports and exportable data summaries

---

## 📂 Folder Structure

```text
mobile/
 ┣ App.js                  # Application entry point
 ┣ src/
 ┃ ┣ api/                  # HTTP helpers and backend API client configuration
 ┃ ┣ components/           # Reusable shared UI components
 ┃ ┣ navigation/           # React Navigation stack and tab navigator setup
 ┃ ┗ screens/              # Feature-specific screen components (Student, Admin, etc.)

backend/
 ┣ apps/                   # Django apps: authentication, feedback, notifications, departments
 ┗ config/                 # Project-wide settings, environment configs, and URL routing
```

---

## 🚀 Tech Stack

### Mobile Frontend
*   **Framework:** React Native (cross-platform iOS & Android)
*   **Styling:** Inline StyleSheet API for component-scoped styling
*   **State Management:** Redux Toolkit for global state; Context API for lightweight local state

### Backend & AI Services
*   **Core Framework:** Django & Django REST Framework (DRF) for RESTful API development
*   **Real-Time Communication:** WebSockets via Django Channels for live feedback and notification delivery
*   **AI & Biometrics Engine:** InsightFace & ONNX Runtime for efficient, on-server face detection and identity verification
*   **Database:** PostgreSQL — hosted and managed on Render
*   **Application Server:** Gunicorn with WhiteNoise for static file serving in production

---

## 🛠️ Developer Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Lido01/eval-campus
cd eval-campus
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Configure your environment variables by creating a `.env` file in the `backend/` directory:
```env
SECRET_KEY=your_django_secret_key
DEBUG=True
DATABASE_URL=your_postgresql_connection_string
```

Apply migrations and start the development server:
```bash
python manage.py migrate
python manage.py runserver
```

### 3. Mobile Frontend Setup
```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your device, or run on an emulator using `npx expo run:android`.

---

## 🤝 Contributing

Contributions are welcome. Please open an issue first to discuss proposed changes, then submit a pull request against the `main` branch. Ensure your code follows the existing structure and is adequately documented.