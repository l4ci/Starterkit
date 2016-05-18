var BackToTop = (function(){
    var settings = {};
    var module = {};
    var element = $(".backToTop"),
        scrollTop = $(window).scrollTop;

    function setupBindings() {
        backToTop.click(function (e) {
            e.preventDefault();
            $('body,html').animate({scrollTop: 0}, 800);
            return false;
        });
    }

    function checkBackToTop(){
        if (this.scrollTop > 300) {
            this.backToTop.fadeIn();
        } else {
            this.backToTop.fadeOut();
        }
    }

    module.init = function() {
        element.hide();
        setupBindings();
        $(window).on('scroll.backToTop',checkBackToTop);
    }

    return module;
 }());
