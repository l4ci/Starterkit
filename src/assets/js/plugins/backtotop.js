(function($) {
    /**
     * Back to Top Arrow
     *
     * Show a Back to the top arrow after a specifiy scroll amount
     */
    var backToTop = $(".backToTop");
    if (backToTop.length > 0){
        backToTop.hide();
        function checkBackToTop(){
            if (scrollTop > 300) {
                backToTop.fadeIn();
            } else {
                backToTop.fadeOut();
            }
        }

        backToTop.click(function (e) {
            e.preventDefault();
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    }
    // END - Back to Top
})(jQuery);
