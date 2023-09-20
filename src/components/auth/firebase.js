// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGc_UQLtFoRinGDF6RsNsygn35VRyWsS4",
  authDomain: "foodrecipe-e0ae2.firebaseapp.com",
  projectId: "foodrecipe-e0ae2",
  storageBucket: "foodrecipe-e0ae2.appspot.com",
  messagingSenderId: "682822530494",
  appId: "1:682822530494:web:7a7f1b36df23b0b1e035ef",
  measurementId: "G-2JXJWXXVVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();