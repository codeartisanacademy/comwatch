import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAt81VYgymfuZ_tXCbWYCXPY31SgjlxmeI",
    authDomain: "comwatch-b10ae.firebaseapp.com",
    projectId: "comwatch-b10ae",
    storageBucket: "comwatch-b10ae.appspot.com",
    messagingSenderId: "816839912786",
    appId: "1:816839912786:web:090eb5660d6104bd25de8b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
  
export {db};