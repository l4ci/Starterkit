/**
 * Example Boilerplate Module
 *
 * Add boilerplateModule.init() to main.js to initiate it.
 */
var boilerplateModule = (function(){

    // Add variables and elements
    var element = $('.some-element');

    // Add functions
    var doSomething = function(){
        console.log('Boilerplate running.');
    }

    // Add event handlers and keybindings here
    var setupBindings = function(){
        element.on('click',function(e){
            e.preventDefault();
            doSomething();
        });

        // Always append module name on global functions
        $(window).on('scroll.boilerplateModule', doSomething);
    };

    var init = function(){
        setupBindings();
    };

    // Expose publicly
    return {
        init: init,
    }

}());
