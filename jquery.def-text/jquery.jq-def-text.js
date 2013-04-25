/*!
* jq-def-text v1.4.3
* http://github.com/ericrallen/jq-def-text/
*
* Copyright 2012 Eric Allen
* Released under the MIT license
*/

/*=====================================================
 *
 * InternetAlche.me
 *
 * Transmusting the Web
 *
 * @author					Eric Allen
 * @twitter					@allenericr
 * @copyright				Copyright (c) 2012 Eric Allen
 * @license					MIT
 * @site					http://ericrallen.github.com/jq-def-text/
 * @repo					http://github.com/ericrallen/jq-def-text/
 * @docs					https://github.com/ericrallen/jq-def-text/wiki/
 * @version					1.4.3
 *
=====================================================*/

//close out any previous JS with a semi-colon, just in case
;(function($, window, document, undefined) {
	$.fn.ia_jqdeftext = function(option, settings) {
		//if DefaultText was called with options
		if(typeof option === 'object') {
			settings = option;
		//if DefaultText was called with an option name
		} else if(typeof option === 'string') {
			//create a var to store the def-text instance for this element
			var instance = this.data('_ia_jqdeftext');

			//if there was no def-text instance, don't do anything
			if(!instance) {
				return false;
			//if there was, check the option
			} else {
				//first, check to see if a predefined method has been requested
				if(option === 'destroy') {
					//remove def-text from this element
					instance.destroy();
					return false;
				//if the string wasn't a predefined method option
				} else {
					//make sure this option exists
					if($.fn.ia_jqdeftext.default_settings[option] !== undefined) {
						//if a value was passed with the option
						if(settings !== undefined) {
							//set the value for the specified option
							instance.settings[option] = settings;
							return true;
						//if no value was passed
						} else {
							//return the value of the specified option
							return instance.settings[option];
						}
					//if this option doesn't exist, don't do anything with it
					} else {
						return false;
					}
				}
			}
		}

		settings = $.extend({}, $.fn.ia_jqdeftext.default_settings, settings || {});

		//check to see if html5 placeholder is desired
		if(settings.use_placeholder) {
			//default to non-placeholder support
			$.support.placeholder = false;
			//check for capability without modernizr
			if(!settings.use_modernizr) {
				var test = document.createElement('input');

				//if placeholder is available, turn on support
				if('placeholder' in test) {
					$.support.placeholder = true;
				}
			//if modernizr should be used
			} else {
				//if modernizr reports placeholder capability, turn on support
				if($.Modernizr.input.placeholder) {
					$.support.placeholder = true;
				}
			}
		}

		return this.each(function() {
			//cache element selector
			var $elem = $(this);

			//check to see if the element is a text input or textarea
			if($elem.is('input[type=text]') || $elem.is('textarea') || $elem.is('input[type=email]') || $elem.is('input[type=phone]') || $elem.is('input[type=url]') || $elem.is('input[type=search]') || $elem.is('input[type=password]')) {
				var $settings = jQuery.extend(true,{},settings);

				//check to see if there was a value added to the input already
				if($elem.val() === '' || $elem.val() === $settings.def_text) {
					var deftext = new DefaultText($settings);

					//add element to object for later calls
					deftext.deftext = $elem;

					//get element id
					var id = '#' + $elem.attr('id');

					//initialize deftext
					deftext.initialize();

					//initialize variable for checking whether we should bind our events
					var bind_event;

					//don't bind the events if this is a password field and we aren't supporting placeholders
					if($elem.is('input[type=password') && !this.using_placeholders()) {
						bind_event = false;
					} else {
						bind_event = true;
					}

					//if it's okay to bind the event
					if(bind_event) {
						//when the field gets focus
						$('body').on(
							'focusin.ia_deftext',
							id,
							function() {
								deftext.on_focus();
							}
						//when the field gets blurred
						).on(
							'focusout.ia_deftext',
							id,
							function() {
								deftext.on_blur();
							}
						);
					}

					//store def-text object in a data attribute
					$elem.data('_ia_jqdeftext', deftext);
				}
			}
		});
	};

	$.fn.ia_jqdeftext.default_settings = {
		def_text : '',					//the text to display
		def_class : 'iadeftext',		//the class to apply when default text is visible
		use_placeholder : true,			//try to use placeholder if available
		use_modernizr : false,			//check placeholder capability via modernizr
		toggle_placeholder : false,		//hide/show the placeholder on blur/focus
		callback : '',					//function to run after blur event is fired
		fade_def_text : false,			//[v1.4.0] remove default text on focus
		fade_time : 450,				//[v1.4.0] seconds after focus default text should hide
		placeholder_class : true		//[v1.4.0] add/remove def_class with placeholder and value
	};

	function DefaultText(settings) {
		this.deftext = null;
		this.settings = settings;
		return this;
	}

	DefaultText.prototype = {

		//insert default text and add default class
		initialize : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//if there is an element
			if($this.deftext) {
				//if the field is empty
				if($this.deftext.val() === '') {
					//if using placeholders
					if($this.using_placeholders()) {
						//insert the default value
						$this.deftext.attr('placeholder', settings.def_text);

						//if toggling class for placeholders
						if(settings.placeholder_class) {
							$this.toggle_class(true);
						}
					//if not using placeholders
					} else {
						//insert the default value
						$this.deftext.val(settings.def_text);

						//set the default class
						$this.toggle_class(true);
					}
				}
			}
		},

		//actions for focus event
		on_focus : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//if using placeholders
			if($this.using_placeholders()) {
				//if toggling placeholders
				if(settings.toggle_placeholder) {
					//if fading out the default text
					if(settings.fade_default) {
						//set timer for toggle
						$this.fade_timeout = setTimeout(
							function() {
								$this.deftext.attr('placeholder','');
							},
							settings.fade_time
						);
					} else {
						$this.deftext.attr('placeholder','');
					}
				}

				//if toggling class for placeholders
					if(settings.placeholder_class) {
						$this.toggle_class();
					}
			//if not using placeholders
			} else {
				//if the value is the default text
				if($this.is_default()) {
					//if fading out the default text
					if(settings.fade_default) {
						//set timer for toggle
						$this.fade_timeout = setTimeout(
							function() {
								$this.focus_toggle();
							},
							settings.fade_time
						);
					//if not, just toggle
					} else {
						$this.focus_toggle();
					}
				}
			}
		},

		//toggle value on focus
		focus_toggle : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//remove the text and the default class
			$this.deftext.val("");
			$this.toggle_class();
		},

		//actions for blur event
		on_blur : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//if using placeholders
			if($this.using_placeholders()) {
				//if toggling placeholder, add it back in
				if(settings.toggle_placeholder) {
					$this.deftext.attr('placeholder', settings.def_text);
				}

				//if toggling class with placeholder
				//check for default text and add it back in
				if(settings.placeholder_class && $this.is_empty()) {
					$this.toggle_class($this.deftext);
				}
			//if not using placeholders
			} else {
				//if the value is empty
				if($this.is_empty()) {
					//insert the default text and add the default class
					$this.deftext.val(settings.def_text);
					$this.toggle_class();
				}
			}

			//if there is a callback defined
			if(settings.callback && typeof settings.callback === 'function') {
				settings.callback.call(this);
			}
		},

		//[v1.4.0] switch the def_class on the element
		//the initial paramter will stop toggling if the class is present and this is during initialization
		toggle_class : function(initial) {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//default to not inital load
			var init = false;

			//if initial was set
			if(typeof initial !== 'undefined') {
				init = initial;
			}

			//if not initial load
			if(!init) {
				//if the element has the class, remove it
				if($this.deftext.hasClass(settings.def_class)) {
					$this.deftext.removeClass(settings.def_class);
				//if the element doesn't have the class, add it
				} else {
					$this.deftext.addClass(settings.def_class);
				}
			//if initial load
			} else {
				//if the element doesn't have the class, add it
				if(!$this.deftext.hasClass(settings.def_class)) {
					$this.deftext.addClass(settings.def_class);
				}
			}
		},

		//[v1.4.0] check placeholders, returns boolean
		using_placeholders : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//check for placeholder support and setting
			if($.support.placeholder && settings.use_placeholder) {
				return true;
			} else {
				return false;
			}
		},

		//[v1.4.0] check for default text, returns boolean
		is_default : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//if the value is the default text
			if($this.deftext.val() === settings.def_text) {
				return true;
			} else {
				return false;
			}
		},

		//[v1.4.0] check for empty value, returns boolean
		is_empty : function() {
			//make the element and settings easy to refer to
			var $this = this;
			var settings = $this.settings;

			//if the value is empty
			if($this.deftext.val() === "") {
				return true;
			} else {
				return false;
			}
		},

		//[v1.4.0] remove deftext events, classes, data, etc.
		destroy : function() {
			var $this = this;
			var settings = $this.settings;

			//if there is an element
			if($this.deftext) {
				//if using placeholders, remove placeholder
				if($this.using_placeholders()) {
					$this.deftext.attr('placeholder', '');
				//if not using placeholders
				} else {
					//if the input is displaying def_text, remove it
					if($this.is_default()) {
						$this.deftext.val('');
					}
				}

				//remove def_class
				$this.deftext.removeClass(settings.def_class);

				//remove associated data attribute
				$this.deftext.removeData('_ia_jqdeftext');

				//get element id
				var id = '#' + $this.deftext.attr('id');

				//unbind events
				$('body').off(
					'focusin.ia_deftext',
					id
				).off(
					'focusout.ia_deftext',
					id
				);

				//remove element
				$this.deftext = '';

				//reset object
				$this = {};
			}
		}

	};
})(jQuery, window, document);