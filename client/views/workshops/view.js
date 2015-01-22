Template.workshopsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("workshopsIndex")
        }
    },
    'click #btnInsertWorkshopCategory': function(e, t) {
        e.preventDefault();
        Router.current().insertWorkshopCategory(t);
    },
    'click #btnRemoveWorkshopCategory': function(e, t) {
        e.preventDefault();
        Router.current().removeWorkshopCategory(this._id);
    },
    'click #btnInsertWorkshopSpeaker': function(e, t) {
        e.preventDefault();
        Router.current().insertWorkshopSpeaker(t);
    },
    'click #btnRemoveWorkshopSpeaker': function(e, t) {
        e.preventDefault();
        Router.current().removeWorkshopSpeaker(this._id);
    },
    'click #btnInsertDownload': function(e, t) {
        e.preventDefault();
        Router.current().insertDownload(t);
    },
    'click #btnRemoveDownload': function(e, t) {
        e.preventDefault();
        Router.current().removeDownload(this._id);
    },
    'click #btnInsertGallery': function(e, t) {
        e.preventDefault();
        Router.current().insertGallery(t);
    },
    'click #btnRemoveGallery': function(e, t) {
        e.preventDefault();
        Router.current().removeGallery(this._id);
    },
    'click #btnInsertComment': function(e, t) {
        e.preventDefault();
        Router.current().insertComment(t);
    },
    'click #btnRemoveComment': function(e, t) {
        e.preventDefault();
        Router.current().removeComment(this._id);
    },
    'click #btnInsertConfirmation': function(e, t) {
        e.preventDefault();
        Router.current().insertConfirmation(t);
    },
    'click #btnRemoveConfirmation': function(e, t) {
        e.preventDefault();
        Router.current().removeConfirmation(this._id);
    },
    'click #btnAttend': function(e) {
        e.preventDefault();
        Router.current().attend(this._id);
    },
    'click #btnUnattend': function(e) {
        e.preventDefault();
        Router.current().unattend(this._id);
    },
};

Template.workshopsView.helpers({
});