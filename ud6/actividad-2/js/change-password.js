const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const submit = document.getElementById("submit");
const error = document.getElementById("error");



submit.addEventListener("click", () => {
    comparePassword(password.value, newPassword.value);
});



visible(password);
visible(newPassword);


//APLICANDO MEJORA DE CODIGO AQUÍ, DEBO RECOGER EL USER PAR ACAMBIAR Y GUARDAR
function comparePassword(password, newPassword) {
    if (password === newPassword) {
        //comprobar que haya un usuario
        localStorage.getItem("users");

        // crear salt 
        const salt = CryptoJS.lib.WordArray.random(16).toString();

        //añadir encriptación a la contraseña
        const password = "Ramis.20";
        const saltedPassword = password + salt;
        const hash = CryptoJS.SHA256(saltedPassword).toString();

        //El usuario para añadir si no existe uno
        let users = [];
        users.push({ 'id': 1, 'name': 'admin', 'email': 'desenvolupador@iesjoanramis.org', 'password_hash': hash, 'password_salt': salt, 'edit_users': 1, 'edit_news': 1, 'edit_bone_files': 1, 'active': 1, 'is_first_login': 1 });
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        error.classList.remove("invisible");
        error.classList.add("visible");
    }
}



function visible(password) {
    password.addEventListener("input", () => {
        error.classList.remove("visible");
        error.classList.add("invisible");
    });
}