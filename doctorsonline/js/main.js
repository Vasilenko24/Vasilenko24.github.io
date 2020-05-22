


$(function(){

    $(window).on("load resize orientationchange", function () { //при загрузке страницы, изменении размера или ориентации экрана
        if ($(window).width() <= 1020) { //если окно меньше 1080
          $(".tab__nav")
              .detach() //отсоединить от старого места
              .appendTo($(".navbar-flex")) //прилепить в новое (попадёт внутрь этого элемента в конец)
              .addClass("tab__nav--mooved"); //добавить класс с дополнительными стилями
                           }
    });

    $(window).on("load resize orientationchange", function () {
        if ($(window).width() <= 1020) {
          $(".header__menu")
              .detach()
              .appendTo($(".navbar-flex"))
              .addClass("header__menu--mooved");
                           }
    });

    
    
    $(window).on("load resize orientationchange", function () {
        if ($(window).width() <= 1020) {
          $(".header__btn-log")
              .detach()
              .appendTo($(".navbar-flex"))
              .addClass("header__btn-log--mooved");
                           }
    });

    $('.navbar-menu__button').on('click', function(){
        $('.navbar-flex').toggleClass('show');
    });


    $(window).on("load resize orientationchange", function () { //при загрузке страницы, изменении размера или ориентации экрана
        if ($(window).width() <= 1020) { //если окно меньше 1080
          $(".header__dropdown")
              .detach() //отсоединить от старого места
              .appendTo($(".navbar-menu__burger")) //прилепить в новое (попадёт внутрь этого элемента в конец)
              .addClass("header__dropdown--mooved"); //добавить класс с дополнительными стилями
                           }
    });

    $('.navbar-menu__burger').on('click', function(){
        $('.header__dropdown--mooved').toggleClass('show');
    });
    
    
    
    // при клике на таб меню скрывается
    $('.tab__nav-wrapper').on('click', function(){
        $('.navbar-flex').removeClass('show');
    });
    // при клике на таб меню скрывается кнопка
    $('.private__consultation-select').on('click', function(){
        $('.jq-selectbox__trigger-arrow').toggleClass('active');
    });

$('.edit__menu').on('click', function(){
$('.pub__drop').toggleClass('active');
$('.edit__menu').toggleClass('active');
});

$(".list-btn").on('click', function (t) {
    $(".header__dropdown").fadeToggle('fast');
    });
    $(".body").on('click', function (t) {
        if (t.target == this) $(".header__dropdown").fadeOut('fast');
    });

$('.search-in').on('click', function(){
$('.search-in').addClass('active');
$('.search-by').removeClass('active');
});

$('.search-by').on('click', function(){
    $('.search-by').addClass('active');
    $('.search-in').removeClass('active');
    });

    $(".tab__link").on("click",function(e){
        var a=$(this).attr("data-id");
        return $(".tab__content").find(".tab__content-item").removeClass("current-tab").hide(),
        $(".tab__nav").find(".tab__link").removeClass("tab__link-current"),
        $(this).addClass("tab__link-current"),
        $(a).addClass("current-tab").fadeIn()
    });


    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.thumbs',
        arrows: false,
        touchMove: true,
        swipe: true,
        });
        $('.thumbs').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider',
          focusOnSelect: true,
          touchMove: true,
          swipe: true,
          nextArrow: document.querySelector('.slider__right'),
          prevArrow: document.querySelector('.slider__left'),
        });

        $('.hor-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: 'vert-slider',
            arrows: false,
            vertical: true,
            touchMove: true,
            swipe: true,
            });
            $('.vert-slider').slick({
              slidesToShow: 3,
              slidesToScroll: 1,
              asNavFor: '.hor-slider',
              focusOnSelect: true,
              vertical: true,
              touchMove: true,
              swipe: true,
              nextArrow: document.querySelector('.slider__right'),
              prevArrow: document.querySelector('.slider__left')
            });

            $('.swiper__wrapper').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                centerMode: true,
                variableWidth: true,  
                touchMove: true,
                swipe: true,     
                nextArrow: document.querySelector('.slider__right'),
                prevArrow: document.querySelector('.slider__left')
                });

                $('.certificates__wrapper').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchMove: true,
                    swipe: true,  
                    nextArrow: document.querySelector('.slider__right'),
                    prevArrow: document.querySelector('.slider__left')
                    });

                $('input, select').styler();

});
