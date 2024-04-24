import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "apikey",
    authDomain: "ecommerce-123-31cca.firebaseapp.com",
    projectId: "ecommerce-123-31cca",
    storageBucket: "ecommerce-123-31cca.appspot.com",
    messagingSenderId: "1069524703798",
    appId: "1:1069524703798:web:c79ffa748e1abdfb2c9697",
    measurementId: "G-W4FSN2EB5Y",
    databaseUrl:'https://ecommerce-123-31cca-default-rtdb.firebaseio.com/'
  };
  
  // Initialize Firebase
 export const app = initializeApp(firebaseConfig);
const database=getDatabase(app);
export const auth= getAuth(app);
export {database};