import { getUserById } from "../firebase/firebase-connect.js";

$(async function () {
    const user = localStorage.getItem('users_log');

    const userData = await getUserById(user.replaceAll('"', ''));

    const src_img = userData.data().profile_url;

    let img_default = "";
    let img_user ="";

    console.log(src_img);

    if (window.location.pathname.includes("/index.html")) {
        img_default = "./images/users/default.png";
        img_user = src_img;
    } else {
        img_default = "../images/users/default.png";
        img_user = src_img;
    }
    

    if (src_img == "") {
        $('#img-profile-logout').attr('src', img_default);
    } else {
        $('#img-profile-logout').attr('src', img_user);
    }
});