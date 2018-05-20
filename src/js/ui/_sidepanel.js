var panelOpen = false;

var closeSidepanels = function() {
    console.log('PANEL: Closing all panels');

    deactivateBlackout('panel');

    body.removeClass('noscroll')
        .removeClass('sidepanel-right--active')
        .removeClass('sidepanel-left--active');
};

var openSidepanel = function(side) {
    prepareBlackout();
    console.log('PANEL: Open ' + side + ' panel');

    activateBlackout('panel');
    panelOpen = true;
    body.addClass('noscroll');

    if (side == 'right') {
        body.addClass('sidepanel-right--active');
    } else {
        body.addClass('sidepanel-left--active');
    }
};

$('.main-wrapper').on('click', function (e) {
    if (panelOpen) {
        closeSidepanels();
        e.preventDefault();
        e.stopPropagation();
    }
});

$('[data-open-panel]').on('click', function(e){
    var target = $(this).data('open-panel');
    openSidepanel(target);
    e.preventDefault();
    e.stopPropagation();
});

$('[data-close-panel]').on('click', function(e){
    closeSidepanels();
    e.preventDefault();
});

body.on('click', '.blackout--panel', function(){
    closeSidepanels();
});

$(document).keyup(function (e) {
    switch (e.which) {
        case 27:
            if (panelOpen) {
                closeSidepanels();
                e.preventDefault();
            }
        break;
    }
});
