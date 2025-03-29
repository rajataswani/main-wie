import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// 🔹 Firebase Configuration (Make sure this is correct)
const firebaseConfig = {
  apiKey: "AIzaSyCw-EIzaDp7bY48eC31lP1UBIQqunJVWfw",
  authDomain: "sou-wie.firebaseapp.com",
  projectId: "sou-wie",
  storageBucket: "sou-wie.appspot.com", // Ensure correct format
  messagingSenderId: "121651925560",
  appId: "1:121651925560:web:546b25b498e56ed42ecccd",
  measurementId: "G-SN3ND5NW0N",
};

// ✅ Prevent multiple Firebase initializations
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Initialize Firestore and Authentication using the same app
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export initialized instances
export { app, auth, db };
