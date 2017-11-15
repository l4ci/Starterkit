//=include inc/_win8fix.js
//=include inc/_console.js
//=include inc/_breakpoints.js
//=include plugins/**/*.js

if (typeof jQuery == 'undefined') {
    console.warn('jQuery is missing.');
}

(function($) {
    'use strict';

    debug(true);

    console.log('main.js loaded');

    var html = $('html'),
        body = $('body'),
        scrollTop = $(this).scrollTop();


    $(".lazyload").unveil(200);

    $('.slick').slick({
        'dots': true,
    });

    /**
     * Include all UI functions
     */
    //=include ui/_back-to-top.js
    //=include ui/_data-overlay.js
    //=include ui/_data-scrollto.js
    //=include ui/_general-toggle.js
    //=include ui/_mobile-navtoggle.js
    //=include ui/_nav-dropdown.js


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

        dataOverlay.init();
        dataScrollTo.init();
        backToTop.init();
    }
    init();

})(jQuery);
