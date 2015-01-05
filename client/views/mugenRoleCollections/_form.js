Template.mugenRoleCollections_form.rendered = function(){
    
};

Template.mugenRoleCollections_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(MugenRoleCollections, field);
    },
});