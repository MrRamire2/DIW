import { getUsersDb, updateUserPassword } from "../firebase/firebase-connect.js";

const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const submit = document.getElementById("submit");
const error = document.getElementById("error");

function isValidPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
    return passwordRegex.test(password);
}

submit.addEventListener("click", () => {
    comparePassword(password.value, newPassword.value);
});

visible(password);
visible(newPassword);

async function comparePassword(password, newPassword) {
    if (!isValidPassword(newPassword)) {
        error.textContent = "La nueva contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
        error.classList.remove("invisible");
        error.classList.add("visible");
        return;
    }

    if (password === newPassword) {
        let email_user_log = JSON.parse(localStorage.getItem("users_log")) || null;
        if (!email_user_log) {
            console.error("No hay un usuario logueado.");
            return;
        }

        const userId = email_user_log;
        try {
            let users = await getUsersDb();
            let userFound = false;

            for (let user of users) {
                if (user["id"] === userId) {
                    const saltedPassword = password + user["password_salt"];
                    const hash = CryptoJS.SHA256(saltedPassword).toString();

                    user["password_hash"] = hash;
                    user["is_first_login"] = 0;
                    userFound = true;

                    await updateUserPassword(user);
                }
            }

            if (userFound) {
                window.location.href = "../index.html";
            } else {
                console.error("Usuario no encontrado en la base de datos.");
            }
        } catch (err) {
            console.error("Error al obtener los usuarios:", err);
        }
    } else {
        error.classList.remove("invisible");
        error.classList.add("visible");
    }
}

function visible(passwordInput) {
    passwordInput.addEventListener("input", () => {
        error.classList.remove("visible");
        error.classList.add("invisible");
    });
}
