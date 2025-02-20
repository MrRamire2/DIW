import { getUserById } from "../firebase/firebase-connect.js";

$(async function () {
    const user = localStorage.getItem('users_log');

    const userData = await getUserById(user.replaceAll('"', ''));

    const src_img = userData.data().profile_url;

    let img_default = "";

    console.log(window.location.pathname);
    if (["/", "/index.html"].includes(window.location.pathname)) {
        img_default = "./images/users/default.png";
    } else {
        img_default = "../images/users/default.png";
    }

    if (src_img == "") {
        $('#img-profile-logout').attr('src', img_default);
    } else {
        $('#img-profile-logout').attr('src', src_img);
    }
});