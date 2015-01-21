Template.usersUpdate.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current()._post = true;
        Router.current().update(t);
        Router.current()._post = false;
    },
};

Template.usersUpdate.helpers({
    isSelected: function(_id) {
        if (this._id === _id)
            return "selected";
    },
    mugenRoleGroups: function(){
        return MugenRoleGroups.find({}, {sort: {name: 1}});
    }
});