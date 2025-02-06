//comprobar que haya un usuario
if (localStorage.getItem("users") === null) {

    // crear salt 
    const salt = CryptoJS.lib.WordArray.random(16).toString();

    //añadir encriptación a la contraseña
    const password = "Ramis.20";
    const saltedPassword = password + salt;
    const hash = CryptoJS.SHA256(saltedPassword).toString();

    //El usuario para añadir si no existe uno
    let users = [];
    users.push({ 'id': 1, 'name': 'admin', 'email': 'desenvolupador@iesjoanramis.org', 'password_hash': hash, 'password_salt': salt, 'edit_users': 1, 'edit_news': 1, 'edit_bone_files': 1, 'active': 1, 'is_first_login': 1, 'profile_url': '../images/users/admin.png'});
    localStorage.setItem("users", JSON.stringify(users));
}