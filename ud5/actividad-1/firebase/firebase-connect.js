// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, query, orderBy, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"
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


export const saveUsers = async (newsJson, id) => {
  try {
    const users = await getUsersDb();
    const userExists = users.some(user => user.id === id);

    if (userExists && $("#add-user").text() === "Editar usuario") {
      if (confirm("¿Desea sobrescribir el usuario?")) {
        await setDoc(doc(db, "users", id), newsJson);
        return "Documento guardado exitosamente";
      }
    } else if (userExists) {
      return "Error: La ID ya está en uso (duplicada)";
    }
    await setDoc(doc(db, "users", id), newsJson); 
    return "Documento guardado exitosamente";
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    return "Error al guardar los datos";
  }
};



export const getUsersDb = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};


export async function deleteUserById(userId) {
  try {
      const userDocRef = doc(db, "users", userId);
      
      await deleteDoc(userDocRef);
      console.log("Usuario eliminado correctamente.");
  } catch (error) {
      console.error("Error eliminando el usuario: ", error);
  }
}


export async function updateUserPassword(user) {
  try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, {
          password_hash: user.password_hash,
          password_salt: user.password_salt,
          is_first_login: 0
      });
      console.log("Contraseña actualizada exitosamente.");
  } catch (err) {
      console.error("Error actualizando la contraseña:", err);
  }
}