var w=$(window).width();
var nw=$('nav').width();

$( document ).ready(function() {

	// Preloader
	(function(){
		setTimeout(function() {
			$('#preloader').addClass('is-hidden');
		}, 2000);
		setTimeout(function() {
			$('#preloader').remove();
		}, 2600);
	})();
	
	
	$('.noclick').click(function(e) {
		e.preventDefault();
	});

	$('.smoothScroll').click(function(event) {
        event.preventDefault();
        var href=$(this).attr('href');
        var target=$(href);
        var top=target.offset().top;
        $('html,body').animate({
              scrollTop: top-60
        }, 1500);

		w=$(window).width();
		if (w<1420) {
			// var x=nw+50;
			// x='-'+x+'px';
			// $('nav').animate({"right":x}, "slow");
			$('.modal-bg').fadeOut();
		}
		$('nav.main-menu').removeClass('is-open');
		$('body').removeClass('noscroll');
		
		$('nav.main-menu .nav-open').removeClass('active');
		$('nav.main-menu .nav-open > ul').slideUp(200);
	});
	
	$('#tarif').slick({
	  infinite: false,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: false,
	  arrows: false,
	  draggable: false,
	  variableWidth: true,
	  responsive: [
		{
		  breakpoint: 1420,
		  settings: {
			draggable: true
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
			variableWidth: false,
			draggable: true,
			dots: true
		  }
		}
	  ]
	});
	w=$(window).width();
	if (w>768) {
		$('.tarif-btn').eq(0).show();
		$('.tarif-faq-fix').eq(0).show();
		$('.slick-current .tarif-faq').hide();
		//$('.slick-current .btn').hide();
		$("#tarif").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			$('.tarif-btn').hide();
			$('#tarif .slick-slide .tarif-faq').show();
			//$('#tarif .slick-slide .btn').show();
			$('.tarif-faq-fix').hide();
		});
		$("#tarif").on('afterChange', function(event, slick, currentSlide) {
			$('.tarif-btn').eq(currentSlide).show();
			$('.tarif-faq-fix').eq(currentSlide).show();
			$('#tarif .slick-slide .tarif-faq').show();
			$('.slick-current .tarif-faq').hide();
			//$('.slick-current .btn').hide();
		});
	}
	$('.tarif-left').click(function(e) {
		e.preventDefault();
		$("#tarif").slick('slickPrev');
		var index=$('#tarif .slick-slide.slick-current').index();
		if (!index) $(this).addClass('noactive');
		else $(this).removeClass('noactive');
		$('.tarif-right').removeClass('noactive');
	});
	$('.tarif-right').click(function(e) {
		e.preventDefault();
		var index=$('#tarif .slick-slide.slick-current').index();
		if (w>600) {
			if (index!=3) {
				$("#tarif").slick('slickNext');
				if (index==2) $(this).addClass('noactive');
			}
		} else {
			$("#tarif").slick('slickNext');
			if (index==3) $(this).addClass('noactive');
		}
		$('.tarif-left').removeClass('noactive');
	});

 
 // Слайдер на главной
    (function(){
        var slider = $('#slider'),
   sliderTimer,
   tick = 0,
         autoPlayTime = 25;
        
        slider.on('init', function(event, slick) {
         sliderTimer = setInterval(function(){
    tick += 1;
    if (tick > autoPlayTime) {
     slick.slickGoTo(1);
    }
   }, 20000);
        });

        slider.slick({
   infinite: true,
   slidesToShow: 1,
   slidesToScroll: 1,
   pauseOnFocus:true,
   pauseOnHover:true,
   fade: true,
   dots: true,
   arrows: false,
  });


  slider.on('beforeChange', function(event, slick, curentSlide, nextSlide) {
   tick = 0;
   clearInterval(sliderTimer);

   sliderTimer = setInterval(function(){
    tick += 1;

    if (tick >= autoPlayTime) {
     clearInterval(sliderTimer);
     slick.slickGoTo(nextSlide + 1);
     tick = 0;
    }
   }, 20000);
        });
 })();
	
	$('#invest').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: true,
	  arrows: true,
	  nextArrow: '<button type="button" class="slick-next slider-next"><svg width="27" height="48" viewBox="0 0 27 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.38956 0.753154C3.38536 -0.251051 1.75722 -0.251051 0.753016 0.753154C-0.25119 1.75736 -0.25119 3.3855 0.753016 4.3897L19.6562 23.2929C20.0467 23.6834 20.0467 24.3166 19.6562 24.7071L0.753016 43.6103C-0.25119 44.6145 -0.25119 46.2426 0.753016 47.2468C1.75722 48.2511 3.38536 48.2511 4.38956 47.2468L25.8181 25.8183C26.8223 24.8141 26.8223 23.1859 25.8181 22.1817L4.38956 0.753154Z" fill="black"/></svg></button>',
	  prevArrow: '<button type="button" class="slick-prev slider-prev"><svg width="27" height="48" viewBox="0 0 27 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M22.1817 0.753154C23.1859 -0.251051 24.8141 -0.251051 25.8183 0.753154C26.8225 1.75736 26.8225 3.3855 25.8183 4.3897L6.91508 23.2929C6.52456 23.6834 6.52456 24.3166 6.91508 24.7071L25.8183 43.6103C26.8225 44.6145 26.8225 46.2426 25.8183 47.2468C24.8141 48.2511 23.1859 48.2511 22.1817 47.2468L0.753154 25.8183C-0.251051 24.8141 -0.251051 23.1859 0.753154 22.1817L22.1817 0.753154Z" fill="black"/></svg></button>'
	});
	
	$('.faq-item-title').click(function() {
		if ($(this).parent().hasClass('active')) { 
			$(this).parent().toggleClass('active');
			$(this).parent().find('.faq-item-content').slideUp();
		}
		else {
		$('.faq-item-title').parent().removeClass('active');
		$(this).parent().toggleClass('active');
		$('.faq-item-content').slideUp();
		$(this).parent().find('.faq-item-content').slideDown();
		}
	});
	
	$('.modal-bg,.modal-close,.modal-close2').click(function(e) {
		e.preventDefault();
		$('.modal-bg').fadeOut();
		$('.modal').fadeOut();
		var x=nw+50;
		x='-'+x+'px';
		$('nav').css('right',x);
		$('body').removeClass('noscroll');
	});
	$('.modal1-open').click(function(e) {
		e.preventDefault();
		$('.modal-bg').fadeIn();
		$('.modal').fadeIn();
	});
	$('.modal-btns a').click(function(e) {
		e.preventDefault();
		var index=$(this).index();
		$('.modal-block').hide();
		$('.modal-block').eq(index).show();
		$('.modal-btns a').removeClass('active');
		$(this).addClass('active');
	});
	
	$('.mob-nav').click(function(e) {
		e.preventDefault();
		//$('.modal-bg').fadeIn();
		$('nav').fadeIn();
		// $('nav').animate({"right":"-50px"}, "slow");
		$('body').addClass('noscroll');
		$('.main-menu').addClass('is-open');
	});
	$('.mob-nav-close').click(function(e) {
		e.preventDefault();
		$('.modal-bg').fadeOut();
		// var x=nw+50;
		// if (x<450) x=450;
		// x='-'+x+'px';
		// $('nav').animate({"right":x}, "slow");
		$('body').removeClass('noscroll');
		$('.main-menu').removeClass('is-open');
	});
	
	$('.modal-inp').click(function() {
		var idd=$(this).attr('id');
		$('label[for='+idd+']').animate({"marginTop":"-12px"}, 500);
	});

	(function(){
		var slider = $('.docs-items');

		slider.slick({
		  infinite: false,
		  slidesToShow: 2,
		  slidesToScroll: 2,
		  dots: true,
		  arrows: false,
		  variableWidth: false,
		  responsive: [
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
		  		slidesToScroll: 1,
			  }
			}
		  ],
		});
	})();
	
	if (w<768) {
		
		$('.footer-title').click(function() {
			$(this).toggleClass('active');
			$(this).parent().find('ul').slideToggle();
		});
	}
	
	$('#news').slick({
	  infinite: true,
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: true,
	  arrows: false,
	  autoplay: true,
	  autoplaySpeed: 3000
	});
	
	
		$('.nav-open a.nav-open-fix').click(function(e) {
			e.preventDefault();
			if (w<1420) {
				$(this).parent().parent().find('ul').slideUp();
				$('.nav-open').not($(this).parent()).removeClass('active');
				if ($(this).parent().hasClass('active')) { $(this).parent().toggleClass('active'); } else {
					$(this).parent().find('ul').slideDown();
					$(this).parent().toggleClass('active');
				}
			}
		});
		
		$('.nav-open2').click(function(e) {
			e.preventDefault();
			$(this).find('ul').slideToggle();
			$(this).toggleClass('active');
		});




	// Модальное окно - Калькулятор
	(function(){
		var calcModal = document.getElementById('modal_calc_slider');
			noUiSlider.create(calcModal, {
			    start: 50000,
				step: 1,
			    connect: [true, false],
			    range: {
			        'min': 0,
			        'max': 10000000
			    }
			});

		calcModal.noUiSlider.on('update', function () {
			val = calcModal.noUiSlider.get();
			val=Math.round(val);
			$('#modalCalculator .calc-item-inp').val((val).toLocaleString('ru'));
			modalCalcSum();
		});
		$('#modalCalculator .calc-item-inp').keyup(function(){
			thisValue = $(this).val($(this).val().replace(/[^0-9]/gi, ''));
			thisValue = $(this).val();

		    if(thisValue.length > 1) {
		    	calcModal.noUiSlider.set($.trim(thisValue));
				modalCalcSum();
		    }
		});
		// $('#modalCalculator .calc-item-inp').change(function(){
		// 	calcModal.noUiSlider.set($(this).val());
		// 	modalCalcSum();
		// });
		$('#modalCalculator .calc-btns a').click(function(e) {
			e.preventDefault();
			$('#modalCalculator .calc-btns a').removeClass('active');
			$(this).addClass('active');
			modalCalcSum();

			if ($(this).text() === '1 день') {
				$('#modalCalculator .percent').text('1.3%');
			} else if ($(this).text() === '7 дней') {
				$('#modalCalculator .percent').text('9.86%');
			} else if ($(this).text() === '14 дней') {
				$('#modalCalculator .percent').text('20.85%');
			} else if ($(this).text() === '28 дней') {
				$('#modalCalculator .percent').text('46.14%');
			} else {}
		});

		function modalCalcSum() {
			var arr=new Array();
			arr[0]=new Array();
			arr[1]=new Array();
			arr[2]=new Array();
			arr[3]=new Array();
			arr[0][0]=0;
			arr[0][1]=0;
			arr[0][2]=1;
			arr[1][0]=0.0037;
			arr[1][1]=1;
			arr[1][2]=7;
			arr[2][0]=0.0086;
			arr[2][1]=1;
			arr[2][2]=14;
			arr[3][0]=0.0179;
			arr[3][1]=1;
			arr[3][2]=28;
			var input=$('#modalCalculator .calc-item-inp').val().replace(/\s/g, '')*1;
			var index=$('#modalCalculator .calc-btns a.active').index()*1;
			var sum=input;
			for (var i = 1; i <= arr[index][2]; i++) {
				sum += sum * 0.013;
			}
			if (arr[index][0]) sum += sum * arr[index][0]; 


			var sum1 = sum.toFixed(2).split(".");
			var sum2 = (sum - input).toFixed(2).split(".");

			$('#modalCalculator .sum1').html(Number(sum1[0]).toLocaleString('ru') + '.<em>' + Number(sum1[1]) + '</em>');
			$('#modalCalculator .sum2').html(Number(sum2[0]).toLocaleString('ru') + '.<em>' + Number(sum2[1]) + '</em>');


			// $('#modalCalculator .sum1').html(sum.toFixed(2));
			// var sum2=(sum - input).toFixed(2);
			// $('#modalCalculator .sum2').html(sum2)*1;

			$('#modalCalculator .day').html($('#modalCalculator .calc-btns a.active').html());
			$('#modalCalculator .bonus').html(arr[index][0]*100);
			if (arr[index][1]) $('#modalCalculator .cap').html('Да');
			else $('.cap').html('Нет');
		}
	})();
	
});

