$('.btnCard').click(function () {
    $('.cart-img')
        .fadeOut(200,
            () => $('#addedCart')
            .fadeIn(200)
            .fadeOut(200))
        .delay(399)
        .fadeIn(100)
});

// $('.prod').hover(function () {
//     $('.precio')
//         .fadeIn(200)
// });
