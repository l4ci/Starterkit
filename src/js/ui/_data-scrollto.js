$('[data-scrollto]').on('click', function(e) {
    var tHash = $(this).data('scrollto');
    var target = $(tHash);
    if (target.length) {
        var amount = $('.header').height();
        $('html,body').stop().animate({
            scrollTop: target.offset().top - amount
        }, 500);

        if (history.pushState) {
            history.pushState(null, null, tHash);
        } else {
            location.hash = tHash;
        }
        e.preventDefault();
        return false;
    }
});
