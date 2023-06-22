jQuery(document).ready(function ($) {

    if ($(window).width() <= 991) {
        $('.seven .flex').slick({
            dots: true,
            infinite: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    $('.close_popup').on('click', function () {
        $('.popup').fadeOut();
    });

    $('.call_form').on('click', function () {
        $('.popup_download').fadeIn();
    });

});