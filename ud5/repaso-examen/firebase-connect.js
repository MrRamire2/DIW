// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, addDoc, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfYGUkhdhSW06ued_Unb0N3vr-N_cw-M0",
  authDomain: "pruebaexamendaw.firebaseapp.com",
  projectId: "pruebaexamendaw",
  storageBucket: "pruebaexamendaw.firebasestorage.app",
  messagingSenderId: "325040982789",
  appId: "1:325040982789:web:016b03989aec2a9716056c",
  measurementId: "G-JE19711L7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const uploadData = async (data) => {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), data);
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const getData = async () => {
    try {
        const q = query(collection(db, "usuarios"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((document) => ({
            id: document.id,
            ...document.data()
    }));
    } catch (error) {
        console.log(error);
    }
};