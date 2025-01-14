// TODO: Add SDKs for Firebase products that you want to use
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDfuS-R8v2a3k0RafpZXs9DdLG6VigpGzY",
    authDomain: "fbla2024-20377.firebaseapp.com",
    projectId: "fbla2024-20377",
    storageBucket: "fbla2024-20377.appspot.com",
    messagingSenderId: "838245709901",
    appId: "1:838245709901:web:c5f8d490b1be7943e84404",
    measurementId: "G-BL7PG3KX18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);