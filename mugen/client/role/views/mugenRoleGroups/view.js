Template.mugenRoleGroupsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        var recordId = this._id;
        MeteorisAlert.confirm("confirm_remove", function() {
          Router.current().remove(recordId);
          Router.go("mugenRoleGroupsIndex")
        });
    },
    'keyup #search': function(e, t) {
        e.preventDefault();
        Router.current().searchUser(t);
    },
};

Template.mugenRoleGroupsView.helpers({
});