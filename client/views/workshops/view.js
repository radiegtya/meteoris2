Template.workshopsView.events = {
    'click #btnRemove': function(e) {
        e.preventDefault();
        if (confirm("Are you sure want to remove this data?")) {
            Router.current().remove(this._id);
            Router.go("workshopsIndex")
        }
    },
    'click #btnInsertWorkshopSpeaker': function(e, t){
        e.preventDefault();        
        Router.current().insertWorkshopSpeaker(t);
    },
    'click #btnRemoveWorkshopSpeaker': function(e, t){
        e.preventDefault();        
        Router.current().removeWorkshopSpeaker(this._id);
    },
};

Template.workshopsView.helpers({
});