$(() => {
    console.log("Documento listo");
    
    //cambiar valor por defecto del input
    $("#texto").val("adios");

    //colocar texto del button
    $("button").html("<i>hola</i>");

    // función para cambiar de texto en el input
    $("button").on("click", function() {
        console.log($("#texto").val("Jhonatan"));        
    })


    //NO FUNCIONA
    // $("button").on({
    //     click: function() {
    //         $("#texto").val("Jhonatan"); 
    //     }click: function(){
    //   console.log("hola");
    // }})
})