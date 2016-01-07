jQuery.noConflict();

/**
 * Main File starts here
 */
$(function() {
    var html = $('html'),
        body = $('body'),
        scrollTop = $(this).scrollTop();

    /**
     * resize helper function
     * runs on each resize event
     */
    function windowResize(){

    }

    /**
     * scroll helper function
     * runs on each scroll event
     */
    function windowScroll(){
        scrollTop = $(this).scrollTop();
        checkBackToTop();
    }

    $(window).scroll(windowScroll);
    $(window).resize(windowResize);


    /**
     * init function
     * runs on each page load
     */
    function init(){
        windowResize();
        console.log('Starterkit — ready!');
    }
    init();
});
