$(document).ready(function() {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    $("#password").on("input", function() {
        const password = $(this).val();
        const errorMessage = $("#password-error");

        // Verificar si la contraseña cumple con los requisitos
        if (!passwordRegex.test(password)) {
            errorMessage.show();  // Mostrar mensaje de error
        } else {
            errorMessage.hide();  // Ocultar mensaje de error si la contraseña es válida
        }
    });
});