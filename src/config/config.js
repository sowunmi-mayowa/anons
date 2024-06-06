// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvUENwVvws0Z2l_fZuHOrezTaKJhL-b6E",
  authDomain: "anons-b3249.firebaseapp.com",
  projectId: "anons-b3249",
  storageBucket: "anons-b3249.appspot.com",
  messagingSenderId: "1093572984662",
  appId: "1:1093572984662:web:34efd660a06152d166e0f7",
  measurementId: "G-D5V72VH51D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);