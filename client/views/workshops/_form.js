Template.workshops_form.rendered = function(){
    
};

Template.workshops_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Workshops, field);
    },
});