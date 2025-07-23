# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

# 🗺️ Site Map

After running `npx expo start` and selecting a device, the app will open at `http://localhost:8081/student`  
(Note: The port may vary on each machine)

---

## 🔵 `/student` – For Students  
**Login is required every time**

- `/student/dashboard` – View online buses and filter to report issues  
- `/student/report` – Submit comments or issue reports  
- `/student/history` – View the student’s report history

---

## 🟢 `/driver` – For Drivers  
**Login required on first use only**

- `/driver/scanner` – Scan when getting on or off a bus  
- `/driver/profile` – View and edit driver profile  
- `/driver/history` – View driving history

---

## 🔴 `/admin` – For Admins  
**Login is required every time**

- `/admin/report` – View all student reports  
- `/admin/driver_dashboard` – Monitor driver status (available, driving, off-duty) and edit driver profiles  
- `/admin/route` – View and modify bus routes

---

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
