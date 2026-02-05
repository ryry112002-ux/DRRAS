import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDP651ZGg2iR_zaixsWcBWgWbUwSVsCeOI",
    authDomain: "drras-53cc6.firebaseapp.com",
    projectId: "drras-53cc6",
    storageBucket: "drras-53cc6.firebasestorage.app",
    messagingSenderId: "918604278668",
    appId: "1:918604278668:web:5a3311c85eaa0b06d084a9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

