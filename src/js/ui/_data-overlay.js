var dataOverlay = (function(){

    var element = $('.overlay'),
        isOpen = false;

    var closeAllOverlays = function(){
        console.log('OVERLAYS: Closing all.');
        element.removeClass('-active');
        isOpen = false;
    }

    var openOverlay = function(target){
        closeAllOverlays();
        if (target.length){
            console.log('OVERLAY: Opening:'+target);
            $('#'+target).addClass('-active');
            isOpen = true;
        }else{
            console.log('OVERLAY: '+target+' not found!');
        }
    }

    var setupBindings = function(){
        $('[data-overlay]').on('click',function(e){
            e.preventDefault();
            var target = $(this).attr('data-overlay');
            openOverlay(target);
        });

        $('.overlay__close').on('click',function(e){
            e.preventDefault();
            closeAllOverlays();
        });

        element.on('click',function(e){
            if( e.target !== this ){ return; }
            e.preventDefault();
            closeOverlay();
        });

        $(document).keyup(function(e) {
             if (e.keyCode == 27) {
                if (isOpen){
                    closeOverlay();
                }
            }
        });
    };


    var init = function(){
        setupBindings();
    };

    return {
        init: init;
    }
});
