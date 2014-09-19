Template.frontend_posts_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(Posts, field);
    },
});