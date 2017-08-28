// General Toogle Function
$('[data-toggle]').on('click',function(e){
    e.preventDefault();

    var current = $($(this).data('toggle'));
    if (current.length) {
        if (current.hasClass('-open')){
            current.removeClass('-open')
                .attr('aria-hidden', 'true');
        }else{
            current.addClass('-open')
                .attr('aria-hidden', 'false');
        }
    }
});
