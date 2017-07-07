//=include inc/_win8fix.js
//=include inc/_console.js
//=include inc/_breakpoints.js
//=include plugins/**/*.js

if (typeof jQuery == 'undefined') {
    console.warn('jQuery is missing.');
}

(function($) {
    'use strict';

    var html = $('html'),
        body = $('body'),
        scrollTop = $(this).scrollTop();


    //$(".lazyload").unveil(200);


    // Navigation Dropdown Menu
    $('.nav').on('click','.nav__item.nav--hasdrop',function(e){
        var current = $(this);
        e.preventDefault();

        // Close all other submenus
        $('.nav').find('.nav__item.nav--hasdrop.nav--open').not(current).removeClass('nav--open');

        if (current.hasClass('nav--open')){
            current.removeClass('nav--open')
                .find('.nav__list')
                .attr('aria-hidden', 'true');
        }else{
            current.addClass('nav--open')
                .find('.nav__list')
                .attr('aria-hidden', 'false');
        }
    }).on('click', '.nav__list', function(e) {
        e.stopPropagation();
    });


    // Mobile Navigation Toggle
    $('.toggle-nav').on('click', function(e){
        e.preventDefault();
        $('.nav').toggleClass('nav--open');
        $(this).toggleClass('nav--open');
    });


    // General Toogle Function
    $('.toggle .question').on('click',function(e){
        var current = $(this).closest('.toggle');
        e.preventDefault();

        if (current.hasClass('-open')){
            current.removeClass('-open')
                .find('.answer')
                .attr('aria-hidden', 'true');
        }else{
            current.addClass('-open')
                .find('.answer')
                .attr('aria-hidden', 'false');
        }
    });



    /**
     * Window Resize Helper Function
     *
     * runs on each resize event, after 250ms throtteling
     */
    function windowResize(){
        breakpoint.refreshValue();

        // Set body padding for fixed header
        if ( $('.header').hasClass('header--fixed') ) {
            body.css({'padding-top': $('.header').outerHeight()+'px'});
        }
    }


    /**
     * Window Scroll Helper Function
     */
    function windowScroll(){
        scrollTop = $(window).scrollTop();

        // Set header to scrolled
        if (scrollTop > $('.header').outerHeight()) {
            $('.header').addClass('-scrolled');
        }else{
            $('.header.-scrolled').removeClass('-scrolled');
        }
    }


    $(window).scroll(windowScroll).scroll();

    $(window).resize(function(){
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(windowResize, 250);
    }).resize();


    /**
     * init function
     * runs on each page load
     */
    function init(){
        html.toggleClass('no-js js-init');
    }
    init();

})(jQuery);
