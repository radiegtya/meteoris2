Template.slides_form.rendered = function(){
    
};

Template.slides_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Slides, field);
    },
});