Template.mugenRoleGroups_form.rendered = function(){
    
};

Template.mugenRoleGroups_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(MugenRoleGroups, field);
    },
});