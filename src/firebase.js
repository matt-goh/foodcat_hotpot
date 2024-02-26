// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLWElXplkeQ4mmT98FPm0VFYO6ygsocG0",
  authDomain: "foodcat-hotpot.firebaseapp.com",
  projectId: "foodcat-hotpot",
  storageBucket: "foodcat-hotpot.appspot.com",
  messagingSenderId: "958306347362",
  appId: "1:958306347362:web:7eb826715d3d7fbadb643b",
  measurementId: "G-LW3F18S3MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default app;