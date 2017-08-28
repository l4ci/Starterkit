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
