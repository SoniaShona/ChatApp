import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy9B02MAlaxYiNpO1i2zolHxDifY2zCuI",
  authDomain: "chatapp-3ee78.firebaseapp.com",
  projectId: "chatapp-3ee78",
  storageBucket: "chatapp-3ee78.appspot.com",
  messagingSenderId: "610791139744",
  appId: "1:610791139744:web:23b2dbfd88ea5a187e1cc5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();