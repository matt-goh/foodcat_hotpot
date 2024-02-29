// Import the functions you need from the SDKs you need
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log('Authentication state will persist for the browser session.');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

export default auth;
export { db };