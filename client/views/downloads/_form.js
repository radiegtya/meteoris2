Template.downloads_form.rendered = function(){
    
};

Template.downloads_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Downloads, field);
    },
});