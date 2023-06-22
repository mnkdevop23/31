$(document).ready(function () {
  $(".phone").inputmask("+7(999)999-99-99");
});
$(document).ready(function () {
  $("#form1").validate();
  $("#form2").validate();
  $("#form3").validate();
});
$.validator.messages.required = "Заполните поле!";
$.validator.messages.email = "Неверный формат email";

$(function () {
  $(".youtube").each(function () {
    // Based on the YouTube ID, we can easily find the thumbnail image
    $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

    // Overlay the Play icon to make it look like a video player
    $(this).append($('<div/>', {
      'class': 'play'
    }));

    $(document).delegate('#' + this.id, 'click', function () {
      // Create an iFrame with autoplay set to true
      var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&rel=0";
      if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

      // The height and width of the iFrame should be the same as parent
      var iframe = $('<iframe/>', {
        'frameborder': '0',
        'allowfullscreen': 'true',
        'src': iframe_url,
        'width': $(this).width(),
        'height': $(this).height()
      })

      // Replace the YouTube thumbnail with YouTube HTML5 Player
      $(this).replaceWith(iframe);
    });
  });
});

$(document).ready(function () {
  var owl = $("#owl-demo");
  owl.owlCarousel({
    itemsCustom: [
        [0, 1],
        [450, 2],
        [600, 2],
        [700, 3],
        [1000, 4],
        [1200, 5],
        [1400, 5],
        [1600, 5]
      ],
    navigation: true
  });
});

$(document).ready(function () {
  var owl = $("#owl-demo3");
  owl.owlCarousel({
    itemsCustom: [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 2],
        [1000, 2],
        [1200, 3],
        [1400, 3],
        [1600, 3]
      ],
    navigation: true
  });
});

$(document).ready(function () {
  $("#owl-demo2").owlCarousel({
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    autoHeight: true,
    pagination: true
  });
  $("#owl-demo4").owlCarousel({
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    navigation: true,
    // autoHeight: true,
    pagination: true
  });
});


$(document).ready(function () {
  /* =================================
    Animations
  =================================== */
  wow = new WOW({
    mobile: false
  });
  wow.init();


  /* =================================
    Accordion
  =================================== */
  var $dropdown = $('.dropdown');
  var $dropdownToggle = $('.dropdown-toggle');
  var $dropdownContent = $('.dropdown-content');

  var dropdownHandler = function (e) {
    e.preventDefault();
    $dropdownToggle.next().slideUp();

    if (!($(this).next().is(":visible"))) {
      $dropdown.not(this).removeClass("active");
      $(this).next().slideDown();
    };

    $(this).toggleClass("active");
  };

  $dropdown.not('.active')
    .children('.dropdown-content').hide();
  $dropdownToggle.click(dropdownHandler);

  
  /* =================================
    Using label to style File Input
  =================================== */
  $("[type=file]").on("change", function () {
    // Name of file and placeholder
    var file = this.files[0].name;
    var dflt = $(this).attr("placeholder");
    
    if ($(this).val() != "") {
      $(this).next().text(file);
    } else {
      $(this).next().text(dflt);
    }
  });
});
