$('[data-scrollto]').click(function() {
    var target = $($(this).data('scrollto'));
    if (target.length) {
        $('html,body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});
