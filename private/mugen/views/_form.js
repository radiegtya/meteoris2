Template.replacement_form.rendered = function(){
    [formRendered]
};

Template.replacement_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Replacement, field);
    },
    [formHelpers]
});