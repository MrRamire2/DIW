//traer los usuarios del LS
let users = JSON.parse(localStorage.getItem("users"));
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const error = document.getElementById("error");


submit.addEventListener("click", () => {
    
    //paso por todos los usuarios y comprueba que exista
    users.forEach(user => {

        //salt
        let salt = user["password_salt"];
        //constraseña con salt
        let password_salt = password.value + salt;

        //contraseña con salt encriptada
        const hash = CryptoJS.SHA256(password_salt).toString();

        //para comparar
        console.log(hash);
        console.log(user["password_hash"]);
    
        //comprueba que exista el usuario con los datos ingresados
        if (email.value === user["email"] && hash === user["password_hash"]) {
            
            localStorage.setItem("users_log", JSON.stringify(user));
            error.style.visibility = "hidden";

            if (user["is_first_login"] === 1) {
                document.location.href="../views/change-password.html";
            } else {
                document.location.href="../index.html";
            }

        } else {
            error.style.visibility = "visible";
        }
    });
});