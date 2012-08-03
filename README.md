jq-def-text
===========

jQuery Default Text

This simple jQuery plug-in allows you to set default text for textboxes that will disappear on focus and return on blur if nothing has been entered in the box.

It can also add and remove a class when the default text is present so you can style it differently.

It checks for an already present value in the specified field and will ignore that field's default value and default class if a value is found.

This will help prevent overwriting values that are inserted into the form via PHP.

It is used like this:

$(selector).defaultText({
  def_text : 'Default Text',
  def_class : 'default'
});

change log
==========

 - 2012-08-03 - Plug-in updated. Also supports addition/removal of default classes and checks to make sure there wasn't a value inserted previously.

 - 2012-08-01 - Plug-in created. Supports basic default text insertion/removal.