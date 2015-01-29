Template.replacement_form.rendered = function() {
    [formRendered]
};

Template.replacement_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Replacement, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    [formHelpers]
});