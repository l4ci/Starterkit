var dataOverlay = (function(){

    var element = $('.overlay'),
        body = $('body'),
        isOpen = false;

    var closeAllOverlays = function(){
        console.log('OVERLAYS: Closing all.');
        element.removeClass('overlay--active').find('.overlay__inner').attr('aria-hidden', true);
        isOpen = false;
        body.removeClass('noscroll');
    };

    var openOverlay = function(target){

        closeAllOverlays();

        body.addClass('noscroll');

        if (target.length){
            console.log('OVERLAY: Opening:'+target);
            $('#'+target).addClass('overlay--active').find('.overlay__inner').attr('aria-hidden', false);
            isOpen = true;
        }else{
            console.log('OVERLAY: '+target+' not found!');
        }
    };

    var nextPrevClicked = function(that, dir){
        var current = that.closest('.overlay');
        if ( !current.hasClass('overlay--active') ){
            console.log('OVERLAY: Clicked overlay is not active');
            return;
        }

        var group = current.attr('data-group');
        if (group) {
            var dtarget = '[data-group="'+ group +'"]';
            var target = (dir == 'prev' ? current.prev(dtarget) : current.next(dtarget) );
            if (target) {
                openOverlay(target.attr('id'));
            } else {
                console.log('OVERLAY: '+ dir +' target not found');
            }
        } else {
            console.log('OVERLAY: Clicked overlay has no group');
        }
    };

    var setupBindings = function(){
        $('.overlay[data-group]').each( function(){
            $(this).find('.overlay__inner').append('<div class="overlay__prev"></div><div class="overlay__next"></div>');
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
             if (e.keyCode == 27) {
                if (isOpen) closeAllOverlays();
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
