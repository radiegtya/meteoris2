Template.replacementInsert.events = {
    'click #btnSave': function(e, t) {
        e.preventDefault();
        Router.current()._post = true;
        Router.current().insert(t);   
        Router.current()._post = false;
    },
};