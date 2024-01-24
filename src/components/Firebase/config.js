// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzW_nYEJa4fBcOyR6NqYCjzX5dcAYzoG8",
  authDomain: "underapp-552de.firebaseapp.com",
  projectId: "underapp-552de",
  storageBucket: "underapp-552de.appspot.com",
  messagingSenderId: "17843702269",
  appId: "1:17843702269:web:263c23313c6f1d61a63194"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app