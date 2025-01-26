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
              <p class="editable" onclick="editParagraph(this)">Escribe aquí tu texto...</p>
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

  // Editar configuración
  $("#save-news").on("click", function () {
    const rows = [];
    $(".row").each(function () {
      const row = [];
      $(this).find(".column").each(function () {
        const column = [];
        $(this).children(".element").each(function () {
          if ($(this).find("p").length) {
            column.push({
              type: "paragraph",
              content: $(this).find("p").text()
            });
          } else if ($(this).find("img").length) {
            column.push({
              type: "image",
              src: $(this).find("img").attr("src")
            });
          }
        });
        row.push(column);
      });
      rows.push(row);
    });

    const config = JSON.stringify(rows);
    localStorage.setItem("postBuilderConfig", config);
    alert("Configuración guardada en el navegador.");
  });

  // Cargar configuración
  $("#load-news").on("click", function () {
    const config = localStorage.getItem("postBuilderConfig");
    if (!config) {
      alert("No hay configuración guardada.");
      return;
    }

    const rows = JSON.parse(config);
    $(".row-container").empty();
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

  // Subir configuración
  $("#upload-news").on("click", function () {
    if ($("#title").val() !== "") {
      const newsJson = getData();
      saveToLocalStorage(newsJson);
      deleteContent();
    } else {
      alert("Por favor, ingrese un título para la noticia.");
    }
  });

  // eliminar configuración
  $("#delete-news").on("click", function () {
    deleteContent();
  });

  function deleteContent() {
    $(".row").remove();
    $("#title").val("");
    $("#state").prop("checked", false);
  }
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

function editParagraph(paragraph) {
  const $p = $(paragraph);
  const currentText = $p.text();
  const input = $(`<input type="text" value="${currentText}" />`);

  input.on("blur", function () {
    const newText = $(this).val();
    $p.text(newText);
    $p.show();
    $(this).remove();
  });

  $p.hide();
  $p.after(input);
  input.focus();
}

function getData() {
  const rows = $(".row");
  const newJson = {};

  rows.each((index, row) => {
    const elements = $(row).find(".element");
    const rowData = [];

    elements.each((i, element) => {
      console.log(index);

      if ($(element).children().is("p")) {
        rowData.push({
          type: "paragraph",
          content: $(element).find("p").text()
        });
      } else {
        rowData.push({
          type: "image",
          src: $(element).find("img").attr("src")
        });
      }
    });

    newJson[index + 1] = rowData;
  });

  return newJson;
}


function saveToLocalStorage(newJson) {
  let newsData = localStorage.getItem('news');
  let user_logged = localStorage.getItem('users_log');
  let title = $("#title").val();
  let state;

  if (newsData) {
    newsData = JSON.parse(newsData);
  } else {
    newsData = [];
  }

  if (user_logged) {
    user_logged = JSON.parse(user_logged);
  } else {
    alert("No hay usuario logueado.");
    return;
  }

  if ($("#state").prop("checked")) {
    state = 1;
  } else {
    state = 0;
  }

  let newsStorage = createStandardizedJson(title, user_logged["name"], newJson, state);

  newsData.push(newsStorage);
  localStorage.setItem('news', JSON.stringify(newsData));

  alert("Datos guardados en localStorage:", newsData);
}


function createStandardizedJson(title, author, contentArray, notice_state) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: title,
    author: author,
    date: new Date().toISOString(),
    content: contentArray,
    notice_state: notice_state
  };
}

