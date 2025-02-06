$(function () {
    // Hacer los elementos de la toolbox arrastrables
    $(".tool").draggable({
      helper: "clone",
      revert: "invalid"
    });
  
    function initializeDroppable() {
      $(".column").droppable({
        accept: ".tool",
        drop: function (event, ui) {
          const type = ui.draggable.data("type");
          if ($(this).children().length >= 2 && $(this).hasClass("half")) {
            alert("Solo se permiten dos elementos por columna.");
            return;
          }
          if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
            alert("Solo se permite un elemento en esta columna.");
            return;
          }
  
          let newElement;
          if (type === "paragraph") {
            newElement = $(
              `<div class="element">
                  <input type="text" class="editable" value="Escribe aquí tu texto..."></input>
                </div>`
            );
          } else if (type === "image") {
            newElement = $(
              `<div class="element">
                  <input type="file" accept="image/*" onchange="loadImage(event)" />
                  <img src="" alt="Imagen" style="display: none;">
                </div>`
            );
          }
  
          $(this).append(newElement);
          makeElementsDraggable();
        }
      });
    }
  
    function makeElementsDraggable() {
      $(".element").draggable({
        helper: "original",
        revert: "invalid"
      });
    }
  
    $("#add-row").on("click", function () {
      const columnCount = $("#column-choice").val();
      let newRow = '<div class="row">';
  
      if (columnCount === "1") {
        newRow += `<div class="column"></div>`;
      } else {
        newRow += `
            <div class="column half"></div>
            <div class="column half"></div>`;
      }
  
      newRow += `
          <button class="delete-row-btn">Eliminar fila</button>
          </div>`;
      $("#builder .row-container").append(newRow);
  
      initializeDroppable();
      initializeDeleteButtons();
    });
  
    function initializeDeleteButtons() {
      $(".delete-row-btn").off("click").on("click", function () {
        $(this).closest(".row").remove();
      });
    }
  
    // Guardar configuración
    $("#save-config").on("click", function () {
      const newsJson = getData();
      saveToLocalStorage(newsJson);
    });
  
    // Cargar configuración
    $("#load-config").on("click", function () {
      const config = localStorage.getItem("postBuilderConfig");
      if (!config) {
        alert("No hay configuración guardada.");
        return;
      }
  
      const rows = JSON.parse(config);
      $(".row-container").empty(); // Limpiar todo antes de cargar
      rows.forEach(row => {
        let newRow = '<div class="row">';
        row.forEach(column => {
          newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
          column.forEach(element => {
            if (element.type === "paragraph") {
              newRow += `
                  <div class="element">
                    <p class="editable" onclick="editParagraph(this)">${element.content}</p>
                  </div>`;
            } else if (element.type === "image") {
              newRow += `
                  <div class="element">
                    <img src="${element.src}" alt="Imagen">
                  </div>`;
            }
          });
          newRow += `</div>`;
        });
        newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
        $(".row-container").append(newRow);
      });
  
      initializeDroppable();
      initializeDeleteButtons();
    });
  
    initializeDroppable();
  });
  
  
  function loadImage(event) {
    const input = event.target;
    const reader = new FileReader();
    reader.onload = function () {
      const img = $(input).siblings("img");
      img.attr("src", reader.result);
      img.show();
      $(input).hide();
    };
    reader.readAsDataURL(input.files[0]);
  }
  
  
  function getData() {
    const rows = $(".row");
    const newJson = [];
  
    rows.each((index, row) => {
      const elements = $(row).find(".element");
      const rowData = [];
  
      elements.each((i, element) => {
        console.log(index);
  
        if ($(element).children("input").attr("type") === "text") {
          rowData.push($(element).children("input").val());
        } else {
          rowData.push($(element).children("img").attr("src"));
        }
      });
  
      newJson.push(rowData);
    });
  
    return newJson;
  }
  
  
  function saveToLocalStorage(newsJson) {
    let newsData = localStorage.getItem('news');
  
    if (newsData) {
      newsData = JSON.parse(newsData);
    } else {
      newsData = [];
    }
  
    newsData.push(newsJson);
    localStorage.setItem('news', JSON.stringify(newsData));
  
    alert("Datos guardados en localStorage:", newsData);
  }