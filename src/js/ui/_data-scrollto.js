var dataScrollTo = (function(){

    var element = $('[data-scrollto]');

    var updateHash = function(tHash){
        if (history.pushState) {
            history.pushState(null, null, tHash);
        } else {
            location.hash = tHash;
        }
    };

    var calcStickyHeader = function(){
        var header = $('.header');
        if (header.hasClass('header--sticky')){
            return header.height();
        }
        return 0;
    };

    // Add event handlers and keybindings here
    var setupBindings = function(){
        element.on('click',function(e){
            var tHash = $(this).data('scrollto');
            var target = $(tHash);
            if (target.length) {

                var amount = calcStickyHeader();

                $('html,body').stop().animate({
                    scrollTop: target.offset().top - amount
                }, 500);

                updateHash(tHash);

                e.preventDefault();
                return false;
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
