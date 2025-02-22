import { getNewsById } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('q');

    const news = await getNewsById(id);

    const title = news.data().title;
    const allContent = news.data().content;


    let article = "";

    $.each(allContent, (i, row) => {
        article += "<article class='articulo'>";
        $.each(row, (j, content) => {
            if (row.length > 1) {
                if (content.type === 'paragraph') {
                    if (j > 0) {
                        article += `<p class="medio right">${content.content}</p>`;
                    } else {
                        article += `<p class="medio left">${content.content}</p>`;
                    }
                } else {
                    if (j > 0) {
                        article += `<img class="medio right" src="${content.src}" alt="Image">`;
                    } else {
                        article += `<img class="medio left" src="${content.src}" alt="Image">`;
                    }
                }
            } else {
                if (content.type === 'paragraph') {
                    article += `<p class="completo">${content.content}</p>`;
                } else {
                    article += `<img class="completo" src="${content.src}" alt="Image">`;
                }
            }
        });
        article += "</article>";
    })

    $("#title").html(title);
    $("#container").html(article);

    $(".articulo").each(function() {
        if ($(this).find("img.medio").length > 0) {
            $(this).addClass("img");
        }
    });
});