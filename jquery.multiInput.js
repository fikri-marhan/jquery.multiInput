;(function ( $, window, document, undefined ) {

    var defaults = {
            propertyName: 'value',
            inputAttr: {},
            multiplyOn: 'blur'
        };

    function MultiInput( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;

        this.init();
    }

    MultiInput.prototype = {

        /*
        * @function init
        *     initialize multiInputPlugin
        *
        * @return 
        *     multiInput object
        */
        init: function() {
            this.createNewInput();
            return this;
        },

        /*
        * @function createNewInput
        *     create a new input and binds if to necessary listeners
        *
        * @return jQuery object of the new input
        *
        */
        createNewInput: function(){
            var input = this.createInput();
            this.bindInput(input);
            $(this.element).trigger('mi-input-create',[input]);
            return input;
        },

        /*
        * @function createInput
        *     create a new input
        *
        * @return jQuery object of the new input
        *
        */
        createInput: function(){
            return $('<input type="text">').attr(this.options.inputAttr).data('mi-value','');
        },

        /*
        * @function bindInput
        *     bind the input with multiInput handlers and 
        *     append to the multiInput container
        *
        * @parameters
        *     the input element
        *
        * @return 
        *     multiInput object
        *
        */
        bindInput: function(input) {
            this.bindListeners(input);
            $(this.element).append(input);
            return this;
        },

        /*
        * @function bindListeners
        *     bind the input with multiInput handlers 
        *
        * @parameters
        *     the input element
        *
        * @return 
        *     multiInput object
        *
        */
        bindListeners: function(input){
            var onBlurFunc = (function(container){
                return function(){
                    var multiInput  = $(container).data('plugin_multiInput'),
                        allInputs   = $(container).find('input'),
                        currentVal  = $.trim($(this).val()),
                        previousVal = $(this).data('mi-value');

                    if(currentVal === ""){
                        if(this !== allInputs.last().get(0))
                        {
                            $(container).trigger('mi-input-removed',[$(this).detach()]);
                        }
                    } else {
                        if(allInputs.last().val() !== "")
                        {
                            multiInput.createNewInput();
                        }
                        $(this).data('mi-value',currentVal);
                        $(container).trigger('mi-value-changed',[this,previousVal,currentVal]);
                    }

                };
            }(this.element));
            input.on(this.options.multiplyOn,onBlurFunc);

            return this;
        },

        /*
        * @function getValues
        *     get all the multiInput value 
        *
        * @return 
        *     Array containing all the input value. 
        *     empty value will be ignored
        *
        */
        getValues: function(){
            return $.map($(this.element).find('input'),function(el){
                var value = $.trim($(el).val());
                if(value !== ""){
                    return value;
                }
            });
        }
    };

    $.fn.multiInput = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_multiInput")) {
                $.data(this, "plugin_multiInput",
                new MultiInput( this, options ));
            }
        });
    };

})( jQuery, window, document );

$("#test").multiInput();