Template.test_form.rendered = function() {
    
};

Template.test_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Test, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});