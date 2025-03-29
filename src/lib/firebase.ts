
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { enableIndexedDbPersistence } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw-EIzaDp7bY48eC31lP1UBIQqunJVWfw",
  authDomain: "sou-wie.firebaseapp.com",
  projectId: "sou-wie",
  storageBucket: "sou-wie.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "121651925560",
  appId: "1:121651925560:web:546b25b498e56ed42ecccd",
  measurementId: "G-SN3ND5NW0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Enable offline persistence when possible
try {
  enableIndexedDbPersistence(db)
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a time
        console.log('Persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required
        console.log('Persistence is not available in this browser');
      }
    });
} catch (error) {
  console.error("Error enabling persistence:", error);
}
