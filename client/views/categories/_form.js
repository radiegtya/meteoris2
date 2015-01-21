Template.categories_form.rendered = function(){
    
};

Template.categories_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Categories, field);
    },
});