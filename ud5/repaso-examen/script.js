import { uploadData, getData } from "./firebase-connect.js";

$(document).ready(() => {
    $('#uploadData').on('click', () => {
        console.log("collected");
        collectData();
    });

    $('#getData').on('click', async () => {
        try {
            const datos = await getData();
            console.log(datos);
        } catch (error) {
            console.log(error);
        }
    });
});

function collectData() {
    const name = $('#name').val();
    const email = $('#email').val();
    console.log(name, email);

    uploadData({ 
        "nombre": name,
        "email": email
    });
}