$(document).ready(function () {
    /*========================================*/
    /* START: Slide menu */
    /*========================================*/
    $("#menu-toggle").click(function(e) {
        console.log('ini toggle');
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    /*========================================*/
    /* START: SCROLL NAVBAR */
    /*========================================*/
    var header = $(".navbar--transparent");
    var button = $(".btn--transparent");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 10) {
            header.removeClass('navbar--transparent').addClass('navbar--home');
            button.removeClass('btn--transparent').addClass('btn--transparent-black');
        } else {
            header.removeClass('navbar--home').addClass('navbar--transparent');
            button.removeClass('btn--transparent-black').addClass('btn--transparent');
        }
    });

});