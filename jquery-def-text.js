(function( $ ) {
	$.fn.defaultText = function(options) {
		return this.each(function() {
			var settings = $.extend({
				def_text: ""
			}, options);
			$(this).val(settings.def_text);
			$(this).focus(function() {
				if($(this).val() == settings.def_text) {
					$(this).val("");
				}
			});
			$(this).blur(function() {
				if($(this).val() == "") {
					$(this).val(settings.def_text);
				}
			});
		});
	}
})(jQuery);