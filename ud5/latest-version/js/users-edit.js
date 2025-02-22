import { getUsersDb, saveUsers, deleteUserById } from "../firebase/firebase-connect.js";


$(function() {
    getUsersSelect();
});

$("#email").on("change", () => {
    $("#add-user").text('Añadir usuario');
    $("#delete-user").css("display", "none");
});


$("#add-user").on("click", async () => {
    const save = await saveUsers(formatData(), $("#email").val());
    if (save == "Documento guardado exitosamente") {
        clearInputs();
        getUsersSelect();
    }
    alert(save);
});


$("#delete-user").on("click", function() {
    deleteUserById($("#email").val());
        clearInputs();
        getUsersSelect();
});


$("#image").on("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onloadend = function() {

            const base64Image = reader.result;
            $("#image").attr("src", base64Image); 
        }
        
        reader.readAsDataURL(file);
    }
});

$("#load-users").on("click", async () => {
    const allUsers = await getUsersDb();
    const idUser = $("#load-users-select").val();
    
        if (!allUsers) {
        alert("No hay configuración guardada.");
        return;
      }

      $.each(allUsers, (index, user) => {
        if (user.id === idUser) {

            $("#name").val(user.name);
            $("#email").val(user.email);
            $("#password").val("");
            $("#image").attr("src", user.profile_url);
            $("#edit_bone_files").prop("checked", user.edit_bone_files);
            $("#edit_news").prop("checked", user.edit_news);
            $("#edit_users").prop("checked", user.edit_users);


            $("#add-user").text('Editar usuario');
            $("#delete-user").css("display", "block");
        }
      });
});


function formatData() {
    const name = $("#name").val();
    const email = $("#email").val();
    // const password = $("#password").val();
    const password = "Ramis.20";
    const image = $("#image").attr("src");
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
            is_first_login: 1,
            name: name,
            password_hash: hash,
            password_salt: salt,
            profile_url: image || ""
        };
    } else {
        alert("Faltan datos por rellenar");
    }
};

 
function clearInputs() {
    $("#name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#image").val("");
    $("#edit_bone_files").prop("checked", false);
    $("#edit_news").prop("checked", false);
    $("#edit_users").prop("checked", false);
            
    $("#add-user").text('Editar usuario');
    $("#delete-user").css("display", "none");

};


async function getUsersSelect() {
    clearInputs();
    try {
        let usersData = await getUsersDb();
        $("#load-users-select").find('option').not(':first').remove();

        $.each(usersData, (index, user) => {
            $("#load-users-select").append(`<option value='${user.email}'>${user.email}</option>`);
        });
    } catch (error) {
        console.error("Error obteniendo los usuarios:", error);
    }
};