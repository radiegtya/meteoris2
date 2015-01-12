Template.mugenRoleGroupsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("mugenRoleGroupsIndex")
        }
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().searchUser(t);
    },
};

Template.mugenRoleGroupsView.helpers({
});