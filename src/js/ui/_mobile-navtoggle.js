// Mobile Navigation Toggle
$('.toggle-nav').on('click', function(e){
    e.preventDefault();
    $('.nav').toggleClass('nav--open');
    $(this).toggleClass('nav--open');
});
