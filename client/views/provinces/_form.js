Template.provinces_form.rendered = function() {

};

Template.provinces_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Provinces, field);
    },
});