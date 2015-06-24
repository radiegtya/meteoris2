Template.mugenRoleCollectionsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        var recordId = this._id;
        MeteorisAlert.confirm("confirm_remove", function() {
          Router.current().remove(recordId);
          Router.go("mugenRoleCollectionsIndex")
        });
    }
};

Template.mugenRoleCollectionsView.helpers({
});