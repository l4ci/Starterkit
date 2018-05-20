/**
 * Mobile Navigation Toggle
 */
$('.toggle-nav').on('click', function(e){
    e.preventDefault();
    $('.nav').slideToggle(function(){
        $(this).toggleClass('nav--open').removeAttr('style');
    });
    $(this).toggleClass('nav--open');
});
