
$(function(){


  // language drop down
    $('.header__lang').on('click', function(){
      $('.header__lang, .lang__more').toggleClass('active');
      });


      // end language dropw down



      // up btn
  
      $('.header__burger').on('click', function(){
        $('.header__burger, .header__menu-content').toggleClass('active');
        $('body').toggleClass('lock');
        });

        // end up btn

        



    // UKR hidden ABROD hidden
      $('.advanced__location-abroad').on('click', function(){
        $(this).removeClass('hidden');
        $('.location__name-abroad').removeClass('hidden');
        $('.advanced__location-ukr, .location__name-ukr, .street, .village').addClass('hidden');
        });
  
        $('.advanced__location-ukr').on('click', function(){
          $(this).removeClass('hidden');
          $('.location__name-ukr').removeClass('hidden');
          $('.advanced__location-abroad').addClass('hidden');
          $('.location__name-abroad').addClass('hidden');
          });



    // end UKR HIDDEN ABROAD HIDDEN
     
    
  
  $('.homeslider__inner, .carslider__inner, .yachtsslider__inner').slick({
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    pauseOnHover: true,
    focusOnSelect: false,
    });
  
    
    $('.offers__slider').slick({
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 1600,
      slidesToShow: 3,
      arrows: true,
      slidesToScroll: 1,
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
                speed: 1400,
              }
            },
      ]
  });
  
  $('.filter').on('click', function(){
    $(this).toggleClass('active');
    
    });



    
  $('.room').on('click', function(){
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
  
  
    const check = document.querySelector('#loc-1');

    check.addEventListener("click", e => {
        const checkbox = document.querySelectorAll('.checkbox');
        checkbox.forEach(checkbox => {
            checkbox.disabled = e.target.checked
        })
    })
    
    
  });

  