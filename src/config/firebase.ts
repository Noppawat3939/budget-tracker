// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBazhvCReZl-fMUlDMC3Tc_TCTD-O2hGy0",
  authDomain: "budget-d99ab.firebaseapp.com",
  projectId: "budget-d99ab",
  storageBucket: "budget-d99ab.appspot.com",
  messagingSenderId: "644803052733",
  appId: "1:644803052733:web:7fe4780688a6bcbad663d4",
  measurementId: "G-YFXFJDZT7K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
