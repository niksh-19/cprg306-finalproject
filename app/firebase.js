// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cprg306-assignments-f4c76.firebaseapp.com",
  projectId: "cprg306-assignments-f4c76",
  storageBucket: "cprg306-assignments-f4c76.firebasestorage.app",
  messagingSenderId: "767426747763",
  appId: "1:767426747763:web:0bada37164ed85e2cab906"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
