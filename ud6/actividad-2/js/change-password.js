const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");
const submit = document.getElementById("submit");

submit.addEventListener("click", ()=>{
    comparePassword(password.value, newPassword.value);
});

function comparePassword(password, newPassword) {
    if (password === newPassword) {
        
    }
}