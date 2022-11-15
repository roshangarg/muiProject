import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";




const firebaseConfig = {

  apiKey: "AIzaSyBePJZD_tAVoxqxnWH5heeUxNujrGJA3I4",

  authDomain: "createnotesapp-6e01f.firebaseapp.com",

  projectId: "createnotesapp-6e01f",

  storageBucket: "createnotesapp-6e01f.appspot.com",

  messagingSenderId: "139527473248",

  appId: "1:139527473248:web:a5c64b4340a2e370759b05",

  measurementId: "G-5XQ0SB1TPD"

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

 