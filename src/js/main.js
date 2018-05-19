//=include inc/_win8fix.js
//=include inc/_console.js
//=include inc/_breakpoints.js
//=include plugins/**/*.js

if (typeof jQuery == 'undefined') {
    console.warn('jQuery is missing.');
}

(function($) {
    'use strict';

    console.log('main.js loaded');

    var html = $('html'),
        body = $('body'),
        scrollTop = $(this).scrollTop();

    if (body.hasClass('debug')) {
        debug(true);
    }

    // Unveil included for lazy loading
    $(".lazyload").unveil(200);

    // Slick included for sliders
    $('.slick').slick({
        'dots': true,
    });

    // Waypoints included for scroll events
    var waypoints = $('.main').waypoint({
        handler: function(direction) {
            console.log('Reached .main');
        }
    });

    /**
     * Include all UI functions
     */
    //=include ui/_back-to-top.js
    //=include ui/_data-overlay.js
    //=include ui/_data-scrollto.js
    //=include ui/_data-toggle.js
    //=include ui/_mobile-navtoggle.js
    //=include ui/_nav-dropdown.js
    //=include ui/_prefooter-toggle.js


    /**
     * Window Resize Helper Function
     *
     * runs on each resize event, after 250ms throtteling
     */
    function windowResize(){
        // Set body padding for sticky header
        if ( $('.header').hasClass('header--sticky') ) {
            body.css({'padding-top': $('.header').outerHeight()+'px'});
        }
    }


    /**
     * Window Scroll Helper Function
     */
    function windowScroll(){
        scrollTop = $(window).scrollTop();

        // Set header to scrolled, when sticky
        if ( $('.header').hasClass('header--sticky') ) {
            if (scrollTop > $('.header').outerHeight()) {
                $('.header').addClass('header--scrolled');
            }else{
                $('.header.header--scrolled').removeClass('header--scrolled');
            }
        }
    }


    $(window).scroll(windowScroll).scroll();

    $(window).resize(function(){
        breakpoint.refreshValue(); // Instant Breakpoint refresh
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(windowResize, 250);
    });


    /**
     * init function
     * runs on each page load
     */
    function init(){
        html.toggleClass('no-js js-init');
        windowResize();

        navDropdown.init();

        dataOverlay.init();
        dataScrollTo.init();
        backToTop.init();
        prefooterToggle.init();
    }
    init();

})(jQuery);
