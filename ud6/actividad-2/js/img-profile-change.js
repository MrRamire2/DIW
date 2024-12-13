// const imgProfile = document.getElementById("img-profile");
const userLog = JSON.parse(localStorage.getItem("users_log"));

if (userLog !== null) {
    imgProfile.src = userLog["profile_url"];
} else {
    console.log("No hay usuario logueado en localStorage");
}