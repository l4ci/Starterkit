/**
 * Avoid `console` errors in browsers that lack a console.
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 * Windows Phone 8 and Device-Width FIX - JS PART
 * Source: http://timkadlec.com/2013/01/windows-phone-8-and-device-width/
 */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(
        document.createTextNode(
            "@-ms-viewport{width:auto!important}"
        )
    );
    document.getElementsByTagName("head")[0].
        appendChild(msViewportStyle);
}


/**
 * Main File starts here
 */
$(function() {
    var html = $('html'),
        body = $('body'),
        scrollTop = $(this).scrollTop();


    /**
     * OVERLAYS
     *
     * Usage:
     * <div class="overlay" id="targetID">
     *   <div class="overlay__inner">
     *      Content of your Overlay
     *   </div>
     * </div>
     * <a href="#" data-overlay="targetID">Open Overlay</a>
     */
    var overlays = $('.overlay');
    if (overlays.length > 0){
        function openOverlay(target){
            closeOverlay();
            console.log('OVERLAYS — opening:'+target);
            $('#'+target).addClass('active');
        }
        function closeOverlay(){
            console.log('OVERLAYS — closing.');
            overlays.removeClass('active');
        }
        $('[data-overlay]').on('click',function(event){
            event.preventDefault();
            var target = $(this).attr('data-overlay');
            openOverlay(target);
        });
        $('.overlay__close').on('click',function(event){
            event.preventDefault();
            closeOverlay();
        });
        overlays.on('click',function(event){
            if( event.target !== this ){ return; }
            event.preventDefault();
            closeOverlay();
        });
    }
    // END - Overlays


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


    /**
     * Smooth Scrolling
     *
     * Enabled smooth scrolling on #anchor links
     */
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').stop().animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
    // END - Smooth Scrolling


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

    $(window).scroll(windowScroll());
    $(window).resize(windowResize());


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
