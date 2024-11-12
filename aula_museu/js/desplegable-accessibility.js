document.addEventListener("DOMContentLoaded", function() {
    const accessibilityButton = document.getElementById("accessibility-button");
    const accessibilityOptions = document.getElementById("accessibility-options");
    const dropdownContent = document.getElementById("dropdownContent"); // Referencia al otro menú

    if (accessibilityButton && accessibilityOptions) {
        accessibilityButton.addEventListener("click", function() {
            // Alterna la clase 'active' en el menú de accesibilidad
            accessibilityOptions.classList.toggle('active');
            
            // Si el menú de accesibilidad está activo, desactiva el dropdown
            if (accessibilityOptions.classList.contains('active')) {
                dropdownContent.classList.remove('active');
            }
        });
    } else {
        console.error("Uno o más elementos no se encontraron en el DOM");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    const logo = document.querySelector('.header-logo'); 
    const login = document.querySelector('.login'); 
    const desktop = document.querySelector('.nav-desktop'); 
    const header = document.querySelector('header');

    const accessibilityButtons = [
        { id: "grayscale", class: "grayscale" },
        { id: "dark_contrast", class: "dark-contrast" },
        { id: "light_contrast", class: "light-contrast" },
        { id: "high_saturation", class: "high-saturation" },
        { id: "low_saturation", class: "low-saturation" }
    ];

    // Agregar evento de clic a cada botón de accesibilidad
    accessibilityButtons.forEach(button => {
        const buttonElement = document.getElementById(button.id);
        if (buttonElement) {
            buttonElement.addEventListener("click", () => {
                main.classList.toggle(button.class);
                footer.classList.toggle(button.class);
                logo.classList.toggle("grayscale");
                login.classList.toggle("grayscale");
                desktop.classList.toggle("grayscale");
                header.classList.toggle("header-bg", button.class === "grayscale");
                resetFiltersExcept(button.class);
            });
        }
    });

    // Función para resetear todos los filtros excepto el seleccionado
    function resetFiltersExcept(exceptClass) {
        const filters = [
            "grayscale",
            "dark-contrast",
            "light-contrast",
            "high-saturation",
            "low-saturation",
        ];
        filters.forEach((filter) => {
            if (filter !== exceptClass) {
                main.classList.remove(filter);
                footer.classList.remove(filter);
                logo.classList.remove(filter);
                login.classList.remove(filter);
                desktop.classList.remove(filter);
            }
        });
        if (exceptClass !== "grayscale") {
            header.classList.remove("header-bg");
        }
    }
});



document.addEventListener("DOMContentLoaded", function() {
    // Obtener los controles de los inputs
    const fontSizeInput = document.getElementById("font-size");
    const lineSpacingInput = document.getElementById("line-spacing");
    const wordSpacingInput = document.getElementById("word-spacing");
    const letterSpacingInput = document.getElementById("letter-spacing");

    // Función para actualizar las configuraciones de la fuente
    function updateFontSettings() {
        const fontSize = fontSizeInput.value + "em";
        const lineSpacing = lineSpacingInput.value + "em";
        const wordSpacing = wordSpacingInput.value + "em";
        const letterSpacing = letterSpacingInput.value + "em";

        // Actualizar las propiedades del body con los valores de los inputs
        document.body.style.fontSize = fontSize;
        document.body.style.lineHeight = lineSpacing;
        document.body.style.wordSpacing = wordSpacing;
        document.body.style.letterSpacing = letterSpacing;
    }

    // Establecer los valores iniciales
    updateFontSettings();

    // Agregar eventos de cambio a los inputs
    fontSizeInput.addEventListener("input", updateFontSettings);
    lineSpacingInput.addEventListener("input", updateFontSettings);
    wordSpacingInput.addEventListener("input", updateFontSettings);
    letterSpacingInput.addEventListener("input", updateFontSettings);
});
