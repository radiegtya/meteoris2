Template.workshopsCategories_form.rendered = function() {

};

Template.workshopsCategories_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(WorkshopsCategories, field);
    },
    categories: function() {
        return Categories.find({}, {sort: {name: 1}});
    },
});