var backToTop = (function(){

    var element = $(".back-to-top");

    var setupBindings = function(){
        element.on('click', function(e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 800);
            return false;
        });
    };

    var checkBackToTop = function(){
        if ($(window).scrollTop() > 300) {
            element.fadeIn();
        } else {
            element.fadeOut();
        }
    };

    var init = function(){
        element.hide();
        setupBindings();
        $(window).on('scroll.backToTop',checkBackToTop);
    };

    return {
        init: init,
    };

}());
