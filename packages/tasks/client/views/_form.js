Template.tasks_form.rendered = function() {
    
};

Template.tasks_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Tasks, field);
    },
    /* get current selected dropdown */
    selected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    
});