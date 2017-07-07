/**
 * Global: Get current CSS breakpoint into Javascript
 *
 * @source https://www.lullabot.com/articles/importing-css-breakpoints-into-javascript
 *
 * Usage:
 * if (breakpoint.value == 'xs') {}
 */
var breakpoint = {};
breakpoint.refreshValue = function () {
  this.value = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};
