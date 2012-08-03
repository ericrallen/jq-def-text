(function( $ ) {
	$.fn.defaultText = function(options) {
		return this.each(function() {
			//set default options and include user-defined options
			var settings = $.extend({
				def_text : "",
				def_class : ""
			}, options);
			//check to see if the field already has a value
			//this will prevent us from overwriting data inserted via GET or POST
			if($(this).val() === '' || $(this).val() === settings.def_text) {
				//if the field is empty
				if($(this).val() === '') {
					//we want to insert the default value
					$(this).val(settings.def_text);
				}
				//set the default value
				$(this).addClass(settings.def_class);
				//when the field gets focus
				$(this).focus(function() {
					//if the value is the default text
					if($(this).val() == settings.def_text) {
						//remove the text and the default class
						$(this).val("");
						$(this).removeClass(settings.def_class);
					}
				});
				//when the field loses focus
				$(this).blur(function() {
					//if the value is empty
					if($(this).val() === "") {
						//insert the default text and add the default class
						$(this).val(settings.def_text);
						$(this).addClass(settings.def_class);
					}
				});
			//if there is already a value
			} else {
				//don't do anything
				return false;
			}
		});
	};
})(jQuery);