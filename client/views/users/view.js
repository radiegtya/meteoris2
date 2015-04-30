Template.usersView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        standardConfirmDialog.text = "There'll be no recovering from this.  Really delete this user?";
        swal(
            standardConfirmDialog
          , function () {
              Router.current().remove(this._id);
              Router.go("usersIndex")
          });
    },
};

Template.usersView.helpers({
});