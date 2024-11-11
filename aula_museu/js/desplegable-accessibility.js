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
    const body = document.body;

    // Botón de escala de grises
    const grayscaleButton = document.getElementById("grayscale");
    grayscaleButton.addEventListener("click", () => {
        body.classList.toggle("grayscale");
        resetFiltersExcept("grayscale");
    });

    // Botón de contraste oscuro
    const darkContrastButton = document.getElementById("dark_contrast");
    darkContrastButton.addEventListener("click", () => {
        body.classList.toggle("dark-contrast");
        resetFiltersExcept("dark-contrast");
    });

    // Botón de contraste claro
    const lightContrastButton = document.getElementById("light_contrast");
    lightContrastButton.addEventListener("click", () => {
        body.classList.toggle("light-contrast");
        resetFiltersExcept("light-contrast");
    });

    // Botón de alta saturación
    const highSaturationButton = document.getElementById("high_saturation");
    highSaturationButton.addEventListener("click", () => {
        body.classList.toggle("high-saturation");
        resetFiltersExcept("high-saturation");
    });

    // Botón de baja saturación
    const lowSaturationButton = document.getElementById("low_saturation");
    lowSaturationButton.addEventListener("click", () => {
        body.classList.toggle("low-saturation");
        resetFiltersExcept("low-saturation");
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
                body.classList.remove(filter);
            }
        });
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
