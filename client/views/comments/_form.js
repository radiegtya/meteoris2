Template.comments_form.rendered = function(){
    
};

Template.comments_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Comments, field);
    },
});