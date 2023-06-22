jQuery(document).ready(function($){

    $('.close_popup').on('click', function() {
    	$('.popup').fadeOut();
    });

    $('.ques .prev').on('click', function() {
      $(this).parents('.ques').removeClass('active').prev('.ques').addClass('active');
    });

    $('.list_reply span').on('click', function() {
      if($(this).prev('input').prop('checked', true)) {
         $(this).parents('.ques').find('button.next').addClass('active');
      } else {
         $(this).parents('.ques').find('button.next').removeClass('active');
      }

      $('.ques .next.active').on('click', function() {
        $(this).parents('.ques').removeClass('active').next('.ques').addClass('active');
      });
    });
    
});