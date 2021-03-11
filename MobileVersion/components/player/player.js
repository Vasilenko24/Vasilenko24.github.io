;(function($, window, document, undefined) {
    var onMobile = 'ontouchstart' in window,
        eStart = onMobile ? 'touchstart' : 'mousedown',
        eMove = onMobile ? 'touchmove' : 'mousemove',
        eCancel = onMobile ? 'touchend' : 'mouseup',
        methods = {
            init: function(options) {
                var defaults = {
                        rounded: true,
                        linkText: '',
                        linkBlank: false,
                        btnText: 'слушать'
                    },
                    options = $.extend({}, defaults, options),
                    listened = localStorage.getItem('listened') ? JSON.parse(localStorage.getItem('listened')) : null;

                this.each(function() {
                    if ($(this).prop('tagName').toLowerCase() !== 'audio') {
                        return;
                    }

                    var $this = $(this),
                        $content = $('<div class="player-content"></div>'),
                        $btnContainer = $('<div class="player-btn-container"></div>'),
                        playerClass = '';
                        file = $this.attr('src'),
                        isSupport = false,
                        title = $this.data('title') ? $this.data('title') : file,
                        link = $this.data('link') ? $this.data('link') : '',
                        linkText = $this.data('link-text') ? $this.data('link-text') : options.linkText;

                    if (canFilePlay(file)) {
                        isSupport = true;
                    } else {
                        $this.find('source').each(function() {
                            if (canFilePlay($(this).attr('src'))) {
                                isSupport = true;
                                return false;
                            }
                        });
                    }

                    if (!isSupport) {
                        return;
                    }

                    if(link) playerClass += 'has-link';

                    var $player = $('<div class="gj-audio-player ' + playerClass + '"></div>');

                    if(listened && listened.includes(file)) {
                        $player.addClass('player-listened');
                    }

                    $btnContainer.append('<a href="javascript: void(0);" class="player-control play-stop-btn"><div class="player-control-inner"><i class="play-stop-icon"></i></div></a>');
                    $btnContainer.append('<div class="player-btn-text">' + options.btnText + '</div>');

                    $player.append($btnContainer);

                    $content.append('<div class="player-title">' + title + '</div>');

                    if(link) $content.append('<a href="' + link + '" target="' + (options.linkBlank ? '_blank' : '_self') + '" class="player-link">' + linkText + '</a>');
                    
                    $player
                        .append($content)
                        .append('<div class="player-separator"></div>');

                    $this.after($player).appendTo($player);

                    var audio = $player.find('audio')[0],
                        $playstop = $player.find('.play-stop-btn');

                    audio.addEventListener('ended', function() {
                        $player.removeClass('playing').addClass('player-visited');
                        audio.currentTime = 0;

                        if(!listened) {
                            listened = [file];
                        } else if(!listened.includes(file)) {
                            listened.push(file);
                        }

                        localStorage.setItem('listened', JSON.stringify(listened));
                    });

                    $playstop.on('click', function() {
                        if ($player.hasClass('playing')) {
                            $player.removeClass('playing');
                            audio.pause();
                            audio.currentTime = 0;
                        } else {
                            $player.addClass('playing');
                            audio.play();
                        }
                        return false;
                    });

                    window.addEventListener('beforeunload', function() {
                        $player.removeClass('playing');
                        audio.pause();
                        audio.currentTime = 0;
                    }, false);
                });
                return this;
            },
            stop: function() {
                this.each(function(){
                    var $player = $(this).closest('.gj-audio-player'),
                        audio = $(this)[0];

                    audio.pause();
                    audio.currentTime = 0;

                    $player.removeClass('playing');
                });
            }
        }

    $.fn.gjPlayer = function(method) {
        if ( methods[method] ) {
          return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
          return methods.init.apply( this, arguments );
        }
    }

    $.fn.gjPlayerSet = function(options) {
        var defaults = {
                displayTime: false,
                displayTitle: true,
                itemOptions: {}
            },
            options = $.extend({}, defaults, options);

        this.each(function() {
            var $this = $(this),
                $items = $('audio', $this);

            $items.gjPlayer(options.itemsOptions);

            var $playerPanel = $('<div class="gj-player-panel"></div>'),
                $playerTitle = $('<div class="player-title"></div>'),
                $playerBar = $('<div class="player-bar">\
                            <div class="player-bar-loaded"></div>\
                            <div class="player-bar-played"></div>\
                        </div>'),
                $playerBottom = $('<div class="player-bottom"></div>'),
                $playerBottomLeft = $('<div class="player-bottom-left"></div>'),
                $playerBottomRight = $('<div class="player-bottom-right"></div>');

            $playerPanel.append($playerBar);

            if(options.displayTime) $playerBar.append('<div class="player-time player-time-current"></div>');
            if(options.displayTime) $playerBar.append('<div class="player-time player-time-duration"></div>');

            $playerPanel.append($playerBar);

            $playerBottom.append($playerBottomLeft);
            
            if(options.displayTitle) $playerBottomLeft.append($playerTitle);

            $playerBottom.append('<div class="player-controls">\
                        <a href="javascript: void(0);" class="player-control prev-btn"><i class="prev-icon"></i></a>\
                        <a href="javascript: void(0);" class="player-control play-stop-btn"><i class="play-stop-icon"></i></a>\
                        <a href="javascript: void(0);" class="player-control next-btn"><i class="next-icon"></i></a>\
                        </div>');

            $playerBottom.append($playerBottomRight);

            $playerPanel.append($playerBottom);

            $('body').append($playerPanel);

            var $bar = $playerPanel.find('.player-bar'),
                $played = $playerPanel.find('.player-bar-played'),
                $loaded = $playerPanel.find('.player-bar-loaded'),
                $current = $playerPanel.find('.player-time-current'),
                $duration = $playerPanel.find('.player-time-duration'),
                $prev = $playerPanel.find('.prev-btn'),
                $next = $playerPanel.find('.next-btn'),
                $playstop = $playerPanel.find('.play-stop-btn'),
                $currentPlayer = null,
                currentPlayerPos = -1,
                isMoving = false,
                currentAudio = null;

            $current.html('00:00');
            $duration.html('&hellip;');

            $bar.on(eStart, function(e) {
                if(currentAudio) {
                    isMoving = true;
                    $bar.on(eMove, function(e) {
                        $played.width((getCurrentTime(e) / currentAudio.duration) * 100 + '%');
                    });
                }
            }).on(eCancel, function(e) {
                if(currentAudio) {
                    isMoving = false;
                    $bar.unbind(eMove);

                    currentAudio.currentTime = getCurrentTime(e);
                }
            });

            $prev.on('click', function(){
                if(currentPlayerPos >= 0) {
                    var newPos = currentPlayerPos - 1 < 0 ? $items.length - 1 : currentPlayerPos - 1;

                    $items.eq(newPos).parent().find('.play-stop-btn').trigger('click');
                }  
            });

            $next.on('click', function(){
                if(currentPlayerPos >= 0) {
                    var newPos = currentPlayerPos + 1 > $items.length - 1 ? 0 : currentPlayerPos + 1;

                    $items.eq(newPos).parent().find('.play-stop-btn').trigger('click');
                }    
            });

            $playstop.on('click', function() {
                if($currentPlayer) {
                    $currentPlayer.parent().find('.play-stop-btn').trigger('click');
                }
                return false;
            });

            var i = 0;

            $items.each(function(){

                initAudioListener($(this), i);

                i++;
            });

            function initAudioListener(root, pos) {
                var audio = root[0];

                audio.addEventListener('playing', function(e){
                    $items.not(root).each(function(){
                        $(this).gjPlayer('stop');
                        destroyAudio($(this));
                    });
                    currentPlayerPos = pos;
                    initAudio(root);
                });

                audio.addEventListener('loadeddata', function(){
                    var loadTimer = setInterval(function() {
                        if(currentAudio) {
                            if (currentAudio.buffered.length < 1) {
                                return true;
                            }
                            $loaded.width((currentAudio.buffered.end(0) / currentAudio.duration) * 100 + '%');
                            if (Math.floor(currentAudio.buffered.end(0)) >= Math.floor(currentAudio.duration)) {
                                clearInterval(loadTimer);
                            }

                            $duration.html($.isNumeric(currentAudio.duration) ? convertTimeStr(currentAudio.duration) : '&hellip;');
                        }
                    }, 1000);
                });
            }

            function initAudio(player) {
                if(!$playerPanel.hasClass('active')) $playerPanel.addClass('active');

                var title = player.data('title') ? player.data('title') : player.attr('src');

                $currentPlayer = player;

                currentAudio = player[0];

                currentAudio.addEventListener('timeupdate', ontimeupdate);

                currentAudio.addEventListener('pause', onpause);

                $playerPanel.addClass('playing');

                $playerTitle.html(title);
            }

            function destroyAudio(player) {
                var audio = player[0];

                audio.removeEventListener('timeupdate', ontimeupdate, false);
                audio.removeEventListener('pause', onpause, false);
            }

            function ontimeupdate() {
                $current.html(convertTimeStr(currentAudio.currentTime));

                if(!isMoving) {
                    $played.width((currentAudio.currentTime / currentAudio.duration) * 100 + '%');
                }
            }

            function onpause() {
                $playerPanel.removeClass('playing');
            }

            function getCurrentTime(e) {
                var et = onMobile ? e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e;

                return Math.round((currentAudio.duration * (et.pageX - $bar.offset().left)) / $bar.width());
            }
        });
    }

    function convertTimeStr(secs) {
        var m = Math.floor(secs / 60),
            s = Math.floor(secs - m * 60);
        return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
    }

    function canFilePlay(file) {
        if (!file) {
            return false;
        }
        var media = document.createElement('audio');
        if (typeof media.canPlayType !== 'function') {
            return false;
        }

        var res = media.canPlayType('audio/' + file.split('.').pop().toLowerCase());
        return res === 'probably' || res === 'maybe';
    }
})(siteBuilderJs, window, document);