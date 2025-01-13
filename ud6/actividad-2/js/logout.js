// Obtener los elementos de logout y la imagen del perfil
const logout = document.getElementById("logout");
const login = document.getElementById("login");
const imgProfile = document.getElementById("img-profile");

// Obtener el valor de 'users_log' desde localStorage (si existe)
const userLog = JSON.parse(localStorage.getItem('users_log'));

// Comprobar si el usuario está logueado
if (userLog === null) {
    // Si no está logueado, ocultar el enlace de logout y mostrar la imagen de login
    login.style.display = "block";
    logout.style.display = "none";

}else {
    // Si está logueado, mostrar el enlace de logout
    login.style.display = "none";
    logout.style.display = "block"; 
    imgProfile.src = userLog; 
}

// Agregar el evento de logout
// logout.addEventListener("click", () => {
//     // Limpiar el 'users_log' de localStorage (cerrar sesión)
//     localStorage.removeItem('users_log');
    
//     // Cambiar la imagen de perfil y redirigir al login
//     imgProfile.src = "./images/login.png"; 
//     window.location.href = "./views/login.html"; 
// });
