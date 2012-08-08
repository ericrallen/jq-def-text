jq-def-text
===========

jQuery Default Text

This simple jQuery plug-in allows you to set default text for textboxes.

It will check for HTML5 placeholder support and use that if available, and, if it is not available, it will use on focus and on blur to change the value of the textbox if nothing has been entered in the box.

By default, placeholder text support is checked via [Modernizr](http://modernizr.com/), if you would like to turn it off, use this:

	$.fn.iaDefaultText.default_settings.use_modernizr = false;

You can set the placeholder text to toggle off/on like the value add/remove like this:

	$.fn.iaDefaultText.default_settings.toggle_placeholder = true;

You can also disable placeholder text and use the old value adding/removal like this:

	$.fn.iaDefaultText.default_settings.use_placeholder = false;

Placeholder text does not currently support the default class functionality.

It can also add and remove a class when the default text is present so you can style it differently.

It checks for an already present value in the specified field and will ignore that field's default value and default class if a value is found.

This will help prevent overwriting values that are inserted into the form via PHP.

It is used like this:

	$('selector').iaDefaultText({
  		def_text : 'Default Text',
  		def_class : 'classname'
	});

You can also change the default options like this:

	$.fn.iaDefaultText.default_settings.def_class = 'def';

DefaultText adds the class 'iadeftext' to the input by default.

You can also get the value for an option like this:

	$('selector').iaDefaultText('def_class');

You can check out the JSFiddle for this plug-in and test it and its settings here:

<http://jsfiddle.net/allenericr/bcNkw/>

This plug-in was built based on the Websanova jQuery Plug In Boilerplate <http://www.websanova.com/plugins/websanova/boilerplate>.

change log
==========

 - 2012-08-08 - Plug-in updated. Added ability to toggle placeholder support and to check for placeholder support via Modernizr.

 - 2012-08-08 - Plug-in updated. Added support for HTML5 placeholder text so that developers can specify the text and it will work with the placeholder attribute in supporting browsers, but fall back to the value attribute in other browsers. Also added support for several HTML5 input types (phone,email,url,search). Placeholder text does not currently support the def_class functionality.

 - 2012-08-05 - Plug-in updated. Now built on the Websanova.com jQuery Plug-In Boilerplate (https://github.com/websanova/boilerplate). Also supports editing default options globally and returning option values.

 - 2012-08-03 - Plug-in updated. Also supports addition/removal of default classes and checks to make sure there wasn't a value inserted previously.

 - 2012-08-01 - Plug-in created. Supports basic default text insertion/removal.