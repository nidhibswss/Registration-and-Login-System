// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChfgorbohHKC3WYlUMi9fEGxdiFS9Lhmc",
  authDomain: "member-registration-syst-dad06.firebaseapp.com",
  projectId: "member-registration-syst-dad06",
  storageBucket: "member-registration-syst-dad06.firebasestorage.app",
  messagingSenderId: "222425000472",
  appId: "1:222425000472:web:5eb883dae04b14b26d716d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
