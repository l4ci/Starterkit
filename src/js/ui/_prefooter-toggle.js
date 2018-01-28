/**
 * Prefooter Mobile Toggle Blocks
 * ========================
 *
 * Hide the prefooter links on mobile per default.
 * Make them toggleable on headline click.
 *
 */
var prefooterToggle = (function(){


    var config = {
        'element': '.prefooter__block',
        'clickTarget': '.prefooter__headline',
        'toggleClass': 'prefooter__block--open'
    };

    var setupBindings = function(){
        $(config.element).on('click', config.clickTarget ,function(e){
            e.preventDefault();
            if (breakpoint.value == 'xs' || breakpoint.value == 'sm') {
                $(this).closest(config.element).toggleClass(config.toggleClass);
            }
        });
    };

    var init = function(settings){
        // Allow overriding the default config
        if (settings) $.extend( config, settings );

        setupBindings();
    };

    // Expose publicly
    return {
        init: init,
    }

}());
