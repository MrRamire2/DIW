import { getUserById } from "../firebase/firebase-connect.js";

$(async function() {
    const user = localStorage.getItem('users_log');

const userData = await getUserById(user.replaceAll('"', ''));

console.log(userData.data().profile_url);

});





// if (userLog !== null) {
//     imgProfile.src = userLog["profile_url"];
// }