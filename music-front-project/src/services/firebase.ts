import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAT2oIyguWzU0NoEg_q1L089k-3NT4-v0k",
    authDomain: "musicshared-ae309.firebaseapp.com",
    projectId: "musicshared-ae309",
    storageBucket: "musicshared-ae309.appspot.com",
    messagingSenderId: "957462654029",
    appId: "1:957462654029:web:01eeb1b5d5db770aafc004"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };