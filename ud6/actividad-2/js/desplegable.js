document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleButton");
    const dropdownContent = document.getElementById("dropdownContent");
    const profileMenu = document.getElementById("profile-menu");
    const accessibilityOptions = document.getElementById("accessibility-options"); // Referencia al menú de accesibilidad

    if (toggleButton && dropdownContent) {
        toggleButton.addEventListener("click", function() {
            // Alterna la clase 'active' en el dropdown
            dropdownContent.classList.toggle('active');

            // Si el dropdown está activo, desactiva el menú de accesibilidad
            if (dropdownContent.classList.contains('active')) {
                accessibilityOptions.classList.remove('active');
                profileMenu.classList.remove('active');                   
            }
        });
    } else {
        console.error("Uno o más elementos no se encontraron en el DOM");
    }
});
