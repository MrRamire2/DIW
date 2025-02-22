import { getUsersDb } from "../firebase/firebase-connect.js";

let users = [];

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return passwordRegex.test(password);
}

getUsersDb()
  .then(fetchedUsers => {
    users = fetchedUsers;

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const submit = document.getElementById("submit");
    const error = document.getElementById("error");

    submit.addEventListener("click", () => {
        if (!isValidPassword(password.value)) {
            error.textContent = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
            error.style.visibility = "visible";
            return;
        }

        users.forEach(user => {
            let salt = user["password_salt"];
            let password_salt = password.value + salt;
            const hash = CryptoJS.SHA256(password_salt).toString();

            if (email.value === user["email"] && hash === user["password_hash"]) {
                localStorage.setItem("users_log", JSON.stringify(user["email"]));
                error.style.visibility = "hidden";

                if (user["is_first_login"] === 1) {
                    document.location.href = "../views/change-password.html";
                } else {
                    document.location.href = "../index.html";
                }
            } else {
                error.style.visibility = "visible";
            }
        });
    });
})
.catch(err => {
  console.error("Error al obtener los usuarios:", err);
});
