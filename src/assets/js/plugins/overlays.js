(function($) {
    /**
     * OVERLAYS
     *
     * Usage:
     * <div class="overlay" id="targetID">
     *   <div class="overlay__inner">
     *      Content of your Overlay
     *   </div>
     * </div>
     * <a href="#" data-overlay="targetID">Open Overlay</a>
     */

    var overlays = $('.overlay');

    if (overlays.length > 0){


        function openOverlay(target){
            closeOverlay();
            console.log('OVERLAYS — opening:'+target);
            $('#'+target).addClass('active');
        }


        function closeOverlay(){
            console.log('OVERLAYS — closing.');
            overlays.removeClass('active');
        }


        $('[data-overlay]').on('click',function(event){
            event.preventDefault();
            var target = $(this).attr('data-overlay');
            openOverlay(target);
        });


        $('.overlay__close').on('click',function(event){
            event.preventDefault();
            closeOverlay();
        });


        overlays.on('click',function(event){
            if( event.target !== this ){ return; }
            event.preventDefault();
            closeOverlay();
        });

    }
    // END - Overlays
})(jQuery);
