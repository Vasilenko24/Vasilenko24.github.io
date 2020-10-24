$(function () {

  $('.header__lang').on('click', function(){
    $('.header__lang, .lang__more').toggleClass('active');
    });
 


    $('.header__burger').on('click', function(){
      $('.header__burger, .header__menu-content').toggleClass('active');
      $('body').toggleClass('lock');
      });






      var modal = document.getElementById("my_modal");
      var btn = document.getElementById("btn_modal_window");
      var span = document.getElementsByClassName("close_modal_window")[0];
     
      btn.onclick = function () {
         modal.style.display = "block";
      };
     
      span.onclick = function () {
         modal.style.display = "none";
      };
     
      window.onclick = function (event) {
         if (event.target == modal) {
             modal.style.display = "none";
         }
     };

});