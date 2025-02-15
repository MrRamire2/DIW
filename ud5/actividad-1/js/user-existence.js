import { getUsersDb, saveUsers } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let users = await getUsersDb();

        if (users.length === 0) {

            const salt = CryptoJS.lib.WordArray.random(16).toString();

            const password = "Ramis.20";
            const saltedPassword = password + salt;
            const hash = CryptoJS.SHA256(saltedPassword).toString();

            const newUser = {
                id: "desenvolupador@iesjoanramis.org",
                name: 'admin',
                email: 'desenvolupador@iesjoanramis.org',
                password_hash: hash,
                password_salt: salt,
                edit_users: true,
                edit_news: true,
                edit_bone_files: true,
                active: 1,
                is_first_login: 1,
                profile_url: '../images/users/admin.png'
            };

            const result = await saveUsers(newUser, newUser.id);
            console.log(result);
        }
    } catch (error) {
        console.error("Error al comprobar y crear el usuario:", error);
    }
});
