import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB4ljfZf78oHdhQ7QKIVn_sF7gawm8rtus",
  authDomain: "metro-events-201.firebaseapp.com",
  projectId: "metro-events-201",
  storageBucket: "metro-events-201.appspot.com",
  messagingSenderId: "632195531109",
  appId: "1:632195531109:web:e3c4a1b99cafb53c6d218c",
  measurementId: "G-TF098JFW1J",
};

const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// firestore
export const db = getFirestore(app);
