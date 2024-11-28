//traer los usuarios del LS
let users = JSON.parse(localStorage.getItem("users"));
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");
const error = document.getElementById("error");


submit.addEventListener("click", () => {
    
    users.forEach(user => {
    
        if (email.value === user["email"] && password.value === user["password_hash"]) {
            
            localStorage.setItem("users_log", JSON.stringify(user));
            error.style.visibility = "hidden";

        } else {
            error.style.visibility = "visible";
        }


        
        console.log(user["email"]); 
        console.log(user["password_hash"]); 
        console.log(email.value); 
        console.log(password.value); 
    
    });

});

