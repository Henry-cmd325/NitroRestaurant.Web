// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTqt_tKDZ-qVChago1fz2ZAMvB5DOWWYw",
  authDomain: "nitro-restaurant.firebaseapp.com",
  databaseURL: "https://nitro-restaurant-default-rtdb.firebaseio.com",
  projectId: "nitro-restaurant",
  storageBucket: "nitro-restaurant.appspot.com",
  messagingSenderId: "414138267909",
  appId: "1:414138267909:web:85629881637834ab1e5f6c",
  measurementId: "G-R0P6QEHP29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
//connectFirestoreEmulator(db, '127.0.0.1', 8080);

export default app;