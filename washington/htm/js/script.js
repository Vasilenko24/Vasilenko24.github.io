$(function() {

  $('.js-bg-img .img').each(function(e) {
    $(this).addClass('invisible').closest('.js-bg-img').css('background-image', 'url('+$(this).attr('src')+')');
  });

  $('[data-slide]').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation(); 
    $(this).closest('.carousel').carousel($(this).data('slide')); 
  });

  $('a.scroll-to[href*="#"]').on('click', function (e) {
    e.preventDefault();
    var $target = $($(this).attr('href'));
    if ( $target.length ) {
      $('html, body').stop().animate({
        scrollTop: $target.offset().top
      }, 500, 'linear');
    }
  });

  // $('.navbar')
  // .on('click.bs.dropdown', '.dropdown-menu [data-toggle="dropdown"]', function (e) { 
  //   // $(this).next('.dropdown-menu').toggleClass('show').parent().toggleClass('show').siblings('.show').removeClass('show').children().removeClass('show');
  //   e.stopPropagation();
  // })
  // .on('click.bs.dropdown', '[role="tablist"] > [data-toggle]', function (e) { 
  //   e.stopPropagation();
  //   e.preventDefault();
  //   $(this).tab('show');
  // })
  // .on('mouseover', '[role="tablist"] > .allow-hover', function (e) {
  //   $($(this).attr('href')).siblings().removeClass('active').removeClass('show');
  //   $(this).tab('show');
  // });
  
  $('.modal--mobilenav')
  .on('show.bs.modal', function (e) {
    $(this).addClass('visible');
  })
  .on('hidden.bs.modal', function (e) {
    var $modal =  $(this);
    setTimeout(function(){ $modal.removeClass('visible'); }, 500);
  });

  $(window).on('resize', function() {

    $('.row .vw-100').each(function() {
      $(this).removeAttr('style');  

      var vw = $(window).width(),
          cw = $(this).width(),
          ol = $(this).offset().left;

      if ( cw > vw ) {
        var percentage = (ol ) / vw * 100;
        $(this).attr('style', 'width: 100vw !important; left: calc(50% - ('+ ol +'px)) !important;');
      } else {
        $(this).removeAttr('style');  
      }
    });

    if ( $(window).width() > 960 ) {
      $('#mobileNav.visible').modal('hide');
    }

  }).trigger('resize');

  const playerNodes = $('.plyr__video-embed');
  const players = playerNodes.map(function(i, p) {
    var $playerNode = $( '.plyr__video-embed:eq('+ i +')' );
    
    $playerNode.data('plyr-index', i);

    var player = new Plyr(p);

    player.on('play', event => {
      $('.plyr-play').removeClass('is-playing is-paused');
      $('.plyr-play[data-embed-id="'+$playerNode.data('plyr-embed-id')+'"]').addClass('is-playing');      
    });
    player.on('pause', event => {
      $('.plyr-play').removeClass('is-playing is-paused');
      $('.plyr-play[data-embed-id="'+$playerNode.data('plyr-embed-id')+'"]').addClass('is-paused');      
    });

    return player;
  }).get();

  $('.plyr-playlist')
  .on('click', '.plyr-play[data-src][data-provider]', function(e) {
    e.preventDefault();
    
    var $playerNode = $($(this).data('plyr-id'));
    var player = players[ $playerNode.data('plyr-index') ];
    
    $($(this).data('plyr-id') + 'Title').text($(this).data('title'));

    if ( $(this).hasClass('is-playing') ) {
      
      player.pause();
    
    } else if ( $(this).hasClass('is-paused') ) {
      
      player.play();
    
    } else {

      $playerNode.data('plyr-provider', $(this).data('provider'))
      $playerNode.data('plyr-embed-id', $(this).data('src'))

      player.source = {
        type: 'video',
        sources: [
          {
            src: $(this).data('src'),
            provider: $(this).data('provider'),
          },
        ],
      };

      player.on('ready', event => {
        player.play();
      });

    }

  });

  // sourced from https://gist.github.com/shakilbd948/c08bca7a1bcad418810b5e5c5eb43dd8
  // with small adhustment

  // Custom function which toggles between sticky class (is-sticky)
  var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
    var stickyHeight = sticky.outerHeight();
    var stickyTop = stickyWrapper.offset().top;
    var stickyType = sticky.data('sticky');
    var stickyAdjustment = sticky.data('sticky-adjustment');

    if (stickyType == 'outsideviewport') {
      var stickyTop =  stickyTop + stickyHeight;
    }

    if (stickyAdjustment != null) {
      var stickyTop = stickyTop + (stickyAdjustment);
    }

    if (scrollElement.scrollTop() >= stickyTop) {
      stickyWrapper.height(stickyHeight);
      sticky.addClass("is-sticky");
    } else {
      sticky.removeClass("is-sticky");
      stickyWrapper.height('auto');
    }

  };

  // Find all data-toggle="sticky-onscroll" elements
  $('[data-toggle="sticky-onscroll"]').each(function () {
    var sticky = $(this);
    var wraperrClass = 'sticky-wrapper';
    var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
      
    sticky.before(stickyWrapper);
    sticky.addClass('sticky');

    // Scroll & resize events
    $(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
      stickyToggle(sticky, stickyWrapper, $(this));
    });

    // On page load
    stickyToggle(sticky, stickyWrapper, $(window));
  });

});