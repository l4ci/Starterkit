/**
 * Modified jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Modified: Also works on background-images
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute("data-src");
      var retina_source = this.getAttribute("data-src-retina");
        if (source || retina_source) {
          if (this.tagName === 'IMG') {
            if (source){
              this.setAttribute("src", source);
            }
            if (retina && retina_source){
              this.setAttribute("srcset", retina_source+" 2x");
            }
          } else {
              if (source){
                this.style.backgroundImage  = 'url('+source+')';
              }
              if (retina && retina_source){
                this.style.backgroundImage  = 'url('+retina_source+')';
              }
          }
          if (typeof callback === "function") callback.call(this);
        }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil touchmove.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);
