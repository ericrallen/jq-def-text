jq-def-text (v1.4.1)
==================

###jQuery Default Text

This simple jQuery plug-in allows you to set default text for textboxes.

It will check for HTML5 placeholder support and use that if available, and, if it is not available, it will use on focus and on blur to change the value of the textbox if nothing has been entered in the box.

It checks for an already present value in the specified field and will ignore that field's default value and default class if a value is found. This will help prevent overwriting values that are inserted into the form via PHP.

Check out the [Documentation](https://github.com/ericrallen/jq-def-text/wiki) for more details about configuring jq-def-text.

###Usage

It is used like this:

	$('selector').ia_jqdeftext({
		def_text : 'Default Text',
		def_class : 'classname',
		callback : function() {
			//on blur logic here
		}
	});

DefaultText adds the class 'iadeftext' to the field by default.

###Some Options

####Default Text

The most important part of the plug-in.

	$.fn.ia_jqdeftext.default_settings.def_text = 'Default';

####Enable/Disable Placeholder Attribute

DefaultText checks for the browser's placeholder capability and uses it where applicable by default.

You can disable placeholders by setting `use_placeholder` to `false`.

	$.fn.ia_jqdeftext.default_settings.use_placeholder = false;

####Placeholder Compatibility

Placeholder capability can be checked by [Modernizr](http://modernizr.com/) if you already have it installed and have it configured to check inputs.

You can turn Modernizr support on by setting `use_modernizr` to `true`.

	$.fn.ia_jqdeftext.default_settings.use_modernizr = true;

####Placeholder Default Class

If you don't want DefaultText to add and remove the class it applies to your input when using placeholders you can set `placeholder_class` to `false`.

	$.fn.ia_jqdeftext.default_settings.placeholder_class = false;

####Toggle Placeholder Display

You can set the placeholder text to show and hide like the way values are added and removed from fields in older browsers like this:

	$.fn.ia_jqdeftext.default_settings.toggle_placeholder = true;

####Lingering Placeholders and Values

If you would like to have the placeholder or value stay visible for a short period after the field gains focus, you can do so like this:

	$.fn.ia_jqdeftext.default_settings.fade_def_text = true;

You can specify the time (in ms) for the default text to stay visible like this:

	$.fn.ia_jqdeftext.default_settings.fade_timer = 500; // default text remains for 1/2 of a second

####Default Class for Styling Default Text

It can also add and remove a class when the default text is present so you can style it differently.

	$.fn.ia_jqdeftext.default_settings.default_class = 'default_text'; // plug-in defaults to "iadefaultext"

####Callback on Blur

You can set a function to run after the field has blurred, which is useful for syncing up validation scripts or custom field logic.

	$.fn.ia_jqdeftext.default_settings.callback = function() {
		// logic here 
	};

###Retrieving Option Values

You can get the value for an option like this:

	$(selector).ia_jqdeftext('option name');

###Resetting Option Values

You can reset an option's value like this:

	$(selector).ia_jqdeftext('option name', 'new value');

###Removing Plug-in from Field

You can remove DefaultText from a field like this:

	$(selector).ia_jqdeftext('destroy');

###Demo

You can check out the JSFiddle for this plug-in and test it and its settings here:

<http://jsfiddle.net/allenericr/bcNkw/>

#Credits

This plug-in was built based on the Websanova jQuery Plug In Boilerplate <http://www.websanova.com/plugins/websanova/boilerplate>.

The idea for the lingering placeholders was inspired by this article <http://css-tricks.com/hang-on-placeholders/> from CSS-Tricks.

change log
==========
 
 - 2013-03-27 - (v1.4.1) Converted to jQuery plug-in site's naming regulations and added *jquery.json file.

 - 2013-03-27 - (v1.4.0) Added ability to have values and placeholders stay visible for a period of time (defined in miliseconds). Added class addition/removal to placeholder-enabled fields. Added destroy method to allow removal of jq-def-text from an element. Updated README.md. Added comment header to minified file.

 - 2013-01-24 - (v1.3.1) Switched Modernizr check to defaul to false. Updated README.md. Updated file naming conventions.

 - 2012-08-21 - (v1.3) Switched focus and blur to be jQuery .on() events.
 
 - 2012-08-08 - Added callback function capability to blur event.

 - 2012-08-08 - (v1.2) Plug-in updated. Added ability to toggle placeholder support and to check for placeholder support via Modernizr.

 - 2012-08-08 - Added support for HTML5 placeholder text so that developers can specify the text and it will work with the placeholder attribute in supporting browsers, but fall back to the value attribute in other browsers. Also added support for several HTML5 input types (phone,email,url,search). Placeholder text does not currently support the def_class functionality.

 - 2012-08-05 - Now built on the Websanova.com jQuery Plug-In Boilerplate (https://github.com/websanova/boilerplate). Also supports editing default options globally and returning option values.

 - 2012-08-03 - Also supports addition/removal of default classes and checks to make sure there wasn't a value inserted previously.

 - 2012-08-01 - Supports basic default text insertion/removal.
