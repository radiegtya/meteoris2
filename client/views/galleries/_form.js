Template.galleries_form.rendered = function(){
    
};

Template.galleries_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Galleries, field);
    },
});