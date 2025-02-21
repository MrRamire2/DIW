import { getNewsById } from "../firebase/firebase-connect.js";

document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('q');

    const news = await getNewsById(id);

    const title = news.data().title;
    const allContent = news.data().content;

    let article = "";
    let classImg = "m-auto float-none w-11/12 md:float-left md:w-2/3 md:my-3 md:ml-3 md:mr-6";
    let classP = "m-3";

    $.each(allContent, (index, row) => {
        article += "<article>";
        $.each(row, (index, content) => {
            if (content.type === 'paragraph') {
                article += `<p class="${classP}">${content.content}</p>`;
            } else {
                article += `<img class="${classImg}" src="${content.src}" alt="Image">`; 
            }
        });
        article += "</article>";
    
    })

    $("#title").html(title);

    $("#container").html(article);
})