$(window).scroll(function() {
	if($(this).scrollTop() >= 100) {
 		$('.header-fix').fadeIn();
 		$('.fix-top-header').addClass('is-active');
 	} else {
 		$('.header-fix').fadeOut();
 		$('.fix-top-header').removeClass('is-active');
 	}
	if($(this).scrollTop() >= 300) 
 		$('.totop').fadeIn();
		else $('.totop').fadeOut();
});

$(window).resize(function() {
	nw=$('nav').width();
	var sliderDocsItems = $('.docs-items');
	var x=nw+50;
		x='-'+x+'px';
		$('nav').css('right',x);

	// $('.modal-close').click();
	//$('#slider').slick('refresh');
	$('#slider').slick('slickGoTo', 1);
	$('#slider').slick('slickGoTo', 0);
	$('#invest').slick('refresh');
	if (w<886) {
		$('.slick-current .tarif-faq').show();
	}
	w=$(window).width();
	if (w>1329) {
		$('nav').show();
		$('.modal-bg').fadeOut();
		$('nav').animate({"right":"-450px"}, "slow");
	}
	if (w<600) {
		// sliderDocsItems.slick('refresh');
	}
	if (w<750) {
		// sliderDocsItems.slick({
		//   infinite: false,
		//   slidesToShow: 1,
		//   slidesToScroll: 1,
		//   dots: true,
		//   arrows: false,
		//   variableWidth: false
		// });
		$('.footer-title').click(function() {
			$(this).toggleClass('active');
			$(this).parent().find('ul').slideToggle();
		});
	}
	else {
		// sliderDocsItems.slick('unslick');
		$('.footer-nav ul').show();
	}
	
	
	
	
});

wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       false,       // default
  live:         true        // default
}
)
wow.init();

// Если браузер Firefox
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
    $('body').addClass('firefox');
}
