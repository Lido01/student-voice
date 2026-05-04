# StudentVoice 🎓

A modern, cross-platform mobile application built with **React Native** designed to streamline student feedback and academic evaluations. **StudentVoice** bridges the gap between students and educators, providing a transparent and efficient way to improve the learning experience.

## 📱 Features

- **Real-time Evaluations:** Submit feedback on courses and instructors instantly.
- **Anonymous Reporting:** Secure and private feedback channels to ensure honest student input.
- **Interactive Dashboards:** Visual representation of evaluation data for faculty.
- **Push Notifications:** Reminders for pending surveys and academic updates.
- **Offline Support:** Draft feedback offline and sync once connected.

## 🚀 Tech Stack

- **Framework:** Expo + React Native
- **State Management:** Local component state
- **Navigation:** React Navigation
- **Backend:** Django REST Framework + Simple JWT
- **Database:** SQLite for local development

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   cd student-voice
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set the API base URL for local development:**
   ```bash
   # Android emulator
   export EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:8000/api

   # iOS simulator or web
   export EXPO_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. **Run the application:**
   - **Android / iOS / Web:** `npx expo start`
   - Then press `a`, `i`, or `w` in the Expo terminal.

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

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes (`git commit -m 'Add some NewFeature'`).
4. Push to the branch (`git push origin feature/NewFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
