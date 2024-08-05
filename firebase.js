import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCvZrf4eQvfWJwjFC5wGLHCUPokTH1jnMY",
    authDomain: "facebook-clone-1cc69.firebaseapp.com",
    projectId: "facebook-clone-1cc69",
    storageBucket: "facebook-clone-1cc69.appspot.com",
    messagingSenderId: "177608431410",
    appId: "1:177608431410:web:29812ef887f736fcffe92b",
    measurementId: "G-S4J996C3JS"
};



const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };