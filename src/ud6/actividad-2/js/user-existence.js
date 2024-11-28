if (localStorage.getItem("users") === null) {

    let users = [];
    users.push({ 'id': 1, 'name': "admin", 'email': "desenvolupador@iesjoanramis.org", 'password_hash': "Ramis.20", 'edit_users': 1, 'edit_news': 1, 'edit_bone_files': 1, 'active': 1, 'is_first_login': 1});
    localStorage.setItem("users", JSON.stringify(users));

}