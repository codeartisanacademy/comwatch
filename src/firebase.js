import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, sigInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
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
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

const registerWithEmailAndPassword = async (email, password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

    } catch (error) {
        console.log(error);
    }
}

const loginWithEmailAndPassword = async (email, password) =>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }catch (error) {
        console.log(error);
    }
}

const logout = ()=>{
    signOut(auth);
}

export {db, auth, registerWithEmailAndPassword, loginWithEmailAndPassword, logout};