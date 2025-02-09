import { getNewsDb, saveNews, updateNews, updateId } from "../firebase/firebase-connect.js";

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
          alert("Solo se permite un elemento por columna.");
          return;
        }
        if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
          alert("Solo se permite un elemento en esta columna.");
          return;
        }
  
        let newElement;
        if (type === "paragraph") {
          newElement = $(`
            <div class="element">
              <p class="editable">Escribe aquí tu texto...</p>
            </div>
          `);
        } else if (type === "image") {
          newElement = $(`
            <div class="element">
              <img class="img-editable" src="" alt="Imagen" style="display: none;">
              <input type="file" accept="image/*" class="image-upload" />
            </div>
          `);
        }
  
        $(this).append(newElement);
  
        // Poder editar los párrafos
        newElement.find(".editable").on("click", editParagraph);
  
        // Cargar imágenes cuando se selecciona un archivo
        newElement.find(".image-upload").on("change", loadImage);
  
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
  $("#load-news").on("click", async function () {
    const allNews = await getNewsDb();
    let idSelect = $("#load-news-select").val();

    if (!allNews) {
      alert("No hay configuración guardada.");
      return;
    }

    $.each(allNews, (index, news) => {
      if (news.id === idSelect) {
        $("#title").val(news.title);
        const content = news.content;

        // Limpiar contenido actual
        $(".row-container").empty();

        $.each(content, (index, row) => {
          let newRow = $('<div class="row"></div>');

          row.forEach(column => {
            let newColumn = $('<div class="column"></div>');

            if (column.type === "paragraph") {
              let newParagraph = $(`
              <div class="element">
                <p class="editable">${column.content}</p>
              </div>
            `);
              newColumn.append(newParagraph);
            } else if (column.type === "image") {
              let newImage = $(`
              <div class="element">
                <img class="img-editable" src="${column.src}" alt="Imagen">
                <input type="file" accept="image/*" class="image-upload" />
              </div>
            `);
              newColumn.append(newImage);
            }

            newRow.append(newColumn);
          });

          newRow.append('<button class="delete-row-btn">Eliminar fila</button>');
          $(".row-container").append(newRow);

          // Habilitar la edición de párrafos y carga de imágenes después de añadir al DOM
          newRow.find(".editable").on("click", editParagraph);
          newRow.find(".image-upload").on("change", loadImage);
        });
        initializeDeleteButtons();
      }
    });
  });

  // Subir configuración
  $("#upload-news").on("click", async function () {
    const title = $("#title").val();

    if (title === "") {
      alert("Por favor, ingrese un título para la noticia.");
      return;
    }

    const newsStorage = await getNewsDb() || [];
    let isUnique = true;

    for (const news of newsStorage) {
      if (title === news.title) {
        isUnique = false;

        if (confirm("Ya existe una noticia con ese título, ¿quieres sobrescribirla?")) {
          try {

            await updateNews(news.id, { content: getData() });
            deleteContent();
            console.log("Noticia sobrescrita correctamente.");
          } catch (error) {
            console.error("Error al actualizar la noticia:", error);
          }
        }

        //salir de la función
        return;
      }
    }

    if (isUnique) {
      try {
        const newsJson = getData();
        await saveToDb(newsJson);
        deleteContent();
      } catch (error) {
        console.error("Error al guardar la noticia:", error);
      }
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

  reader.onloadend = async function () {
    const base64String = reader.result;

    const img = $(input).siblings("img");
    img.attr("src", base64String);
    img.show();

  };

  reader.readAsDataURL(input.files[0]);
}


//editar parrafo
function editParagraph() {
  const $p = $(this);
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
async function saveToDb(newJson) {
  let user_logged = localStorage.getItem('users_log');
  let title = $("#title").val();
  let state;

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

  const news = await saveNews(newsStorage);
  const newsId = news.id;
  //hacer update para añadir id al documento
  updateId(newsId);
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
async function getNews() {
  try {
    let newsData = await getNewsDb();
    $("#load-news-select").find('option').not(':first').remove();

    $.each(newsData, (index, news) => {
      $("#load-news-select").append(`<option value='${news.id}'>${news.title}</option>`)
    })
  } catch (error) {
    console.error("Error obteniendo noticias:", error);
  }
}