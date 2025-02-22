// Obtener los elementos de logout y la imagen del perfil
const logoutbtn = document.getElementById("logout-btn");
const login = document.getElementById("login");
const imgProfile = document.getElementById("img-profile");

// Obtener el valor de 'users_log' desde localStorage (si existe)
const userLog = JSON.parse(localStorage.getItem('users_log'));

// Comprobar si el usuario está logueado
if (userLog === null) {
    login.style.display = "block";
    logout.style.display = "none";

}else {
    login.style.display = "none";
    logout.style.display = "block"; 
}

// Agregar el evento de logout
logoutbtn.addEventListener("click", () => {
    localStorage.removeItem('users_log');
    imgProfile.src = "./images/login.png";

    if (document.location.href.includes("index.html")) {
        window.location.href = "./views/login.html"; 
    } else {
        window.location.href = "./login.html"; 
    }
});
