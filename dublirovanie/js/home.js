M.AutoInit();
$(document).ready(function () {
    $('.parallax').parallax();
});

$(document).ready(function () {
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('.collapsible').collapsible();
});

$(function() {

    var result = function() {
        var v1 = $('#example_id').val(),
            v2 = $('#example_2').val();

        var n = Math.round(v1/20000);
        n+=Math.floor(v2/20);

        console.log(n);
        $('#img').find('.image' + n).show().siblings().hide();
    }
    result();

    $ ( "#example_id" ) . ionRangeSlider ({
        min: 20000,
        max: 100000,
        grid: true,
        step:10000
    }).on('change',result);

    $ ( "#example_2" ) . ionRangeSlider ({
        min: 5,
        max: 100,
        grid: true,
        step:1
    }).on('change',result);

})