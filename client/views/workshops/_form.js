Template.workshops_form.rendered = function(){
    $('#summary').summernote({
        height: 300, 
    });
};

Template.workshops_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Workshops, field);
    },
});