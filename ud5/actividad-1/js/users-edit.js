import { saveUsers } from "../firebase/firebase-connect.js";

$("#add-user").on("click", async () => {
    const save = await saveUsers(formatData(), $("#email").val());
    alert(save);
  });

function formatData() {
    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const image = $("#image").val();
    const editBoneFile = $("#edit_bone_files").prop("checked");
    const editNews = $("#edit_news").prop("checked");
    const editUsers = $("#edit_users").prop("checked");
    
    if (name != "" && email != "" && password != "") {
        const salt = CryptoJS.lib.WordArray.random(16).toString();
        const saltedPassword = password + salt;
        const hash = CryptoJS.SHA256(saltedPassword).toString();
        return {
            active: 1,
            edit_bone_files: editBoneFile,
            edit_news: editNews,
            edit_users: editUsers,
            email: email,
            id: email,
            is_first_login: 0,
            name: name,
            password_hash: hash,
            password_salt: salt,
            profile_url: image
        }
    } else {
        alert("Faltan datos por rellenar");
    }
};

// debo añadirlo en algun lado 
function clearInputs() {
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#image").val("");
    $("#edit_bone_files").prop("checked", false);
    $("#edit_news").prop("checked", false);
    $("#edit_users").prop("checked", false);
}