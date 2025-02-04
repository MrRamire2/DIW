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
        if ($(this).children().length >= 1 && $(this).hasClass("half")) {
          alert("Solo se permite un elementos por columna.");
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
    const allNews = JSON.parse(localStorage.getItem('news'));
    let idSelect = $("#load-news-select").val();

    if (!allNews) {
      alert("No hay configuración guardada.");
      return;
    }

    $.each(allNews, (index, news) => {
      if (news.id === idSelect) {

        $("#title").val(news.title);

        const content = news.content;
        console.log(content)
        $(".row-container").empty(); // Limpiar todo antes de cargar

        let newRow;

        $.each(content, (index, row) => {
          newRow = '<div class="row">';

          row.forEach(column => {
            newRow += `<div class="column">`;
            if (column.type === "paragraph") {
              newRow += `
              <div class="element">
                <p class="editable" onclick="editParagraph(this)">${column.content}</p>
              </div>`;
            } else if (column.type === "image") {
              newRow += `
              <div class="element">
                <img src="${column.src}" alt="Imagen">
              </div>`;
            }
            newRow += `</div>`;
          });
          newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
          $(".row-container").append(newRow);
        });
      }
    });

    initializeDroppable();
    initializeDeleteButtons();
  });

  // Subir configuración
  $("#upload-news").on("click", function () {
    if ($("#title").val() !== "") {
      const newsStorage = JSON.parse(localStorage.getItem('news')) || [];

      let isUnique = true;

      $.each(newsStorage, (index, news) => {

        if ($("#title").val() === news.title) {

          isUnique = false;

          if (confirm("Ya existe una noticia con ese título, quieres sobrescribirla?")) {
            
            //eliminar noticia a sobrescribir
            let newsData = JSON.parse(localStorage.getItem('news')) || [];
            newsData.splice(index, 1);
            localStorage.setItem('news', JSON.stringify(newsData));

            //añadir noticia
            const newsJson = getData();
            saveToLocalStorage(newsJson);
            deleteContent();
          }
          return false;
        }
      });

      if (isUnique) {
        const newsJson = getData();
        saveToLocalStorage(newsJson);
        deleteContent();
      }
    } else {
      alert("Por favor, ingrese un título para la noticia.");
    }
    getNews();
  });

  // eliminar configuración
  $("#delete-news").on("click", function () {
    deleteContent();
  });

  // Cargar noticias
  getNews();

  function deleteContent() {
    $(".row").remove();
    $("#title").val("");
    $("#state").prop("checked", false);
  }
});

//cargar imagen
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

//editar parrafo
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

//obtener datos del DOM
function getData() {
  const rows = $(".row");
  const newJson = {};

  rows.each((index, row) => {
    const elements = $(row).find(".element");
    const rowData = [];

    elements.each((i, element) => {

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

//subir noticias
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

//formato de json
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

//obtener noticias para select
function getNews() {
  let newsData = JSON.parse(localStorage.getItem('news'));
  $("#load-news-select").find('option').not(':first').remove();

  $.each(newsData, (index, news) => {
    $("#load-news-select").append(`<option value='${news.id}'>${news.title}</option>`)
  })
}