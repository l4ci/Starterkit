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


    /**
     * Activate animation on sections
     */
    var sectionwaypoints = $('.section--animate').waypoint({
        handler: function(direction) {
            var wId = this.element.id;
            if (wId) {
                $('#'+wId).addClass('section--animated');
            }
        },
        offset: '75%'
    });


    /**
     * Activate autoplay on slick sliders, when in view
     */
    var slickinview = $('.slick--playinview').waypoint({
        handler: function (direction) {
            if (direction == 'down') {
                $(this.element).slick("slickSetOption", "autoplay", true, true);
            } else {
                $(this.element).slick("slickSetOption", "autoplay", false, true);
            }
        }, offset: '75%'
    }).waypoint({
        handler: function (direction) {
            if (direction == 'up') {
                $(this.element).slick("slickSetOption", "autoplay", true, true);
            } else {
                $(this.element).slick("slickSetOption", "autoplay", false, true);
            }
        }, offset: '-10%'
    });

    /**
     * Include all UI functions
     */
    //=include ui/_formvalidation.js
    //=include ui/_back-to-top.js
    //=include ui/_blackout.js
    //=include ui/_data-overlay.js
    //=include ui/_data-scrollto.js
    //=include ui/_data-toggle.js
    //=include ui/_mobile-navtoggle.js
    //=include ui/_nav-dropdown.js
    //=include ui/_prefooter-toggle.js
    //=include ui/_sidepanel.js


    /**
     * Window Resize Helper Function
     *
     * runs on each resize event, after 250ms throtteling
     */
    function windowResize(){
        // Set body padding for sticky header
        if ( $('.header').hasClass('header--sticky') ) {
            $('.main-wrapper').css({'padding-top': $('.header').outerHeight()+'px'});
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
