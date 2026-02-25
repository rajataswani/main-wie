import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Firebase Configuration (Make sure this is correct)
const firebaseConfig = {
  apiKey: "AIzaSyDeCCEycUpxY8uJ7rzPy9M1Omr3UeslowI",
  authDomain: "feb26-sbwebsite.firebaseapp.com",
  projectId: "feb26-sbwebsite",
  storageBucket: "feb26-sbwebsite.firebasestorage.app",
  messagingSenderId: "285445571166",
  appId: "1:285445571166:web:a7bd606970476b18862acf",
  measurementId: "G-MM592Z0NBW"
};

// ✅ Prevent multiple Firebase initializations
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Initialize Firestore and Authentication using the same app
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export initialized instances
export { app, auth, db };

