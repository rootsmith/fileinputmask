/*!
 * File input control mask v1.0
 *
 * Copyright 2011, Kevin J. Smith
 */
(function($) {

    /**
     * Turn an element within a form into a file upload link/button.
     * 
     * options:
     *  name - the name control on the created file input element
     *         default: "image"
     *  display - the CSS display attribute on the wrapping element
     *            valid values are "block", "inline", and "inline-block"
     *            default: "block"
     *  cssClass - value of the class attribute on the wrapping element
     *             default: "fileInputOverride"
     *  finish - call back upon completion
     */
    $.fn.fileInputMask = function() {

        var options = {
            name: 'image',
            display: 'block',
            cssClass: 'fileInputMask',
            finish: function() {}
        };
        options = $.extend(options, params);
        if (options.display == 'inline' || options.display == 'inline-block') {
            options.display = 'inline-block';
        }
        else { options.display = 'block'; }

        // Cannot apply to an array of elements
        if ($(this).length > 1) {
            throw "More than one element given to fileInputStylizer";
        }
        var element = $(this).first();

        // Don't act on same element twice
        if (element.parent('div.'+options.cssClass).length != 0) {
            return this;
        }
        var width = element.outerWidth() + 1;
        var fontSize = width < 60 ? 12 : width / 5;
        element.wrap('<div class="'+options.cssClass+
                     '" style="position: relative; width: '+width+'px;"/>');
        if (options.display == 'inline-block' || options.display == 'inline') {
            element.parent('div.'+options.cssClass).css(
                { display: 'inline-block' }
            );
        }
        element.after('<input type="file" name="'+options.name+
                      '" size="1" style="cursor: pointer; position: absolute;'+
                      ' right: 0; top: 0; margin: 0; direction: ltr; '+
                      'font: 900 '+fontSize+'px sans-serif; '+
                      'letter-spacing: 0.5em;"/>');
        // Must set opacity in this manner to be cross-browser
        $('div.'+options.cssClass+' input[type="file"]').css({ opacity: 0 });
        options.finish.call(element);
        return this;
    };
})(jQuery);
