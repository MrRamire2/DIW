document.addEventListener("DOMContentLoaded", function() {
    const accessibilityButton = document.getElementById("accessibility-button");
    const accessibilityOptions = document.getElementById("accessibility-options");

    if (accessibilityButton && accessibilityOptions) {
        accessibilityButton.addEventListener("click", function() {
            // Verifica si la clase 'active' está presente y la alterna
            accessibilityOptions.classList.toggle('active');
        });
    } else {
        console.error("Uno o más elementos no se encontraron en el DOM");
    }
});