/**
 * Navigation Dropdown Menu
 * ========================
 *
 * En/Disable hover or click subnavigation dropdowns
 *
 */
var navDropdown = (function(){

    var hoverElement = '.nav__item.nav__item--hasdrop',
        enabledType;

   var enableClickNavigation = function(){
        console.log('Enable Click Navigation');
        enabledType = 'click';

        $(hoverElement).off('mouseenter mouseleave');

        $('.nav').on('click', hoverElement ,function(e){
            var current = $(this);
            e.preventDefault();

            // Close all other submenus
            $('.nav').find(hoverElement + '.nav__item--open').not(current).removeClass('nav__item--open');

            if (current.hasClass('nav__item--open')){
                current.removeClass('nav__item--open')
                    .find('.nav__list')
                    .attr('aria-hidden', 'true');
            }else{
                current.addClass('nav__item--open')
                    .find('.nav__list')
                    .attr('aria-hidden', 'false');
            }
        }).on('click', '.nav__dropdown, .nav__mega', function(e) {
            e.stopPropagation();
        });
    };

    var enableHoverNavigation = function(){
        console.log('Enable Hover Navigation');
        enabledType = 'hover';

        $('.nav').off('click');

        $(hoverElement).hover(function(e){
            var current = $(this);
            e.preventDefault();

            // Close all other submenus
            $('.nav').find( hoverElement + '.nav__item--open').not(current).removeClass('nav__item--open');

            current.addClass('nav__item--open')
                .find('.nav__list')
                .attr('aria-hidden', 'false');

        }, function(e){
            $('.nav').find(hoverElement + '.nav__item--open').removeClass('nav__item--open');
        });
    };

    var checkNavigation = function(){
        if (!breakpoint.value){
            breakpoint.refreshValue();
            console.log('Checking ' + breakpoint.value);
        }

        if (breakpoint.value == 'md' || breakpoint.value == 'lg' || breakpoint.value == 'xl') {
            if (enabledType != 'hover'){
                enableHoverNavigation();
            }
        }else{
            if (enabledType != 'click'){
                enableClickNavigation();
            }
        }
    };

    var init = function(){
        checkNavigation();
        $(window).on('resize.navigation',checkNavigation);
    };

    return {
        init: init,
    };

}());
