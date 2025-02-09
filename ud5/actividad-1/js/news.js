import { getNewsDb } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
  const allNews = await getNewsDb();
  const container = document.getElementById("news-container");

  $.each(allNews, (index, news) => {

    if (news.notice_state == 1) {

      let titulo = news.title;
      let descripcion = "";
      let imagen = "";

      let imagenValidator = true;
      let descripcionValidator = true;

      $.each(news.content, (index, row) => {

        $.each(row, (index, column) => {

          if (descripcionValidator && column.type === "paragraph") {
            descripcion = column.content;
            descripcionValidator = false;
          }
          
          if (imagenValidator && column.type === "image") {
            imagen = column.src;
            imagenValidator = false;
          }

          if (!imagenValidator && !descripcionValidator) {
            return false;
          }

        });
      });

      
    const newContent = `
    <section onclick="window.location.href='./news-page.html';" class="card-container">
      <section class="card-image-container">
        <img class="card-image" src="${imagen}" alt="POR AÑADIR">
      </section>
      <article class="card-content">
        <h2 class="card-title">${titulo}</h2>
        <p class="card-description">
          ${descripcion}
        </p>
      </article>
    </section>`;

    container.insertAdjacentHTML("afterbegin", newContent);

    }
  });
});