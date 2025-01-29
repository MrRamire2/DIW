// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK6gGpkkiwza71bbxAzkC4ytRD_z_SQ1k",
  authDomain: "tasksprueba-92452.firebaseapp.com",
  projectId: "tasksprueba-92452",
  storageBucket: "tasksprueba-92452.firebasestorage.app",
  messagingSenderId: "1093355629951",
  appId: "1:1093355629951:web:b86814513183b6be343e4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const saveTask = (title, description, priority) => 
    addDoc(collection(db, "tasks"), {title, description, priority});

export const getTasks = () => getDocs(collection(db, "tasks"));


export const onGetTasks = (callback) => 
  onSnapshot(collection(db, "tasks"), callback);


// export {
//   onSnapshot, collection, db
// };


// que hace addDoc????