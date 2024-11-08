document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleButton");
    const dropdownContent = document.getElementById("dropdownContent");

    if (toggleButton && dropdownContent) {
        toggleButton.addEventListener("click", function() {
            // Alterna la clase 'active' para mostrar u ocultar el menú
            dropdownContent.classList.toggle('active');
        });
    } else {
        console.error("Uno o más elementos no se encontraron en el DOM");
    }
});
