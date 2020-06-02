
$(function(){

    $('.header__lang').on('click', function(){
      $('.header__lang, .lang__more').toggleClass('active');
      });
  
      $('.header__burger').on('click', function(){
        $('.header__burger, .header__menu-content').toggleClass('active');
        $('body').toggleClass('lock');
        });
  
  
  $('.homeslider__inner, .carslider__inner, .yachtsslider__inner').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1100,
    pauseOnFocus: true,
    pauseOnDots: true,
    pauseOnHover: true,
    focusOnSelect: false,
    });
  
    
    $('.offers__slider').slick({
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 1200,
      slidesToShow: 3,
      arrows: true,
      slidesToScroll: 1,
      pauseOnFocus: true,
      pauseOnDots: true,
      pauseOnHover: true,
      
      responsive: [
          {
              breakpoint: 1185,
              settings: {
                slidesToShow: 2,
              }
            },
            {
              breakpoint: 861,
              settings: {
                slidesToShow: 1,
              }
            },
      ]
  });
  
  $('.filter').on('click', function(){
    $(this).toggleClass('active');
    
    });
  
  $('body').append('<button class="btn__up" />');
   
  $('.btn__up').click(function(){
    $('body').animate({'scrollTop' : 0 }, 1000);
    $('html').animate({'scrollTop' : 0 }, 1000);
  });
  
  $(window).scroll(function (){
    if ($(this).scrollTop() > 200) {
      $('.btn__up').addClass('active');
   }  else {
      $('.btn__up').removeClass('active');
   };
  });
  
  
    $('input[type="file"], select').styler();
  
  
  });