Template.posts_form.helpers({
    /* show error message on view */
    error: function(field) {
        return PiyikuSimpleSchema.error(Posts, field);
    },
});