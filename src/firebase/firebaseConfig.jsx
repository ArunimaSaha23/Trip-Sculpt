import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {getFirestore} from "firebase/firestore"

// Firebase project configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "login-8137b.firebaseapp.com",
  projectId: "login-8137b",
  storageBucket: "login-8137b.appspot.com",
  messagingSenderId: "80348087995",
  appId: "1:80348087995:web:9ea982751efc87adf38b9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app };
export { auth, provider, signInWithPopup, signOut };
export const db=getFirestore(app);
