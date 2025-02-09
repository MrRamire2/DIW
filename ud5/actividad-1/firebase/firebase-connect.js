// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZhjAS9Mm_mbtcuQUdF6eMU2w7JtYqFgQ",
  authDomain: "balena-bd.firebaseapp.com",
  projectId: "balena-bd",
  storageBucket: "balena-bd.firebasestorage.app",
  messagingSenderId: "134502236467",
  appId: "1:134502236467:web:b64cbbcab6aff0e6dd7e46",
  measurementId: "G-J0H2G1YJVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const saveNews = async (newsJson) => {
  try {
    const docRef = await addDoc(collection(db, "news"), newsJson);
    return docRef;
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
};

export const getNewsDb = async () => {
  const q = query(collection(db, "news"), orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateNews = async (id, newsJson) => {
  try {
    const newsRef = doc(db, "news", id);
    await updateDoc(newsRef, newsJson);
    console.log("Noticia actualizada con ID: ", id);
  } catch (error) {
    console.error("Error al actualizar la noticia: ", error);
  }
};

//hacer update para añadir id al documento
export const updateId = (newsId) => {
  const newsRef = doc(db, "news", newsId);
  updateDoc(newsRef, { id: newsId });
};