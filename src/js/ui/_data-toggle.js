// General Toggle Function
// Usage:
// <div data-toggle="#toggle1"></div>
// <el id="toggle1" data-group="accordion"></el>
$('[data-toggle]').on('click',function(e){
    e.preventDefault();

    var target = $($(this).data('toggle'));
    if (target.length) {

        var group = target.data('group');
        if (group) {
            var groups = '[data-group="'+group+'"]';
            $(groups).not(target)
                .removeClass('--open')
                .attr('aria-hidden', 'true');
        }

        if (target.hasClass('--open')){
            target.removeClass('--open')
                  .attr('aria-hidden', 'true');
        } else {
            target.addClass('--open')
                  .attr('aria-hidden', 'false');
        }
    }
});
