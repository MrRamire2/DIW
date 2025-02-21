import { getNewsById } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('q');

    const news = await getNewsById(id);

    const title = news.data().title;
    const allContent = news.data().content;

    let article = "";


    $.each(allContent, (index, row) => {
        article += "<article>";
        $.each(row, (index, content) => {
            if (content.type === 'paragraph') {
                article += `<p>${content.content}</p>`;
            } else {
                article += `<img src="${content.src}" alt="Image">`; 
            }
        });
        article += "</article>";
    
    })

    //!!!!!!!!!!!!!!HACER LOS ESTILOS!!!!!!!!!!!!!!!!

    $("#title").html(title);

    $("#container").html(article);
})