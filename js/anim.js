// Agregar al carrito
$(document).on('click', '.btnCard', function () {
    $('#addedCartAlert')
        .fadeIn(200)
        .delay(500)
        .fadeOut(200)
    
});


// Formulario
$('#contactBtn').click(function () {
    $('#form')
    .fadeIn(200)
})

$('#formClose').click(function () {
    $('#form')
    .fadeOut(200)
    // Desde contact.js
    invisible()
})