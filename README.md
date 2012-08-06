jq-def-text
===========

jQuery Default Text

This simple jQuery plug-in allows you to set default text for textboxes that will disappear on focus and return on blur if nothing has been entered in the box.

It can also add and remove a class when the default text is present so you can style it differently.

It checks for an already present value in the specified field and will ignore that field's default value and default class if a value is found.

This will help prevent overwriting values that are inserted into the form via PHP.

It is used like this:

$('#id').iaDefaultText({
  def_text : 'Default Text',
  def_class : 'classname'
});

<<<<<<< HEAD
You can also change the default options like this:

$.fn.iaDefaultText.default_settings.def_class = 'def';

DefaultText adds the class 'iadeftext' to the input by default.

You can also get the value for an option like this:

$('#id').iaDefaultText('def_class');

=======
>>>>>>> 2bd38d64bbdcb0716f6ec231e8311ef1ff0d1ea8
change log
==========

 - 2012-08-05 - Plug-in updated. Now built on the Websanova.com jQuery Plug-In Boilerplate (https://github.com/websanova/boilerplate). Also supports editing default options globally and returning option values.

 - 2012-08-03 - Plug-in updated. Also supports addition/removal of default classes and checks to make sure there wasn't a value inserted previously.

 - 2012-08-01 - Plug-in created. Supports basic default text insertion/removal.