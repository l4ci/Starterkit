/**
 * Navigation Dropdown Menu
 * ========================
 *
 * En/Disable hover or click subnavigation dropdowns
 *
 */
var backToTop = (function(){

    var hoverElement = '.nav__item.nav--hasdrop',
        enabledClick = true;

   var enableClickNavigation = function(){
        console.log('Enable Click Navigation');
        enabledClick = true;

        $(hoverElement).off('mouseenter mouseleave');

        $('.nav').on('click', hoverElement ,function(e){
            var current = $(this);
            e.preventDefault();

            // Close all other submenus
            $('.nav').find( hoverElement + '.nav--open').not(current).removeClass('nav--open');

            if (current.hasClass('nav--open')){
                current.removeClass('nav--open')
                    .find('.nav__list')
                    .attr('aria-hidden', 'true');
            }else{
                current.addClass('nav--open')
                    .find('.nav__list')
                    .attr('aria-hidden', 'false');
            }
        }).on('click', '.nav__dropdown', function(e) {
            e.stopPropagation();
        });
    };

    var enableHoverNavigation = function(){
        console.log('Enable Hover Navigation');
        enabledClick = false;

        $('.nav').off('click');

        $(hoverElement).hover(function(e){
            var current = $(this);
            e.preventDefault();

            // Close all other submenus
            $('.nav').find( hoverElement + '.nav--open').not(current).removeClass('nav--open');

            current.addClass('nav--open')
                .find('.nav__list')
                .attr('aria-hidden', 'false');

        }, function(e){
            $('.nav').find(hoverElement + '.nav--open').removeClass('nav--open');
        });
    };

    var checkNavigation = function(){
        console.log('Checking ' + breakpoint.value);
        if (breakpoint.value == 'md' || breakpoint.value == 'lg' || breakpoint.value == 'xl') {
            if (enabledClick){
                enableHoverNavigation();
            }
        }else{
            if (!enabledClick){
                enableClickNavigation();
            }
        }
    };

    var init = function(){
        enableClickNavigation();
        $(window).on('resize.navigation',checkNavigation);
    };

    return {
        init: init,
    };

}());
