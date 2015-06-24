Template.mugenRoleActions_form.rendered = function() {

};

Template.mugenRoleActions_form.helpers({
    /* show error message on view */
    error: function(field) {
        return MeteorisSimpleSchema.error(MugenRoleActions, field);
    },
    isSelected: function(_id) {
        if (this._id == _id)
            return "selected";
    },
    mugenRoleGroups: function() {
        return MugenRoleGroups.find({}, {sort: {name: 1}});
    },
    mugenRoleCollections: function() {
        return MugenRoleCollections.find({}, {sort: {name: 1}});
    },
});