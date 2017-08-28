/**
 * Smooth Scrolling
 *
 * Enabled smooth scrolling on #anchor links
 */
$('a').on('click', function(e) {

    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[id="' + this.hash +'"]');
        target = target.length ? target : $('[name="' + this.hash.slice(1) +'"]');

        var amount = $('.header').height();
        if (target.length) {
            $('html,body').stop().animate({
                scrollTop: target.offset().top - amount
            }, 500);
            e.preventDefault();
            return false;
        }
    }
});
