Template.postsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        standardConfirmDialog.text = "Really delete this post?";
        swal(
            standardConfirmDialog
          , function () {
              Router.current().remove(this._id);
              Router.go("postsIndex")
          });
    },
};

Template.postsView.helpers({
});
