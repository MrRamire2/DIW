import { getUsersDb } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    const editUsers = document.getElementById("edit-users");
    const editNews = document.getElementById("edit-news");
    const editBoneFiles = document.getElementById("edit-bone-files");

    const email_user_log = JSON.parse(localStorage.getItem("users_log"));

    if (email_user_log) {
        try {
            const users = await getUsersDb();
            let userFound = false;

            for (let user of users) {
                if (user.id === email_user_log) {
                    userFound = true;

                    editUsers.style.display = user.edit_users === true ? "flex" : "none";
                    editNews.style.display = user.edit_news === true ? "flex" : "none";
                    editBoneFiles.style.display = user.edit_bone_files === true ? "flex" : "none";

                    break;
                }
            }

            if (!userFound) {
                console.error("Usuario no encontrado en la base de datos.");
            }
        } catch (err) {
            console.error("Error al obtener los usuarios desde Firebase:", err);
        }
    }

    editNews.addEventListener("click", () => {
        document.location.href = "./views/news-edit.html";
    });

    editUsers.addEventListener("click", () => {
        document.location.href = "../views/users-edit.html";
    });
});
