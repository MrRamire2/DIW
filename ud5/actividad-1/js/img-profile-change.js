import { getUserById } from "../firebase/firebase-connect.js";

$(async function () {
    const user = localStorage.getItem('users_log');

    const userData = await getUserById(user.replaceAll('"', ''));

    const src_img = userData.data().profile_url;

    let img_por_defecto = "";

    console.log(window.location.pathname);

    if (window.location.pathname.includes("/index.html")) {
        img_por_defecto = "./images/users/default.png";
    } else {
        img_por_defecto = "../images/users/default.png";
    }
    

    if (src_img == "") {
        $('#img-profile-logout').attr('src', img_por_defecto);
    } else {
        $('#img-profile-logout').attr('src', src_img);
    }
});