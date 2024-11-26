const button = $("button");
button.on("click", function (e) {

    //evitar que la pagina se recargue al momento
    e.preventDefault();

    const input1 = parseFloat($("#input1").val());
    const input2 = parseFloat($("#input2").val());

    const result = $("#result");

    if (isNumeric(input1) && isNumeric(input2)) {
        result.css("color", "black");
        result.text(input1 + input2);
    } else {
        result.css("color", "red");
        result.html("Has escrito mal el número, pringao");
    }
});

//funcion que comprueba que es numerico el valor
function isNumeric(input) {
    return !isNaN(parseFloat(input)) && isFinite(input);
}