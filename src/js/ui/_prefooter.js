/**
 * Prefooter Blocks Mobile Toggle
 */
$('.prefooter__block').on('click', '.prefooter__headline', function(e){
    e.preventDefault();
    if (breakpoint.value == 'xs' || breakpoint.value == 'sm') {
        var parent = $(this).closest('.prefooter__block');

        parent.toggleClass('prefooter__block--open');
    }
});
