import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT0-CcfYR_Ia_3ed4bzKVEZT0oGyV-nL0",
  authDomain: "exam2425-a3832.firebaseapp.com",
  projectId: "exam2425-a3832",
  storageBucket: "exam2425-a3832.firebasestorage.app",
  messagingSenderId: "601397751515",
  appId: "1:601397751515:web:8bd7dfaee3a7231c56e6fe"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


$('#save').on('click', () => { 

  const data = getData();
  const lsId = parseInt(localStorage.getItem("id"));
  const num = (lsId + 1);
  localStorage.setItem("id", num || 0);
  const id = ("Jhonatan" + num);
  try {
    uploadData(data, id);
  } catch (error) {
    console.log("Error saving the user " + data.name + " " + error);
  }
});

function getData () {
  const name = $('#name').val();
  const email = $('#email').val();
  const phone = $('#phone').val();
  const city = $('#city').val();

  if (name !== "" && email !== "" && phone !== "" && city !== "") {

    return{
      "name": name,
      "email": email,
      "phone": phone,
      "city": city
    }
  } else {
    alert("Datos sin rellenar");
  }
}

async function uploadData(data, id) {
  await setDoc(doc(db, "users", id), data);
}