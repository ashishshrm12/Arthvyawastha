import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// console.log(process.env.FIREBASE_API_KEY)

const firebaseConfig = {
  
  apiKey: "AIzaSyAD7DbGxntjIM31P3jGCf9FyobLZvzJVr0",
  authDomain: "smart-billing-system-c7991.firebaseapp.com",
  projectId: "smart-billing-system-c7991",
  storageBucket: "smart-billing-system-c7991.appspot.com",
  messagingSenderId: "770671749947",
  appId: "1:770671749947:web:d43839cfed18930aabe51e",
  measurementId: "G-WF8FC42W00"
};

export const app = initializeApp(firebaseConfig);
export const auth= getAuth();
export const storage =getStorage();
export const db = getFirestore(app);
