document.addEventListener("DOMContentLoaded", function () {
    const editUsers = document.getElementById("edit-users");
    const editNews = document.getElementById("edit-news");
    const editBoneFiles = document.getElementById("edit-bone-files");

    const storedUser = JSON.parse(localStorage.getItem("users_log"));

    if (storedUser) {
        // Control de visibilidad según los permisos del usuario
        editUsers.style.display = storedUser.edit_users === 1 ? "flex" : "none";
        editNews.style.display = storedUser.edit_news === 1 ? "flex" : "none";
        editBoneFiles.style.display = storedUser.edit_bone_files === 1 ? "flex" : "none";
    }

    editNews.addEventListener("click", ()=>{
        document.location.href="../views/news-edit.html";
    });
});