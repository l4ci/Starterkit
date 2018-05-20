/**
 * Global blackout class
 *
 * enable/disable blackout layer.
 * give an optional id as parameter to set
 * an additional blackout class for separat events
 * like closing panels/overlays etc.
 */

var activeBlackout = false;

/**
 * Append an empty and hidden blackout div
 */
var prepareBlackout = function () {
    if ($('.blackout').length <= 0) {
        console.log('BLACKOUT: appended');
        body.append('<div class="blackout"></div>');
    }
};

prepareBlackout();

var activateBlackout = function (id) {
    id = (typeof id !== 'undefined') ? id : false;

    console.log('BLACKOUT: Activated ');
    console.log('BLACKOUT: Set blackout--' + id);
    $('.blackout').fadeIn(function () {
        $(this).addClass('blackout--active').removeAttr('style');
        if (id) $(this).addClass('blackout--' + id);

        activeBlackout = true;
    });
};

var deactivateBlackout = function (id) {
    id = (typeof id !== 'undefined') ? id : false;

    console.log('BLACKOUT: Deactivated');
    $('.blackout').fadeOut(function () {
        $(this).removeClass('blackout--active').removeAttr('style');

        if (id) $(this).removeClass('blackout--' + id);

        activeBlackout = false;
    });
};
