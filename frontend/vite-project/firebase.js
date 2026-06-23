// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "zlinkit-f89ca.firebaseapp.com",
  projectId: "zlinkit-f89ca",
  storageBucket: "zlinkit-f89ca.firebasestorage.app",
  messagingSenderId: "1057433020054",
  appId: "1:1057433020054:web:ed3be945331da885cb04b7"
};

console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth};