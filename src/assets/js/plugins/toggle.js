(function($) {
    /**
     * Toggle
     */
    $('[data-toggle]').click(function() {
        var target = $($(this).data('toggle'));
        if (target.length) {
            target.toggle();
        }
    });

    $('[data-scrollto]').click(function() {
        var target = $($(this).data('scrollto'));
        if (target.length) {
            $('html,body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
    // END - Toggle
})(jQuery);
