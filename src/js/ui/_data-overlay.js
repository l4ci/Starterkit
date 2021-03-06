var dataOverlay = (function(){

    var element = $('.overlay'),
        body = $('body'),
        isOpen = false;

    var closeAllOverlays = function(qs){
        qs = (typeof qs !== 'undefined') ?  qs : false;

        console.log('OVERLAY: Closing all.');
        $('.overlay--active').animate({opacity: 0}, 600, function(){
            element.removeClass('overlay--active').removeAttr('style');
        });
        element.find('.overlay__inner').attr('aria-hidden', true);
        isOpen = false;
        body.removeClass('noscroll');

        if (qs === false) {
            deactivateBlackout('overlay');
        }
    };

    var openOverlay = function(target, qs){
        qs = (typeof qs !== 'undefined') ?  qs : false;

        prepareBlackout();
        closeAllOverlays(qs);

        body.addClass('noscroll');

        if (target.length){
            console.log('OVERLAY: Opening:'+target);
            var jtarget = $('#'+target);

            activateBlackout('overlay');

            jtarget.addClass('overlay--prepare').animate({opacity: 1}, 600, function(){
                $(this).addClass('overlay--active')
                    .removeClass('overlay--prepare')
                    .removeAttr('style');
            });
            jtarget.find('.overlay__inner').attr('aria-hidden', false);
            isOpen = true;
        } else {
            console.log('OVERLAY: '+target+' not found!');
            deactivateBlackout('overlay');
        }
    };

    var nextPrevClicked = function(that, dir){
        var current = that.closest('.overlay.overlay--active');

        if ( !current ) {
            console.log('OVERLAY: Current active overlay not found');
            return;
        }

        var group = current.data('group'),
            loop  = current.data('loop') ? true : false;

        if (group == undefined) {
            console.log('OVERLAY: Clicked overlay has no group');
            return;
        }

        var dtarget = '[data-group="'+ group +'"]';
        var target = (dir == 'prev' ? current.prevAll(dtarget) : current.nextAll(dtarget) );

        if ( target.length <= 0 ) {
            console.log('OVERLAY: '+ dir +' target not found');
            if ( loop ) {
                target = (dir == 'prev' ? $(dtarget).last() : $(dtarget).first() );
            }
        }

        if ( target.length ) {
            openOverlay(target.attr('id'), true);
        } else {
            console.log('OVERLAY: '+ dir +' target not found');
        }
    };

    var setupBindings = function(){
        $('.overlay[data-group]').each( function(){
            var el = $(this),
                elInner = el.find('.overlay__inner'),
                groupname = el.data('group'),
                loop = el.data('loop') ? true : false,
                close = el.data('close') ? true : false;

            // console.log('Groupname: ' + groupname);
            // console.log('Loop: ' + loop);

            if ( close ) {
                elInner.append('<a class="overlay__close" href="javascript:void(0)"></a>');
            }

            if (groupname == undefined) return;

            var group = $('.overlay[data-group="'+groupname+'"]');

            if ( loop ) {
                elInner
                    .append('<a class="overlay__prev" href="javascript:void(0)"></a>')
                    .append('<a class="overlay__next" href="javascript:void(0)"></a>');
            } else {
                if ( !el.is(group.first()) ) {
                    elInner.append('<a class="overlay__prev" href="javascript:void(0)"></a>');
                }
                if ( !el.is(group.last()) && ! loop ) {
                    elInner.append('<a class="overlay__next" href="javascript:void(0)"></a>');
                }
            }
        });

        $('[data-overlay]').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            var target = $(this).attr('data-overlay');
            openOverlay(target);
        });

        $('.overlay__close').on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            closeAllOverlays();
        });

        element.on('click',function(e){
            if( e.target !== this ){ return; }
            e.preventDefault();
            e.stopPropagation();
            closeAllOverlays();
        });

        $('.overlay__next').on('click', function(e){
            nextPrevClicked($(this), 'next');
            e.preventDefault();
        });

        $('.overlay__prev').on('click', function(e){
            nextPrevClicked($(this), 'prev');
            e.preventDefault();
        });

        $(document).keyup(function(e) {
            switch (e.which) {
                case 27:
                    if (isOpen) {
                        closeAllOverlays();
                        e.preventDefault();
                    }
                break;

                case 37:
                    if (isOpen) {
                        nextPrevClicked($('.overlay--active'), 'prev');
                        e.preventDefault();
                    }
                break;

                case 39:
                    if (isOpen) {
                        nextPrevClicked($('.overlay--active'), 'next');
                        e.preventDefault();
                    }
                break;
            }
        });
    };


    var init = function(){
        setupBindings();
    };

    return {
        init: init,
    }

}());
