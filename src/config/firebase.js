// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAt5b9CuWYFulTHbFQmd6EMYqBSsMwdF1k",
  authDomain: "unity-react-firebase-app.firebaseapp.com",
  projectId: "unity-react-firebase-app",
  storageBucket: "unity-react-firebase-app.appspot.com",
  messagingSenderId: "765113822982",
  appId: "1:765113822982:web:46909a7881a0926255f887",
  measurementId: "G-P5QD8KE6NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);