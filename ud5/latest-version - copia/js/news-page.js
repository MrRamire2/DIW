import { getNewsById } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('q');

    const news = await getNewsById(id);

    const title = news.data().title;
    const allContent = news.data().content;

    // let article = "";
    // let classImg = "m-auto float-none w-11/12 md:float-left md:w-2/3 md:my-3 md:ml-3 md:mr-6";
    // let classP = "m-3";

    let article = "";
    let classImg = "completo";
    let classP = "completo";

    $.each(allContent, (i, row) => {
        article += "<article class='articulo'>";
        $.each(row, (j, content) => {
            if (content.type === 'paragraph') {
                if (j > 0) {
                    article += `<p class="medio">${content.content}</p>`;
                } else {
                    article += `<p class="${classP}">${content.content}</p>`;
                }
            } else {
                if (j > 0) {
                    article += `<img class="medio" src="${content.src}" alt="Image">`; 
                } else {
                    article += `<img class="${classImg}" src="${content.src}" alt="Image">`; 
                }
            }
        });
        article += "</article>";
    
    })

    $("#title").html(title);

    $("#container").html(article);

    $(".articulo").each(function() {
        if ($(this).find(".medio").length > 0) {
            $(this).children().first().addClass("medio");
        }
    });
});