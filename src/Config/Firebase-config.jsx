// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWuI3-mHxymWeKZTM3QrdeXALBAj9Dq0E",
  authDomain: "todo-app-770b5.firebaseapp.com",
  projectId: "todo-app-770b5",
  storageBucket: "todo-app-770b5.appspot.com",
  messagingSenderId: "960608293735",
  appId: "1:960608293735:web:5c661429f8a4143ae555c2"
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);

export { database, auth };
