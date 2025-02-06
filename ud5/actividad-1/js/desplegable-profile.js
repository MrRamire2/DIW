document.addEventListener("DOMContentLoaded", function() {
    const imgProfile = document.getElementById("img-profile-logout");
    const profileMenu = document.getElementById("profile-menu");
    const accessibilityOptions = document.getElementById("accessibility-options");
    const dropdownContent = document.getElementById("dropdownContent");

    if (imgProfile && profileMenu) {
        imgProfile.addEventListener("click", function() {
            // Alterna la clase 'active' en el dropdown
            profileMenu.classList.toggle('active');

            // Si el dropdown está activo, desactiva el menú de accesibilidad
            if (profileMenu.classList.contains('active')) {
                accessibilityOptions.classList.remove('active');
                dropdownContent.classList.remove('active');
            }

        });
    } else {
        console.error("Uno o más elementos no se encontraron en el DOM");
    }
});
