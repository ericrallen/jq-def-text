/*=====================================================
 *
 * InternetAlche.me
 *
 * Transmusting the Web
 *
 * @author					Eric Allen
 * @copyright				Copyright (c) 2012 Eric Allen
 * @license					MIT
 * @link					http://github.com/ericrallen/jq-def-text
 * @docs					http://github.com/ericrallen/jq-def-text/blob/master/README.md
 * @version					1.1
 *
=====================================================*/

//close out any previous JS with a semi-colon, just in case
;(function($) {
	$.fn.iaDefaultText = function(option, settings) {
		//if DefaultText was called with options
		if(typeof option === 'object') {
			settings = option;
		//if DefaultText was called with an option name
		} else if(typeof option === 'string') {
			//return the value of that option
			var data = this.data('_iaDefaultText');
			if(data) {
				if($.fn.iaDefaultText.default_settings[option] !== undefined) {
					if(settings !== undefined) {
						data.settings[option] = settings;
						return true;
					} else {
						return data.settings[option];
					}
				} else {
					return false;
				}
			} else {
				return false;
			}
		}

		settings = $.extend({}, $.fn.iaDefaultText.default_settings, settings || {});

		return this.each(function() {
			var $elem = $(this);
			//check to see if the element is a textbox or textarea
			if($elem.is('input[type=text]') || $elem.is('textarea')) {
				//check to see if there was a value added to the input already
				if($elem.val() === '' || $elem.val() === $settings.def_text) {
					var $settings = jQuery.extend(true,{},settings);
					var deftext = new DefaultText($settings);
					//add element to object for later calls
					deftext.deftext = $elem;
					//initialize deftext
					deftext.initialize();
					//when the field gets focus
					$elem.bind('focus', function() {
						deftext.on_focus();
					});
					//when the field loses focus
					$elem.bind('blur', function() {
						deftext.on_blur();
					});
					$elem.data('_iaDefaultText', deftext);
				}
			}
		});
	};

	$.fn.iaDefaultText.default_settings = {
		def_text : '',
		def_class : 'iadeftext'
	};

	function DefaultText(settings) {
		this.deftext = null;
		this.settings = settings;
		return this;
	}

	DefaultText.prototype = {
		initialize : function() {
			var $this = this;
			var $settings = $this.settings;
			if($this.deftext) {
				//if the field is empty
				if($this.deftext.val() === '') {
					//we want to insert the default value
					$this.deftext.val($settings.def_text);
				}
				//set the default class
				$this.deftext.addClass($settings.def_class);
			}
		},
		on_focus : function() {
			var $this = this;
			var $settings = $this.settings;
			//if the value is the default text
			if($this.deftext.val() == $settings.def_text) {
				//remove the text and the default class
				$this.deftext.val("");
				$this.deftext.removeClass($settings.def_class);
			}
		},
		on_blur : function() {
			var $this = this;
			var $settings = $this.settings;
			//if the value is empty
			if($this.deftext.val() === "") {
			//insert the default text and add the default class
				$this.deftext.val($settings.def_text);
				$this.deftext.addClass($settings.def_class);
			}
		}
	};
})(jQuery);