const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const submit = document.getElementById("submit");
const error = document.getElementById("error");

submit.addEventListener("click", () => {
    comparePassword(password.value, newPassword.value);
});

visible(password);
visible(newPassword);

function comparePassword(password, newPassword) {
    if (password === newPassword) {
        // Obtener datos del usuario actual
        let user_log = JSON.parse(localStorage.getItem("users_log")) || null;
        let users = JSON.parse(localStorage.getItem("users")) || [];

        if (!user_log) {
            console.error("No hay un usuario logueado.");
            return;
        }

        let user_id = user_log["id"];
        const salt = user_log["password_salt"]; 

        // Encriptar la nueva contraseña
        const saltedPassword = password + salt;
        const hash = CryptoJS.SHA256(saltedPassword).toString();

        let userFound = false;

        users.forEach(user => {
            if (user["id"] === user_id) {
                user["password_hash"] = hash;
                user["is_first_login"] = 0;
                userFound = true;
            }
        });

        if (userFound) {
            // Guardar cambios en localStorage
            localStorage.setItem('users', JSON.stringify(users));
            window.location.href = "../index.html";
        } else {
            console.error("Usuario no encontrado en la lista.");
        }
    } else {
        // Mostrar error si las contraseñas no coinciden
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
